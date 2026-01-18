import twColors from "tailwindcss/colors";
import type { ThemeConfig } from "tailwindcss/types/config";
import { ThemeColors } from "@nextui-org/react";

export const extendColors: ThemeConfig["colors"] = {
  transparent: twColors.transparent,
  black: twColors.black,
  white: twColors.white,
};

export const colors: Partial<ThemeColors> = {
  primary: "#EFFDFD",
  secondary: "#017D7A",
  default: twColors.white,
  foreground: twColors.black,
  success: "#4AB962",
  warning: "#FAF3BD",
  danger: "#B94C4A",
};
