const request = require('supertest');
const app = require('../app');  // Adjust the path accordingly
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('Admin Controller', () => {
  // Mock user data for testing
  const mockUser = {
    _id: 'someUserId',
    username: 'some username',
    email: 'some@email.com',
    phone: '1234567890',
    password: 'password123',
    role: 'user',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test create user endpoint
  test('should create a new user', async () => {
    userModel.prototype.save.mockResolvedValue(mockUser);

    const response = await request(app).post('/admins').send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  // Test get all users endpoint
  test('should get all users', async () => {
    userModel.find.mockResolvedValue([mockUser]);

    const response = await request(app).get('/admins');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
  });

  // Test update user endpoint
  test('should update a user', async () => {
    const updatedUser = { ...mockUser, username: 'Updated Name' };
    userModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const response = await request(app).put(`/admins/${mockUser._id}`).send({ username: 'Updated Name' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedUser);
  });

  // Test delete user endpoint
  test('should delete a user', async () => {
    userModel.findByIdAndDelete.mockResolvedValue(mockUser);

    const response = await request(app).delete(`/admins/${mockUser._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User deleted successfully' });
  });
});
