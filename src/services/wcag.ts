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

    //#region Private
    private static checkWCAG20() {
        return "WCAG 2.0";
    }

    private static checkWCAG21() {
        return "WCAG 2.1";
    }
    //#endregion Private
}

export { WCAGVersion, WCAGService };