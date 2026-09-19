import { useEffect } from 'react';
import { personalInfo, projects, experience, education, techStack } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Ghulam Moin Uddin Résumé">
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <div>
            <h3>Ghulam Moin Uddin — Résumé</h3>
            <small style={{ color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>FULL STACK WEB DEVELOPER</small>
          </div>
          <div className="resume-modal-actions">
            <button
              type="button"
              className="button primary"
              style={{ padding: '8px 14px', minWidth: 'auto', fontSize: '11px' }}
              onClick={handlePrint}
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              className="icon-button"
              style={{ minWidth: '36px', height: '36px' }}
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="resume-modal-body">
          {/* Header Info */}
          <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 6px 0' }}>{personalInfo.name}</h2>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--text)' }}>
              {personalInfo.role} | {personalInfo.subRole}
            </p>
            <p style={{ margin: '6px 0 0 0', color: 'var(--muted)', fontSize: '12px', fontFamily: "'DM Mono', monospace" }}>
              {personalInfo.phone} | {personalInfo.email} | {personalInfo.location} |{' '}
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>GitHub</a> |{' '}
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>LinkedIn</a>
            </p>
          </div>

          {/* Professional Summary */}
          <h4>PROFESSIONAL SUMMARY</h4>
          <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
            {personalInfo.aboutBio}
          </p>

          {/* Technical Skills */}
          <h4>TECHNICAL SKILLS</h4>
          <ul style={{ color: 'var(--text)' }}>
            <li><strong>Languages &amp; Frameworks:</strong> C#, ASP.NET Core MVC, PHP, Laravel, HTML5, CSS3, JavaScript, React</li>
            <li><strong>Databases:</strong> Microsoft SQL Server, MySQL, Relational Database Modeling</li>
            <li><strong>Other Competencies:</strong> Full Stack Web Development, Responsive UI Design, REST APIs, AI Chatbot Integration (Groq API, OpenRouter, Vapi)</li>
          </ul>

          {/* Projects */}
          <h4>PROJECTS</h4>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <strong style={{ fontSize: '15px' }}>{proj.title} – {proj.subtitle}</strong>
                <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline', fontStyle: 'italic' }}>
                  {proj.liveUrl.replace('https://', '')} ↗
                </a>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'DM Mono', monospace", margin: '2px 0 6px 0' }}>
                {proj.category}
              </div>
              <ul>
                {proj.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Experience */}
          <h4>EXPERIENCE</h4>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <strong>{exp.role} — {exp.company}</strong>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>{exp.period}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'DM Mono', monospace", marginBottom: '4px' }}>
                {exp.type}
              </div>
              <ul>
                <li>{exp.description}</li>
              </ul>
            </div>
          ))}

          {/* Education */}
          <h4>EDUCATION</h4>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <strong>{edu.institution}</strong>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'var(--muted)' }}>{edu.period}</span>
              </div>
              <div style={{ color: 'var(--text)', fontSize: '13px' }}>{edu.degree}</div>
              {edu.description && (
                <p style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '12px' }}>{edu.description}</p>
              )}
            </div>
          ))}

          {/* Languages */}
          <h4>LANGUAGES</h4>
          <p style={{ color: 'var(--text)', margin: 0 }}>Urdu, English</p>
        </div>
      </div>
    </div>
  );
}
