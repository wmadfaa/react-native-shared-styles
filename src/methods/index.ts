import createBreakpoints, {
  Breakpoints,
  BreakpointsOptions
} from "./breakpoints";
import Percent from "./percent";

export interface MethodsOptions {
  breakpoints?: BreakpointsOptions;
}

export interface Methods {
  breakpoints: Breakpoints;
  percent: Percent;
}

const methods = ({ breakpoints }: MethodsOptions): Methods => {
  return {
    breakpoints: createBreakpoints(breakpoints),
    percent: new Percent()
  };
};

export default methods;
