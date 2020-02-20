import { Palette, PaletteOptions, Spacing, SpacingOptions, Typography, TypographyOptions, Shadows, createShadowArgs, Shape, ShapeOptions } from "./theme";
import { Methods, MethodsOptions } from "./methods";
export interface ThemeOptions {
    palette?: PaletteOptions;
    spacing?: SpacingOptions;
    typography?: TypographyOptions;
    shadows?: {
        [key: string]: createShadowArgs;
    };
    shape?: ShapeOptions;
    methods?: MethodsOptions;
}
export interface Theme {
    palette: Palette;
    spacing: Spacing;
    typography: Typography;
    shadows: Shadows;
    shape: Shape;
    methods: Methods;
}
declare const createTheme: (options: ThemeOptions) => Theme;
export default createTheme;
