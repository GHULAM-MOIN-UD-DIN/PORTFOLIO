import { techStack } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function TechStack() {
  const headingRef = useScrollReveal();
  const gridRef    = useScrollReveal({ threshold: 0.08 });
  return (
    <section id="technology" className="section technology" aria-label="Technology Stack">
      <div ref={headingRef} className="section-heading sr-up">
        <div>
          <span className="eyebrow">STACK &amp; TOOLS</span>
          <h2>THE STACK BEHIND THE WORK</h2>
        </div>
        <p>
          A balanced technical toolkit encompassing high-performance compiled backends (C# / ASP.NET), flexible web frameworks (Laravel / PHP), modern frontends (React / JS), relational databases, and high-speed AI inference APIs.
        </p>
      </div>

      <div ref={gridRef} className="tech-stack-grid sr-fade sr-stagger">
        {techStack.map((group, idx) => (
          <article key={idx}>
            <div className="tech-stack-category">
              <i>0{idx + 1}</i> // <span>{group.category}</span>
            </div>
            <div className="tech-stack-items">
              {group.items.map((tech, tIdx) => (
                <b key={tIdx} title={`Proficiency: ${tech.level}`}>
                  <span>{tech.name}</span>
                </b>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
