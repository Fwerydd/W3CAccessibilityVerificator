import { get as colorStringGet } from 'color-string';
import { WCAGContrastInput } from '../../models/wcag/contrast_input';

import { IWCAGComputation, WCAGVersion } from '../wcag_interface';

export interface WCAGContrastAnswer {
    wcagVersion: string,
    value: number,
    minimum: boolean,
    enhanced: boolean,
    isLargeText: boolean
}

export class WCAGDistinguishableContrast extends IWCAGComputation {
    public computation20(input: any, wcagVersion: WCAGVersion): any {
        return this.computation(input, wcagVersion);
    }

    public computation21(input: any, wcagVersion: WCAGVersion): any {
        return this.computation(input, wcagVersion);
    }

    public computation(input: any, wcagVersion: WCAGVersion): WCAGContrastAnswer | undefined {
        const inputFormatted = input as WCAGContrastInput;

        const isLargeText = (inputFormatted.textSize >= 18) || (inputFormatted.textSize === 14 && inputFormatted.textBold);

        const textBackgroundColorRgb = colorStringGet(inputFormatted.textBackgroundColor);
        const textColorRgb = colorStringGet(inputFormatted.textColor);

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

    //#region Utils
    private normalizeColorForTheRelativeLuminanceComputation(color: number): number {
        // https://www.w3.org/TR/WCAG20/#relativeluminancedef
        return color <= 0.03928 ? color / 12.92 : Math.pow(((color + 0.055) / 1.055), 2.4);
    }

    private getRelativeLuminance(red: number, green: number, blue: number): number {
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
}