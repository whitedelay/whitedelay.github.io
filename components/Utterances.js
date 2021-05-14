import { useEffect } from "react";
import { useTheme } from "next-themes";

const Utterances = () => {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const theme = resolvedTheme === "light" ? "github-light" : "github-dark";
    const script = document.createElement("script");
    const anchor = document.getElementById("comments");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "whitedelay/whitedelay.github.io");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme);
    anchor.appendChild(script);
    return () => {
      anchor.innerHTML = "";
    };
  });
  return (
    <>
      <div id="comments"></div>
    </>
  );
};

export default Utterances;
