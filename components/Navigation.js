import Link from "next/link";

export function Navigation({ previousPost, nextPost }) {
  return (
    <nav className="flex flex-wrap justify-between mb-10 mt-3">
      {previousPost ? (
        <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`}>
          <a className="text-base sm:text-lg font-bold">
            ← {previousPost.frontmatter.title}
          </a>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`}>
          <a className="text-base sm:text-lg font-bold">
            {nextPost.frontmatter.title} →
          </a>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
