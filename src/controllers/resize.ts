import sharp from 'sharp';
import {promises as fsPromises} from 'fs';
import * as fs from "fs";
import path from "path";

const resizeImage = async (links: string | string[], outputDir: string, inputDir?: string ) => {
    try {
        const sizes: {width: number, height: number}[] = [{width: 150, height: 150},{width: 250, height: 250},{width: 300, height: 300},{width: 600, height: 600},{width: 1024, height: 1024}]
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        if (!(typeof links === 'string') && links.length > 0) {
            for (let i = 0; i < links.length; i++) {
                const  extension = path.extname(links[i])
                const  fileName = path.basename(links[i], extension)
                for (const size of sizes) {
                 const image = await sharp(links[i]).resize(size);
                 await fsPromises.writeFile(`${outputDir}/${fileName}_${size.width}_${size.height}_pixels.${extension}`, image);
                 console.log(`${fileName}_${size.width}_${size.height}_pixels.${extension} created successfully`);
             }
            }
        }
        else {
            if (typeof links === 'string'){
                const  extension = path.extname(links)
                const  fileName = path.basename(links, extension)
                for (const size of sizes) {
                    const image = await sharp(links).resize(size);
                    await fsPromises.writeFile(`${outputDir}/${fileName}_${size.width}_${size.height}_pixels.${extension}`, image);
                    console.log(`${fileName}_${size.width}_${size.height}_pixels.${extension} created successfully`);
                }
            }
        }
    }catch (error){
        console.log(error)
    }
};

export default {
    resizeImage
}
