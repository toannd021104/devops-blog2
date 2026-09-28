---
name: cover-generator
description: Tạo ảnh bìa (cover) SVG đồng bộ cho bài blog kỹ thuật. Dùng khi thêm/đổi cover cho một post, cần ảnh bìa nhất quán theo category (màu + icon công nghệ) mà không phải đi tìm ảnh stock.
---

# Skill: Cover Generator

Sinh ảnh bìa SVG **clean, nhất quán, đúng trọng tâm công nghệ** cho từng bài blog.
Triết lý: **không dùng ảnh stock**. Cover = nền tối gradient theo category + icon công nghệ
của bài + tiêu đề + chip category + brand. Nhìn ảnh là biết bài về công nghệ gì.

## Khi nào dùng

- Thêm cover cho một post mới.
- Đổi cover cho post đang dùng ảnh stock / ảnh không ăn nhập.
- Tạo loạt cover cho nhiều bài để đồng bộ phong cách.

## Quy ước bắt buộc

### 1. Kích thước
- `1200 × 630` (chuẩn OG image, share link đẹp trên mọi nền tảng).

### 2. Màu accent theo category
Lấy từ `src/assets/icons/README.md`. Tóm tắt:

| Category            | Accent    |
| ------------------- | --------- |
| AWS                 | `#ff9900` |
| Kubernetes / EKS    | `#3b82f6` |
| Cloud Security      | `#ef4444` |
| AI / AI Security    | `#8b5cf6` |
| DevOps              | `#14b8a6` |
| Networking          | `#0ea5e9` |
| Docker              | `#2496ed` |

### 3. Icon công nghệ
- Chọn từ `src/assets/icons/<category>/` khớp chủ đề bài (vd bài EKS → `kubernetes/`, bài
  Squid trên EKS → `kubernetes/` + có thể `aws/amazon-ec2-instance`).
- Đặt icon **2 lớp**: một bản LỚN + mờ (opacity ~0.08) ở nền phải tạo chiều sâu; một
  huy hiệu NHỎ rõ nét góc phải trên trong ô bo góc.
- Nếu category chỉ có PNG (cloud-security, ai-security) thì nhúng PNG thay cho SVG path.

### 4. Bố cục (từ trên xuống, canh trái, padding 64px)
1. Accent bar ngắn (4px cao, ~48px rộng) màu accent.
2. Category (mono, uppercase, cỡ ~20px, màu accent).
3. Tiêu đề bài (font đậm, ~52px, trắng, tối đa 3 dòng — tự xuống dòng).
4. Chip tag phụ (nền accent mờ, **width tự co theo chữ**, KHÔNG hardcode width kẻo tràn).
5. Brand `Toan Nguyen.dev` (mono, nhỏ, góc dưới trái, màu xám nhạt).
6. Huy hiệu icon công nghệ góc phải trên.

### 5. Nền
- Nền than chì `#0e1116` → gradient tối nhẹ.
- Glow radial màu accent (opacity thấp) phía sau icon lớn.
- Lưới kỹ thuật mờ (line 1px, opacity ~0.04) phủ toàn nền.

## Template SVG

```svg
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#12161d"/>
      <stop offset="1" stop-color="#0b0e13"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="30%" r="45%">
      <stop offset="0" stop-color="{ACCENT}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="{ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.04"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Icon lớn mờ (nền phải): nhúng path/PNG của icon category, opacity 0.08 -->
  <g transform="translate(760,150) scale(1.6)" opacity="0.08">{ICON_BIG}</g>

  <!-- Nội dung canh trái, padding 64 -->
  <rect x="64" y="120" width="48" height="4" rx="2" fill="{ACCENT}"/>
  <text x="64" y="168" font-family="'JetBrains Mono',monospace" font-size="20"
        letter-spacing="3" fill="{ACCENT}">{CATEGORY_UPPER}</text>
  <text x="64" y="250" font-family="'Lexend','Inter',sans-serif" font-size="52"
        font-weight="700" fill="#ffffff">{TITLE_LINE_1}</text>
  <!-- thêm <text> cho dòng 2,3 nếu tiêu đề dài, cách dòng ~62px -->

  <!-- Chip tag: đặt x theo số ký tự, KHÔNG hardcode width cứng -->
  <g transform="translate(64,430)">
    <rect width="{CHIP_W}" height="34" rx="17" fill="{ACCENT}" fill-opacity="0.15"/>
    <text x="16" y="23" font-family="'JetBrains Mono',monospace" font-size="15"
          fill="{ACCENT}">{TAG}</text>
  </g>

  <!-- Brand góc dưới trái -->
  <text x="64" y="566" font-family="'JetBrains Mono',monospace" font-size="18"
        fill="#8b93a1">Toan Nguyen<tspan fill="{ACCENT}">.</tspan>dev</text>

  <!-- Huy hiệu icon nhỏ góc phải trên -->
  <g transform="translate(1040,56)">
    <rect width="96" height="96" rx="20" fill="#ffffff" fill-opacity="0.06"
          stroke="{ACCENT}" stroke-opacity="0.4"/>
    <g transform="translate(24,24)">{ICON_SMALL}</g>
  </g>
</svg>
```

## Quy tắc tính CHIP_W (tránh tràn chữ)
`CHIP_W ≈ 32 + số_ký_tự_tag × 8.5` (font mono 15px). Luôn tính theo độ dài chữ,
KHÔNG để width cứng. Đây là lỗi hay gặp khiến chữ tràn ra ngoài chip.

## Quy trình
1. Xác định category → tra accent + thư mục icon (README.md).
2. Chọn icon SVG khớp bài trong `icons/<category>/`, lấy phần `<path>`/`<g>` bên trong
   `<svg>` gốc để nhúng (ICON_BIG mờ + ICON_SMALL rõ). Với PNG thì dùng `<image>`.
3. Điền template: ACCENT, CATEGORY_UPPER, TITLE (tự chia dòng ≤ 3), TAG, CHIP_W.
4. Lưu vào `src/content/posts/<slug>/cover.svg` (hoặc `.../cover.png` nếu render ra raster).
5. Trong frontmatter post đặt `cover: "./cover.svg"`.
6. Build (`npm run build`) kiểm tra ảnh resolve và không tràn chữ.

## Checklist trước khi xong
- [ ] Kích thước 1200×630.
- [ ] Màu accent đúng category.
- [ ] Icon đúng công nghệ của bài, 2 lớp (mờ lớn + huy hiệu nhỏ).
- [ ] Tiêu đề không tràn khung (chia dòng hợp lý, ≤ 3 dòng).
- [ ] Chip tag width tính theo chữ, không tràn.
- [ ] Brand + accent nhất quán với các cover khác.
