# image-precessing
An API for image processing with nodeJs and typescript support. It takes images with formats ``jpg, jpeg and png`` produces various predefined sizes of the image with same extension  

## Setup
- Clone/download project files from GitHub repository
- Move `cd` into project root and run `npm install` to install project dependencies 
- Run `npm run start` to start project in dev mode with `nodemon` watching changes
- Run `npm run test` to run test scripts 
- Run `npm run prettier` and `npm run lint` to format your code syntax and perform linting respectively
- Run `npm run build` to build project
- Access image resizing feature through `http://localhost:3000/api/resize`

## Feature
- Image resizing
- Api endpoint calls logs
- Modifying resized image name to contain size 

## Future work
- Build a frontend to upload and view images 
- Add image compression
- More test cases

## Note
- The route ``/api/resize?filename=${filename}&width=${width}&height=${height}`` resizes image to specified width and height. Filename here is the name of an image. Output directory is `/src/assets/processed`