import { useInvitation } from '../context'
import { dottedReverse, parseDate } from '../utils/date'
import { Reveal, Spread } from './ui'

export default function Hero({ started }) {
  const { content, images } = useInvitation()
  const { hero } = content
  const couple = content.couple.map((k) => content[k])
  const date = parseDate(content.wedding.date)

  return (
    <section className={'hero' + (started ? ' is-started' : '')}>
      <div className="hero-media">
        <picture>
          <source media="(min-width: 900px)" srcSet={images.heroWide} />
          <img src={images.hero} alt={couple[0].name + ' & ' + couple[1].name} />
        </picture>
      </div>

      <div className="hero-head">
        <Spread words={hero.topWords} className="hero-topwords" />
        <h1 className="hero-title">
          {hero.title.map((t, i) => (
            <span key={t} className="hero-title-line" style={{ animationDelay: 300 + i * 650 + 'ms' }}>
              {t}
            </span>
          ))}
        </h1>
        <p className="hero-sub">{hero.subtitle}</p>
        <p className="hero-date">{dottedReverse(date)}</p>
      </div>

      <div className="hero-couple">
        {couple.map((p, i) => (
          <Reveal key={p.label} className="hero-person" effect="up" delay={i * 150}>
            <span className="deco hero-label">{p.label}</span>
            <span className="thin hero-name">{p.name}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
