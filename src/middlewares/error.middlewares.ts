import express, { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';
//here is problem cant find status in typescript class Error types
//so we will creat interface and add status to it
const handlErros = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'oops!';
  res.status(status).json({ status, message });
  //   next();
};

export default handlErros;
