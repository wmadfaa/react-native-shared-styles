import React from "react";
import useStyles from "./useStyles";

export interface WithStylesProps<
  SF extends (overWrite: any, theme: any, props: any) => any
> {
  styles: ReturnType<SF>;
}

function withStyles<
  SF extends (overWrite: any, theme: any, props: any) => any,
  Args extends Parameters<SF>,
  ComposedComponentProps extends WithStylesProps<SF> = WithStylesProps<SF>
>(
  WrappedComponent: React.ComponentClass<ComposedComponentProps & Args[2]>,
  stylesFunc: SF,
  overWrite: Args[0] = {}
) {
  type ComposedComponentInstance = InstanceType<typeof WrappedComponent>;

  type wrapperComponent = Omit<
    ComposedComponentProps,
    keyof WithStylesProps<SF>
  >;

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const WrapperComponent = React.forwardRef<
    ComposedComponentInstance,
    wrapperComponent
  >((props, ref) => {
    const styles = useStyles(stylesFunc, props, overWrite);
    const componentProps = props as ComposedComponentProps;
    return <WrappedComponent ref={ref} styles={styles} {...componentProps} />;
  });

  WrapperComponent.displayName = `withStyles(${displayName})`;

  return WrapperComponent;
}

export default withStyles;
