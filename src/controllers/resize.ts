import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import path from 'path';

/**
 * Risize images of format jpg, png and jpeg to a specified array of sizes
 * @param filename image name
 * @param width
 * @param heigh
 **/



const resizeImageWithQuery = async (
  filename: string,
  width: number,
  height: number
): Promise<string | unknown> => {
  try {
    //get base url
    const baseUrl: string = path.resolve('src');
    //get absolute path to directory containing original files
    const inputDir: string = path.resolve(baseUrl, 'assets', 'originals');
    //get absolute path to directory containing processed files
    const outputDir: string = path.resolve(baseUrl, 'assets', 'processed');
    //get absolute path to file/image
    const filePath = path.resolve(baseUrl, inputDir, filename);
    //get file extension
    const extension = path.extname(filePath);
    //get file name without extension
    const name = path.basename(filePath, extension);
    //check if output directory exist already
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    //check for width and height
    if (!width || !height) {
      console.log(
        'Error! Invalid input for height or width e.g. height=a, height=0, height=500f or height=-1.'
      );
    }
    //check filename and absolute file path
    else if (!filename || !fs.existsSync(filePath)) {
      console.log('Error! Invalid filename! Path to file not available ');
      return 'Error! Invalid filename! Path to file not available ';
    }
    //check if file width same width and height has been processed before
    else if (
      fs.existsSync(
        `${outputDir}/${name}_${width}_${height}_pixels${extension}`
      )
    ) {
      console.log(
        `${outputDir}/${name}_${width}_${height}_pixels${extension} already exist`
      );

      return `${outputDir}/${name}_${width}_${height}_pixels${extension}`;
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
      return `${outputDir}/${name}_${width}_${height}_pixels${extension}`;
    } else {
      console.log('Error! An error occurred! Please try again');
      return 'Error! An error occurred! Please try again';
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};


export default {
  resizeImageWithQuery,
};
