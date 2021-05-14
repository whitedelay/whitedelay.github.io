import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

import * as gtag from "@lib/gtag";
import "@assets/main.css";

// syntax highlighting
import "prismjs/themes/prism-tomorrow.css";

// katex
import "katex/dist/katex.min.css";

export default function MyApp({ Component, pageProps }) {
  if (process.env.NODE_ENV === "production") {
    const router = useRouter();
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  }

  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
