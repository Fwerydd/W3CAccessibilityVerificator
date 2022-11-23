import { Location, Schema } from 'express-validator';

import { WCAGVersion } from '../../services/wcag';
import { isRGBColorValid } from '../../utils/regex';


const wcagWebsiteValidateSchema: Schema = {
    url: {
        errorMessage: "Invalid URL",
        in: "params" as Location,
        isURL: true,
        notEmpty: true,
        trim: true
    },
    wcag_version: {
        in: "params" as Location,
        isIn: {
            options: [Object.values(WCAGVersion)],
            errorMessage: "Invalid WCAG version"
        },
        trim: true
    }
};

const wcagTextValidateSchema: Schema = {
    background_color: {
        in: "query" as Location,
        isString: true,
        custom: {
            options: (value, { req, location, path }) => {
                return isRGBColorValid(value);
            },
        }
    },
    text_bold: {
        in: "query" as Location,
        isBoolean: true,
        toBoolean: true
    },
    text_color: {
        in: "query" as Location,
        isString: true,
        custom: {
            options: (value, { req, location, path }) => {
                return isRGBColorValid(value);
            },
        }
    },
    text_size: {
        in: "query" as Location,
        isInt: true,
        toInt: true
    },
    wcag_version: {
        in: "query" as Location,
        isIn: {
            options: [Object.values(WCAGVersion)],
            errorMessage: "Invalid WCAG version"
        },
        trim: true
    }
};

export { wcagTextValidateSchema, wcagWebsiteValidateSchema };