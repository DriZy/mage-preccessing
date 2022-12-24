import express from "express";

const routes = express.Router();

routes.get("/api",  (req, res) => {
   res.send('Image processing router initialized')
})

export default routes;