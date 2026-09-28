import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*
  Content collection cho blog post.
  Dùng glob loader (Astro Content Layer API) đọc mọi file .md/.mdx trong
  src/content/posts. Schema khớp frontmatter của blog cũ, thêm vài field
  best-practice (tags, author, draft) và cho phép cover là ảnh optimize được.
*/
const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.string(),
      // Ngày dạng chuỗi tự do ("May 1, 2026") để giữ tương thích blog cũ,
      // đồng thời có pubDate chuẩn Date cho sort/RSS/sitemap.
      date: z.string(),
      pubDate: z.coerce.date(),
      readTime: z.string().optional(),
      // Cover: dùng image() để Astro optimize (resize, format hiện đại).
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // "Vấn đề & vì sao" hiển thị đầu bài (nêu bài toán, không spoil kết luận)
      problem: z.string().optional(),
      // "Bài học / quyết định thiết kế" hiển thị cuối bài (đúc kết, nêu lý do)
      takeaways: z.array(z.string()).default([]),
      // Giữ lại để tương thích, không dùng trong layout mới
      summary: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      author: z.string().default("Toan Nguyen"),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
