import { useState, useEffect, useRef } from 'react';
import { projects, personalInfo } from '../data/portfolioData';

export default function Projects() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener to calculate which project should be pinned/active
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Distance scrolled into the pinned section
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Calculate active index (0, 1, 2)
      const count = projects.length;
      const index = Math.min(count - 1, Math.floor(progress * count));
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectProject = (index) => {
    setActiveIndex(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (index / projects.length) * totalScrollable + 50;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Map project id to its public image path
  const projectImages = {
    'sms-site': '/smssite.jpg',
    'rentalx': '/rentalx.jpg',
    'foodpos': '/food.jpg',
  };

  const renderVisualMockup = (project) => {
    const imgSrc = projectImages[project.id];
    const urlMap = {
      'sms-site': 'sms-site.onrender.com',
      'rentalx': 'rentalx-8cmp.onrender.com',
      'foodpos': 'food-pose.infinityfreeapp.com',
    };
    const displayUrl = urlMap[project.id] || project.liveUrl;

    return (
      <div className="project-screenshot-frame">
        {/* Browser Chrome */}
        <div className="pf-chrome">
          <span className="pf-dot" style={{ background: '#ff5f57' }}></span>
          <span className="pf-dot" style={{ background: '#febc2e' }}></span>
          <span className="pf-dot" style={{ background: '#28c840' }}></span>
          <span className="pf-url">{displayUrl}</span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-open-btn"
            title="Open live site"
          >
            ↗
          </a>
        </div>
        {/* Screenshot */}
        <div className="pf-screen">
          <img
            src={imgSrc}
            alt={`${project.title} screenshot`}
            className="pf-img"
            loading="lazy"
          />
          {/* Hover overlay with live link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-overlay"
          >
            <span className="pf-overlay-label">View Live Project ↗</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="projects"
      style={{ '--project-count': projects.length }}
      aria-label="Featured Projects Scroll Showcase"
    >
      {/* Sticky Pin Container */}
      <div className="projects-pin">
        {/* Header matching reference screenshot */}
        <div className="project-pin-header">
          <div>
            <span className="eyebrow">MY TOP WORK</span>
            <h2>FEATURED PROJECTS</h2>
          </div>

          <p>
            Scroll through focused web applications and platforms that show how I approach backend architecture, automation, database systems, and responsive engineering.
          </p>

          <div className="project-progress">
            <div>
              <strong>0{activeIndex + 1}</strong>
              <span> / 0{projects.length}</span>
            </div>
            <div className="project-progress-bars">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={activeIndex === i ? 'active' : ''}
                  onClick={() => handleSelectProject(i)}
                  aria-label={`Jump to project 0${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Project Stage (Transforms on scroll) */}
        <div className="project-stage">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={project.id}
                className={`project-panel ${isActive ? 'active' : ''}`}
                aria-hidden={!isActive}
              >
                {/* Left Column: Project Copy */}
                <div className="project-copy-panel">
                  <div className="project-type-tag">{project.category}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  {/* Pills with Neon Lime dot */}
                  <div className="project-pill-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx}>{tag}</span>
                    ))}
                  </div>

                  {/* Underlined Action Links matching reference */}
                  <div className="project-links-row">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-item"
                    >
                      <span>View live product</span>
                      <span>↗</span>
                    </a>

                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-item"
                    >
                      <span>Explore on GitHub</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Interactive Mockup Visual */}
                <div
                  className="project-visual-panel"
                  style={{
                    background: project.accentGrad,
                    borderRadius: '12px',
                    padding: '18px',
                    border: '1px solid var(--line)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                  }}
                >
                  {renderVisualMockup(project)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
