import { services } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Services() {
  const headingRef = useScrollReveal();
  const gridRef    = useScrollReveal({ threshold: 0.08 });

  const renderIcon = (type) => {
    switch (type) {
      case 'layers':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
      case 'server':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      case 'code':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'database':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        );
      case 'bot':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8.01" y2="16"></line>
            <line x1="16" y1="16" x2="16.01" y2="16"></line>
          </svg>
        );
    }
  };

  return (
    <section id="services" className="section services" aria-label="Services and Expertise">
      <div ref={headingRef} className="section-heading sr-up">
        <div>
          <span className="eyebrow">EXPERTISE</span>
          <h2>SERVICES I PROVIDE</h2>
        </div>
        <p>
          Specialized in building full-stack web solutions from scratch. Combining solid architecture in ASP.NET Core and Laravel with responsive frontends and AI chatbot automations that simplify customer interactions.
        </p>
      </div>

      <div ref={gridRef} className="skill-grid sr-fade sr-stagger">
        {services.map((item) => (
          <div key={item.id} className="skill-card">
            <div className="service-icon">
              {renderIcon(item.icon)}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <b>{item.id}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
