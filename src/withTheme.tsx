import React from "react";
import useTheme from "./useTheme";
import { Theme } from "./createTheme";

export interface WithThemeProps {
  theme: Theme;
}

export function withTheme<
  ComposedComponentProps extends WithThemeProps = WithThemeProps
>(WrappedComponent: React.ComponentClass<ComposedComponentProps>) {
  type ComposedComponentInstance = InstanceType<typeof WrappedComponent>;

  type wrapperComponent = Omit<ComposedComponentProps, keyof WithThemeProps>;

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const WrapperComponent = React.forwardRef<
    ComposedComponentInstance,
    wrapperComponent
  >((props, ref) => {
    const theme = useTheme();
    const componentProps = props as ComposedComponentProps;
    return <WrappedComponent ref={ref} theme={theme} {...componentProps} />;
  });

  WrapperComponent.displayName = `withTheme(${displayName})`;

  return WrapperComponent;
}

export default withTheme;
