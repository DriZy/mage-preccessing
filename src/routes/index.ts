import express from 'express';
import resize from '../controllers/resize';

const routes = express.Router();

routes.use('/api', (req, res) => {
  res.send('Image processing api router initialized');
});
routes.use(`/api/resize`, async (req, res) => {
  console.log(req);
  const filename: string = req.query.filename as string;
  const width: number = parseInt(<string>req.query.width);
  const height: number = parseInt(<string>req.query.height);
  if (
    Object.entries(req.query).length > 0 &&
    !!req.query.filename &&
    !!req.query.width &&
    !!req.query.height
  ) {
    await resize.resizeImageWithQuery(filename, width, height);
    res.send(req);
  } else {
    console.log('Error! Missing filename, height or width');
  }
});

export default routes;
