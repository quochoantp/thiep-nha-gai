# Thiệp cưới online — React

Thiệp cưới một trang, chạy mượt trên **điện thoại** và **máy tính**.

- **Điện thoại:** dạng thiệp dọc giống bản gốc.
- **Máy tính (≥ 900px):** tự chuyển sang bố cục nhiều cột:
  - Bìa tràn toàn màn hình.
  - Lời mời nằm cạnh bản đồ.
  - Dải phim nằm ngang.
  - Ảnh ghép nằm cạnh chữ "I LOVE YOU".
  - Lịch nằm cạnh "Save the date".

Thiệp gồm các phần, theo thứ tự:

1. Màn mở thiệp
2. "We got married"
3. Wedding & lời ngỏ
4. Hai gia đình
5. Lời mời, địa điểm và bản đồ
6. Dải phim và đếm ngược
7. My love / I love you
8. Save the date (lịch polaroid)
9. Sweet wedding invitation
10. Hộp quà mừng (mã QR, chỉ hiện khi có tài khoản)
11. Thank you

Ngoài ra luôn có nút bật/tắt nhạc ở góc trên và nút **bắn tim** ở góc dưới. Bấm vào ảnh nào cũng xem phóng to được.

---

## Chạy thử

Chạy được với **Node 14.18 trở lên**, kể cả Node 14 + npm 6.

```bat
npm install
npm run dev
```

Mở địa chỉ `http://localhost:5173` mà lệnh in ra. Lệnh dev có sẵn `--host`, nên điện thoại dùng chung Wi-Fi mở được địa chỉ dạng `http://192.168.x.x:5173` mà lệnh in ra.

Xuất bản để đưa lên mạng:

```bat
npm run build
```

Kết quả nằm trong thư mục `dist/`.

> Với npm 6, khi cài sẽ hiện một số dòng `npm WARN notsup` (về rollup, fsevents, @esbuild…). Đó chỉ là cảnh báo, **không phải lỗi**, cứ bỏ qua.

---

## Ba thứ bạn tự truyền vào

`src/main.jsx` truyền 3 nguồn dữ liệu vào component `<WeddingInvitation>`:

```jsx
<WeddingInvitation content={content} images={images} audio={audio} />
```

### 1. Thông điệp: `src/config/content.js`

File này chứa mọi chữ trên thiệp: tên cô dâu chú rể, ngày giờ, ngày âm lịch, thông tin hai gia đình, địa điểm, các câu thơ và lời nhắn, chữ trên dải phim, và tài khoản mừng cưới.

- Ngày ghi dạng `'2026-12-12'`, giờ dạng `'11:00'`. **Thứ trong tuần, lịch tháng và đồng hồ đếm ngược đều tự tính** từ đó.
- Ngày âm lịch thì nhập tay: `lunarFull` là dòng đầy đủ, `lunarShort` là dòng ngắn ghi dưới lịch.
- Câu nhiều dòng viết thành mảng, mỗi phần tử là một dòng.

### 2. Ảnh: `src/assets/images/`

**Chép ảnh của bạn đè lên file cùng tên.** Danh sách ảnh và kích thước gợi ý ghi ở đầu file `src/assets/images/index.js`.

| File | Dùng ở đâu | Gợi ý |
|---|---|---|
| `hero.jpg` | Bìa trên điện thoại | dọc 3:4 |
| `hero-wide.jpg` | Bìa trên máy tính | ngang 16:9 |
| `feature.jpg` | Ảnh dưới "FALL IN LOVE WEDDING" | ngang |
| `groom.jpg`, `bride.jpg` | Ảnh chú rể, cô dâu | dọc 2:3 |
| `film-1/2/3.jpg` | 3 khung dải phim | ngang 3:2 |
| `love-main.jpg` | Ảnh lớn phần My love | dọc 3:4 |
| `love-cutout.webp` | Ảnh cặp đôi **đã tách nền** (PNG trong suốt) | — |
| `duo-1.jpg`, `duo-2.jpg` | Hai ảnh quanh hàng chữ thứ hai | ngang |
| `calendar.jpg` | Ảnh trong khung lịch polaroid | dọc 4:5 |
| `closing.jpg` / `closing-wide.jpg` | Ảnh "Sweet wedding invitation" (điện thoại / máy tính) | dọc / ngang |
| `qr-groom.png`, `qr-bride.png` | Mã QR mừng cưới | vuông |

- **Ảnh tách nền:** viền trắng kiểu sticker được CSS tự vẽ, bạn chỉ cần một ảnh PNG đã xoá nền. Có thể tách nền miễn phí ở remove.bg, hoặc trên iPhone nhấn giữ vào người trong ảnh → Sao chép → dán vào ứng dụng ghi chú rồi lưu.
- **Đổi định dạng file:** muốn dùng `.png` / `.webp` thay vì `.jpg` thì sửa dòng `import` tương ứng trong `index.js`.
- **Nén ảnh** (rộng khoảng 1600px, dưới 400KB mỗi ảnh) để thiệp mở nhanh trên 4G.

### 3. Âm thanh: `public/audio/` và `src/config/audio.js`

- Chép file nhạc vào `public/audio/`, đặt tên `background.mp3`.
- Nếu muốn giữ tên khác, sửa `src` trong `audio.js`.
- Chỉnh âm lượng ở `volume` (từ 0 đến 1).
- Tắt hẳn nhạc: đặt `enabled: false`.

Nhạc tự bật khi mở thiệp. Trình duyệt thường chặn phát nhạc cho tới lần chạm đầu tiên, nên nhạc sẽ bắt đầu ngay khi khách bấm **"Mở thiệp"** hoặc chạm vào trang. Khách tắt/bật bằng nút loa ở góc trên.

---

## Đổi màu và font

Đầu file `src/styles/global.css` có bảng màu (`--taupe`, `--wine`, `--gold`…) và tên các font.

Chữ trang trí lớn (WEDDING, SAVE THE DATE, I LOVE YOU, GROOM/BRIDE, Thank you) dùng font **Poiret One**. Font này **không có dấu tiếng Việt**, nên hãy giữ các chữ đó bằng tiếng Anh.

## Đưa lên mạng

Chạy `npm run build`, rồi chọn một trong hai cách:

- Kéo thư mục `dist/` vào **Netlify Drop** (app.netlify.com/drop).
- Đẩy code lên GitHub rồi import vào **Vercel** hoặc **Netlify**, với build command `npm run build` và output `dist`.

## Cấu trúc thư mục

```
src/
├── main.jsx                 truyền content / images / audio vào thiệp
├── WeddingInvitation.jsx    khung chính: nhạc, hộp thoại, thứ tự các phần
├── config/
│   ├── content.js           ← THÔNG ĐIỆP
│   └── audio.js             ← ÂM THANH
├── assets/images/           ← ẢNH (+ index.js)
├── components/              mỗi phần của thiệp là một file
├── utils/                   ngày tháng
└── styles/global.css        màu, font, hiệu ứng, bố cục điện thoại / máy tính
public/audio/background.mp3  nhạc nền
```
