import { ColorKey } from "./types";

export const COLOR_VALUES: Record<ColorKey, string> = {
  yellow: "var(--c-yellow)",
  green: "var(--c-green)",
  blue: "var(--c-blue)",
  pink: "var(--c-pink)",
  orange: "var(--c-orange)",
  purple: "var(--c-purple)",
  red: "var(--c-red)",
  teal: "var(--c-teal)",
};

export const COLOR_KEYS = Object.keys(COLOR_VALUES) as ColorKey[];
