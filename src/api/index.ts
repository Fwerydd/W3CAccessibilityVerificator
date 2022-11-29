import express from 'express';

import doc from './doc';
import wcag from './wcag';

export default async (app: express.Application) => {
    await doc(app);
    await wcag(app);
}