import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import handlErros from './middlewares/error.middlewares';
import router from './routes';
const app: Application = express();
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

app.use('/api/v1/', router);

app.use(handlErros);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'opps Page Not found',
  });
});

export default app;
