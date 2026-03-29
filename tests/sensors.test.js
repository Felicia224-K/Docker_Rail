const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('retourne le message API running', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('IoT Sensors API is running!');
  });
});

describe('GET /api/sensors', () => {
  it('retourne 401 sans token', async () => {
    const res = await request(app).get('/api/sensors');
    expect(res.status).toBe(401);
  });
});

describe('POST /login', () => {
  it('login route existe et repond', async () => {
    const res = await request(app).post('/login')
      .send({ email: 'test@test.com', password: 'test' });
    expect(res.status).not.toBe(404);
  });
});