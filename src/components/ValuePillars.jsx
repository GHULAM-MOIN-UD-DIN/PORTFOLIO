import { valuePillars } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ValuePillars() {
  const headingRef = useScrollReveal();
  const gridRef    = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="value" className="client-value" aria-label="Where I Add Value">
      <div ref={headingRef} className="section-heading sr-up">
        <div>
          <span className="eyebrow">CORE PRINCIPLES</span>
          <h2>WHERE I ADD VALUE</h2>
        </div>
        <p>
          Beyond writing code, I focus on delivering tangible business impact: building platforms that load quickly, handle high transactional loads without friction, and provide smooth intuitive experiences for users.
        </p>
      </div>

      <div ref={gridRef} className="value-grid sr-fade sr-stagger">
        {valuePillars.map((pillar) => (
          <article key={pillar.id}>
            <span>{pillar.id} // {pillar.tag}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
