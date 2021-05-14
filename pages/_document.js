import Document, { Head, Main, NextScript, Html } from "next/document";

import BLOG from "@/blog.config";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={BLOG.language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
