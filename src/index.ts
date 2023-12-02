import app from './app';

import config from './envConfig/config';

const port = config.port;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
