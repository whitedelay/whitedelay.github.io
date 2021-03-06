import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Layout } from "@components/Layout";
import { SEO } from "@components/Seo";
import { Navigation } from "@components/Navigation";
import { Image } from "@components/Image";
import Utterances from "@components/Utterances";

import { getPostBySlug, getPostsSlugs } from "@lib/posts";

// markdown
import ReactMarkdownWithHtml from "react-markdown/with-html";
import gfm from "remark-gfm";

// katex
import { InlineMath, BlockMath } from "react-katex";
import math from "remark-math";

// syntax highlighting
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark";
import light from "react-syntax-highlighter/dist/cjs/styles/prism/coldark-cold";

export default function Post({ frontmatter, post, previousPost, nextPost }) {
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article className="max-w-none">
        <header className="mb-6 sm:mb-10">
          <h1 className="mb-4 sm:text-5xl text-4xl font-body font-black sm:leading-tight leading-tight">
            {frontmatter.title}
          </h1>
          <p className="flex items-center	text-sm sm:text-base font-body font-semibold text-gray-400 mb-2 pl-1">
            <FaRegCalendarAlt className="w-4 h-4 mr-2" />
            {frontmatter.date}
          </p>
          <p className="flex items-center pl-1">
            {frontmatter.tags &&
              frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm sm:text-base font-serif font-bold text-gray-600 dark:text-blue-200 pr-2"
                >
                  {"#" + tag}
                </span>
              ))}
          </p>
        </header>
        <ReactMarkdownWithHtml
          plugins={[[gfm, { singleTilde: false }], math]}
          className="mb-4 prose prose-sm sm:prose dark:prose-dark"
          skipHtml={false}
          children={post.content}
          renderers={{
            code: CodeBlock,
            image: MarkdownImage,
            inlineMath: ({ value }) => <InlineMath math={value} />,
            math: ({ value }) => <BlockMath math={value} />,
          }}
          allowDangerousHtml
        />
      </article>
      <hr className="my-5 dark:border-gray-500" />
      <Navigation previousPost={previousPost} nextPost={nextPost} />
      <Utterances />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getPostsSlugs();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postData = getPostBySlug(slug);

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}

const CodeBlock = ({ language, value }) => {
  const { resolvedTheme } = useTheme();
  const [style, setStyle] = useState();
  useEffect(() => {
    setStyle(resolvedTheme === "light" ? light : dark);
  });
  return (
    <SyntaxHighlighter style={style} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const MarkdownImage = ({ alt, src }) => {
  const isHttp = src.startsWith("http") ? true : false;
  return (
    <Image
      alt={alt}
      src={isHttp ? src : require(`../../content/assets/${src}`)}
      webpSrc={isHttp ? src : require(`../../content/assets/${src}?webp`)}
      previewSrc={isHttp ? src : require(`../../content/assets/${src}?lqip`)}
      className="m-auto rounded"
    />
  );
};
