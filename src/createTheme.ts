import deepmerge from "deepmerge";
import {
  createBreakpoints,
  Breakpoints,
  BreakpointsOptions,
  createPalette,
  Palette,
  PaletteOptions,
  createSpacing,
  Spacing,
  SpacingOptions,
  createTypography,
  Typography,
  TypographyOptions,
  shadows,
  shape
} from "./theme";

export interface ThemeOptions {
  breakpoints?: BreakpointsOptions;
  palette?: PaletteOptions;
  spacing?: SpacingOptions;
  typography?: TypographyOptions;
}
export interface Theme {
  breakpoints: Breakpoints;
  palette: Palette;
  spacing: Spacing;
  typography: Typography;
}

const createTheme = (options: ThemeOptions): Theme => {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {},
    ...others
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput);
  const palette = createPalette(paletteInput);
  const spacing = createSpacing(spacingInput);
  const typography = createTypography(typographyInput);

  return deepmerge(
    { breakpoints, palette, spacing, typography, shadows, shape },
    others
  );
};

export default createTheme;
