import { textIsColorValid } from '../../src/utils/regex';

describe('When I want to test my RGB value', () => {
    describe('And my RGB value is in the HEX format', () => {
        it('And my RGB value is in the full HEX format with # character', async () => {
            expect(textIsColorValid("#ff0000")).toBeTruthy();
        });

        it('And my RGB value is in the full HEX format without # character', async () => {
            expect(textIsColorValid("FF0000")).toBeTruthy();
        });

        it('And my RGB value is in the less HEX format with # character', async () => {
            expect(textIsColorValid("#f00")).toBeTruthy();
        });

        it('And my RGB value is in the less HEX format without # character', async () => {
            expect(textIsColorValid("f00")).toBeTruthy();
        });

        it('And my RGB value is with invalid character', async () => {
            expect(textIsColorValid("ABZ")).toBeFalsy();
        });
    });

    describe('And my RGB value is in the RGB format', () => {
        it('And my RGB value is in the RGB format', async () => {
            expect(textIsColorValid("rgb(245,40,145)")).toBeTruthy();
        });

        it('And my RGB value is with invalid vbalue', async () => {
            expect(textIsColorValid("rgb(300,40,145)")).toBeFalsy();
        });
    });

    describe('And my RGBA value is in the RGBA format', () => {
        it('And my RGBA value is in the RGBA format', async () => {
            expect(textIsColorValid("rgba(245,40,145,0.8)")).toBeTruthy();
        });

        it('And my RGB value is with invalid vbalue', async () => {
            expect(textIsColorValid("rgba(300,40,145,2)")).toBeFalsy();
        });
    });

    describe('And my HSL value is in the HSL format', () => {
        it('And my HSL value is in the HSL format', async () => {
            expect(textIsColorValid("hsl(0,100%,50%)")).toBeTruthy();
        });

        it('And my HSL value is with invalid vbalue', async () => {
            expect(textIsColorValid("hsl(0,100%,200%)")).toBeFalsy();
        });
    });

    describe('And my HSLA value is in the HSLA format', () => {
        it('And my HSLA value is in the HSLA format', async () => {
            expect(textIsColorValid("hsla(0,100%,50%,0.8)")).toBeTruthy();
        });

        it('And my HSLA value is with invalid vbalue', async () => {
            expect(textIsColorValid("hsla(0,100%,200%,2)")).toBeFalsy();
        });
    });
});