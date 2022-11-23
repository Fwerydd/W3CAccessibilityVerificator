import apiLoader from "../api";
import expressLoader from './express';
import morganLoader from './morgan';
import Logger from "../lib/logger";

export default async (expressApp: any) => {
    await expressLoader(expressApp);

    // Add Morgan middleware to log Express request information
    expressApp.use(morganLoader);

    // Add API routes
    await apiLoader(expressApp);

    Logger.info('Express Intialized');
}