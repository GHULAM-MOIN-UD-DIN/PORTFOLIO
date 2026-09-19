import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* 3 Concentric Orbital Rings with Tech Chips */}
      <div className="logo-orbit logo-orbit-one" aria-hidden="true">
        {/* Orbit 1: C#, ASP.NET, React */}
        <div className="logo-slot" style={{ '--logo-angle': '45deg' }}>
          <div className="logo-chip" title="C#">
            <span>
              {/* C# Icon */}
              <svg viewBox="0 0 128 128" fill="none">
                <circle cx="64" cy="64" r="56" fill="#239120" />
                <path d="M72 40H56C47 40 40 47 40 56V72C40 81 47 88 56 88H72" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                <path d="M84 46V82M98 46V82M78 58H104M78 70H104" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
        <div className="logo-slot" style={{ '--logo-angle': '165deg' }}>
          <div className="logo-chip" title="ASP.NET Core">
            <span>
              {/* .NET Icon */}
              <svg viewBox="0 0 128 128" fill="none">
                <circle cx="64" cy="64" r="56" fill="#512BD4" />
                <text x="64" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="32" fontWeight="bold" fontFamily="sans-serif">.NET</text>
              </svg>
            </span>
          </div>
        </div>
        <div className="logo-slot" style={{ '--logo-angle': '285deg' }}>
          <div className="logo-chip" title="React">
            <span>
              {/* React Icon */}
              <svg viewBox="-11.5 -10.23174 23 20.46348">
                <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="logo-orbit logo-orbit-two reverse-orbit" aria-hidden="true">
        {/* Orbit 2: Laravel, PHP, SQL Server (Reversed spin) */}
        <div className="logo-slot" style={{ '--logo-angle': '30deg' }}>
          <div className="logo-chip" title="Laravel">
            <span className="counter-reverse">
              {/* Laravel Icon */}
              <svg viewBox="0 0 128 128" fill="none">
                <circle cx="64" cy="64" r="56" fill="#FF2D20" />
                <path d="M42 44L64 32L86 44V76L64 88L42 76V44Z" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" />
                <path d="M64 32V88M42 44L86 68M86 44L42 68" stroke="#FFFFFF" strokeWidth="4" />
              </svg>
            </span>
          </div>
        </div>
        <div className="logo-slot" style={{ '--logo-angle': '150deg' }}>
          <div className="logo-chip" title="PHP">
            <span className="counter-reverse">
              {/* PHP Icon */}
              <svg viewBox="0 0 128 128" fill="none">
                <circle cx="64" cy="64" r="56" fill="#777BB4" />
                <text x="64" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="bold" fontFamily="sans-serif">PHP</text>
              </svg>
            </span>
          </div>
        </div>
        <div className="logo-slot" style={{ '--logo-angle': '270deg' }}>
          <div className="logo-chip" title="SQL Server">
            <span className="counter-reverse">
              {/* SQL Server Icon */}
              <svg viewBox="0 0 128 128" fill="none">
                <circle cx="64" cy="64" r="56" fill="#CC292B" />
                <path d="M44 48C44 42 53 38 64 38C75 38 84 42 84 48V80C84 86 75 90 64 90C53 90 44 86 44 80V48Z" stroke="#FFFFFF" strokeWidth="6" />
                <ellipse cx="64" cy="48" rx="20" ry="6" fill="#FFFFFF" />
                <path d="M44 64C44 70 53 74 64 74C75 74 84 70 84 64" stroke="#FFFFFF" strokeWidth="5" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="logo-orbit logo-orbit-three" aria-hidden="true">
        {/* Orbit 3: AI Chatbots (Groq/OpenRouter), GitHub, JavaScript */}
        <div className="logo-slot" style={{ '--logo-angle': '70deg' }}>
          <div className="logo-chip" title="AI Chatbot Integration">
            <span>
              {/* AI / Spark Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="logo-slot" style={{ '--logo-angle': '200deg' }}>
          <div className="logo-chip" title="GitHub">
            <span>
              {/* GitHub Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="logo-slot" style={{ '--logo-angle': '320deg' }}>
          <div className="logo-chip" title="JavaScript">
            <span>
              {/* JS Icon */}
              <svg viewBox="0 0 128 128" fill="none">
                <rect width="128" height="128" rx="20" fill="#F7DF1E" />
                <path d="M68 96C72 100 80 102 90 102C106 102 114 94 114 80C114 68 106 62 92 56L86 54C78 50 74 46 74 40C74 34 80 30 88 30C96 30 102 34 106 38L114 26C108 20 98 16 88 16C74 16 62 24 62 40C62 52 70 58 84 64L90 66C98 70 102 74 102 80C102 88 94 90 88 90C80 90 74 86 68 80L68 96ZM26 78L38 78C38 88 44 92 52 92C60 92 66 86 66 78L66 18L54 18L54 78C54 82 50 82 46 82C40 82 38 78 38 78L26 78Z" fill="#000000" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Center Content */}
      <div className="hero-content">
        {/* Availability Badge */}
        <div className="availability">
          <span></span>
          BASED IN PAKISTAN · BUILDING GLOBALLY
        </div>

        {/* Greeting Intro */}
        <p className="hero-intro">{personalInfo.heroIntro}</p>

        {/* Big Bold Headline - Left to Right Letter Reveal */}
        <h1 className="hero-heading-reveal" aria-label={personalInfo.heroHeading}>
          {personalInfo.heroHeading.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char"
              style={{ '--char-index': i }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle Bio */}
        <p className="hero-copy">{personalInfo.heroBio}</p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            type="button"
            className="button primary"
            onClick={() => scrollToSection('inquiry')}
          >
            <span>Let's talk</span>
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
            <span>Résumé</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <button
        type="button"
        className="scroll-cue"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to explore"
      >
        <span>SCROLL TO EXPLORE</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </button>
    </section>
  );
}
