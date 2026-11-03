import { useRef, useState } from 'react'
import { useInvitation } from '../context'
import { Heart, Icon } from './ui'

/** Nút bật/tắt âm thanh ở góc trên */
export function MusicButton({ playing, onToggle }) {
  return (
    <button
      className={'music-btn' + (playing ? ' is-playing' : '')}
      onClick={onToggle}
      aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
      aria-pressed={playing}
      title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
    >
      <Icon name={playing ? 'volume' : 'muted'} size={20} />
    </button>
  )
}

const HEART_COLORS = ['#e8405f', '#ff7d9c', '#ffb3c6', '#c9184a']
const BURST = 10
const MAX_HEARTS = 80

/** Nút bắn tim: mỗi lần bấm, một chùm tim bay từ nút lên */
function HeartButton() {
  const [hearts, setHearts] = useState([])
  const nextId = useRef(0)

  const shoot = () => {
    const burst = Array.from({ length: BURST }, () => ({
      id: nextId.current++,
      size: 16 + Math.random() * 22,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      dx: Math.round(-30 - Math.random() * 180) + 'px',
      rise: Math.round(45 + Math.random() * 40) + 'vh',
      rot: Math.round(Math.random() * 70 - 35) + 'deg',
      delay: Math.round(Math.random() * 350),
      duration: Math.round(1500 + Math.random() * 1100),
    }))
    setHearts((h) => h.concat(burst).slice(-MAX_HEARTS))
  }

  const remove = (id) => setHearts((h) => h.filter((x) => x.id !== id))

  return (
    <>
      <div className="heart-layer" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="fly-heart"
            style={{
              width: h.size,
              height: h.size,
              color: h.color,
              '--dx': h.dx,
              '--rise': h.rise,
              '--rot': h.rot,
              animationDelay: h.delay + 'ms',
              animationDuration: h.duration + 'ms',
            }}
            onAnimationEnd={() => remove(h.id)}
          >
            <Heart />
          </span>
        ))}
      </div>
      <button className="round-btn heart-btn" onClick={shoot} aria-label="Bắn tim" title="Bắn tim">
        <Heart />
      </button>
    </>
  )
}

/** Thanh nổi phía dưới: hộp quà (nếu có tài khoản) · bắn tim */
export function BottomBar() {
  const { content, openGift } = useInvitation()

  return (
    <div className="bottombar">
      <div className="bottombar-row">
        {content.gift.accounts.length > 0 && (
          <button className="round-btn" onClick={openGift} aria-label={content.gift.title}>
            <Icon name="gift" size={20} />
          </button>
        )}
        <HeartButton />
      </div>
    </div>
  )
}

/** Xem ảnh phóng to */
export function Lightbox({ src, onClose }) {
  if (!src) return null
  return (
    <div className="lightbox" onClick={onClose}>
      <img src={src} alt="" />
      <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
        <Icon name="close" size={22} />
      </button>
    </div>
  )
}
