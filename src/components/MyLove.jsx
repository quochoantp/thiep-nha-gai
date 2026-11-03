import { useInvitation } from '../context'
import { Lines, Photo, Reveal, Spread } from './ui'

export default function MyLove() {
  const { content, images } = useInvitation()
  const { love } = content

  return (
    <section className="love">
      <div className="container narrow center">
        <Reveal effect="up">
          <Lines lines={love.quote} className="thin love-quote" />
        </Reveal>
      </div>

      <div className="container mid love-grid">
        <div className="love-collage">
          <div className="love-side" aria-hidden="true">
            {love.sideWords.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <Reveal className="love-main" effect="right" duration={1300}>
            <Photo src={images.loveMain} alt="" />
          </Reveal>
          <Reveal className="love-cutout" effect="up" delay={300} duration={1300}>
            <img src={images.loveCutout} alt="" loading="lazy" />
          </Reveal>
        </div>

        <div className="love-text">
          <Reveal as="h2" className="deco display love-title" effect="wipe" duration={1500}>
            {love.title}
          </Reveal>
          <Reveal effect="up" delay={200}>
            <Lines lines={love.lines} className="thin love-lines" />
          </Reveal>
        </div>
      </div>

      <div className="duo">
        <Reveal className="duo-photo" effect="left" duration={1300}>
          <Photo src={images.duo[0]} alt="" />
        </Reveal>
        <Spread words={love.duoLabels} className="labels duo-labels" />
        <Reveal className="duo-photo" effect="right" duration={1300}>
          <Photo src={images.duo[1]} alt="" />
        </Reveal>
      </div>
    </section>
  )
}
