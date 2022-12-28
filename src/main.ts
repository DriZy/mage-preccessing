import express from 'express';
import routes from './routes';
import logger from './controllers/logger';

const app = express();
const port = 3000;

app.use('/', logger, routes);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
