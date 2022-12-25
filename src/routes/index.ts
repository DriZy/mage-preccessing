import express from "express";
import path from "path";
import resize from "../controllers/resize";
import logger from "../controllers/logger";

const routes = express.Router();

routes.get("/api",  logger, (req, res) => {
   res.send('Image processing api router initialized')
})

routes.get("/api/resize", logger, async (req, res) => {
   const baseUrl = path.resolve('src')
   const inputDirectory = path.resolve(baseUrl, 'assets', 'originals')
   const outputDirectory = path.resolve(baseUrl, 'assets', 'processed')
   const inputFile2 = path.resolve(inputDirectory, 'fjord.jpg')
   const inputFile3 = path.resolve(inputDirectory, 'santamonica.jpg')
   await res.send(resize.resizeImage([inputFile2, inputFile3], outputDirectory))
})


export default routes;