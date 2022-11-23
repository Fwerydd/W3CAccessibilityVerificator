import { Location, Schema } from 'express-validator';

import { WCAGVersion } from '../../services/wcag'

export const wcagValidateSchema: Schema = {
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