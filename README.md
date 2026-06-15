<div align="center">
  <img src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" alt="Team 22 Banner" width="100%" style="border-radius: 8px;">

# [AI002] Slide Web App — AI Dự Báo Canh Tác & Giá Cà Phê — Nhóm 22

**Giao diện Slide Thuyết trình Báo cáo Đồ án Cuối kỳ — Môn học Tư duy Trí tuệ Nhân tạo (AI002)**  
_Đề tài DT10: AI dự báo kế hoạch canh tác mùa vụ và giá cà phê cho nông dân dựa trên 5 Trụ cột của AI Bền vững._

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Môn học: AI002](https://img.shields.io/badge/Môn_học-AI002%20Tư%20duy%20TTNT-blueviolet?style=for-the-badge)](https://www.uit.edu.vn/)
[![Trường: UIT](https://img.shields.io/badge/Trường-UIT%20VNU--HCM-orange?style=for-the-badge)](https://www.uit.edu.vn/)

</div>

<br/>

## Mục lục

- [Thông tin Môn học](#thông-tin-môn-học)
- [Giới thiệu Slide Web](#giới-thiệu-slide-web)
- [Các Tính năng Nổi bật](#các-tính-năng-nổi-bật)
- [Quy ước Thiết kế & Style Slide](#quy-ước-thiết-kế--style-slide)
- [Cấu trúc Thư mục](#cấu-trúc-thư-mục)
- [Hướng dẫn Khởi chạy](#hướng-dẫn-khởi-chạy)
- [Danh sách Nhóm (Nhóm 22)](#danh-sách-nhóm-nhóm-22)

---

## Thông tin Môn học

- **Môn học:** Tư duy Trí tuệ Nhân tạo (AI002)
- **Lớp:** AI002.F21.CN1.TTNT
- **Cơ sở:** Trường Đại học Công nghệ Thông tin (UIT), Đại học Quốc gia Thành phố Hồ Chí Minh (VNU-HCM)
- **Giảng viên:** TS. Phan Thế Duy
- **Học kỳ:** 2025–2026 (Học kỳ 2)

## Giới thiệu Slide Web

Đây là ứng dụng web trình diễn slide báo cáo thuyết trình tương tác của **Nhóm 22 — Đề tài DT10**. Được thiết kế để chạy trực tiếp trên trình duyệt web, ứng dụng này thay thế các trang slide tĩnh truyền thống bằng giao diện trực quan hóa dữ liệu động, biểu đồ tương tác, và minh họa luồng xử lý thực tế của mô hình dự báo giá cà phê.

Ứng dụng giúp ban giám khảo và giảng viên theo dõi trực tiếp các kết quả nghiên cứu, từ khâu xử lý dữ liệu, kiến trúc 4 tầng, kết quả huấn luyện (chỉ số MAE, RMSE, R² âm), cho đến các giải pháp hiện thực hóa **5 Trụ cột AI Bền vững** (Reliability, Bias, Robustness, Social Impact, Explainability) trên giao diện.

---

## Các Tính năng Nổi bật

- **Tỷ lệ Khung hình Tự động (Aspect Ratio Scale)**: Đảm bảo toàn bộ nội dung slide hiển thị chính xác trong một canvas tỷ lệ chuẩn 16:9 (`1200x675px`), tự động căn chỉnh tỷ lệ (scale) theo kích thước màn hình thiết bị mà không làm vỡ layout.
- **Đồng bộ Trạng thái URL (URL State)**: Đồng bộ chỉ số slide hiện tại với tham số URL `?slide=N` (index bắt đầu từ 1). Cho phép lưu lại liên kết hoặc tải lại trang đúng vị trí slide mong muốn.
- **Phím tắt Điều hướng**:
  - `ArrowRight` / `Phím cách (Space)`: Đi tới slide tiếp theo.
  - `ArrowLeft`: Quay lại slide trước.
  - `N` / `n`: Bật/Tắt khung xem ghi chú của thuyết trình viên (Speaker Notes).
  - `Escape`: Đóng ghi chú thuyết trình viên.
- **Chuyển cảnh Mượt mà**: Tích hợp các hiệu ứng chuyển động chuyển trang thông qua Framer Motion (`motion/react`).
- **Trực quan hóa Dữ liệu**: Hiển thị biểu đồ đóng góp đặc trưng (Transparency) cùng các cột số liệu đo lường chất lượng mô hình (Metrics).

---

## Quy ước Thiết kế & Style Slide

Toàn bộ slide tuân thủ hệ thống nhận diện thương hiệu thống nhất được thiết lập trong [AGENTS.md](AGENTS.md) và cấu hình chủ đề `@theme` của Tailwind v4:

- **Font chữ chính (Typography)**: `Times New Roman` (Georgia/serif) đem lại cảm giác học thuật trang trọng.
- **Tông màu chủ đạo (Colors)**:
  - Xanh đậm: `#172554` (brand-950) & `#1e3a8a` (brand-900) dành cho tiêu đề chính.
  - Vàng cà phê: `#b7791f` (harvest-600) dùng để nhấn mạnh các đặc trưng mùa vụ.
  - Xanh lá cây: `#15803d` (leaf-700) đại diện cho các yếu tố khí tượng và môi trường.
- **Nền slide (Backgrounds)**: Nền của slide canvas thông thường là trắng (`#ffffff`), riêng Slide bìa (Cover) sử dụng màu kem ấm dịu mắt (`#f8f4ec`). Nền bao quanh slide deck là màu xám đen (`#2b2b2b`).

---

## Cấu trúc Thư mục

```text
ai002-slide-web/
├── docs/                           # Tài liệu và tài nguyên quy trình (Harness)
│   └── harness/                    # Cấu hình kiểm toán và thiết kế kiến trúc
├── public/                         # Các tài sản tĩnh (Assets, hình ảnh minh họa)
│   └── assets/                     # Ảnh chụp slide, biểu đồ, thiết kế mobile UI
├── src/
│   ├── components/                 # Các component React chính
│   │   ├── Deck.tsx                # Canvas slide và trình điều khiển tỷ lệ 16:9
│   │   ├── SlideRenderer.tsx       # Bộ phân phối layout slide động
│   │   └── slide-layouts/          # Các layout slide cụ thể (cover, bullets, split,...)
│   ├── data/
│   │   └── slidesData.ts           # Dữ liệu nội dung slide & speaker notes
│   ├── utils/
│   │   └── slide-url-state.ts      # Hàm đồng bộ trang slide với URL query
│   ├── App.tsx                     # Component gốc ứng dụng
│   ├── main.tsx                    # Entrypoint React
│   └── index.css                   # Định nghĩa CSS toàn cục & Tailwind v4 theme
├── package.json                    # Cấu hình dependencies
├── tsconfig.json                   # Cấu hình TypeScript
└── vite.config.ts                  # Cấu hình bundler Vite
```

---

## Hướng dẫn Khởi chạy

### 1. Cài đặt Dependencies

Yêu cầu đã cài đặt **Node.js** trên máy tính. Chạy lệnh sau để tải các package cần thiết:

```bash
npm install
```

### 2. Chạy ở môi trường Phát triển (Local Dev)

Chạy dev server để xem slide cục bộ:

```bash
npm run dev
```

Ứng dụng sẽ hoạt động tại địa chỉ mặc định `http://localhost:5173`. Bạn có thể thêm tham số `?slide=1` để bắt đầu từ slide đầu tiên.

### 3. Trình chiếu Toàn màn hình

Bấm biểu tượng mở rộng hoặc nhấn `F11` trên trình duyệt để trình chiếu toàn màn hình. Nhấn `N` trên bàn phím để bật ghi chú thuyết trình nếu cần hỗ trợ nói.

### 4. Xuất PDF và PowerPoint

Xuất slide sạch, không kèm speaker notes:

```bash
npm run export
```

File kết quả nằm trong thư mục `exports/`:

- `exports/ai002-coffee-slide-deck.pdf`
- `exports/ai002-coffee-slide-deck.pptx`
- `exports/slides/`: ảnh PNG từng slide ở kích thước `1200x675`

PowerPoint được tạo theo dạng ảnh full-slide để giữ layout giống bản web khi trình chiếu.

---

## Danh sách Nhóm (Nhóm 22)

| MSSV     | Họ và Tên      | Vai trò                                            | Trục AI Phụ trách                          | GitHub                                                             |
| :------- | :------------- | :------------------------------------------------- | :----------------------------------------- | :----------------------------------------------------------------- |
| 25730067 | Đặng Chí Thanh | Trưởng nhóm, Kỹ thuật ML, Backend API, Frontend    | Reliability, Explainability, Social Impact | [@uit-25730067-chithanh](https://github.com/uit-25730067-chithanh) |
| 25730061 | Hoàng Cao Sơn  | Data Audit, Crawler, Đánh giá mô hình, Stress test | Robustness, Bias                           | [@uit-25730061-caoson](https://github.com/uit-25730061-caoson)     |

---

<div align="center">
  <i>AI002 — Tư duy Trí tuệ Nhân tạo</i><br/>
  <i>Trường Đại học Công nghệ Thông tin (UIT) · VNU-HCM · 2026</i>
</div>
