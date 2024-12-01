import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// you can extend the theme and add custom colors, font styles, etc.
const colors = {
  greenDark: "#003d2d",
  greenLight: "#2f7d66",
  white: "#ffffff",
  offWhite: "#f8f8f8",
  darkGray: "#333333",
  black: "#000000",
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 800,
};

const fontFamily = {
  base: "GT Ultra Standard",
  bold: "GT Ultra Median",
};

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
};

export const theme = extendTheme({
  colors,
  fontWeights,
  fontFamily,
  breakpoints,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
