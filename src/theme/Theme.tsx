import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import colors from "./Colors";

export const lightTheme:any = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    backgroundColor: colors.white,
    headingColor: colors.black,
    textColor: colors.gray,
    whiteColor:colors.white,
    blackColor:colors.black,
    alpha:colors.alpha
  },
};

export const darkTheme :any= {
  ...DarkTheme.colors,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    backgroundColor: colors.white,
    headingColor: colors.black,
    textColor: colors.gray,
    whiteColor:colors.white,
    blackColor:colors.black
  },
};