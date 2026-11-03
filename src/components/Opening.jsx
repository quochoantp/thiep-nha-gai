import { useEffect, useState } from 'react'
import { useInvitation } from '../context'
import { dotted, parseDate } from '../utils/date'

/** Màn mở thiệp — cần một lần chạm để trình duyệt cho phép phát nhạc */
export default function Opening({ onOpen }) {
  const { content, images } = useInvitation()
  const [leaving, setLeaving] = useState(false)
  const date = parseDate(content.wedding.date)
  const couple = content.couple.map((k) => content[k])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const open = () => {
    setLeaving(true)
    onOpen()
  }

  return (
    <div className={'opening' + (leaving ? ' is-leaving' : '')}>
      <picture className="opening-bg">
        <source media="(min-width: 900px)" srcSet={images.heroWide} />
        <img src={images.hero} alt="" />
      </picture>
      <div className="opening-inner">
        <p className="opening-eyebrow">{content.opening.eyebrow}</p>
        <h1 className="opening-names">
          <span>{couple[0].name}</span>
          <em>&amp;</em>
          <span>{couple[1].name}</span>
        </h1>
        <p className="opening-date">{dotted(date)}</p>
        <button className="btn btn-light opening-btn" onClick={open}>
          {content.opening.button}
        </button>
      </div>
    </div>
  )
}
