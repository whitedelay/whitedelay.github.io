import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";

export function PostCard({ slug, title, date, tags, description }) {
  return (
    <Link href={"/post/[slug]"} as={`/post/${slug}`}>
      <a>
        <div className="mb-3 p-2 px-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
          <div className="mb-1">
            <h3 className="mb-3 font-body text-2xl sm:text-3xl font-extrabold">
              {title}
            </h3>
            <div className="flex flex-row mb-2 text-gray-400">
              {date && (
                <p className="flex items-center	text-sm font-semibold ">
                  <FaRegCalendarAlt className="w-4 h-4 mr-1" />
                  {date}
                </p>
              )}
              {date && tags && <span className="mx-2">{"·"}</span>}
              <p className="flex items-center">
                {tags &&
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm font-serif font-bold text-gray-600 dark:text-blue-200 pr-2"
                    >
                      {"#" + tag}
                    </span>
                  ))}
              </p>
            </div>
          </div>
          <div>
            {description && (
              <p className="mb-2 text-base text-gray-500 dark:text-gray-200">
                {description}
              </p>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
}
