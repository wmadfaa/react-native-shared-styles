import { Breakpoints, BreakpointsOptions } from "./breakpoints";
import Percent from "./percent";
export interface MethodsOptions {
    breakpoints?: BreakpointsOptions;
}
export interface Methods {
    breakpoints: Breakpoints;
    percent: Percent;
}
declare const methods: ({ breakpoints }: MethodsOptions) => Methods;
export default methods;
