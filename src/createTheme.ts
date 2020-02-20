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
  shadows,
  shape
} from "./theme";
import methods, { Methods, MethodsOptions } from "./methods";

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

const createTheme = (options: ThemeOptions): Theme => {
  const {
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {},
    methods: methodsInput = {},
    ...others
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = createSpacing(spacingInput);
  const typography = createTypography(typographyInput);

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
