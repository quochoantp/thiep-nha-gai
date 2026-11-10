import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InvitationContext } from './context'

import Opening from './components/Opening'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Families from './components/Families'
import Venue from './components/Venue'
import Timeline from './components/Timeline'
import FilmStrip from './components/FilmStrip'
import MyLove from './components/MyLove'
import SaveTheDate from './components/SaveTheDate'
import Closing from './components/Closing'
import Gift, { GiftModal } from './components/Gift'
import { BottomBar, Lightbox, MusicButton } from './components/Controls'
import useAutoScroll from './utils/useAutoScroll'

/**
 * Thiệp cưới. Nhận 3 nguồn dữ liệu qua props:
 *   content – chữ, thông điệp, ngày giờ   (src/config/content.js)
 *   images  – ảnh                          (src/assets/images/index.js)
 *   audio   – nhạc nền                     (src/config/audio.js)
 */
export default function WeddingInvitation({ content, images, audio }) {
  const audioRef = useRef(null)
  const mutedRef = useRef(false) // khách đã tự tắt thì không tự bật lại
  const [opened, setOpened] = useState(!content.opening.enabled)
  const [started, setStarted] = useState(!content.opening.enabled)
  const [playing, setPlaying] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  const auto = content.autoScroll || {}
  useAutoScroll({
    active: auto.enabled !== false && opened,
    paused: giftOpen || !!lightbox,
    speed: auto.speed,
    delay: auto.delay,
    resumeAfter: auto.resumeAfter,
  })

  const hasAudio = !!(audio && audio.enabled && audio.src)
  const coupleNames = content.couple.map((k) => content[k].name).join(' & ')

  useEffect(() => {
    document.title = coupleNames + ' — ' + content.wedding.eventName
  }, [coupleNames, content.wedding.eventName])

  useEffect(() => {
    if (audioRef.current && audio) audioRef.current.volume = audio.volume == null ? 0.6 : audio.volume
  }, [audio])

  const play = useCallback(() => {
    const el = audioRef.current
    if (!el || mutedRef.current) return
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
  }, [])

  // Tự bật nhạc: thử phát ngay; trình duyệt chặn thì phát ở lần chạm đầu tiên
  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined
    const EVENTS = ['click', 'touchend', 'keydown']
    const once = (e) => {
      // Chạm vào nút nhạc thì để nút đó tự xử lý
      if (e.target.closest && e.target.closest('.music-btn')) return
      play()
    }
    const stop = () => {
      EVENTS.forEach((t) => window.removeEventListener(t, once))
      el.removeEventListener('playing', stop)
    }
    EVENTS.forEach((t) => window.addEventListener(t, once))
    el.addEventListener('playing', stop)
    play()
    return stop
  }, [hasAudio, play])

  const handleOpen = () => {
    play()
    setStarted(true)
    setTimeout(() => setOpened(true), 1000)
  }

  const toggleMusic = () => {
    const el = audioRef.current
    if (!el) return
    mutedRef.current = !el.paused
    if (el.paused) play()
    else el.pause()
  }

  const ctx = useMemo(
    () => ({
      content,
      images,
      audio,
      openGift: () => setGiftOpen(true),
      openLightbox: (src) => setLightbox(src),
    }),
    [content, images, audio]
  )

  const closeGift = useCallback(() => setGiftOpen(false), [])

  return (
    <InvitationContext.Provider value={ctx}>
      {hasAudio && (
        <audio
          ref={audioRef}
          src={audio.src}
          loop={audio.loop !== false}
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      {!opened && <Opening onOpen={handleOpen} />}

      <main className="page">
        <Hero started={started} />
        <Intro />
        <Families />
        <Venue />
        <Timeline />
        <FilmStrip />
        <MyLove />
        <SaveTheDate />
        <Closing />
        <Gift />
        <footer className="thanks">
          <p className="deco thanks-title">{content.closing.thankYou}</p>
          <p className="sans thanks-names">
            {coupleNames}
          </p>
        </footer>
      </main>

      {hasAudio && <MusicButton playing={playing} onToggle={toggleMusic} />}
      <BottomBar />

      <GiftModal open={giftOpen} onClose={closeGift} />
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </InvitationContext.Provider>
  )
}
