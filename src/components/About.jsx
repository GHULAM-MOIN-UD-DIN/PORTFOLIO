import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.png';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const portraitRef = useScrollReveal();
  const contentRef  = useScrollReveal({ threshold: 0.1 });
  const statsRef    = useScrollReveal({ threshold: 0.15 });

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section about" aria-label="About Ghulam Moin Uddin">
      <div className="about-layout">
        {/* Left: Stylized Technical Portrait Card */}
        <div ref={portraitRef} className="about-portrait sr-left">
          <span className="portrait-index">[01 // ABOUT]</span>
          <div className="about-portrait-frame">
            <img
              src={profileImg}
              alt="Ghulam Moin Uddin"
              className="about-portrait-img"
              loading="lazy"
            />
          </div>
          <div className="portrait-caption">
            <span>GHULAM MOIN UDDIN</span>
            <span>KARACHI, PK</span>
          </div>
        </div>

        {/* Right: Biography & Statistics */}
        <div ref={contentRef} className="about-content sr-right">
          <span className="eyebrow">WHO I AM</span>
          <h2>BUILDING SYSTEMS FOR DIGITAL SUCCESS &amp; BUSINESS GROWTH.</h2>
          <p className="about-lead">{personalInfo.aboutLead}</p>
          <p>{personalInfo.aboutBio}</p>

          {/* Key Metric Counters */}
          <div ref={statsRef} className="about-stats sr-up sr-stagger">
            {personalInfo.stats.map((stat, idx) => (
              <div key={idx}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="about-actions">
            <button
              type="button"
              className="button primary"
              onClick={() => scrollToSection('inquiry')}
            >
              <span>Get in touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>

            <a
              href="/Ghulam_Moin_Uddin_ATS_Resume (1).docx"
              download="Ghulam_Moin_Uddin_Resume.docx"
              className="button secondary"
            >
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
