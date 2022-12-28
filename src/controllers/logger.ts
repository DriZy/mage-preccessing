import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import fs from 'fs';

/**
 * Application logger for all system event
 * @param req Request made to server
 * @param res Server response
 * */

const logger = async (req:express.Request, res:express.Response, next: Function): Promise<void> => {
  //check if output directory exist already
  const logsDirectory = path.resolve('route-logs');
  if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
  }
  const date_ob = new Date();
  const day = ('0' + date_ob.getDate()).slice(-2);
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();

  const date = year + '-' + month + '-' + day;
  const file = await fsPromises.open(`${logsDirectory}/${date}.log`, 'a+');
  try {
    await file.write(`${date_ob}: ${req.url} \n`);
    await file.close()
  } catch (e: unknown) {
    await file.write(`${date_ob}: ${e} \n`);
    await file.close()
  }
  next();
};
export default logger;
