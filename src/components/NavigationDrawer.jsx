import { useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function NavigationDrawer({ isOpen, onClose }) {
  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { num: '01', label: 'HOME',       targetId: 'hero' },
    { num: '02', label: 'ABOUT',      targetId: 'about' },
    { num: '03', label: 'EXPERTISE',  targetId: 'services' },
    { num: '04', label: 'VALUE',      targetId: 'value' },
    { num: '05', label: 'WORK',       targetId: 'projects' },
    { num: '06', label: 'EXPERIENCE', targetId: 'experience' },
    { num: '07', label: 'TECHNOLOGY', targetId: 'technology' },
    { num: '08', label: 'INQUIRY',    targetId: 'inquiry' },
    { num: '09', label: 'CONTACT',    targetId: 'contact' },
  ];

  const handleNavClick = (targetId) => {
    onClose();
    const elem = document.getElementById(targetId);
    if (elem) {
      setTimeout(() => elem.scrollIntoView({ behavior: 'smooth' }), 320);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`menu-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-over Panel */}
      <aside
        className={`menu-panel ${isOpen ? 'open' : ''}`}
        aria-label="Navigation drawer"
        aria-hidden={!isOpen}
      >
        {/* Header — fades in first */}
        <div className="menu-panel-header menu-anim-header">
          <span className="menu-panel-label">—— NAVIGATE</span>
          <button
            type="button"
            className="menu-close-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Nav items — staggered from bottom */}
        <nav>
          {navItems.map((item, idx) => (
            <button
              key={item.num}
              type="button"
              className="menu-item menu-anim-item"
              style={{ '--item-index': idx }}
              onClick={() => handleNavClick(item.targetId)}
            >
              <small>{item.num}</small>
              <span>{item.label}</span>
              {/* Arrow indicator */}
              <svg
                className="menu-item-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          ))}
        </nav>

        {/* Footer — fades in last */}
        <div className="menu-panel-footer menu-anim-footer">
          <div className="menu-panel-contact">
            {personalInfo.location} · {personalInfo.phone}
          </div>
          <div className="menu-panel-contact">
            {personalInfo.email}
          </div>
        </div>
      </aside>
    </>
  );
}
