import { Layout } from "@components/Layout";
import { PostCard } from "@components/PostCard";
import { SEO } from "@components/Seo";
import { FiGithub, FiMail } from "react-icons/fi";
import { getSortedPosts } from "@lib/posts";
import BLOG from "@/blog.config";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="Home" />
      <section className="border-dashed border border-gray-300 dark:border-gray-700 rounded mx-4 mb-8 p-4 text-sm sm:text-base">
        안녕하세요 👋🏻 꾸준한 기록을 통해 성장하고 싶은 주니어 개발자{" "}
        <strong>백</strong>
        <sup>white</sup>
        <strong>지연</strong>
        <sup>delay</sup>
        입니다.
        <div className="flex flex-row mt-2">
          <span className="flex items-center mr-1">
            <FiGithub className="w-4 h-5 mt-1" />
            <a className="mx-2" href={BLOG.github}>
              github
            </a>
          </span>
          <span className="flex items-center mr-1">
            <FiMail className="w-4 h-5 mt-1" />
            <a className="mx-2" href={`mailto:${BLOG.email}`}>
              email
            </a>
          </span>
        </div>
      </section>
      <span className="font-body font-bold text-base sm:text-lg p-2 px-4 text-gray-700 dark:text-gray-300">
        전체 포스트
      </span>
      {posts.map((post) => (
        <article key={post.slug}>
          <PostCard slug={post.slug} {...post.frontmatter} />
        </article>
      ))}
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
