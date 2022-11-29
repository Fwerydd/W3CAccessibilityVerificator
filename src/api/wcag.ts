import { checkSchema, validationResult } from 'express-validator';
import express from 'express';

import { wcagTextValidateSchema, wcagWebsiteValidateSchema } from './validators/wcag-validator';
import { WCAGService } from '../services/wcag'
import { WebsiteScrapping } from '../services/website_scrapping'

export default async (app: express.Application) => {
    app.get(
        '/api/wcag/url',
        checkSchema(wcagWebsiteValidateSchema),
        async (req: express.Request, res: express.Response) => {
            /*
                #swagger.summary = 'Check WCAG directives to a website URL and return a report'
                #swagger.description = 'Based on the WCAG 2 Overview (https://www.w3.org/WAI/standards-guidelines/wcag/)'
                #swagger.parameters['wcag_version'] = {
                    in: "query",
                    description: "Indicates the WCAG version to test",
                    required: true,
                    type: "string",
                    enum: ["*", "2.0", "2.1"]
                }
                #swagger.parameters['website_url'] = {
                    in: "query",
                    description: "Indicates the website URL to test",
                    required: true,
                    type: "string"
                }
                #swagger.parameters['webdriver_url'] = {
                    in: "query",
                    description: "Webdriver URL",
                    required: true,
                    type: "string"
                }
                #swagger.responses[200] = {
                    description: 'WCAG distinguishable contrasts results',
                    schema: { $ref: '#/definitions/WCAGTextContrastAnswerList' }
                }
            */
            try {
                validationResult(req).throw();
                const textElements = await WebsiteScrapping.scrapTexts(req.query.website_url as string, req.query.webdriver_url as string);
                const results = [];
                for (const textElement of textElements) {
                    results.push(WCAGService.checkWCAGTextContrast(
                        req.query.wcag_version as string,
                        textElement.textBackgroundColor,
                        textElement.textColor,
                        textElement.textSize,
                        textElement.textBold
                    ))
                }
                res.status(200).send({ output: results });
            } catch (err) {
                res.status(400).json({ error: err });
            }
        });

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
                #swagger.responses[200] = {
                    description: 'WCAG distinguishable contrasts results',
                    schema: { $ref: '#/definitions/WCAGTextContrastAnswer' }
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