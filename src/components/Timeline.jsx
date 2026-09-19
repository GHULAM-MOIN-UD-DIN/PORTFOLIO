import { experience, education } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Timeline() {
  const headingRef = useScrollReveal();
  const expRef     = useScrollReveal({ threshold: 0.08 });
  const eduRef     = useScrollReveal({ threshold: 0.08 });

  return (
    <section id="experience" className="section experience" aria-label="Work Experience and Education">
      <div ref={headingRef} className="section-heading sr-up">
        <div>
          <span className="eyebrow">CAREER PATH</span>
          <h2>WORK EXPERIENCE &amp; EDUCATION</h2>
        </div>
        <p>
          Solid software engineering foundations gained through intensive diploma coursework, paired with hands-on remote backend software engineering experience.
        </p>
      </div>

      <div className="timeline-wrapper">
        {/* Work Experience Category */}
        <div ref={expRef} className="timeline-category sr-left">
          <span className="timeline-cat-title">PROFESSIONAL WORK EXPERIENCE</span>
          <div className="timeline-list">
            {experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-period">
                    <span className="timeline-dot"></span>
                    <span>{exp.period}</span>
                  </div>
                  <span className="timeline-badge">{exp.type}</span>
                </div>

                <div className="timeline-right">
                  <h3>{exp.role}</h3>
                  <div className="timeline-org">
                    <strong>{exp.company}</strong>
                    <span>•</span>
                    <span>{exp.type}</span>
                  </div>
                  <p className="timeline-desc">{exp.description}</p>
                  <div className="timeline-tags">
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Category */}
        <div ref={eduRef} className="timeline-category sr-right" style={{ marginBottom: 0 }}>
          <span className="timeline-cat-title">ACADEMIC &amp; TECHNICAL EDUCATION</span>
          <div className="timeline-list">
            {education.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-left">
                  <div className="timeline-period">
                    <span className="timeline-dot" style={{ background: '#38bdf8', boxShadow: '0 0 0 4px rgba(56, 189, 248, 0.25)' }}></span>
                    <span>{edu.period}</span>
                  </div>
                  {edu.statusBadge && (
                    <span className="timeline-badge" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                      {edu.statusBadge}
                    </span>
                  )}
                </div>

                <div className="timeline-right">
                  <h3>{edu.degree}</h3>
                  <div className="timeline-org">
                    <strong>{edu.institution}</strong>
                    <span>•</span>
                    <span>{edu.location}</span>
                  </div>
                  <p className="timeline-desc">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
