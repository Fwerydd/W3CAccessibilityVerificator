#!/usr/bin/node
import path from 'path';
import swaggerAutogen from 'swagger-autogen';

import { WCAGContrastAnswer } from '../services/distinguishable/contrast';

const wcagContrastAnswerExample: WCAGContrastAnswer = {
    wcagVersion: "2.0",
    value: 21,
    minimum: true,
    enhanced: false,
    isLargeText: false
}

const doc = {
    definitions: {
        WCAGContrastAnswer: wcagContrastAnswerExample
    }
};
const outputFile = './src/doc/swagger.json';
const endpointsFiles = [path.join(__dirname, '../../../src/api/wcag.ts')];
swaggerAutogen(outputFile, endpointsFiles, doc);