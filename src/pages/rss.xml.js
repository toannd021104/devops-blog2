import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/consts";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.pubDate,
      categories: [post.data.category, ...post.data.tags],
      link: `/posts/${post.id}/`,
    })),
  });
}
