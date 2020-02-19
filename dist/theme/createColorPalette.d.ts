import { CommonColors, Color } from "../colors";
import { RecursivePartial } from "../utils";
export interface PaletteBackground {
    default: string;
    surface: string;
    surfaceOverlay: string;
}
export declare type PaletteOutline = string;
export declare type PaletteText = Record<"onSurface" | "onPrimary", {
    highEmphasis: string;
    mediumEmphasis: string;
    disabled: string;
}>;
export declare type PaletteAction = Record<"black" | "white", {
    hover: string;
    focus: string;
    pressed: string;
    dragged: string;
    selected: string;
}>;
export interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
}
export declare type PaletteStatus = Record<"error" | "warning" | "info" | "success", PaletteColor>;
export declare type PaletteType = "light" | "dark";
export interface PaletteInfo {
    type: PaletteType;
    contrastThreshold: number;
    tonalOffset: number;
    getContrastText: (background: string) => string;
    augmentColor: {
        <K extends keyof Partial<Color>, T extends Partial<Color>>(color: Omit<PaletteColor, "main"> | T): PaletteColor;
        <K extends keyof Partial<Color>, T extends Partial<Color>>(color: T, mainShade?: K, lightShade?: keyof Color, darkShade?: keyof Color): PaletteColor;
    };
}
export interface Palette extends PaletteInfo {
    grey: Color;
    common: CommonColors;
    background: PaletteBackground;
    primary: PaletteColor;
    secondary: PaletteColor;
    status: PaletteStatus;
    text: PaletteText;
    action: PaletteAction;
    outline: PaletteOutline;
}
export declare type PaletteColorOptions = Omit<PaletteColor, "main"> | Partial<Color>;
export interface PaletteOptions extends RecursivePartial<Omit<Palette, "primary" | "secondary">> {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
}
declare function createPalette(options: PaletteOptions): Palette;
export default createPalette;
