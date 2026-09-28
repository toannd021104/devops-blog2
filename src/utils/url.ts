/**
 * Ghép base path (import.meta.env.BASE_URL) vào các link/asset nội bộ để
 * hoạt động đúng khi deploy dưới subpath (vd GitHub Pages: /devops-blog2/).
 * Bỏ qua link tuyệt đối (http...), anchor (#...) và mailto/tel.
 */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("#") ||
      path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL; // vd "/devops-blog2/"
  const left = base.endsWith("/") ? base.slice(0, -1) : base;
  const right = path.startsWith("/") ? path : `/${path}`;
  return `${left}${right}`;
}
