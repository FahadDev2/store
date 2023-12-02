import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import handlErros from './middlewares/error.middlewares';
const app: Application = express();

import db from './database';
app.use(express.json());
app.use(morgan('common'));
app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);

//update
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too Many Request Please',
  })
);

app.get('/', handlErros, (_req: Request, res: Response) => {
  throw new Error('Hello');
  //   throw new Error('page Not esites');
  res.json({
    message: 'Hello World',
  });
});

app.use(handlErros);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'opps Page Not found',
  });
});

db.connect().then(async (client) => {
  try {
    const a = await client.query('SELECT NOW()');
    console.log('from data base');

    //dont forget to relase connection after query
    client.release();
    console.log(a.rows);
  } catch (error) {
    client.release();
    console.log(error);
  }
});

export default app;
