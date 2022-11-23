import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export default async (app: express.Application) => {
    // Routes
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');

    // Config
    app.use(helmet());
    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.disable('x-powered-by');

    // Return the express app
    return app;
}