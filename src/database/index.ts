import { Pool, Client } from 'pg';

import config from '../envConfig/config';
// pools will use environment variables
// for connection information
const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
  max: 4,
});

pool.on('error', (error: Error) => {
  console.log(error.message);
});

export default pool;
