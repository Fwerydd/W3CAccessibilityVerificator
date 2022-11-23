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
    //#endregion Public

    //#region Private WCAG 2.0
    private static checkWCAG20TextContrast() {
        /*
            https://www.w3.org/TR/WCAG20/#contrast-ratiodef
            contrast ratio = (L1 + 0.05) / (L2 + 0.05), where
            - L1 is the relative luminance of the lighter of the colors, and
            - L2 is the relative luminance of the darker of the colors.
        */
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