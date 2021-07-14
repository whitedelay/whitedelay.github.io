import matter from "gray-matter";
import fs from "fs";

export function getPostsFiles() {
  // Get all posts located in `content/posts`
  const postFiles = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .filter((filename) => filename.endsWith(".md"));
  return postFiles;
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("ko-KR", options);
  return formattedDate;
}

export function getSortedPosts() {
  const postFiles = getPostsFiles();

  const posts = postFiles
    .map((filename) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();

      // Parse markdown, get frontmatter data, excerpt and content.
      const { data, excerpt, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),
      };

      // Remove .md file extension from post name
      const slug = filename.replace(".md", "");

      return {
        slug,
        frontmatter,
        excerpt,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date.replace(/[^0-9 ]/g, "")) -
        new Date(a.frontmatter.date.replace(/[^0-9 ]/g, ""))
    );

  return posts;
}

export function getPostsSlugs() {
  const postFiles = getPostsFiles();

  const paths = postFiles.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return paths;
}

export function getPostBySlug(slug) {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
