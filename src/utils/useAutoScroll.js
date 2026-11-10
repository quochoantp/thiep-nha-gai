import { useEffect, useRef } from 'react'

/**
 * Tự cuộn thiệp từ đầu đến cuối.
 *  - Khách chạm / lăn chuột / bấm phím  → tạm dừng
 *  - Để yên `resumeAfter` ms             → chạy tiếp từ vị trí hiện tại
 *  - Tới cuối trang                      → dừng hẳn
 *  - `paused` = true (đang mở ảnh, hộp quà…) → đứng yên
 */
export default function useAutoScroll({ active, paused, speed = 45, delay = 3000, resumeAfter = 4000 }) {
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    if (!active) return undefined
    const root = document.documentElement
    const prevBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto' // CSS đang để smooth, sẽ làm cuộn từng bước bị giật

    let raf = 0
    let last = 0
    let pos = window.scrollY
    let holdUntil = performance.now() + delay
    let done = false

    const maxY = () => root.scrollHeight - window.innerHeight

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      if (done || pausedRef.current || now < holdUntil) {
        pos = window.scrollY
        return
      }
      // Khách kéo thanh cuộn hoặc trang tự nhảy: đồng bộ lại vị trí
      if (Math.abs(window.scrollY - pos) > 3) pos = window.scrollY
      pos = Math.min(pos + (speed * dt) / 1000, maxY())
      window.scrollTo(0, pos)
      if (pos >= maxY() - 1) done = true
    }

    const hold = (e) => {
      // Bấm nút nhạc / bắn tim không làm dừng cuộn
      if (e && e.target && e.target.closest && e.target.closest('.music-btn, .bottombar')) return
      holdUntil = performance.now() + resumeAfter
    }
    const EVENTS = ['wheel', 'touchstart', 'touchmove', 'mousedown', 'keydown']
    EVENTS.forEach((t) => window.addEventListener(t, hold, { passive: true }))
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      EVENTS.forEach((t) => window.removeEventListener(t, hold))
      root.style.scrollBehavior = prevBehavior
    }
  }, [active, speed, delay, resumeAfter])
}
