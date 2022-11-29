import { WCAGVersion } from './wcag_interface';
import { WCAGDistinguishableContrast, WCAGContrastAnswer } from './distinguishable/contrast';

interface WCAGTextContrastAnswer {
    contrasts: WCAGContrastAnswer[],
    textBackgroundColor: string,
    textColor: string,
    textSize: number,
    textBold: boolean
}

class WCAGService {
    //#region Public
    public static checkWCAGTextContrast(
        wcagVersion: string,
        textBackgroundColor: string,
        textColor: string,
        textSize: number,
        textBold: boolean) {
        const distinguishableContrast = new WCAGDistinguishableContrast();

        const contrasts: (WCAGContrastAnswer | undefined)[] = [];
        if (wcagVersion === WCAGVersion.v2_0) {
            contrasts.push(distinguishableContrast.computation20({ textBackgroundColor, textColor, textSize, textBold }, wcagVersion));
        } else if (wcagVersion === WCAGVersion.v2_1) {
            contrasts.push(distinguishableContrast.computation21({ textBackgroundColor, textColor, textSize, textBold }, wcagVersion));
        } else if (wcagVersion === WCAGVersion.ALL) {
            contrasts.push(distinguishableContrast.computation20({ textBackgroundColor, textColor, textSize, textBold }, wcagVersion));
            contrasts.push(distinguishableContrast.computation21({ textBackgroundColor, textColor, textSize, textBold }, wcagVersion));
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
}

export { WCAGService, WCAGTextContrastAnswer };