import { TextStyle } from "react-native";
import deepmerge from "deepmerge";

export type ThemeStyle =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

export interface TypographyStyle extends Partial<Omit<TextStyle, "fontSize">> {
  fontSize: number;
}

export interface Variants extends Record<ThemeStyle, TypographyStyle> {}

export interface Typography extends Variants {
  rem: number;
}

export interface TypographyOptions extends Partial<Typography> {
  allVariants?: TextStyle;
}

const createTypography = (options: TypographyOptions): Typography => {
  const { rem = 16, allVariants = {} } = options;

  const buildVariant = (
    size: number,
    lineHeight: number,
    fontWeight: TextStyle["fontWeight"],
    fontStyle: TextStyle["fontStyle"],
    casing?: TextStyle["textTransform"],
    fontFamily: TextStyle["fontFamily"] = undefined
  ): TypographyStyle => {
    return {
      fontFamily,
      fontStyle,
      fontWeight,
      fontSize: rem * size,
      lineHeight: fontFamily ? lineHeight * rem : undefined,
      textTransform: casing,
      ...allVariants
    };
  };

  const variants: Variants = {
    h1: buildVariant(6, 8.16875, "300", "normal"),
    h2: buildVariant(3.75, 5.10625, "300", "normal"),
    h3: buildVariant(3, 4.0875, "400", "normal"),
    h4: buildVariant(2.125, 2.89375, "400", "normal"),
    h5: buildVariant(1.5, 2.04375, "400", "normal"),
    h6: buildVariant(1.25, 1.7, "600", "normal"),
    subtitle1: buildVariant(1, 1.3625, "400", "normal"),
    subtitle2: buildVariant(0.875, 1.19375, "600", "normal"),
    body1: buildVariant(1, 1.3625, "400", "normal"),
    body2: buildVariant(0.875, 1.19375, "400", "normal"),
    button: buildVariant(0.875, 1.19375, "600", "normal", "uppercase"),
    caption: buildVariant(0.75, 1.01875, "400", "normal"),
    overline: buildVariant(0.625, 0.85, "600", "normal", "uppercase")
  };

  return deepmerge({ rem }, variants);
};

export default createTypography;
