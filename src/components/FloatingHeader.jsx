export default function FloatingHeader({ isDark, onToggleTheme, onOpenMenu }) {
  return (
    <header className="floating-header" role="banner">
      {/* Theme Toggle Button */}
      <button
        type="button"
        className="icon-button theme-toggle-btn"
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? (
          // Sun Icon for Dark Mode
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          // Moon Icon for Light Mode
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      {/* Subtle Wordmark */}
      <div className="wordmark">
        <span>GMU</span>
        <i></i>
      </div>

      {/* Navigation Menu Toggle */}
      <button
        type="button"
        className="icon-button menu-toggle"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        title="Open navigation menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="7" x2="21" y2="7"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="17" x2="21" y2="17"></line>
        </svg>
      </button>
    </header>
  );
}
