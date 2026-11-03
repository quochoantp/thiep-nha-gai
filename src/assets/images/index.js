/**
 * ============================================================
 *  ẢNH CỦA THIỆP — tất cả nằm trong thư mục này (src/assets/images)
 * ============================================================
 *  Cách thay: chép ảnh của bạn ĐÈ LÊN file cùng tên.
 *  Muốn dùng tên/đuôi khác (vd. .png, .webp) thì sửa dòng import tương ứng.
 *
 *  hero.jpg          Ảnh bìa "We got married" (DỌC, ~ 3:4)
 *  hero-wide.jpg     Ảnh bìa cho MÁY TÍNH (NGANG, ~ 16:9)
 *  feature.jpg       Ảnh ngang dưới chữ "FALL IN LOVE WEDDING"
 *  groom.jpg         Ảnh chú rể (dọc ~ 2:3)
 *  bride.jpg         Ảnh cô dâu (dọc ~ 2:3)
 *  film-1/2/3.jpg    3 khung trong dải phim (ngang ~ 3:2)
 *  love-main.jpg     Ảnh lớn phần "MY LOVE" (dọc ~ 3:4)
 *  love-cutout.webp  Ảnh cặp đôi ĐÃ TÁCH NỀN (PNG trong suốt) — viền trắng
 *                    được tự tạo bằng CSS. Có thể tách nền miễn phí tại
 *                    remove.bg hoặc ứng dụng Ảnh trên iPhone (nhấn giữ chủ thể).
 *  duo-1.jpg         Ảnh ngang trên hàng chữ "FALL IN LOVE WEDDING" thứ hai
 *  duo-2.jpg         Ảnh ngang dưới hàng chữ đó
 *  calendar.jpg      Ảnh trong khung polaroid có lịch (dọc ~ 4:5)
 *  closing.jpg       Ảnh "SWEET WEDDING INVITATION" (dọc ~ 3:4)
 *  closing-wide.jpg  Bản ngang của ảnh trên cho máy tính
 *  qr-groom.png      Mã QR mừng cưới chú rể
 *  qr-bride.png      Mã QR mừng cưới cô dâu
 */
import hero from './hero.jpg'
import heroWide from './hero-wide.jpg'
import feature from './feature.jpg'
import groom from './groom.jpg'
import bride from './bride.jpg'
import film1 from './film-1.jpg'
import film2 from './film-2.jpg'
import film3 from './film-3.jpg'
import loveMain from './love-main.jpg'
import loveCutout from './love-cutout.webp'
import duo1 from './duo-1.jpg'
import duo2 from './duo-2.jpg'
import calendar from './calendar.jpg'
import closing from './closing.jpg'
import closingWide from './closing-wide.jpg'
import qrGroom from './qr-groom.png'
import qrBride from './qr-bride.png'

const images = {
  hero,
  heroWide,
  feature,
  groom,
  bride,
  film: [film1, film2, film3],
  loveMain,
  loveCutout,
  duo: [duo1, duo2],
  calendar,
  closing,
  closingWide,
  qrGroom,
  qrBride,
}

export default images
