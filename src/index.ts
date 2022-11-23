import express from 'express'

import config from './config/index';
import loader from './loaders/index';
import Logger from "./lib/logger";

async function startServer() {
    const app = express();

    // Loaders
    await loader(app);

    // Launch the server
    app.listen(config.port, () => {
        Logger.info(`Server listening on port http://127.0.0.1:${config.port}.`);
    });
}

startServer();