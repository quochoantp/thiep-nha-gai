import { useInvitation } from '../context'
import { Heart, Lines, Photo, Reveal, Spread } from './ui'

export default function Intro() {
  const { content, images } = useInvitation()
  const { intro } = content

  return (
    <section className="intro">
      <div className="container narrow center">
        <Reveal effect="zoom">
          <Heart />
        </Reveal>
        <Reveal as="h2" className="deco display" effect="up" delay={100}>
          {intro.title}
        </Reveal>
        <Reveal as="p" className="serif intro-sub" effect="up" delay={200}>
          {intro.subtitle}
        </Reveal>
      </div>

      <div className="container wide">
        <Reveal effect="fade">
          <Spread words={intro.labels} className="labels" />
        </Reveal>
        <Reveal className="feature" effect="zoom" duration={1400}>
          <Photo src={images.feature} alt="" />
          <div className="feature-caption">
            <span className="marquee">
              <span>{intro.caption}</span>
              <span aria-hidden="true">{intro.caption}</span>
            </span>
          </div>
        </Reveal>
      </div>

      <div className="container narrow center">
        <Reveal effect="up">
          <Lines lines={intro.lines} className="serif message" />
        </Reveal>
      </div>
    </section>
  )
}
