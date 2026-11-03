import { useInvitation } from '../context'
import { dotted, parseDate, weekdayUpper } from '../utils/date'
import { Icon, Lines, Reveal } from './ui'

export default function Venue() {
  const { content } = useInvitation()
  const inv = content.invitation
  const date = parseDate(content.wedding.date)
  const embed = 'https://www.google.com/maps?q=' + encodeURIComponent(inv.mapQuery) + '&output=embed'
  const link = inv.mapLink || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(inv.mapQuery)

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

        <Reveal className="venue-map" effect="up">
          <iframe title="Bản đồ" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a className="btn btn-dark" href={link} target="_blank" rel="noreferrer">
            <Icon name="pin" size={16} /> {inv.directionsButton}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
