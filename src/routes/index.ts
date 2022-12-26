import express from "express";
import path from "path";
import resize from "../controllers/resize";
import logger from "../controllers/logger";

const routes = express.Router();

routes.get("/api",  logger, (req, res) => {
   res.send('Image processing api router initialized')
})
routes.get(`/api/resize`, resize.resizeImage, async (req, res) => {
   await res.send(req)
})


export default routes;