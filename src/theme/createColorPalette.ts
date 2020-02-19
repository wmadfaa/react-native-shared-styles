import ColorManipulator from "color";
import {
  CommonColors,
  common,
  grey,
  Color,
  red,
  orange,
  blue,
  green,
  indigo,
  pink
} from "../colors";
import { RecursivePartial } from "../utils";
import deepmerge from "deepmerge";

export interface PaletteBackground {
  default: string;
  surface: string;
  surfaceOverlay: string;
}

export type PaletteOutline = string;

export type PaletteText = Record<
  "onSurface" | "onPrimary",
  {
    highEmphasis: string;
    mediumEmphasis: string;
    disabled: string;
  }
>;

export type PaletteAction = Record<
  "black" | "white",
  {
    hover: string;
    focus: string;
    pressed: string;
    dragged: string;
    selected: string;
  }
>;

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export type PaletteStatus = Record<
  "error" | "warning" | "info" | "success",
  PaletteColor
>;

export type PaletteType = "light" | "dark";

export interface PaletteInfo {
  type: PaletteType;
  contrastThreshold: number;
  tonalOffset: number;
  getContrastText: (background: string) => string;
  augmentColor: {
    <K extends keyof Partial<Color>, T extends Partial<Color>>(
      color: Omit<PaletteColor, "main"> | T
    ): PaletteColor;
    <K extends keyof Partial<Color>, T extends Partial<Color>>(
      color: T,
      mainShade?: K,
      lightShade?: keyof Color,
      darkShade?: keyof Color
    ): PaletteColor;
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

type PaletteTypeObject = Pick<
  Palette,
  "background" | "outline" | "text" | "action"
>;

const light: PaletteTypeObject = {
  background: {
    default: "#F9F9F9",
    surface: "#FFFFFF",
    surfaceOverlay: "rgba(33, 33, 33, 0.08)"
  },
  outline: "rgba(0, 0, 0, 0.12)",
  text: {
    onSurface: {
      highEmphasis: "rgba(0, 0, 0, 0.87)",
      mediumEmphasis: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    onPrimary: {
      highEmphasis: "#FFFFFF",
      mediumEmphasis: "rgba(255, 255, 255, 0.74)",
      disabled: "rgba(255, 255, 255, 0.38)"
    }
  },
  action: {
    black: {
      hover: "rgba(0, 0, 0, 0.04)",
      focus: "rgba(0, 0, 0, 0.12)",
      pressed: "rgba(0, 0, 0, 0.1)",
      dragged: "rgba(0, 0, 0, 0.08)",
      selected: "rgba(0, 0, 0, 0.08)"
    },
    white: {
      hover: "rgba(255,255,255,0.04)",
      focus: "rgba(255,255,255,0.12)",
      pressed: "rgba(255,255,255,0.1)",
      dragged: "rgba(255,255,255,0.08)",
      selected: "rgba(255,255,255,0.08)"
    }
  }
};

const status: PaletteStatus = {
  error: {
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: "rgba(0, 0, 0, 0.87)"
  },
  warning: {
    light: orange[300],
    main: orange[500],
    dark: orange[700],
    contrastText: "rgba(0, 0, 0, 0.87)"
  },
  info: {
    light: blue[300],
    main: blue[500],
    dark: blue[700],
    contrastText: "#FFFFFF"
  },
  success: {
    light: green[300],
    main: green[500],
    dark: green[700],
    contrastText: "#FFFFFF"
  }
};

export type PaletteColorOptions = Omit<PaletteColor, "main"> | Partial<Color>;

export interface PaletteOptions
  extends RecursivePartial<Omit<Palette, "primary" | "secondary">> {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
}

function getLightAndDark<T extends Partial<Color>>(
  intent: Omit<PaletteColor, "main"> | T,
  main: string,
  shade: [keyof Color, keyof Color],
  tonalOffset: number
): T & { light: string; dark: string } {
  const lightColor = intent.hasOwnProperty("light")
    ? ((intent as Omit<PaletteColor, "main">).light as string)
    : ((intent as T)[shade[0]] as string) ||
      ColorManipulator(main)
        .lighten(tonalOffset)
        .hex();

  const darkColor = intent.hasOwnProperty("dark")
    ? ((intent as Omit<PaletteColor, "main">).dark as string)
    : ((intent as T)[shade[1]] as string) ||
      ColorManipulator(main)
        .darken(tonalOffset * 1.5)
        .hex();

  return {
    ...(intent as T & Omit<PaletteColor, "main">),
    light: lightColor,
    dark: darkColor
  };
}

function createPalette(options: PaletteOptions): Palette {
  const {
    primary = {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
      contrastText: "#FFFFFF"
    },
    secondary = {
      light: pink.A200,
      main: pink.A400,
      dark: pink.A700,
      contrastText: "rgba(0, 0, 0, 0.87)"
    },
    type = "light",
    contrastThreshold = 14,
    tonalOffset = 0.2,
    ...other
  } = options;

  const getContrastText = (background: string): string => {
    const color = ColorManipulator;

    return color(background).contrast(
      color(light.text.onSurface.highEmphasis)
    ) >= contrastThreshold
      ? light.text.onSurface.highEmphasis
      : light.text.onPrimary.highEmphasis;
  };

  function augmentColor<
    K extends keyof Partial<Color>,
    T extends Partial<Color>
  >(color: Omit<PaletteColor, "main"> | T): PaletteColor;
  function augmentColor<
    K extends keyof Partial<Color>,
    T extends Partial<Color>
  >(
    color: Omit<PaletteColor, "main"> | T,
    mainShade?: K,
    lightShade?: keyof Color,
    darkShade?: keyof Color
  ): PaletteColor;
  function augmentColor<
    K extends keyof Partial<Color>,
    T extends Partial<Color>
  >(
    color: Omit<PaletteColor, "main"> | T,
    mainShade?: K,
    lightShade?: keyof Color,
    darkShade?: keyof Color
  ): PaletteColor {
    const MainShade = mainShade || (500 as K);
    const LightShade = lightShade || 300;
    const DarkShade = darkShade || 700;

    const main = color.hasOwnProperty("main")
      ? (color as PaletteColor).main
      : ((color as T)[MainShade] as string);

    const contrastText = color.hasOwnProperty("contrastText")
      ? ((color as Omit<PaletteColor, "main">).contrastText as string)
      : getContrastText(main);

    const { light: lightColor, dark: darkColor } = getLightAndDark(
      color,
      main,
      [LightShade, DarkShade],
      tonalOffset
    );

    return {
      main,
      light: lightColor,
      dark: darkColor,
      contrastText
    };
  }
  const types = { dark: light, light };

  return deepmerge(
    {
      common,
      type,
      primary: augmentColor(primary),
      secondary: augmentColor(secondary, "A400", "A200", "A700"),
      status,
      grey,
      contrastThreshold,
      getContrastText,
      augmentColor,
      tonalOffset,
      ...types[type]
    },
    other
  );
}

export default createPalette;
