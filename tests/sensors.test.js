const request = require('supertest');
const app     = require('../src/index');

let authToken;

// Se connecter avant tous les tests
beforeAll(async () => {
  // Créer un utilisateur de test
  await request(app).post('/api/auth/register')
    .send({ name: 'Test', email: 'test@cir.ci', password: 'password123' });

  // Se connecter
  const loginRes = await request(app).post('/api/auth/login')
    .send({ email: 'test@cir.ci', password: 'password123' });

  authToken = loginRes.body.token;
});

// GET /api/sensors
describe('GET /api/sensors', () => {
  if('retourne 401 sans token', async () => {
    const res = await request(app).get('/api/sensors');
    expect(res.status).toBe(401);
  });

  if('retourne 200 avec token valide', async () => {
    const res = await request(app).get('/api/sensors')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

// POST /api/sensors
describe('POST /api/sensors', () => {
  if('crée un capteur avec données valides', async () => {
    const res = await request(app).post('/api/sensors')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Capteur Test', type: 'temperature', value: 25.5 });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Capteur Test');
  });

  if('retourne 400 avec type invalide', async () => {
    const res = await request(app).post('/api/sensors')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Test', type: 'invalid_type' });
    expect(res.status).toBe(400);
  });
});

module.exports = app;
