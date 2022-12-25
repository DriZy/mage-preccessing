import path from "path";
import resize from "../../controllers/resize";

/**
 * Unit test suit for image resizing endpoint
 * */
describe('Tests for image resizing', () => {
    const baseUrl = path.resolve('src')
    const inputDirectory = path.resolve(baseUrl, 'assets', 'originals')
    const outputDirectory = path.resolve(baseUrl, 'assets', 'processed')
    const inputFile1 = path.resolve(inputDirectory, 'test.jpg')
    const inputFile2 = path.resolve(inputDirectory, 'fjord.jpg')
    const inputFile3 = path.resolve(inputDirectory, 'santamonica.jpg')

    it('it should provide various sizes specified if input is a string and be truthy', async () => {
        return expect(resize.resizeImage(inputFile1, outputDirectory)).toBeTruthy();
    });
    it('it should provide various sizes specified if input is an array and be truthy', () => {
        expect(resize.resizeImage([inputFile1, inputFile2, inputFile3], outputDirectory)).toBeTruthy();
    });

});