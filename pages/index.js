import { Layout } from "@components/Layout";
import { PostCard } from "@components/PostCard";
import { SEO } from "@components/Seo";
import { FiGithub, FiMail } from "react-icons/fi";
import { getSortedPosts } from "@utils/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="Home" />
      <section className="border-dashed border border-gray-300 dark:border-gray-700 rounded mx-4 mb-8 p-4 text-sm sm:text-base">
        기록을 통해 매일 매일 더 나아지고 싶은, 개발자 <strong>백</strong>
        <sup>white</sup>
        <strong>지연</strong>
        <sup>delay</sup>
        입니다.
        <br />
        <br />
        <span className="flex items-center">
          <FiGithub className="w-4 h-5 mt-1" />
          <a className="mx-2" href="https://github.com/whitedelay">
            github
          </a>
        </span>
        <span className="flex items-center">
          <FiMail className="w-4 h-5 mt-1" />
          <a className="mx-2" href="mailto:whitedelay@gmail.com">
            email
          </a>
        </span>
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
