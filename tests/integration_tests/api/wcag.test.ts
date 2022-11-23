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

describe('Given I want to check the WCAG of a text', () => {
    let app: express.Application;
    let apiRoute: string;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        apiRoute = "/api/wcag/text";
    });

    it('When the WCAG version is 2.0 of a text', async () => {
        const response = await agent(app).get(apiRoute).query(
            {
                wcag_version: "2.0",
                background_color: "ff0000",
                text_color: "ff0000",
                text_size: 12,
                text_bold: false
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeUndefined();
    });

    it('When the WCAG version is 2.1 of a text', async () => {
        const response = await agent(app).get(apiRoute).query(
            {
                wcag_version: "2.1",
                background_color: "ff0000",
                text_color: "ff0000",
                text_size: 12,
                text_bold: false
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBeUndefined();
    });

    it('When the WCAG version is not valid of a text', async () => {
        const response = await agent(app).get(apiRoute).query(
            {
                wcag_version: "0.0",
                background_color: "ff0000",
                text_color: "ff0000",
                text_size: 12,
                text_bold: false
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('When the text size property is not a number', async () => {
        const response = await agent(app).get(apiRoute).query(
            {
                wcag_version: "2.0",
                background_color: "ff0000",
                text_color: "ff0000",
                text_size: "AAA",
                text_bold: false
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('When the text bold property is not a boolean', async () => {
        const response = await agent(app).get(apiRoute).query(
            {
                wcag_version: "2.0",
                background_color: "ff0000",
                text_color: "ff0000",
                text_size: 12,
                text_bold: "AAA"
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});