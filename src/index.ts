import app from './app';

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
