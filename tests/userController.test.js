const request = require('supertest');
const app = require('../app');  // Adjust the path accordingly
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../models/userModel');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('Authentication Controller', () => {
  // Mock user data for testing
  const mockUser = {
    _id: 'someUserId',
    username: 'some user name',
    email: 'some@mail.com',
    password: 'hashedPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test signup endpoint
  test('should sign up a new user', async () => {
    userModel.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    userModel.create.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue('mockToken');

    const response = await request(app).post('/signup').send({
        username: 'some user name',
        email: 'some@mail.com',
        password: 'hashedPassword',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      user: mockUser,
      token: 'mockToken',
    });
  });

  // Test signup endpoint for existing user
  test('should return 400 for existing user during signup', async () => {
    userModel.findOne.mockResolvedValue(mockUser);

    const response = await request(app).post('/signup').send({
        username: 'some user name',
        email: 'some@mail.com',
        password: 'hashedPassword',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'User already exist',
    });
  });

  // Test signin endpoint
  test('should sign in an existing user', async () => {
    userModel.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockToken');

    const response = await request(app).post('/signin').send({
        email: 'some@mail.com',
        password: 'hashedPassword',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      user: mockUser,
      token: 'mockToken',
    });
  });

  // Test signin endpoint for non-existing user
  test('should return 404 for non-existing user during signin', async () => {
    userModel.findOne.mockResolvedValue(null);

    const response = await request(app).post('/signin').send({
        email: 'some@mail.com',
        password: 'hashedPassword',
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'user not found',
    });
  });

  // Test signin endpoint for invalid password
  test('should return 400 for invalid password during signin', async () => {
    userModel.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post('/signin').send({
        email: 'some@mail.com',
        password: 'invalid',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid password',
    });
  });
});
