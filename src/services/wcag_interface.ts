export abstract class IWCAGComputation {
    abstract computation20(input: any, wcagVersion: WCAGVersion): any;
    abstract computation21(input: any, wcagVersion: WCAGVersion): any;
}

export enum WCAGVersion {
    ALL = "*",
    v2_0 = "2.0",
    v2_1 = "2.1",
}