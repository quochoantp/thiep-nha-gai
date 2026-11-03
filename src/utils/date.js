const WEEKDAYS = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY']
const WEEKDAYS_TITLE = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

export const pad = (n) => (n < 10 ? '0' + n : String(n))

/** 'YYYY-MM-DD' -> Date theo giờ địa phương */
export function parseDate(str) {
  const parts = str.split('-').map(Number)
  return new Date(parts[0], parts[1] - 1, parts[2])
}

export const weekdayUpper = (d) => WEEKDAYS[d.getDay()]
export const weekdayTitle = (d) => WEEKDAYS_TITLE[d.getDay()]

/** 12.12.2026 */
export const dotted = (d) => pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear()
/** 2026.12.12 */
export const dottedReverse = (d) => d.getFullYear() + '.' + pad(d.getMonth() + 1) + '.' + pad(d.getDate())
/** 12/12/2026 */
export const slashed = (d) => pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear()

/** Thời điểm cưới (ms) từ cấu hình */
export function weddingTimestamp(wedding) {
  return new Date(wedding.date + 'T' + wedding.time + ':00' + (wedding.timezone || '+07:00')).getTime()
}

export function timeLeft(target) {
  const ms = Math.max(0, target - Date.now())
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  }
}

/** Ô lịch của tháng, tuần bắt đầu từ thứ Hai; null = ô trống */
export function monthGrid(d) {
  const year = d.getFullYear()
  const month = d.getMonth()
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let i = 1; i <= days; i++) cells.push(i)
  while (cells.length % 7) cells.push(null)
  return cells
}

/** 12:00 PM */
export function time12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return pad(h12) + ':' + pad(m) + ' ' + suffix
}

/** Link "Thêm vào Google Calendar" (sự kiện dài 4 tiếng) */
export function googleCalendarLink({ title, start, location, details }) {
  const fmt = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: fmt(start) + '/' + fmt(start + 4 * 3600000),
    location: location || '',
    details: details || '',
  })
  return 'https://calendar.google.com/calendar/render?' + params.toString()
}
