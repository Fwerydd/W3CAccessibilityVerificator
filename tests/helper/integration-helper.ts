import express from 'express'
import loader from '../../src/loaders/index';

export default class IntegrationHelpers {
    public static appInstance: express.Application;

    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }

        // Create Express server
        const app = express();
        await loader(app);

        this.appInstance = app;
        return this.appInstance;
    }
}