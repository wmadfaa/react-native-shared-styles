import deepmerge from "deepmerge";
import {
  createPalette,
  Palette,
  PaletteOptions,
  createSpacing,
  Spacing,
  SpacingOptions,
  createTypography,
  Typography,
  TypographyOptions,
  createShadow,
  shadows as defaultShadows,
  Shadows,
  createShadowArgs,
  shape,
  Shape,
  ShapeOptions
} from "./theme";
import methods, { Methods, MethodsOptions } from "./methods";

export interface ThemeOptions {
  palette?: PaletteOptions;
  spacing?: SpacingOptions;
  typography?: TypographyOptions;
  shadows?: { [key: string]: createShadowArgs };
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

const createTheme = (options: ThemeOptions): Theme => {
  const {
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {},
    methods: methodsInput = {},
    shadows: shadowsInput = {},
    ...others
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = createSpacing(spacingInput);
  const typography = createTypography(typographyInput);

  const shadows = Object.keys(shadowsInput).reduce((acc, shadowKey) => {
    const { depth, blur, color } = shadowsInput[shadowKey];
    return { ...acc, [shadowKey]: createShadow(depth, blur, color) };
  }, defaultShadows);

  return deepmerge(
    {
      palette,
      spacing,
      typography,
      shadows,
      shape,
      methods: methods(methodsInput)
    },
    others
  );
};

export default createTheme;
