import { Dimensions } from "react-native";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type BreakpointValues = { [key in Breakpoint]: number };

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const keys: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

export type BreakpointFunctionReturn<T extends object> = (styles: T) => T;

export interface Breakpoints {
  keys: Breakpoint[];
  values: BreakpointValues;
  up<T extends object>(key: Breakpoint | number): BreakpointFunctionReturn<T>;
  down<T extends object>(key: Breakpoint | number): BreakpointFunctionReturn<T>;
  between<T extends object>(
    start: Breakpoint | number,
    end: Breakpoint | number
  ): BreakpointFunctionReturn<T>;
  only<T extends object>(key: Breakpoint): BreakpointFunctionReturn<T>;
  width(key: Breakpoint): number;
}

export type BreakpointsOptions = Partial<
  {
    step: number;
  } & Breakpoints
>;

function createBreakpoints(breakpoints: BreakpointsOptions): Breakpoints {
  const {
    values = {
      xs: 0,
      sm: 320,
      md: 480,
      lg: 768,
      xl: 1024,
      xxl: 1224
    },
    step = 5,
    ...other
  } = breakpoints;

  function up<T extends object>(key: Breakpoint | number) {
    const value = typeof key === "number" ? key : values[key];

    return (style: T) => {
      if (SCREEN_WIDTH >= value) return style;
      return {} as T;
    };
  }

  function down<T extends object>(key: Breakpoint | number) {
    let endIndex: number = -1;
    let upper_bound: number;
    if (typeof key === "number") {
      upper_bound = key;
    } else {
      endIndex = keys.indexOf(key) + 1;
      upper_bound = values[keys[endIndex]];
    }

    if (endIndex === keys.length) {
      return up<T>("xs");
    }

    const value =
      typeof upper_bound === "number" && endIndex > 0 ? upper_bound : key;
    return (style: T) => {
      if (SCREEN_WIDTH <= value) return style;
      return {} as T;
    };
  }

  function between<T extends object>(
    start: Breakpoint | number,
    end: Breakpoint | number
  ) {
    let endIndex: number = -1;
    let end_bound: number;

    if (typeof end !== "number") {
      endIndex = keys.indexOf(end);
      end_bound = values[keys[endIndex + 1]];
    } else {
      end_bound = end;
    }

    if (endIndex === keys.length - 1) {
      return up<T>(start);
    }

    const min = typeof start === "number" ? start : values[start];
    const max = end_bound - step / 100;

    return (style: T) => {
      if (SCREEN_WIDTH >= min && SCREEN_WIDTH <= max) return style;
      return {} as T;
    };
  }

  function only<T extends object>(key: Breakpoint) {
    return between<T>(key, key);
  }

  function width(key: Breakpoint) {
    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
    ...other
  };
}

export default createBreakpoints;
