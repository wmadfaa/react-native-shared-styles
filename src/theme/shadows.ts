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

function interpolate(i: number, a: number, b: number, a2: number, b2: number) {
  return ((i - a) * (b2 - a2)) / (b - a) + a2;
}

export interface createShadowArgs {
  depth: number;
  blur: number;
  color: Shadow["shadowColor"];
}

export function createShadow(
  depth: number,
  blur: number,
  color: Shadow["shadowColor"] = "#000000"
): Shadow {
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: depth + 1 === 1 ? 1 : Math.floor((depth + 1) * 0.5)
    },
    shadowOpacity: interpolate(depth, 1, 24, 0.2, 0.6),
    shadowRadius: interpolate(blur, 1, 38, 1, 16),

    elevation: depth + 1
  };
}

const shadows: Shadows = {
  dp0: createShadow(0, 0),
  dp1: createShadow(0, 1),
  dp2: createShadow(1, 2),
  dp3: createShadow(2, 4),
  dp4: createShadow(3, 5),
  dp6: createShadow(5, 10),
  dp8: createShadow(7, 10),
  dp9: createShadow(8, 12),
  dp12: createShadow(11, 17),
  dp16: createShadow(15, 24),
  dp24: createShadow(23, 38)
};

export default shadows;
