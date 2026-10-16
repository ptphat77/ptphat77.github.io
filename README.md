# ⚔️ ptphat77 · The Shadow Monarch Portfolio (Solo Leveling Theme)

Dự án Portfolio tĩnh dành cho **GitHub Pages** được tái thiết kế từ profile [github.com/ptphat77](https://github.com/ptphat77) theo phong cách **Quân Vương Bóng Tối Sung Jinwoo (Solo Leveling)**.

---

## 🌌 Các tính năng nổi bật (Aura Features)

1. **Giao diện chuẩn GitHub kết hợp Solo Leveling**:
   - Tái hiện cấu trúc mặc định của GitHub: Header, Search bar, Profile Tabs (Overview, Repositories 14, Projects, Packages, Stars), Left Sidebar (Avatar, Bio, Follow stats, Details), Right Main Content (Pinned repos, Contribution matrix, Activity feed).
2. **Hào quang Quân Vương (Shadow Monarch Aura)**:
   - Nền đen huyền bí Obsidian kết hợp **Canvas Particle Engine** mô phỏng ngọn lửa và sương mù bóng tối bốc ngược lên 60 FPS mượt mà.
   - Vòng tròn Avatar hiệu ứng ngọn lửa đôi xoay ngược chiều (Dual-ring flame) cùng ánh mắt xanh neon phát quang (Electric Blue Monarch Eye).
   - Nút chuyển đổi nhanh giữa Avatar Sung Jinwoo và Avatar GitHub nguyên bản của bạn.
3. **Nút "ARISE" (일어서라) Quyền Năng**:
   - Nhấn nút kích hoạt hiệu ứng toàn màn hình: Rung chấn màn hình (Quake), Sóng xung kích ánh sáng (Shockwave), hé lộ Đội quân bóng tối (Igris, Beru...) và âm thanh trầm hùng (Sub-bass rumble).
4. **Bảng Trạng Thái Hệ Thống (Solo Leveling System HUD)**:
   - Mini HUD ở sidebar và Cửa sổ Trạng thái Fullscreen hiển thị Level 99, Rank S, Thanh HP/MP, và các chỉ số STR, AGI, INT, VIT, PER.
5. **Ma trận Đóng góp (Contribution Heatmap) phong cách Tinh thể Năng lượng**:
   - Thay thế màu xanh đơn điệu thành 5 cấp độ năng lượng bóng tối (tím thẫm -> sapphire -> cyan chói sáng).
6. **Lưới 6 Kho Báu Ghim (Pinned Repos Grid)**:
   - Cân đối đẹp mắt với 6 repo tiêu biểu của ptphat77 (`demeter`, `Fashion_shop`, `Smart-Parking-System`, `ai-trading`, `detect_abnormal_tx`, `solve-quadratic-2_solidity`).
   - Hiệu ứng nghiêng 3D (3D Card Tilt) chân thực khi di chuột.
7. **Âm thanh Hệ thống tích hợp sẵn (Web Audio API)**:
   - Không phụ thuộc vào file MP3 bên ngoài, tự động tổng hợp âm thanh System chime và Arise bass drop, có nút tắt/bật âm thanh trực quan.

---

## 🚀 Cách chạy thử nghiệm trên máy cục bộ (Local Preview)

Bạn có thể mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào:
- Nhấp đúp chuột vào file `portfolio-aura/index.html`.
- Hoặc chạy máy chủ tĩnh đơn giản với Python:
  ```powershell
  cd portfolio-aura
  python -m http.server 8000
  ```
  Sau đó mở trình duyệt tại: `http://localhost:8000`

---

## 🌐 Hướng dẫn Đưa Lên GitHub Pages (Chỉ mất 1 phút)

Có 2 cách đơn giản để trang web này chạy trực tiếp trên đường link `https://ptphat77.github.io`:

### Cách 1: Đưa vào repository đặc biệt `ptphat77.github.io` (Khuyên dùng)
1. Tạo một repository mới trên GitHub đặt tên chính xác là: **`ptphat77.github.io`** (chế độ Public).
2. Copy toàn bộ các file trong thư mục `portfolio-aura` (`index.html`, `style.css`, `script.js`, và thư mục `assets`) vào repo đó.
3. Commit và Push lên nhánh `main`.
4. Trong vài giây, portfolio sẽ hoạt động ngay lập tức tại:  
   👉 **`https://ptphat77.github.io`**

### Cách 2: Triển khai từ một repo con (ví dụ: `ptphat77/portfolio`)
1. Tạo repo `portfolio` trên GitHub và đẩy mã nguồn vào.
2. Vào **Settings** của repo -> chọn mục **Pages**.
3. Tại **Build and deployment** > **Source**, chọn **Deploy from a branch**.
4. Chọn nhánh `main` và thư mục `/ (root)`, nhấn **Save**.
5. Đường link portfolio của bạn sẽ là:  
   👉 **`https://ptphat77.github.io/portfolio/`**
