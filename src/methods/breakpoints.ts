import { Dimensions } from "react-native";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type BreakpointValues = { [key in Breakpoint]: number };

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const keys: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

export class Breakpoints {
  private step: number;
  private values: BreakpointValues;

  constructor(step: number, values: BreakpointValues) {
    this.step = step;
    this.values = values;
  }

  public up(key: Breakpoint | number) {
    const value = typeof key === "number" ? key : this.values[key];
    return SCREEN_WIDTH >= value;
  }

  public down(key: Breakpoint | number) {
    let endIndex: number = -1;
    let upper_bound: number;
    if (typeof key === "number") {
      upper_bound = key;
    } else {
      endIndex = keys.indexOf(key) + 1;
      upper_bound = this.values[keys[endIndex]];
    }

    if (endIndex === keys.length) {
      return this.up("xs");
    }

    const value =
      typeof upper_bound === "number" && endIndex > 0 ? upper_bound : key;
    return SCREEN_WIDTH <= value;
  }

  public between = (start: Breakpoint | number, end: Breakpoint | number) => {
    let endIndex: number = -1;
    let end_bound: number;

    if (typeof end !== "number") {
      endIndex = keys.indexOf(end);
      end_bound = this.values[keys[endIndex + 1]];
    } else {
      end_bound = end;
    }

    if (endIndex === keys.length - 1) {
      return this.up(start);
    }

    const min = typeof start === "number" ? start : this.values[start];
    const max = end_bound - this.step / 100;

    return SCREEN_WIDTH >= min && SCREEN_WIDTH <= max;
  };

  public only = (key: Breakpoint) => {
    return this.between(key, key);
  };

  public width = (key: Breakpoint) => {
    return this.values[key];
  };
}

export interface BreakpointsOptions {
  step: number;
  values: BreakpointValues;
}

function createBreakpoint(
  options: BreakpointsOptions = {
    step: 5,
    values: {
      xs: 0,
      sm: 320,
      md: 480,
      lg: 768,
      xl: 1024,
      xxl: 1224
    }
  }
) {
  return new Breakpoints(options.step, options.values);
}

export default createBreakpoint;
