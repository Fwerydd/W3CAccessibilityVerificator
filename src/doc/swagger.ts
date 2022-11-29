#!/usr/bin/node
import path from 'path';
import swaggerAutogen from 'swagger-autogen';
import { WCAGContrastAnswer } from '../services/distinguishable/contrast';

import { WCAGTextContrastAnswer } from '../services/wcag';
import { } from '../services/wcag';

const wcagContrastAnswer: WCAGContrastAnswer = {
    wcagVersion: "2.0",
    value: 21,
    minimum: true,
    enhanced: true,
    isLargeText: false
}

const wcagTextContrastAnswer: WCAGTextContrastAnswer = {
    contrasts: [wcagContrastAnswer],
    textBackgroundColor: "#FFF",
    textColor: "#000",
    textSize: 12,
    textBold: false
}

const wcagTextContrastAnswerList: WCAGTextContrastAnswer[] = [
    wcagTextContrastAnswer
]

const doc = {
    definitions: {
        WCAGContrastAnswer: wcagContrastAnswer,
        WCAGTextContrastAnswer: wcagTextContrastAnswer,
        WCAGTextContrastAnswerList: wcagTextContrastAnswerList
    }
};
const outputFile = './src/doc/swagger.json';
const endpointsFiles = [path.join(__dirname, '../../../src/api/wcag.ts')];
swaggerAutogen(outputFile, endpointsFiles, doc);