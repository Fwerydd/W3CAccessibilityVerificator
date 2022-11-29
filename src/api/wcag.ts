import { checkSchema, validationResult } from 'express-validator';
import express from 'express';

import { wcagTextValidateSchema } from './validators/wcag-validator';
import { WCAGService } from '../services/wcag'

export default async (app: express.Application) => {
    app.get(
        '/api/wcag/text',
        checkSchema(wcagTextValidateSchema),
        (req: express.Request, res: express.Response) => {
            /*
                #swagger.summary = 'Check text contrast based on the WCAG norm'
                #swagger.description = 'Based on the Contrast subsection the Distinguishable section of the WCAG 2 Overview (https://www.w3.org/WAI/standards-guidelines/wcag/)'
                #swagger.parameters['background_color'] = {
                    in: "query",
                    description: "Background color (HEX, RGB, RGBA, HSL & HSLA)",
                    required: true,
                    type: "string",
                    pattern: "/^(#?([(a-f|A-F)\d]{3,4}|[(a-f|A-F)\d]{6}|[(a-f|A-F)\d]{8})|rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%,(0?\.\d|1(\.0)?)\))$/"
                }
                #swagger.parameters['text_bold'] = {
                    in: "query",
                    description: "Indicates if the text is in bold",
                    required: true,
                    type: "boolean",
                }
                #swagger.parameters['text_color'] = {
                    in: "query",
                    description: "Text color (HEX, RGB, RGBA, HSL & HSLA)",
                    required: true,
                    type: "string",
                    pattern: "/^(#?([(a-f|A-F)\d]{3,4}|[(a-f|A-F)\d]{6}|[(a-f|A-F)\d]{8})|rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%,(0?\.\d|1(\.0)?)\))$/"
                }
                #swagger.parameters['text_size'] = {
                    in: "query",
                    description: "Indicates the text size in points",
                    required: true,
                    type: "number",
                }
                #swagger.parameters['wcag_version'] = {
                    in: "query",
                    description: "Indicates the WCAG version to test",
                    required: true,
                    type: "string",
                    enum: ["*", "2.0", "2.1"]
                }
            */
            try {
                validationResult(req).throw();
                res.status(200).send(
                    {
                        output: WCAGService.checkWCAGTextContrast(
                            req.query.wcag_version as string,
                            req.query.background_color as string,
                            req.query.text_color as string,
                            +(req.query.text_size as string),
                            (req.query.text_bold as string) === 'true',
                        )
                    });
            } catch (err) {
                res.status(400).json({ error: err });
            }
        });
}