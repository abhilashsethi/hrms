import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import nProgress from "nprogress";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CustomTheme from "theme";
import "../styles/globals.css";
import "../styles/nprogress.css";

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);
  return (
    <>
      <ThemeProvider theme={CustomTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
