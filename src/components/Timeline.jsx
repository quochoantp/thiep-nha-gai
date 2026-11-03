import { useInvitation } from '../context'
import { Icon, Reveal } from './ui'

export default function Timeline() {
  const { content } = useInvitation()
  const { timeline } = content

  return (
    <section className="timeline">
      <div className="container narrow center">
        <Reveal as="h2" className="script timeline-title" effect="wipe" duration={1500}>
          {timeline.title}
        </Reveal>
        <ul className="timeline-list">
          {timeline.items.map((t, i) => (
            <Reveal as="li" key={t.time} className="timeline-item" effect="up" delay={i * 120}>
              <span className="timeline-icon">
                <Icon name={t.icon} size={36} />
              </span>
              <span className="sans timeline-text">
                <span>{t.label}</span>
                <b>{t.time}</b>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
