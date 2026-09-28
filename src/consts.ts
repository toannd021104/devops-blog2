/** Thông tin site dùng chung cho SEO, header, footer, RSS. */
export const SITE = {
  title: "Toan Nguyen·DevOps",
  description:
    "Blog kỹ thuật về DevOps, Cloud, Security và AI - hands-on labs, kiến trúc hệ thống và ghi chú thực chiến.",
  author: "Toan Nguyen",
  lang: "vi",
  // Khớp astro.config.mjs -> site (GitHub Pages project site)
  url: "https://toannd021104.github.io/devops-blog2",
  socials: {
    github: "https://github.com/toannd021104",
    linkedin: "https://www.linkedin.com/in/toanndcloud/",
    email: "mailto:toanndcloud@gmail.com",
  },
} as const;

/** Nav chính. */
export const NAV = [
  { label: "Bài viết", href: "/" },
  { label: "Chủ đề", href: "/tags" },
  { label: "Giới thiệu", href: "/about" },
] as const;
