import { handler } from './build/handler.js';

import express from 'express';
import compression from 'compression';

const app = express();

app.get('/healthcheck', (req, res) => {
  res.send('ok');
});

app.use(compression());

app.use(handler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
