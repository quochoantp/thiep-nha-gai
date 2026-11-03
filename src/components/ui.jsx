import { useEffect, useRef, useState } from 'react'
import { useInvitation } from '../context'

/**
 * Hiện dần khi cuộn tới.
 * effect: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade' | 'wipe'
 */
export function Reveal({ as, effect = 'up', delay = 0, duration, className = '', style, children, ...rest }) {
  const Tag = as || 'div'
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: effect === 'wipe' ? 0 : 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [effect])

  const s = Object.assign({}, style, { transitionDelay: delay + 'ms' })
  if (duration) s.transitionDuration = duration + 'ms'

  return (
    <Tag ref={ref} className={'reveal reveal--' + effect + (shown ? ' is-in' : '') + ' ' + className} style={s} {...rest}>
      {children}
    </Tag>
  )
}

/** Ảnh có thể bấm để phóng to */
export function Photo({ src, alt = '', className = '', ...rest }) {
  const { openLightbox } = useInvitation()
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={'photo ' + className}
      onClick={() => openLightbox(src)}
      {...rest}
    />
  )
}

/** Hàng 3 chữ dàn đều: FALL IN — LOVE — WEDDING */
export function Spread({ words, className = '' }) {
  return (
    <div className={'spread ' + className}>
      {words.map((w, i) => (
        <span key={w + i}>{w}</span>
      ))}
    </div>
  )
}

/** Các dòng chữ (mảng -> nhiều dòng) */
export function Lines({ lines, className = '', as }) {
  const Tag = as || 'p'
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          {l}
        </span>
      ))}
    </Tag>
  )
}

export function Heart({ className = '' }) {
  return (
    <svg className={'heart ' + className} viewBox="0 0 24 22" aria-hidden="true">
      <path d="M12 21.5S1.5 14.8 1.5 7.6C1.5 4 4.2 1.5 7.3 1.5c2 0 3.7 1 4.7 2.6 1-1.6 2.7-2.6 4.7-2.6 3.1 0 5.8 2.5 5.8 6.1 0 7.2-10.5 13.9-10.5 13.9z" />
    </svg>
  )
}

const ICONS = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  gift: (
    <>
      <rect x="3.5" y="8" width="17" height="4" rx="0.5" />
      <path d="M5 12v8h14v-8M12 8v12" />
      <path d="M12 8c-1.5-3.5-5.5-4-5.5-1.5S10 8 12 8zM12 8c1.5-3.5 5.5-4 5.5-1.5S14 8 12 8z" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9.5v5h3.5L12 18.500v-13L7.5 9.500z" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.500a7.8 7.8 0 0 1 0 11" />
    </>
  ),
  muted: (
    <>
      <path d="M4 9.500v5h3.500L12 18.500v-13L7.5 9.500z" />
      <path d="M16 9.500l5 5M21 9.500l-5 5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  dining: <path d="M5 3v6a2 2 0 0 0 4 0V3M7 3v18M17 21V3c-2.5 1-4 4.5-4 9h4" />,
  camera: (
    <>
      <path d="M4 8h4l2-3h4l2 3h4v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="15" r="6" />
      <path d="M9.5 9.5L8 6l2-3h4l2 3-1.5 3.5" />
    </>
  ),
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
}

export function Icon({ name, size = 20 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

/** Hộp thoại dùng chung */
export function Modal({ open, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={'modal ' + className} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Đóng">
          <Icon name="close" />
        </button>
        {title && <h3 className="modal-title">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
