const http      = require('http');
const WebSocket = require('ws');
const app       = require('./app');
const redis     = require('./config/redis');
const jwt       = require('jsonwebtoken');

const server = http.createServer(app);
const wss    = new WebSocket.Server({ server });

// Map of connected clients by userId
const clients = new Map();

wss.on('connection', (ws, req) => {
  // Extract and verify JWT from query param
  const token  = new URL(req.url, 'ws://localhost').searchParams.get('token');
  
  let userId;
  try {
    userId = jwt.verify(token, process.env.JWT_SECRET || 'default_secret')?.id;
  } catch (err) {
    return ws.close(4001, 'Token invalide');
  }
  
  if (!userId) return ws.close(4001, 'Token invalide');

  // Register the client
  if (!clients.has(userId)) clients.set(userId, new Set());
  clients.get(userId).add(ws);
  
  console.log(`Client connecte: userId ${userId}`);

  ws.on('close', () => {
    clients.get(userId)?.delete(ws);
    console.log(`Client deconnecte: userId ${userId}`);
  });
});

// Redis subscription — receive new readings
const subscriber = redis.duplicate();
subscriber.psubscribe('sensor:*:readings');

subscriber.on('pmessage', (pattern, channel, message) => {
  const reading = JSON.parse(message);
  const userId  = reading.userId;

  // Send to WebSocket clients of this user
  clients.get(userId)?.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'NEW_READING', data: reading }));
    }
  });
});

module.exports = server;