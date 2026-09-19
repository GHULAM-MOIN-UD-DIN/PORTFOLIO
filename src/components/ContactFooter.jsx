import { personalInfo } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ContactFooter() {
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.08 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="contact-section" role="contentinfo">
      <div ref={headRef} className="contact-head sr-up">
        <span className="eyebrow" style={{ color: '#777' }}>CONNECT</span>
        <h2>GET IN <em>TOUCH.</em></h2>
      </div>

      <div ref={gridRef} className="contact-grid sr-fade sr-stagger">
        {/* Email Card (Full width) */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="contact-email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <div className="contact-card-body">
            <small>DIRECT INBOX</small>
            <span>{personalInfo.email}</span>
          </div>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        {/* WhatsApp & Call */}
        <a
          href={`https://wa.me/${personalInfo.whatsappNumber}`}
          className="whatsapp-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <div className="contact-card-body">
            <small>WHATSAPP &amp; DIRECT CALL</small>
            <span>{personalInfo.phoneFormatted}</span>
          </div>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        {/* GitHub */}
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="card-icon" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
          </svg>
          <div className="contact-card-body">
            <small>GITHUB REPOSITORIES</small>
            <span>{personalInfo.githubUsername}</span>
          </div>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="card-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 1 0-1.45 1.45m1.37 9.74V10.13H5.1v8.37h2.73z"></path>
          </svg>
          <div className="contact-card-body">
            <small>LINKEDIN PROFILE</small>
            <span>Ghulam Moin Uddin Akhtar</span>
          </div>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        {/* Base Location Card (Full width with globe illustration) */}
        <div className="location-card">
          <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div className="contact-card-body" style={{ zIndex: 1 }}>
            <small>PRIMARY LOCATION</small>
            <span>{personalInfo.location} (PKT / UTC+5)</span>
            <p style={{ margin: '6px 0 0', color: '#888', fontSize: '12px' }}>
              Available for remote engineering roles globally &amp; on-site collaborations.
            </p>
          </div>
          <div className="globe-lines" aria-hidden="true"></div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="contact-footer-bar">
        <span>© {new Date().getFullYear()} GHULAM MOIN UDDIN. ALL RIGHTS RESERVED.</span>
        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      </div>
    </footer>
  );
}
