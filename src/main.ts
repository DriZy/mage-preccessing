import express from 'express';
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.send('Image Processing server now running');
});

app.listen(port, ()=> {
    console.log(`server started at http://localhost:${port}`)
});