import request from 'supertest';
import app from "../app"
import { describe, it, beforeAll, afterAll, expect } from 'vitest'


describe('Movie Recommendation Controller', () => {
  it('should get movie recommendations for all users', async () => {
    const response = await request(app).get('/movies/users');

    expect(response.status).toEqual(200);
    // expect(response.body).toEqual(/* expected response body */);
  });
});
