import { ViewStyle } from "react-native";
export interface Shadow {
    shadowColor: ViewStyle["shadowColor"];
    shadowOffset: ViewStyle["shadowOffset"];
    shadowOpacity: ViewStyle["shadowOpacity"];
    shadowRadius: ViewStyle["shadowRadius"];
    elevation: ViewStyle["elevation"];
}
export interface Shadows {
    dp0: Shadow;
    dp1: Shadow;
    dp2: Shadow;
    dp3: Shadow;
    dp4: Shadow;
    dp6: Shadow;
    dp8: Shadow;
    dp9: Shadow;
    dp12: Shadow;
    dp16: Shadow;
    dp24: Shadow;
}
export interface createShadowArgs {
    depth: number;
    blur: number;
    color: Shadow["shadowColor"];
}
export declare function createShadow(depth: number, blur: number, color?: Shadow["shadowColor"]): Shadow;
declare const shadows: Shadows;
export default shadows;
