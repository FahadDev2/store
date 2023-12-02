import { Pool, PoolClient } from 'pg';
import config from '../../envConfig/config';
import db from '../../database';

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
});
describe('Postgres DB Connection', () => {
  it('should establish a successful pg db connection', async () => {
    const client = await pool.connect();
    expect(client).toBeTruthy();

    client.release();
  });
});
