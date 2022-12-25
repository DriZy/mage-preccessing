import sharp from 'sharp';
import {promises as fsPromises} from 'fs';
import * as fs from "fs";
import path from "path";

/**
 * Risize images of format jpg, png and jpeg to a specified array of sizes
 * @param links path to image or an array of images paths
 * @param outputDir path to store resized files in
 * **/
const resizeImage = async (links: string | string[], outputDir: string) => {
    try {
        const sizes: { width: number, height: number }[] = [{width: 150, height: 150}, {
            width: 250,
            height: 250
        }, {width: 300, height: 300}, {width: 600, height: 600}, {width: 1024, height: 1024}]
        //check if output directory exist already
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        //process array of files/images
        if ((typeof links !== 'string') && (links.length > 0)) {
            for (let i = 0; i < links.length; i++) {
                const extension = path.extname(links[i])
                const fileName = path.basename(links[i], extension)
                for (const size of sizes) {
                    const image = await sharp(links[i]).resize(size.width, size.height, {
                        kernel: sharp.kernel.nearest,
                        fit: 'cover',
                        position: 'center',
                        background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                    });
                    await fsPromises.writeFile(`${outputDir}/${fileName}_${size.width}_${size.height}_pixels${extension}`, image);
                    console.log(`${fileName}_${size.width}_${size.height}_pixels${extension} created successfully`);
                }
            }
        } else {
            //process single file/image
            if (typeof links === 'string') {
                const extension = path.extname(links)
                const fileName = path.basename(links, extension)
                for (const size of sizes) {
                    const image = await sharp(links).resize(size.width, size.height, {
                        kernel: sharp.kernel.nearest,
                        fit: 'cover',
                        position: 'center',
                        background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                    });
                    await fsPromises.writeFile(`${outputDir}/${fileName}_${size.width}_${size.height}_pixels${extension}`, image);
                    console.log(`${fileName}_${size.width}_${size.height}_pixels${extension} created successfully`);
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
};

export default {
    resizeImage
}
