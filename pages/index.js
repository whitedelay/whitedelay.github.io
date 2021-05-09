import { Layout } from "@components/Layout";
import { PostCard } from "@components/PostCard";
import { SEO } from "@components/Seo";
import { Image } from "@components/Image";
import { getSortedPosts } from "@utils/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="Home" />
      <Image
        src={require(`../content/assets/profile-light.jpg`)}
        webpSrc={require(`../content/assets/profile-light.jpg?webp`)}
        previewSrc={require(`../content/assets/profile-light.jpg?lqip`)}
        className="max-w-screen-lg w-overflow -mx-5 h-60 sm:h-96 rounded mb-2"
      />
      <div className="font-bold font-serif text-xl sm:text-2xl p-2 px-4 text-gray-700 dark:text-gray-200">
        All posts
      </div>
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
