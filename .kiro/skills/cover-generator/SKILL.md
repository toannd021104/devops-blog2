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

### 3. Icon công nghệ (glyph trong suốt, KHÔNG nền, KHÔNG viền)
- Chọn từ `src/assets/icons/<category>/` khớp chủ đề bài (vd bài EKS → `kubernetes/`, bài
  Squid trên EKS → `aws/amazon-vpc-nat-gateway`, bài PrivateLink → `aws/aws-privatelink`).
- Nhiều icon AWS gốc có **ô vuông nền màu service** (vd `#8C4FFF`, `#DD344C`, `#01A88D`).
  Khi nhúng, **BỎ `<rect>` nền đó**, chỉ giữ phần glyph (path). Icon phải nền trong suốt.
- Bọc glyph trong `<symbol viewBox="...">` theo đúng viewBox gốc của icon (80×80, 48×48,
  128×128…) rồi dùng `<use ... width height>` để scale nhất quán. Giữ nguyên `transform`
  offset nội bộ của icon nếu có (vd Amazon Q có `translate(16 12.35)`).
- Đặt icon **2 lớp**:
  - LỚN + mờ (opacity ~0.08–0.10) ở nền phải tạo chiều sâu, tô `fill="{ACCENT}"`.
  - NHỎ rõ nét ở **góc phải trên**, **ĐẶT TRẦN — KHÔNG ô vuông, KHÔNG viền** bao quanh.
- **Tô màu:** icon đơn sắc dạng line (IAM, NAT Gateway, PrivateLink) → tô `fill="{ACCENT}"`.
  Logo nhiều màu thương hiệu (Docker, Amazon Q màu…) → **giữ nguyên màu gốc**, chỉ bỏ nền.
- Nếu category chỉ có PNG (cloud-security, ai-security) thì nhúng PNG nền trong suốt.

### 4. Bố cục (từ trên xuống, canh trái, padding 64px)
1. ~~Accent bar~~ — **KHÔNG dùng thanh accent** phía trên category nữa.
2. Category (mono, uppercase, **cỡ 30px**, letter-spacing ~4, màu accent, đặt cao y≈150).
3. Tiêu đề bài (font đậm, 44–48px, trắng, tối đa 3 dòng — tự xuống dòng).
4. Chip tag phụ: nền accent mờ (opacity .15), **cắt góc nhẹ chamfer ~7px** (dùng `<path>`
   chứ KHÔNG `rx` bo tròn), chữ mono **22px**. Width tính theo chữ, KHÔNG hardcode kẻo tràn.
5. Brand `Toan Nguyen.devops` (mono, nhỏ, góc dưới trái, màu xám nhạt).
6. Huy hiệu icon công nghệ góc phải trên — **icon trần, không ô vuông/viền**.

### 5. Nền
- Nền than chì `#12161d` → `#0b0e13` (gradient tối nhẹ).
- Glow radial màu accent (opacity ~0.22) phía sau icon lớn.
- Lưới kỹ thuật mờ (line 1px, opacity ~0.04) phủ toàn nền.

## Template SVG

```svg
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#12161d"/>
      <stop offset="1" stop-color="#0b0e13"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="28%" r="46%">
      <stop offset="0" stop-color="{ACCENT}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="{ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.04"/>
    </pattern>
    <!-- Glyph icon: BỎ <rect> nền gốc, chỉ giữ path. Giữ đúng viewBox + offset gốc. -->
    <symbol id="icon" viewBox="{ICON_VIEWBOX}">{ICON_GLYPH}</symbol>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Icon lớn mờ nền phải: trong suốt, tô accent (bỏ fill nếu giữ màu gốc logo) -->
  <use href="#icon" x="820" y="150" width="300" height="300" fill="{ACCENT}" opacity="0.08"/>

  <!-- Nội dung canh trái, padding 64. KHÔNG accent bar. -->
  <text x="64" y="150" font-family="'JetBrains Mono',monospace" font-size="30"
        letter-spacing="4" fill="{ACCENT}">{CATEGORY_UPPER}</text>
  <text font-family="'Lexend','Inter',sans-serif" font-size="46" font-weight="700" fill="#ffffff">
    <tspan x="64" y="246">{TITLE_LINE_1}</tspan>
    <!-- thêm <tspan x="64" y="..."> cho dòng 2,3 nếu dài, cách dòng ~58px -->
  </text>

  <!-- Chip tag: cắt góc nhẹ chamfer 7px (KHÔNG rx). width = {CHIP_W} tính theo chữ. -->
  <g transform="translate(64,390)">
    <path d="M7 0 H{CHIP_W_M7} L{CHIP_W} 7 V37 L{CHIP_W_M7} 44 H7 L0 37 V7 Z"
          fill="{ACCENT}" fill-opacity="0.15"/>
    <text x="20" y="30" font-family="'JetBrains Mono',monospace" font-size="22"
          fill="{ACCENT}">{TAG}</text>
  </g>

  <!-- Brand góc dưới trái -->
  <text x="64" y="566" font-family="'JetBrains Mono',monospace" font-size="18"
        fill="#8b93a1">Toan Nguyen<tspan fill="{ACCENT}">.</tspan>devops</text>

  <!-- Huy hiệu icon nhỏ góc phải trên: ICON TRẦN, không ô vuông, không viền -->
  <use href="#icon" x="1060" y="60" width="88" height="88" fill="{ACCENT}"/>
</svg>
```

## Quy tắc tính CHIP_W (tránh tràn chữ, font mono 22px)
`CHIP_W ≈ 40 + số_ký_tự_tag × 13.2` (font mono 22px). `CHIP_W_M7 = CHIP_W − 7`.
Luôn tính theo độ dài chữ, KHÔNG để width cứng. Đây là lỗi hay gặp khiến chữ tràn chip.

## Quy trình
1. Xác định category → tra accent + thư mục icon (README.md).
2. Chọn icon SVG khớp bài trong `icons/<category>/`. Mở file, **bỏ `<rect>` nền service**,
   lấy phần glyph (`<path>`/`<g>`) bọc vào `<symbol viewBox="...">` theo viewBox gốc.
   Icon đơn sắc → tô `fill="{ACCENT}"`; logo nhiều màu → giữ màu gốc (bỏ `fill` ở `<use>`).
3. Điền template: ACCENT, CATEGORY_UPPER, TITLE (chia dòng ≤ 3), TAG, CHIP_W, ICON_VIEWBOX.
4. Lưu vào `src/content/posts/<slug>/cover.svg`.
5. Trong frontmatter post đặt `cover: "./cover.svg"`.
6. Build (`npm run build`) kiểm tra ảnh resolve và không tràn chữ. Sau khi sửa cover đang
   dùng, nếu dev server đang chạy thì xoá cache ảnh (`rm -rf dist .astro/data-store.json
   node_modules/.astro`) và restart để thấy bản mới (Astro cache ảnh theo tên file).

## Checklist trước khi xong
- [ ] Kích thước 1200×630.
- [ ] Màu accent đúng category.
- [ ] KHÔNG accent bar; category 30px đặt cao.
- [ ] Icon đúng công nghệ, nền TRONG SUỐT (đã bỏ rect nền), 2 lớp (mờ lớn + nhỏ góc phải TRẦN).
- [ ] Chip cắt góc nhẹ 7px (không bo tròn), chữ 22px, width tính theo chữ.
- [ ] Tiêu đề không tràn khung (chia dòng hợp lý, ≤ 3 dòng).
- [ ] Chip tag width tính theo chữ, không tràn.
- [ ] Brand + accent nhất quán với các cover khác.
