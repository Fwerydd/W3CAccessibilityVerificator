import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../doc/swagger.json';

export default async (app: express.Application) => {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};