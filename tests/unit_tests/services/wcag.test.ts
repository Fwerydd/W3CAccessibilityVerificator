import { WCAGService } from '../../../src/services/wcag';

describe('Given I want to compute the WCAG for a text', () => {
    describe('When my text if for the WCAG 2.0', () => {
        it('When my small text is for the WCAG 2.0 - Dark/White', () => {
            const wcagVersion = "2.0";
            const textBackgroundColor = "#FFF";
            const textColor = "#000";
            const textSize = 12;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(21);
            expect(result.contrasts[0]?.minimum).toEqual(true);
            expect(result.contrasts[0]?.enhanced).toEqual(true);
            expect(result.contrasts[0]?.isLargeText).toEqual(false);
        });

        it('When my small text is for the WCAG 2.0 - White/White', () => {
            const wcagVersion = "2.0";
            const textBackgroundColor = "#000";
            const textColor = "#000";
            const textSize = 12;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(1);
            expect(result.contrasts[0]?.minimum).toEqual(false);
            expect(result.contrasts[0]?.enhanced).toEqual(false);
            expect(result.contrasts[0]?.isLargeText).toEqual(false);
        });

        it('When my large text is for the WCAG 2.0 - Dark/White', () => {
            const wcagVersion = "2.0";
            const textBackgroundColor = "#FFF";
            const textColor = "#000";
            const textSize = 18;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(21);
            expect(result.contrasts[0]?.minimum).toEqual(true);
            expect(result.contrasts[0]?.enhanced).toEqual(true);
            expect(result.contrasts[0]?.isLargeText).toEqual(true);
        });

        it('When my large text is for the WCAG 2.0 - White/White', () => {
            const wcagVersion = "2.0";
            const textBackgroundColor = "#000";
            const textColor = "#000";
            const textSize = 18;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(1);
            expect(result.contrasts[0]?.minimum).toEqual(false);
            expect(result.contrasts[0]?.enhanced).toEqual(false);
            expect(result.contrasts[0]?.isLargeText).toEqual(true);
        });
    });

    describe('When my text if for the WCAG 2.1', () => {
        it('When my small text is for the WCAG 2.1 - Dark/White', () => {
            const wcagVersion = "2.1";
            const textBackgroundColor = "#FFF";
            const textColor = "#000";
            const textSize = 12;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(21);
            expect(result.contrasts[0]?.minimum).toEqual(true);
            expect(result.contrasts[0]?.enhanced).toEqual(true);
            expect(result.contrasts[0]?.isLargeText).toEqual(false);
        });

        it('When my small text is for the WCAG 2.1 - White/White', () => {
            const wcagVersion = "2.1";
            const textBackgroundColor = "#000";
            const textColor = "#000";
            const textSize = 12;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(1);
            expect(result.contrasts[0]?.minimum).toEqual(false);
            expect(result.contrasts[0]?.enhanced).toEqual(false);
            expect(result.contrasts[0]?.isLargeText).toEqual(false);
        });

        it('When my large text is for the WCAG 2.1 - Dark/White', () => {
            const wcagVersion = "2.1";
            const textBackgroundColor = "#FFF";
            const textColor = "#000";
            const textSize = 18;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(21);
            expect(result.contrasts[0]?.minimum).toEqual(true);
            expect(result.contrasts[0]?.enhanced).toEqual(true);
            expect(result.contrasts[0]?.isLargeText).toEqual(true);
        });

        it('When my large text is for the WCAG 2.1 - White/White', () => {
            const wcagVersion = "2.1";
            const textBackgroundColor = "#000";
            const textColor = "#000";
            const textSize = 18;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(1);
            expect(result.contrasts[0]?.value).toEqual(1);
            expect(result.contrasts[0]?.minimum).toEqual(false);
            expect(result.contrasts[0]?.enhanced).toEqual(false);
            expect(result.contrasts[0]?.isLargeText).toEqual(true);
        });
    });

    describe('When my text if for the all WCAG versions', () => {
        it('When my small text is for all WCAG versions - Dark/White', () => {
            const wcagVersion = "*";
            const textBackgroundColor = "#FFF";
            const textColor = "#000";
            const textSize = 12;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(2);
            expect(result.contrasts[0]?.value).toEqual(21);
            expect(result.contrasts[0]?.minimum).toEqual(true);
            expect(result.contrasts[0]?.enhanced).toEqual(true);
            expect(result.contrasts[0]?.isLargeText).toEqual(false);
            expect(result.contrasts[1]?.value).toEqual(21);
            expect(result.contrasts[1]?.minimum).toEqual(true);
            expect(result.contrasts[1]?.enhanced).toEqual(true);
            expect(result.contrasts[1]?.isLargeText).toEqual(false);
        });

        it('When my small text is for all WCAG versions - White/White', () => {
            const wcagVersion = "*";
            const textBackgroundColor = "#000";
            const textColor = "#000";
            const textSize = 12;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(2);
            expect(result.contrasts[0]?.value).toEqual(1);
            expect(result.contrasts[0]?.minimum).toEqual(false);
            expect(result.contrasts[0]?.enhanced).toEqual(false);
            expect(result.contrasts[0]?.isLargeText).toEqual(false);
            expect(result.contrasts[1]?.value).toEqual(1);
            expect(result.contrasts[1]?.minimum).toEqual(false);
            expect(result.contrasts[1]?.enhanced).toEqual(false);
            expect(result.contrasts[1]?.isLargeText).toEqual(false);
        });

        it('When my large text is for all WCAG versions - Dark/White', () => {
            const wcagVersion = "*";
            const textBackgroundColor = "#FFF";
            const textColor = "#000";
            const textSize = 18;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(2);
            expect(result.contrasts[0]?.value).toEqual(21);
            expect(result.contrasts[0]?.minimum).toEqual(true);
            expect(result.contrasts[0]?.enhanced).toEqual(true);
            expect(result.contrasts[0]?.isLargeText).toEqual(true);
            expect(result.contrasts[1]?.value).toEqual(21);
            expect(result.contrasts[1]?.minimum).toEqual(true);
            expect(result.contrasts[1]?.enhanced).toEqual(true);
            expect(result.contrasts[1]?.isLargeText).toEqual(true);
        });

        it('When my large text is for all WCAG versions - White/White', () => {
            const wcagVersion = "*";
            const textBackgroundColor = "#000";
            const textColor = "#000";
            const textSize = 18;
            const textBold = false;

            const result = WCAGService.checkWCAGTextContrast(
                wcagVersion,
                textBackgroundColor,
                textColor,
                textSize,
                textBold
            );
            expect(result).toBeDefined();
            expect(result.contrasts.length).toEqual(2);
            expect(result.contrasts[0]?.value).toEqual(1);
            expect(result.contrasts[0]?.minimum).toEqual(false);
            expect(result.contrasts[0]?.enhanced).toEqual(false);
            expect(result.contrasts[0]?.isLargeText).toEqual(true);
            expect(result.contrasts[1]?.value).toEqual(1);
            expect(result.contrasts[1]?.minimum).toEqual(false);
            expect(result.contrasts[1]?.enhanced).toEqual(false);
            expect(result.contrasts[1]?.isLargeText).toEqual(true);
        });
    });
});