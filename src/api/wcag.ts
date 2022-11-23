import { checkSchema, validationResult } from 'express-validator';
import express from 'express';

import { wcagTextValidateSchema, wcagWebsiteValidateSchema } from './validators/wcag-validator';
import { WCAGService } from '../services/wcag'

export default async (app: express.Application) => {
    app.get(
        '/api/wcag/:wcag_version/url/:url',
        checkSchema(wcagWebsiteValidateSchema),
        (req: express.Request, res: express.Response) => {
            try {
                validationResult(req).throw();
                res.status(200).send({ output: WCAGService.checkWCAG(req.params.wcag_version) });
            } catch (err) {
                res.status(400).json({ error: err });
            }
        });

    app.get(
        '/api/wcag/text',
        checkSchema(wcagTextValidateSchema),
        (req: express.Request, res: express.Response) => {
            try {
                validationResult(req).throw();
                res.status(200).send();
            } catch (err) {
                res.status(400).json({ error: err });
            }
        });
}