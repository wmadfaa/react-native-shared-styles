export declare type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export declare type BreakpointValues = {
    [key in Breakpoint]: number;
};
export declare const keys: Breakpoint[];
export declare type BreakpointFunctionReturn<T extends object> = (styles: T) => T;
export interface Breakpoints {
    keys: Breakpoint[];
    values: BreakpointValues;
    up<T extends object>(key: Breakpoint | number): BreakpointFunctionReturn<T>;
    down<T extends object>(key: Breakpoint | number): BreakpointFunctionReturn<T>;
    between<T extends object>(start: Breakpoint | number, end: Breakpoint | number): BreakpointFunctionReturn<T>;
    only<T extends object>(key: Breakpoint): BreakpointFunctionReturn<T>;
    width(key: Breakpoint): number;
}
export declare type BreakpointsOptions = Partial<{
    step: number;
} & Breakpoints>;
declare function createBreakpoints(breakpoints: BreakpointsOptions): Breakpoints;
export default createBreakpoints;
