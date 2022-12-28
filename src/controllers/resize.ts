import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import path from 'path';

/**
 * Risize images of format jpg, png and jpeg to a specified array of sizes
 * @param links path to image or an array of images paths
 * @param outputDir path to store resized files in
 * **/
// const resizeImage = async (req: express.Request, res: express.Response, next: Function) => {
//     try {
//         if (Object.entries(req.query).length > 0) {
//             const filename: string = req.query.filename as string
//             const width: number = parseInt(<string>req.query.width)
//             const height: number = parseInt(<string>req.query.height)
//             resizeImageWithQuery({filename, height, width})
//         } else {
//             const baseUrl = path.resolve('src')
//             const inputDirectory = path.resolve(baseUrl, 'assets', 'originals')
//             const outputDirectory = path.resolve(baseUrl, 'assets', 'processed')
//             const inputFile2 = path.resolve(inputDirectory, 'fjord.jpg')
//             const inputFile3 = path.resolve(inputDirectory, 'santamonica.jpg')
//             resizeImageWithParams([inputFile2, inputFile3], outputDirectory)
//         }
//     } catch (error) {
//         console.log(error)
//         console.log(res.errored)
//     }
// };
// const resizeImageWithParams = async (
//   links: string | string[],
//   outputDir: string
// ) => {
//   try {
//     const sizes: { width: number; height: number }[] = [
//       { width: 150, height: 150 },
//       {
//         width: 250,
//         height: 250
//       },
//       { width: 300, height: 300 },
//       { width: 600, height: 600 },
//       { width: 1024, height: 1024 }
//     ];
//     //check if output directory exist already
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }
//     //process array of files/images
//     if (typeof links !== 'string' && links.length > 0) {
//       for (let i = 0; i < links.length; i++) {
//         const extension = path.extname(links[i]);
//         const fileName = path.basename(links[i], extension);
//         for (const size of sizes) {
//           const image = await sharp(links[i]).resize(size.width, size.height, {
//             kernel: sharp.kernel.nearest,
//             fit: 'cover',
//             position: 'center',
//             background: { r: 255, g: 255, b: 255, alpha: 0.5 }
//           });
//           await fsPromises.writeFile(
//             `${outputDir}/${fileName}_${size.width}_${size.height}_pixels${extension}`,
//             image
//           );
//           console.log(
//             `${fileName}_${size.width}_${size.height}_pixels${extension} created successfully`
//           );
//         }
//       }
//     } else {
//       //process single file/image
//       if (typeof links === 'string') {
//         const extension = path.extname(links);
//         const fileName = path.basename(links, extension);
//         for (const size of sizes) {
//           const image = await sharp(links).resize(size.width, size.height, {
//             kernel: sharp.kernel.nearest,
//             fit: 'cover',
//             position: 'center',
//             background: { r: 255, g: 255, b: 255, alpha: 0.5 }
//           });
//           await fsPromises.writeFile(
//             `${outputDir}/${fileName}_${size.width}_${size.height}_pixels${extension}`,
//             image
//           );
//           console.log(
//             `${fileName}_${size.width}_${size.height}_pixels${extension} created successfully`
//           );
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const resizeImageWithQuery = async (
  filename: string,
  width: number,
  height: number
) => {
  try {
    const baseUrl: string = path.resolve('src');
    const inputDir: string = path.resolve(baseUrl, 'assets', 'originals');
    const outputDir: string = path.resolve(baseUrl, 'assets', 'processed');
    const filePath = path.resolve(baseUrl, inputDir, filename);
    const extension = path.extname(filePath);
    const name = path.basename(filePath, extension);
    //check if output directory exist already
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    if (!width || !height) {
      console.log(
        'Error! Invalid input for height or width e.g. height=a, height=0, height=500f or height=-1.'
      );
    } else if (!filename || !fs.existsSync(filePath)) {
      console.log('Error! Invalid filename! Path to file not available ');
    } else if (
      fs.existsSync(
        `${outputDir}/${name}_${width}_${height}_pixels${extension}`
      )
    ) {
      console.log(
        `${outputDir}/${name}_${width}_${height}_pixels${extension} already exist`
      );

      return {
        filename,
        width,
        height
      };
    }
    //process single file/image
    else if (
      (filePath || fs.existsSync(filePath)) &&
      !fs.existsSync(
        `${outputDir}/${name}_${width}_${height}_pixels${extension}`
      )
    ) {
      const image = await sharp(filePath).resize(width, height, {
        kernel: sharp.kernel.nearest,
        fit: 'cover',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 0.5 }
      });
      await fsPromises.writeFile(
        `${outputDir}/${name}_${width}_${height}_pixels${extension}`,
        image
      );
      console.log(
        `${name}_${width}_${height}_pixels${extension} created successfully`
      );
      return {
        filename,
        width,
        height
      };
    } else {
      console.log('Error! An error occurred! Please try again');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default {
  resizeImageWithQuery
};
