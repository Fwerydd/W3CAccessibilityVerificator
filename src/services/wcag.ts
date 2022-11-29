import { WCAGVersion } from './wcag_interface';
import { WCAGDistinguishableContrast, WCAGContrastAnswer } from './distinguishable/contrast';

class WCAGService {
    //#region Public
    public static checkWCAG(version: string) {
        if (version === WCAGVersion.v2_0) {
            return this.checkWCAG20();
        } else if (version === WCAGVersion.v2_1) {
            return this.checkWCAG21();
        }
        return undefined;
    }

    public static checkWCAGTextContrast(
        wcagVersion: string,
        textBackgroundColor: string,
        textColor: string,
        textSize: number,
        textBold: boolean) {
        const distinguishable_contrast = new WCAGDistinguishableContrast();

        const contrasts: (WCAGContrastAnswer | undefined)[] = [];
        if (wcagVersion === WCAGVersion.v2_0) {
            contrasts.push(distinguishable_contrast.computation20({ textBackgroundColor, textColor, textSize, textBold, wcagVersion }));
        } else if (wcagVersion === WCAGVersion.v2_1) {
            contrasts.push(distinguishable_contrast.computation21({ textBackgroundColor, textColor, textSize, textBold, wcagVersion }));
        } else if (wcagVersion === WCAGVersion.ALL) {
            contrasts.push(distinguishable_contrast.computation20({ textBackgroundColor, textColor, textSize, textBold, wcagVersion }));
            contrasts.push(distinguishable_contrast.computation21({ textBackgroundColor, textColor, textSize, textBold, wcagVersion }));
        }

        return {
            contrasts,
            textBackgroundColor,
            textColor,
            textSize,
            textBold
        };
    }
    //#endregion Public

    private static checkWCAG20() {
        return "WCAG 2.0";
    }

    private static checkWCAG21() {
        return "WCAG 2.1";
    }
}

export { WCAGVersion, WCAGService };