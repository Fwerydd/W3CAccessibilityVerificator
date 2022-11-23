import express from 'express';

import wcag from './wcag';

export default async (app: express.Application) => {
    await wcag(app);
}