import { useInvitation } from '../context'
import { dotted, parseDate, weekdayUpper } from '../utils/date'
import { Lines, Reveal } from './ui'

export default function Venue() {
  const { content } = useInvitation()
  const inv = content.invitation
  const date = parseDate(content.wedding.date)

  return (
    <section className="venue">
      <div className="container mid venue-grid">
        <div className="venue-info center">
          <Reveal as="p" className="serif venue-eyebrow" effect="up">
            {inv.eyebrow}
          </Reveal>
          <Reveal effect="up" delay={100}>
            <Lines lines={inv.lines} className="serif venue-lines" />
          </Reveal>
          <Reveal as="p" className="serif venue-at" effect="fade" delay={150}>
            {inv.atLabel}
          </Reveal>
          <Reveal as="p" className="serif venue-when" effect="zoom" delay={200}>
            {content.wedding.time} - {dotted(date)} - {weekdayUpper(date)}
          </Reveal>
          <Reveal as="p" className="serif venue-lunar" effect="fade" delay={250}>
            {content.wedding.lunarFull}
          </Reveal>
          <Reveal as="p" className="serif venue-label" effect="up" delay={300}>
            {inv.venueLabel}
          </Reveal>
          <Reveal as="p" className="script venue-name" effect="wipe" duration={1600} delay={350}>
            {inv.venueName}
          </Reveal>
          <Reveal as="p" className="serif venue-address" effect="fade" delay={400}>
            {inv.address}
          </Reveal>
          <Reveal as="p" className="script venue-welcome" effect="fade" delay={450}>
            {inv.welcome}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
