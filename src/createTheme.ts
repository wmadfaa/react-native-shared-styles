import deepmerge from "deepmerge";

export interface ThemeOptions {}
export interface Theme {}

const createTheme = (options: ThemeOptions): Theme => {
  const { ...others } = options;

  return deepmerge({}, others);
};

export default createTheme;
