import express from 'express';
import path from 'path'
import resize from "./utilities/resize";
const app = express();
const port = 3000;

const baseUrl = path.resolve('src')
const inputDirectory = path.resolve( baseUrl, 'assets', 'originals')
const outputDirectory = path.resolve( baseUrl, 'assets', 'processed')
const inputFile1 = path.resolve(inputDirectory, 'test.jpg')
const inputFile2 = path.resolve(inputDirectory, 'fjord.jpg')
const inputFile3 = path.resolve(inputDirectory, 'santamonica.jpg')
app.get('/', async (req, res) => {
    res.send('Image Processing server now running');
    await resize.resizeImage(inputFile2, outputDirectory)
});

app.listen(port, ()=> {
    console.log(`server started at http://localhost:${port}`)
});