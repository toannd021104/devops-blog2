# Icon set — chuẩn chung cho ảnh bìa & UI

Cấu trúc chuẩn: mỗi category một thư mục con, tên file slug-hoá (chữ thường, gạch nối).

```
icons/
  aws/            # 819 SVG icon dịch vụ AWS (amazon-ec2-instance.svg, amazon-api-gateway.svg, ...)
  kubernetes/     # 39 SVG icon K8s (deploy.svg, pod.svg, svc.svg, ing.svg, ...)
  cloud-security/ # cloud-security.png
  ai-security/    # ai-security.png
```

## Quy ước category → màu accent + icon

Dùng cho hệ sinh ảnh bìa (xem skill `cover-generator`).

| Category / chủ đề        | Thư mục icon      | Màu accent (hex) | Ghi chú                    |
| ------------------------ | ----------------- | ---------------- | -------------------------- |
| AWS                      | `aws/`            | `#ff9900`        | cam AWS                    |
| Kubernetes / Amazon EKS  | `kubernetes/`     | `#3b82f6`        | xanh dương K8s             |
| Cloud Security           | `cloud-security/` | `#ef4444`        | đỏ                         |
| AI / AI Security         | `ai-security/`    | `#8b5cf6`        | tím                        |
| DevOps                   | (chọn icon phù hợp) | `#14b8a6`      | teal (màu brand mặc định)  |
| Networking               | `aws/` (vpc...)   | `#0ea5e9`        | xanh sky                   |
| Docker                   | (thêm sau)        | `#2496ed`        | xanh docker                |

## Nguồn

- AWS: AWS Architecture Icons (bản dark BG) — dùng cho mục đích nhận diện.
- Kubernetes: bộ icon chính thức của Kubernetes (bản unlabeled).
- Cloud/AI Security: ảnh minh hoạ riêng.

Tên file trong `aws/` lấy từ id nội bộ của icon gốc nên tra theo tên dịch vụ (ec2, lambda, s3, eks, vpc, api-gateway...).
