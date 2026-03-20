const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const mongoose = require('mongoose');

describe('Authentication', () => {
  beforeAll(async () => {
    // Подключаем тестовую БД (можно использовать отдельную)
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-tes');
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: '123456' });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User created successfully');
    });

    it('should not register with duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: '123456' });
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toBe('User already exists');
    });

    it('should validate email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'invalid', password: '123456' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: '123456' });
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrong' });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});