import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** Lấy mọi post đã publish (bỏ draft), sắp xếp mới nhất trước. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/**
 * Tách các post featured và phần còn lại.
 * - `featured`: mọi post đánh dấu featured (mới nhất trước). Nếu không có bài nào
 *   featured thì lấy tạm bài mới nhất để khu "Bài nổi bật" không trống.
 * - `lead`: bài featured đầu tiên, render ở layout lớn.
 * - `featuredRest`: các bài featured còn lại, render dạng card thường.
 * - `rest`: các bài không featured.
 */
export async function getFeaturedAndRest() {
  const posts = await getPublishedPosts();
  const featured = posts.filter((p) => p.data.featured);
  const list = featured.length > 0 ? featured : posts.slice(0, 1);

  const [lead, ...featuredRest] = list;
  const featuredIds = new Set(list.map((p) => p.id));
  const rest = posts.filter((p) => !featuredIds.has(p.id));

  return { featured: list, lead, featuredRest, rest };
}

/** Gom tất cả tag kèm số lượng post, sort theo tần suất. */
export async function getAllTags() {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** Định dạng ngày kiểu "01 Th5 2026" cho hiển thị nhất quán. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
