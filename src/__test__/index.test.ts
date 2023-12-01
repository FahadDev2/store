import supertest from 'supertest';

import app from '../index';

const request = supertest(app);
describe('request endPoint status', () => {
  it('Try API EndPoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
