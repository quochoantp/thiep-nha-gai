import { useState } from 'react'
import { useInvitation } from '../context'
import { Icon, Modal, Reveal } from './ui'

/* ---------- Hình hộp quà ---------- */
export function GiftBox({ className = '' }) {
  return (
    <svg className={'giftbox ' + className} viewBox="0 0 120 120" aria-hidden="true">
      <g stroke="#9b3b52" strokeWidth="4" strokeLinejoin="round">
        <path className="giftbox-bow" d="M60 34c-8-16-26-16-24-4 1 6 12 6 24 4zM60 34c8-16 26-16 24-4-1 6-12 6-24 4z" fill="#f0c95b" />
        <path className="giftbox-heart" d="M60 30s-14-8-14-17c0-5 4-8 8-8 3 0 5 2 6 4 1-2 3-4 6-4 4 0 8 3 8 8 0 9-14 17-14 17z" fill="#f48aa6" />
        <rect x="18" y="34" width="84" height="20" fill="#f19ab3" />
        <rect x="26" y="54" width="68" height="52" fill="#f19ab3" />
        <rect x="52" y="34" width="16" height="72" fill="#f0c95b" />
      </g>
    </svg>
  )
}

/* ---------- Hộp thoại mừng cưới (QR) ---------- */
export function GiftModal({ open, onClose }) {
  const { content, images } = useInvitation()
  const g = content.gift
  const [copied, setCopied] = useState(-1)

  const copy = (i, number) => {
    const text = number.replace(/\s/g, '')
    const done = () => {
      setCopied(i)
      setTimeout(() => setCopied(-1), 1800)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {})
  }

  return (
    <Modal open={open} onClose={onClose} title={g.title} className="modal-wide">
      <p className="modal-note">{g.note}</p>
      <div className="qr-grid">
        {g.accounts.map((a, i) => (
          <div key={a.label} className="qr-card">
            <p className="qr-label">{a.label}</p>
            <img src={images[a.qr]} alt={'QR ' + a.label} />
            <p className="qr-bank">{a.bank}</p>
            <p className="qr-owner">{a.owner}</p>
            <p className="qr-number">{a.number}</p>
            <div className="qr-actions">
              <button className="btn btn-small btn-outline" onClick={() => copy(i, a.number)}>
                <Icon name={copied === i ? 'check' : 'copy'} size={14} /> {copied === i ? 'Đã chép' : 'Chép STK'}
              </button>
              <a className="btn btn-small btn-dark" href={images[a.qr]} download={'qr-' + (i + 1) + '.png'}>
                <Icon name="download" size={14} /> Lưu QR
              </a>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

/* ---------- Phần Hộp quà trên trang (ẩn khi chưa có tài khoản) ---------- */
export default function Gift() {
  const { content, openGift } = useInvitation()
  const { gift } = content
  if (!gift.accounts.length) return null

  return (
    <section className="gift-section">
      <Reveal className="gift center" effect="zoom">
        <button className="gift-btn" onClick={openGift} aria-label={gift.hint}>
          <GiftBox />
        </button>
        <h2 className="serif gift-title">{gift.title}</h2>
        <p className="sans gift-hint">{gift.hint}</p>
      </Reveal>
    </section>
  )
}
