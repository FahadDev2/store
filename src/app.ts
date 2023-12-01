import app from './index';
import express, { Application, Request, Response } from 'express';

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
