import { getSiteMetaData } from "@utils/helpers";

export function Footer() {
  const author = getSiteMetaData().author.name;

  return (
    <footer className="text-lg font-light container mx-auto px-6 flex flex-col items-center">
      <div className="text-center py-6">
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">
          © {new Date().getFullYear()} {author} ☁️ Built with{" "}
          <a href="https://nextjs.org/">Next.js</a> {"&"}{" "}
          <a href="http://tailwindcss.com">tailwindcss</a>
        </p>
      </div>
    </footer>
  );
}
