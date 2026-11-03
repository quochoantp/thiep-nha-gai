import { useEffect, useState } from 'react'
import { useInvitation } from '../context'
import { timeLeft, weddingTimestamp } from '../utils/date'
import { Photo, Reveal, Spread } from './ui'

function Countdown() {
  const { content } = useInvitation()
  const target = weddingTimestamp(content.wedding)
  const [left, setLeft] = useState(() => timeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (left.done) return <p className="countdown-done serif">{content.film.countdownDone}</p>

  const values = [left.days, left.hours, left.minutes, left.seconds]
  return (
    <div className="countdown">
      {values.map((v, i) => (
        <div key={i} className="countdown-cell">
          <span className="serif countdown-num">{v}</span>
          <span className="serif countdown-unit">{content.film.countdownUnits[i]}</span>
        </div>
      ))}
    </div>
  )
}

export default function FilmStrip() {
  const { content, images } = useInvitation()
  const { film } = content
  const frameNo = [42, 43, 44]

  return (
    <section className="film">
      <div className="container wide">
        <Reveal effect="fade">
          <Spread words={film.labels} className="labels" />
        </Reveal>
      </div>

      <div className="film-dark">
        <div className="film-strip">
          <span className="film-edge film-edge--a" aria-hidden="true">
            <i>{film.brand}</i>
            <i>{film.brand}</i>
            <i>{film.brand}</i>
          </span>
          <div className="film-frames">
            {images.film.map((src, i) => (
              <Reveal key={i} className="film-frame" effect="zoom" delay={i * 120} duration={1200}>
                <span className="film-no" aria-hidden="true">
                  ▲ {frameNo[i]}
                </span>
                <Photo src={src} alt="" />
                <span className="film-caption">{film.captions[i]}</span>
              </Reveal>
            ))}
          </div>
          <span className="film-edge film-edge--b" aria-hidden="true">
            <i>11</i>
            <i>RASSVET 2010TX</i>
            <i>12</i>
          </span>
        </div>
        <Reveal effect="up">
          <Countdown />
        </Reveal>
      </div>
    </section>
  )
}
