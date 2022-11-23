import express from 'express'
import { agent } from "supertest";
import IntegrationHelpers from "../../helper/integration-helper"

describe('Given I want to check the WCAG of a website', () => {
    let app: express.Application;
    let apiRoute: string;
    let wcagParam: string;
    let urlParam: string;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        apiRoute = "/api";
        wcagParam = "/wcag";
        urlParam = "/url";
    });

    it('When the WCAG version is 2.0 of existing website', async () => {
        const response = await agent(app).get(`${apiRoute}${wcagParam}/2.0${urlParam}/google.fr`);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeUndefined();
    });

    it('When the WCAG version is 2.0 of an invalid website URL', async () => {
        const response = await agent(app).get(`${apiRoute}${wcagParam}/2.0${urlParam}/123`);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('When the WCAG version is 2.1 of existing website', async () => {
        const response = await agent(app).get(`${apiRoute}${wcagParam}/2.0${urlParam}/google.fr`);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeUndefined();
    });

    it('When the WCAG version is 2.1 of an invalid website URL', async () => {
        const response = await agent(app).get(`${apiRoute}${wcagParam}/2.0${urlParam}/123`);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('When the WCAG version is invalid regarding W3C', async () => {
        const response = await agent(app).get(`${apiRoute}${wcagParam}/0.0${urlParam}/google.fr`);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});