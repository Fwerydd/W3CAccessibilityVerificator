#!/usr/bin/node
const path = require("path");
const swaggerAutogen = require("swagger-autogen");

const doc = {}; // update doc
const outputFile = path.join(__dirname, 'src/doc/swagger.json');
const endpointsFiles = [path.join(__dirname, 'src/api/wcag.ts')];
swaggerAutogen(outputFile, endpointsFiles, doc);