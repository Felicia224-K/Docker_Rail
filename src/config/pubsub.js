const redis = require('./redis');

const subscriber = redis.duplicate();

subscriber.subscribe('sensor:*:readings', (err, count) => {
  if (err) console.error('Subscribe erreur :', err);
  else console.log(`Abonne a ${count} canal(aux)`);
});

subscriber.on('message', (channel, message) => {
  const reading = JSON.parse(message);
  console.log(`Nouvelle mesure sur ${channel}:`, reading);
  // Diffuser aux clients WebSocket connectes (EX04)
});

module.exports = subscriber;