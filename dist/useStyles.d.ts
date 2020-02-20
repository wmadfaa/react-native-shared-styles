declare const useStyles: <SF extends (overWrite: any, theme: any, props: any) => any, Args extends Parameters<SF>>(stylesFunc: SF, props: Args[2], overWrite?: Args[0]) => ReturnType<SF>;
export default useStyles;
