import { useInvitation } from '../context'
import { Lines, Reveal, Spread } from './ui'

export default function Closing() {
  const { content, images } = useInvitation()
  const c = content.closing

  return (
    <section className="closing">
      <div className="closing-media">
        <picture>
          <source media="(min-width: 900px)" srcSet={images.closingWide} />
          <img src={images.closing} alt="" loading="lazy" />
        </picture>
        <Spread words={c.labels} className="closing-labels serif" />
      </div>
      <div className="container narrow center">
        <Reveal effect="up">
          <Lines lines={c.quote} className="thin closing-quote" />
        </Reveal>
      </div>
    </section>
  )
}
