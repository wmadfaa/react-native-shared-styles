import React from "react";
export interface WithStylesProps<SF extends (overWrite: any, theme: any, props: any) => any> {
    styles: ReturnType<SF>;
}
declare function withStyles<SF extends (overWrite: any, theme: any, props: any) => any, Args extends Parameters<SF>, ComposedComponentProps extends WithStylesProps<SF> = WithStylesProps<SF>>(WrappedComponent: React.ComponentClass<ComposedComponentProps & Args[2]>, stylesFunc: SF, overWrite?: Args[0]): React.ForwardRefExoticComponent<React.PropsWithoutRef<Pick<ComposedComponentProps, Exclude<keyof ComposedComponentProps, "styles">>> & React.RefAttributes<React.Component<ComposedComponentProps & Args[2], any, any>>>;
export default withStyles;
