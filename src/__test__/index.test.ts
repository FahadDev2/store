import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
describe('Api end Point Must return Status 200', () => {
  it('Request Get / endPint -> status 200 ', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
