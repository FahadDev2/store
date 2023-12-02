import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
describe('Api end Point Must return Status 500', () => {
  it('Request Get / endPint -> status 500 ', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(500);
  });
});
