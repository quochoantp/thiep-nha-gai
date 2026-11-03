import { useInvitation } from '../context'
import { Photo, Reveal } from './ui'

export default function Families() {
  const { content, images } = useInvitation()

  return (
    <section className="families">
      <div className="container mid families-grid">
        {content.families.map((f, i) => (
          <Reveal key={f.side} className="family" effect={i === 0 ? 'left' : 'right'}>
            <h3 className="serif family-side">{f.side}</h3>
            <p className="serif family-parent">
              ÔNG : <b>{f.father}</b>
            </p>
            <p className="serif family-parent">
              BÀ : <b>{f.mother}</b>
            </p>
            <p className="serif family-address">{f.address}</p>
            <div className="family-photo">
              <Photo src={images[f.person]} alt={content[f.person].name} />
            </div>
            <span className="family-rule" aria-hidden="true" />
            <p className="thin family-name">{content[f.person].name}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
