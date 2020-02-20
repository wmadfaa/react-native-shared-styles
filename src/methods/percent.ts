import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

class Percent {
  private calc = (a: number, c: number) => a * (c / 100);
  w(value: number) {
    this.calc(value, SCREEN_WIDTH);
  }
  h(value: number) {
    this.calc(value, SCREEN_HEIGHT);
  }
}

export default Percent;
