import { useInvitation } from '../context'
import {
  googleCalendarLink,
  monthGrid,
  parseDate,
  slashed,
  time12,
  weddingTimestamp,
  weekdayTitle,
} from '../utils/date'
import { Heart, Icon, Lines, Reveal } from './ui'

const HEAD = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export default function SaveTheDate() {
  const { content, images } = useInvitation()
  const s = content.saveTheDate
  const date = parseDate(content.wedding.date)
  const day = date.getDate()
  const cells = monthGrid(date)

  const couple = content.couple.map((k) => content[k].name).join(' & ')
  const calLink = googleCalendarLink({
    title: content.wedding.eventName + ' ' + couple,
    start: weddingTimestamp(content.wedding),
    location: content.invitation.venueName + ', ' + content.invitation.address,
  })

  return (
    <section className="std">
      <div className="container mid std-grid">
        <div className="std-text center">
          <Reveal effect="zoom">
            <Heart />
          </Reveal>
          <Reveal as="h2" className="deco display" effect="wipe" duration={1500}>
            {s.title}
          </Reveal>
          <Reveal effect="up" delay={150}>
            <Lines lines={s.lines} className="sans std-lines" />
          </Reveal>
          <Reveal effect="fade" delay={250} className="std-actions">
            <a className="btn btn-outline" href={calLink} target="_blank" rel="noreferrer">
              <Icon name="calendar" size={16} /> {s.addToCalendar}
            </a>
          </Reveal>
        </div>

        <Reveal className="polaroid" effect="up" duration={1300}>
          <div className="polaroid-photo">
            <img src={images.calendar} alt="" loading="lazy" />
            <div className="polaroid-cal">
              {HEAD.map((h) => (
                <span key={h} className="cal-head">
                  {h}
                </span>
              ))}
              {cells.map((d, i) =>
                d === day ? (
                  <span key={i} className="cal-day is-day">
                    <Heart className="cal-heart" />
                    <b>{d}</b>
                  </span>
                ) : (
                  <span key={i} className="cal-day">
                    {d || ''}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="polaroid-caption thin">
            <span>
              {weekdayTitle(date)}, {slashed(date)}
            </span>
            <span>
              {content.wedding.lunarShort} | {time12(content.wedding.time)}
            </span>
          </div>
        </Reveal>
      </div>

      <div className="container narrow center">
        <Reveal effect="up">
          <Lines lines={s.after} className="thin std-after" />
        </Reveal>
      </div>
    </section>
  )
}
