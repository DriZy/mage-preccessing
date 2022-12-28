import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import fs from 'fs';

/**
 * Application logger for all system event
 * @param req
 * @param res
 * */

interface LoggerProps {
  req: express.Request;
  res: express.Response;
  next: () => void;
}
const logger = async ({ req, res, next }: LoggerProps): Promise<void> => {
  //check if output directory exist already
  const baseUrl = path.resolve('src');
  const logsDirectory = path.resolve(baseUrl, 'route-logs');
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
  } catch (e: unknown) {
    await file.write(`${date_ob}: ${e} \n`);
  }
  next();
};
export default logger;
