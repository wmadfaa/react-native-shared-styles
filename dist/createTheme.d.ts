import { Palette, PaletteOptions, Spacing, SpacingOptions, Typography, TypographyOptions } from "./theme";
import { Methods, MethodsOptions } from "./methods";
export interface ThemeOptions {
    palette?: PaletteOptions;
    spacing?: SpacingOptions;
    typography?: TypographyOptions;
    methods?: MethodsOptions;
}
export interface Theme {
    palette: Palette;
    spacing: Spacing;
    typography: Typography;
    methods: Methods;
}
declare const createTheme: (options: ThemeOptions) => Theme;
export default createTheme;
