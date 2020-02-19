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
declare function createBreakpoints(breakpoints: BreakpointsOptions): {
    keys: Breakpoint[];
    up: (<T extends object>(key: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => BreakpointFunctionReturn<T>) | (<T_1 extends object>(key: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => (style: T_1) => T_1);
    down: (<T_2 extends object>(key: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => BreakpointFunctionReturn<T_2>) | (<T_3 extends object>(key: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => (style: T_3) => T_3);
    between: (<T_4 extends object>(start: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl", end: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => BreakpointFunctionReturn<T_4>) | (<T_5 extends object>(start: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl", end: number | "xs" | "sm" | "md" | "lg" | "xl" | "xxl") => ((style: object) => object) | ((style: T_5) => T_5));
    only: (<T_6 extends object>(key: Breakpoint) => BreakpointFunctionReturn<T_6>) | (<T_7 extends object>(key: Breakpoint) => ((style: object) => object) | ((style: T_7) => T_7));
    width: ((key: Breakpoint) => number) | ((key: Breakpoint) => number);
    values: BreakpointValues;
};
export default createBreakpoints;
