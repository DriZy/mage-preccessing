import express from 'express';
import resize from '../controllers/resize';

const routes = express.Router();

routes.get('/api', (req:express.Request, res:express.Response): void => {
  res.send('Image processing api router initialized');
});
routes.get(`/api/resize`, async (req:express.Request, res:express.Response) => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(<string>req.query.width);
  const height: number = parseInt(<string>req.query.height);
  if (
    Object.entries(req.query).length > 0 &&
    !!req.query.filename &&
    !!req.query.width &&
    !!req.query.height
  ) {
    const response = await resize.resizeImageWithQuery(filename, width, height);
    res.send( response );
  } else {
    res.send('Error! Missing filename, height or width');
  }
});

export default routes;
