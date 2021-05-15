const fs = require("fs");
const BLOG = require("../blog.config");

const pages = fs.readdirSync(`${process.cwd()}/content/posts`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((slug) => {
        return `<url>
        <loc>${BLOG.siteUrl}/post/${slug}</loc>
    </url>
    `;
      })
      .join("")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", sitemap);
