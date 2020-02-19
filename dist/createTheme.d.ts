import { Breakpoints, BreakpointsOptions, Palette, PaletteOptions, Spacing, SpacingOptions, Typography, TypographyOptions } from "./theme";
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
declare const createTheme: (options: ThemeOptions) => Theme;
export default createTheme;
