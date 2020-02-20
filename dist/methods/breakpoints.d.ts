export declare type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export declare type BreakpointValues = {
    [key in Breakpoint]: number;
};
export declare const keys: Breakpoint[];
export declare class Breakpoints {
    private step;
    private values;
    constructor(step: number, values: BreakpointValues);
    up(key: Breakpoint | number): boolean;
    down(key: Breakpoint | number): boolean;
    between: (start: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl", end: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => boolean;
    only: (key: Breakpoint) => boolean;
    width: (key: Breakpoint) => number;
}
export interface BreakpointsOptions {
    step: number;
    values: BreakpointValues;
}
declare function createBreakpoint(options?: BreakpointsOptions): Breakpoints;
export default createBreakpoint;
