import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes";
import { getSiteMetaData } from "@utils/helpers";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = (checked) => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme("dark");
    else setTheme("light");
  };

  const isRoot = pathname === "/";
  const isDarkMode = resolvedTheme === "dark";

  const siteMetadata = getSiteMetaData();
  const siteTitle = siteMetadata.title;

  return (
    <header
      className={clsx("mx-1 mb-2 flex items-center justify-between ", {
        "sm:mb-6": isRoot,
        "sm:mb-4": !isRoot,
      })}
    >
      <div className={"flex flex-row"}>
        {isRoot ? (
          <LargeTitle title={siteTitle} />
        ) : (
          <SmallTitle title={siteTitle} />
        )}
      </div>
      {mounted && (
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={isRoot ? 28 : 24}
        />
      )}
    </header>
  );
}

const LargeTitle = ({ title }) => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-2xl font-black leading-none text-black no-underline font-display",
          "sm:text-4xl",
          "dark:text-white"
        )}
      >
        ☁️ {title}
      </a>
    </Link>
  </h1>
);

const SmallTitle = ({ title }) => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "font-black text-black no-underline font-display",
          "dark:text-white",
          "sm:text-2xl",
          "text-xl"
        )}
      >
        ☁️ {title}
      </a>
    </Link>
  </h1>
);
