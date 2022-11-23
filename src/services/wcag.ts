enum WCAGVersion {
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
        if (wcagVersion === WCAGVersion.v2_0) {
            return this.checkWCAG20TextContrast(textBackgroundColor, textColor, textSize, textBold);
        }
        return undefined;
    }
    //#endregion Public

    //#region Private WCAG 2.0
    private static checkWCAG20TextContrast(
        textBackgroundColor: string,
        textColor: string,
        textSize: number,
        textBold: boolean
    ) {
        /*
            https://www.w3.org/TR/WCAG20/#contrast-ratiodef
            contrast ratio = (L1 + 0.05) / (L2 + 0.05), where
            - L1 is the relative luminance of the lighter of the colors, and
            - L2 is the relative luminance of the darker of the colors.
        */
        return "coucou";
    }


    private static checkWCAG20() {
        return "WCAG 2.0";
    }
    //#endregion Private WCAG 2.0

    //#region Private WCAG 2.1

    private static checkWCAG21() {
        return "WCAG 2.1";
    }
    //#endregion Private WCAG 2.1
}

export { WCAGVersion, WCAGService };