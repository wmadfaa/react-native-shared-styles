import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "./createTheme";
declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
declare type StylesObject<P, T> = T | NamedStyles<T> | ((theme: Theme, props: P) => T | NamedStyles<T>);
declare const createStyleSheet: <T extends NamedStyles<T> | NamedStyles<any>, P = {}>(styles: StylesObject<P, T>) => (overWrite: ((theme: Theme, props: P) => Partial<T>) | Partial<T>, theme: Theme, props: P) => T;
export default createStyleSheet;
