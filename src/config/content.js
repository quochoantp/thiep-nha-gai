/**
 * ============================================================
 *  THÔNG ĐIỆP & NỘI DUNG CHỮ CỦA THIỆP
 *  Sửa file này để đổi mọi chữ hiển thị — không cần đụng component.
 * ============================================================
 *  - Ngày dạng 'YYYY-MM-DD', giờ dạng 'HH:mm'. Thứ trong tuần tự tính.
 *  - Mỗi phần tử trong mảng `lines` là một dòng.
 *  - Các chữ trang trí lớn (WEDDING, SAVE THE DATE, I LOVE YOU, GROOM…)
 *    dùng font Poiret One — font này KHÔNG có dấu tiếng Việt,
 *    nên hãy giữ các chữ này bằng tiếng Anh/không dấu.
 */
const content = {
  // ---------- Thông tin chung ----------
  groom: { name: 'Quốc Hoàn', label: 'GROOM' },
  bride: { name: 'Linh Linh', label: 'BRIDE' },
  // Thứ tự tên trên thiệp: thiệp nhà gái ghi cô dâu trước
  couple: ['bride', 'groom'],

  wedding: {
    date: '2026-11-22', // ngày tiệc — dùng cho đếm ngược, lịch, ngày ở bìa
    time: '08:00', // giờ mời khách (khai tiệc); giờ làm lễ ghi ở phần timeline
    timezone: '+07:00',
    lunarFull: 'Tức ngày 14 tháng 10 năm Bính Ngọ',
    lunarShort: 'Âm lịch 14/10',
    eventName: 'Lễ Vu Quy',
  },

  // ---------- Màn mở thiệp (cần một lần chạm để trình duyệt cho phát nhạc) ----------
  opening: {
    enabled: true,
    eyebrow: 'Lễ Vu Quy',
    button: 'Mở thiệp',
  },

  // ---------- Tự cuộn thiệp từ đầu đến cuối sau khi mở ----------
  autoScroll: {
    enabled: true,
    speed: 60, // điểm ảnh mỗi giây (càng lớn càng nhanh)
    delay: 3000, // chờ bao lâu sau khi mở thiệp mới bắt đầu cuộn (ms)
    resumeAfter: 4000, // khách tự cuộn/chạm thì dừng, để yên bấy nhiêu ms sẽ chạy tiếp
  },

  // ---------- 1. Bìa ----------
  hero: {
    // Thứ tự tên dưới ảnh bìa, khớp vị trí trong ảnh: chú rể bên trái, cô dâu bên phải
    couple: ['groom', 'bride'],
    topWords: ['YOU ARE', 'THE LOVE OF', 'MY LIFE'],
    title: ['We got', 'married'],
    subtitle: "It's been a long time, see you at the wedding!",
  },

  // ---------- 2. Giới thiệu ----------
  intro: {
    title: 'WEDDING',
    subtitle: 'THIỆP MỜI LỄ VU QUY',
    labels: ['FALL IN', 'LOVE', 'WEDDING'],
    caption: 'As the clouds and mist dissipate, I love you and everyone knows it',
    lines: [
      'Gửi đến bạn tấm thiệp cưới đầy yêu thương.',
      'Những ai nhận được lời mời này đều là những người đặc biệt với bọn mình.',
      'Mong bạn và gia đình sẽ đến chung vui,',
      'Cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.',
      'Cảm ơn vì luôn bên cạnh và yêu thương.',
      'Bọn mình rất mong được gặp bạn trong ngày vui này! ❤️',
    ],
  },

  // ---------- 3. Hai gia đình ----------
  families: [
    {
      side: 'NHÀ GÁI',
      person: 'bride',
      father: 'TRẦN VĂN MAY',
      mother: 'LƯƠNG THỊ LIỄU',
      address: 'Thôn An Thịnh, Xã Đông Tiền Hải, Tỉnh Hưng Yên',
    },
    {
      side: 'NHÀ TRAI',
      person: 'groom',
      father: 'ĐỒNG VĂN HẬU',
      mother: 'VŨ THỊ HUẾ',
      address: 'Tổ 21, Phường Thái Bình, Tỉnh Hưng Yên',
    },
  ],

  // ---------- 4. Lời mời & địa điểm tiệc ----------
  invitation: {
    eyebrow: 'TRÂN TRỌNG KÍNH MỜI',
    lines: ['TỚI DỰ BỮA CƠM THÂN MẬT', 'CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI'],
    atLabel: 'VÀO LÚC',
    venueLabel: 'TẠI',
    venueName: 'Tư gia nhà gái',
    address: 'Thôn An Thịnh, Xã Đông Tiền Hải, Tỉnh Hưng Yên',
    welcome: 'Rất hân hạnh được đón tiếp!',
  },

  // ---------- Timeline ngày cưới ----------
  timeline: {
    title: 'Timeline',
    items: [
      { time: '08:00', label: 'Khai tiệc', icon: 'dining' },
      { time: '09:00', label: 'Chụp ảnh', icon: 'camera' },
      { time: '11:00', label: 'Lễ Vu Quy', icon: 'ring' },
    ],
  },

  // ---------- 5. Dải phim + đếm ngược ----------
  film: {
    labels: ['WELCOME', 'TO', 'WEDDING'],
    brand: 'KODAK 400',
    captions: [
      'I love three things in this world.',
      'Sun, moon and you.',
      'Sun for morning, moon for night, and you forever.',
    ],
    countdownUnits: ['ngày', 'giờ', 'phút', 'giây'],
    countdownDone: 'Hôm nay là ngày chung đôi!',
  },

  // ---------- 6. My love ----------
  love: {
    quote: [
      'Có lẽ thế gian này có vô vàn điều tươi đẹp,',
      'Nhưng trong lòng em, đẹp nhất vẫn chỉ có anh',
    ],
    sideWords: ['MY LOVE', 'FOREVER'],
    title: 'I LOVE YOU',
    lines: ['Mong gió xuân dịu dàng với em hơn,', 'Xua tan muộn phiền,', 'Để mọi thứ chỉ còn lại dịu êm.'],
    duoLabels: ['FALL IN', 'LOVE', 'WEDDING'],
  },

  // ---------- 7. Save the date ----------
  saveTheDate: {
    title: 'SAVE THE DATE',
    lines: ['Đi một vòng lớn rồi vẫn gặp anh,', 'Từ đó, thế gian bỗng hóa dịu dàng.'],
    after: ['Hạnh phúc lớn nhất chính là được nắm tay anh,', 'Cùng nhau đi hết cuộc đời lãng mạn này'],
    addToCalendar: 'Thêm vào lịch',
  },

  // ---------- 8. Kết ----------
  closing: {
    labels: ['SWEET', 'WEDDING', 'INVITATION'],
    quote: ['Sự hiện diện của Quý vị là niềm vinh hạnh', 'cho gia đình chúng tôi!'],
    thankYou: 'Thank you',
  },

  // ---------- 9. Hộp quà mừng ----------
  gift: {
    title: 'HỘP QUÀ MỪNG',
    hint: 'Nhấn vào hộp quà để mở',
    note: 'Cảm ơn tấm lòng của bạn dành cho chúng mình!',
    /**
     * Để mảng rỗng: ẩn toàn bộ phần hộp quà.
     * Khi có tài khoản, thêm theo mẫu và chép mã QR đè lên qr-bride.png / qr-groom.png:
     *   { label: 'Mừng cưới cô dâu', bank: '...', owner: '...', number: '...', qr: 'qrBride' }
     */
    accounts: [],
  },
}

export default content
