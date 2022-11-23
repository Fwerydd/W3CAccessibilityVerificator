import { get as colorStringGet } from 'color-string';

enum WCAGVersion {
    ALL = "*",
    v2_0 = "2.0",
    v2_1 = "2.1",
}

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
        const contrasts = [];

        if (wcagVersion === WCAGVersion.v2_0) {
            contrasts.push(this.checkWCAG20TextContrast(textBackgroundColor, textColor, textSize, textBold));
        } else if (wcagVersion === WCAGVersion.v2_1) {
            contrasts.push(this.checkWCAG21TextContrast(textBackgroundColor, textColor, textSize, textBold));
        } else if (wcagVersion === WCAGVersion.ALL) {
            contrasts.push(this.checkWCAG20TextContrast(textBackgroundColor, textColor, textSize, textBold));
            contrasts.push(this.checkWCAG21TextContrast(textBackgroundColor, textColor, textSize, textBold));
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

    //#region Utils
    private static normalizeColorForTheRelativeLuminanceComputation(color: number): number {
        // https://www.w3.org/TR/WCAG20/#relativeluminancedef
        return color <= 0.03928 ? color / 12.92 : Math.pow(((color + 0.055) / 1.055), 2.4);
    }

    private static getRelativeLuminance(red: number, green: number, blue: number): number {
        // https://www.w3.org/TR/WCAG20/#relativeluminancedef
        const RsRGB = red / 255;
        const GsRGB = green / 255;
        const BsRGB = blue / 255;

        const R = this.normalizeColorForTheRelativeLuminanceComputation(RsRGB);
        const G = this.normalizeColorForTheRelativeLuminanceComputation(GsRGB);
        const B = this.normalizeColorForTheRelativeLuminanceComputation(BsRGB);

        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }
    //#endregion Utils

    //#region Private WCAG 2.0
    private static checkWCAG20TextContrast(
        textBackgroundColor: string,
        textColor: string,
        textSize: number,
        textBold: boolean,
        wcagVersion: string = WCAGVersion.v2_0
    ) {
        const isLargeText = (textSize >= 18) || (textSize === 14 && textBold);

        const textBackgroundColorRgb = colorStringGet(textBackgroundColor);
        const textColorRgb = colorStringGet(textColor);

        if (textBackgroundColorRgb && textColorRgb) {
            const bkgLuminance = this.getRelativeLuminance(textBackgroundColorRgb.value[0], textBackgroundColorRgb.value[1], textBackgroundColorRgb.value[2]);
            const textLuminance = this.getRelativeLuminance(textColorRgb.value[0], textColorRgb.value[1], textColorRgb.value[2]);
            const L1 = bkgLuminance > textLuminance ? bkgLuminance : textLuminance;
            const L2 = bkgLuminance > textLuminance ? textLuminance : bkgLuminance;
            const contrastRatio = (L1 + 0.05) / (L2 + 0.05); // https://www.w3.org/TR/WCAG20/#contrast-ratiodef
            return {
                wcagVersion,
                value: contrastRatio,
                minimum: isLargeText ? contrastRatio > 3 : contrastRatio > 4.5,
                enhanced: isLargeText ? contrastRatio > 4.5 : contrastRatio > 7,
                isLargeText
            };
        }
        return undefined;
    }


    private static checkWCAG20() {
        return "WCAG 2.0";
    }
    //#endregion Private WCAG 2.0

    //#region Private WCAG 2.1
    private static checkWCAG21TextContrast(
        textBackgroundColor: string,
        textColor: string,
        textSize: number,
        textBold: boolean
    ) {
        return this.checkWCAG20TextContrast(
            textBackgroundColor,
            textColor,
            textSize,
            textBold,
            WCAGVersion.v2_1
        );
    }

    private static checkWCAG21() {
        return "WCAG 2.1";
    }
    //#endregion Private WCAG 2.1
}

export { WCAGVersion, WCAGService };