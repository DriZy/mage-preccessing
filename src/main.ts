import express from 'express';
import routes from "./routes";
import apicache from "apicache"
import logger from "./controllers/logger";


const app = express();
const port = 3000;
let cache = apicache.middleware


app.use('/', logger, routes);
app.use(cache('5 minutes'))


app.listen(port, ()=> {
    console.log(`server started at http://localhost:${port}`)
});

export default app