import { ThemeProvider } from "next-themes";

import "@assets/main.css";

// syntax highlighting
import "prismjs/themes/prism-tomorrow.css";

// katex
import "katex/dist/katex.min.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
