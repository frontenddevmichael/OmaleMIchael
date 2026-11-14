import type { StudyBlock, StudySection } from '../../lib/work'

/** One block of a section: prose, a list, a decision, or a link line. */
export function StudyBlockView({ block }: { block: StudyBlock }) {
  if (block.kind === 'list') {
    return (
      <ul className="study-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.kind === 'pair') {
    return (
      <p className="study-decision">
        <strong>{block.lead}.</strong> {block.text}
      </p>
    )
  }

  if (block.kind === 'link') {
    return null
  }

  return <p className="study-text">{block.text}</p>
}

/** A titled section. Sections are the unit the study is written in. */
export function StudySectionView({ section }: { section: StudySection }) {
  return (
    <section className="study-section">
      <h2>{section.heading}</h2>
      {section.blocks.map((block, index) => (
        <StudyBlockView block={block} key={index} />
      ))}
    </section>
  )
}

/** The written body, minus the Links section, which is its own component. */
export function StudySections({ sections }: { sections: StudySection[] }) {
  return (
    <>
      {sections
        .filter((section) => !/^links$/i.test(section.heading))
        .map((section) => (
          <StudySectionView section={section} key={section.heading} />
        ))}
    </>
  )
}
