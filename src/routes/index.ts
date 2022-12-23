import express from "express";

const routes = express.Router();

routes.get("/",  (req, res) => {
   res.send('Image processing router initialized')
})

export default routes;