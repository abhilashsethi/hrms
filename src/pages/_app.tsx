import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import nProgress from "nprogress";
import { Router } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);
  return <Component {...pageProps} />;
}
