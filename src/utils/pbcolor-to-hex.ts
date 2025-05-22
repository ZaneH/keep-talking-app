import { Color } from "../generated/proto/common.pb";

export function pbColorToHex(color: Color): number {
  switch (color) {
    case Color.BLACK:
      return 0x000000;
    case Color.BLUE:
      return 0x0000ff;
    case Color.WHITE:
      return 0xffffff;
    case Color.RED:
      return 0xff0000;
    case Color.GREEN:
      return 0x00ff00;
    case Color.YELLOW:
      return 0xffff00;
    case Color.ORANGE:
      return 0xffa500;
    case Color.PINK:
      return 0xffc0cb;
    default:
      console.error("Invalid color value:", color);
      return 0xffffff;
  }
}
