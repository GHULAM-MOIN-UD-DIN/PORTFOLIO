import { useState, useEffect } from 'react';
import FloatingHeader from './components/FloatingHeader';
import NavigationDrawer from './components/NavigationDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ValuePillars from './components/ValuePillars';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import TechStack from './components/TechStack';
import InquiryForm from './components/InquiryForm';
import ContactFooter from './components/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton';
import AssistantWidget from './components/AssistantWidget';

import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Theme toggle handler
  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Track scroll percentage for the top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={isDark ? 'theme-dark' : 'theme-light'}>
      {/* 4px Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* Floating Header (Theme Toggle + Wordmark + Menu Button) */}
      <FloatingHeader
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Slide-over Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Hero Section with Concentric 3 Orbital Rings */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services I Provide (01-05 Grid) */}
      <Services />

      {/* Where I Add Value (Dark Contrast Section) */}
      <ValuePillars />

      {/* Featured Projects (HiChat SMS, RentalX, FoodPOS) */}
      <Projects />

      {/* Work Experience & Education Timeline */}
      <Timeline />

      {/* The Stack Behind The Work */}
      <TechStack />

      {/* Inquiry Form */}
      <InquiryForm />

      {/* Contact & Footer with Location Globe Illustration */}
      <ContactFooter />

      {/* Floating WhatsApp Quick-Contact Button (Bottom-Left) */}
      <WhatsAppButton />

      {/* Floating Robot AI Assistant Widget (Bottom-Right, Chat & Voice) */}
      <AssistantWidget />


    </main>
  );
}

export default App;
