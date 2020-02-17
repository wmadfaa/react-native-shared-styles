import useTheme from "./useTheme";

const useStyles = <
  SF extends (overWrite: any, theme: any, props: any) => any,
  Args extends Parameters<SF>
>(
  stylesFunc: SF,
  props: Args[2] = {},
  overWrite: Args[0] = {}
): ReturnType<SF> => {
  const theme = useTheme();
  return stylesFunc(overWrite, theme, props);
};

export default useStyles;
