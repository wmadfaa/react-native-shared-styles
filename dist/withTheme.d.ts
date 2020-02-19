import React from "react";
import { Theme } from "./createTheme";
export interface WithThemeProps {
    theme: Theme;
}
declare function withTheme<ComposedComponentProps extends WithThemeProps = WithThemeProps>(WrappedComponent: React.ComponentClass<ComposedComponentProps>): React.ForwardRefExoticComponent<React.PropsWithoutRef<Pick<ComposedComponentProps, Exclude<keyof ComposedComponentProps, "theme">>> & React.RefAttributes<React.Component<ComposedComponentProps, any, any>>>;
export default withTheme;
