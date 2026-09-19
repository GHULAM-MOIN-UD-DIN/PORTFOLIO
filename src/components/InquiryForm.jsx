import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function InquiryForm() {
  const introRef = useScrollReveal({ threshold: 0.1 });
  const formRef  = useScrollReveal({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate submission and construct mailto link
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Also open mailto as fallback so user can transmit directly
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
    }, 600);
  };

  return (
    <section id="inquiry" className="section inquiry-section" aria-label="Project Inquiry Form">
      <div className="inquiry-layout">
        {/* Left Sticky Column */}
        <div ref={introRef} className="inquiry-intro sr-left">
          <span className="eyebrow">INQUIRY</span>
          <h2>HAVE A PROJECT IN MIND?</h2>
          <p>
            Whether you need a custom ASP.NET Core solution, a modern Laravel web application, or an intelligent AI chatbot integrated into your existing workflow, let's start the conversation.
          </p>

          <div className="inquiry-meta">
            <div>
              <span>LOCATION</span>
              <br />
              <strong>{personalInfo.location}</strong>
            </div>
            <div>
              <span>RESPONSE TIME</span>
              <br />
              <strong>&lt; 24 Hours</strong>
            </div>
            <div>
              <span>STATUS</span>
              <br />
              <strong style={{ color: 'var(--accent)' }}>● Available</strong>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div ref={formRef} className="sr-right">
          {isSubmitted ? (
            <div className="form-success-message">
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Thank you for reaching out!</h3>
              <p style={{ margin: 0, fontSize: '13px' }}>
                Your message details have been recorded and prepared for Moin. You can also message him directly on WhatsApp at <strong>{personalInfo.phone}</strong>.
              </p>
              <button
                type="button"
                className="button primary"
                style={{ marginTop: '16px' }}
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <label>
                <span>01 // WHAT'S YOUR NAME?</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </label>

              <label>
                <span>02 // WHAT'S YOUR EMAIL?</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </label>

              <label>
                <span>03 // TELL ME ABOUT YOUR PROJECT OR INQUIRY</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello Moin, I'd like to discuss a project involving..."
                  rows={4}
                  required
                ></textarea>
              </label>

              <div className="form-footer">
                <button
                  type="submit"
                  className="button primary"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>

                <p>
                  Direct transmission to <strong>{personalInfo.email}</strong>. No spam, NDA friendly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
