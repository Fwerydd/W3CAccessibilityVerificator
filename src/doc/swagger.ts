#!/usr/bin/node
import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {};
const outputFile = './src/doc/swagger.json';
const endpointsFiles = [path.join(__dirname, '../../src/api/wcag.ts')];
swaggerAutogen(outputFile, endpointsFiles, doc);