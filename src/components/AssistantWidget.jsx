import { useState, useRef, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { callGroqAPI, getLocalAIResponse, isRomanUrduQuery } from '../utils/aiAgent';

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'voice'

  // Groq API Key (read seamlessly from .env or localStorage without any UI clutter)
  const groqApiKey = (typeof window !== 'undefined' && (localStorage.getItem('groq_api_key') || window.GROQ_API_KEY)) || import.meta.env?.VITE_GROQ_API_KEY || '';

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi, I'm Moin's assistant. I'm here to help you explore projects, discuss services, view Moin's tech stack, or book an inquiry."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Voice tab states
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('READY TO TALK');
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');
  const isVoiceActiveRef = useRef(false);
  const abortControllerRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && activeTab === 'chat') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Helper: Smart action cards for responses
  const getSmartCardsForQuery = (queryText) => {
    const lower = queryText.toLowerCase();
    if (lower.includes('project') || lower.includes('work') || lower.includes('kaam') || lower.includes('built')) {
      return [
        { title: "SMS Site (HiChat) ↗", desc: "ASP.NET Core & AI Chatbot", link: "https://sms-site.onrender.com/" },
        { title: "RentalX ↗", desc: "Laravel Rental Platform", link: "https://rentalx-8cmp.onrender.com/" },
        { title: "FoodPOS ↗", desc: "PHP & MySQL POS System", link: "https://food-pose.infinityfreeapp.com/login.php" }
      ];
    }
    if (lower.includes('resume') || lower.includes('cv')) {
      return [
        { title: "Download ATS Resume (.docx)", desc: "Direct Word File Download", link: "/Ghulam_Moin_Uddin_ATS_Resume (1).docx" }
      ];
    }
    if (lower.includes('contact') || lower.includes('hire') || lower.includes('whatsapp') || lower.includes('rabta')) {
      return [
        { title: "Chat on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
        { title: "Send an Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
      ];
    }
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      return [
        { title: "Explore Tech Stack", desc: "View skills & tools section", action: "scroll-technology" }
      ];
    }
    if (lower.includes('experience') || lower.includes('education') || lower.includes('aptech')) {
      return [
        { title: "View Timeline", desc: "Experience & education milestones", action: "scroll-experience" }
      ];
    }
    return [
      { title: "Chat on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
      { title: "View Projects", desc: "Selected production work", action: "projects" }
    ];
  };

  // Handle starter option click
  const handleStarterOption = (type) => {
    let query = '';
    switch (type) {
      case 'projects':
        query = 'Explore projects';
        break;
      case 'services':
        query = 'View services';
        break;
      case 'discuss':
        query = 'Discuss a project';
        break;
      case 'contact':
        query = 'Contact Moin';
        break;
      default:
        query = type;
    }
    handleSendMessage(query);
  };

  // Handle sending a chat message
  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };

    const currentHistory = [...messages, userMessage];
    setMessages(currentHistory);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // If Groq API Key is available, query real LLM (Llama 3.3 70B)
    if (groqApiKey) {
      try {
        const groqAnswer = await callGroqAPI(text, currentHistory, groqApiKey);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: groqAnswer,
            cards: getSmartCardsForQuery(text)
          }
        ]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn('Groq API failed or invalid key, falling back to local bilingual AI:', err);
      }
    }

    // High-Intelligence Local Bilingual Engine (Fallback - English & Roman Urdu)
    setTimeout(() => {
      const reply = getLocalAIResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: reply.text,
          cards: reply.cards || getSmartCardsForQuery(text)
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  // Stop voice immediately and kill all audio/requests
  const stopVoiceSession = () => {
    isVoiceActiveRef.current = false;
    transcriptRef.current = '';

    // 1. Abort pending LLM fetch if any
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {
        // ignore
      }
      abortControllerRef.current = null;
    }

    // 2. Abort speech recognition & unhook listeners
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    // 3. Cancel speech synthesis immediately (with Chrome double-cancel safety)
    if ('speechSynthesis' in window) {
      if (currentUtteranceRef.current) {
        currentUtteranceRef.current.onend = null;
        currentUtteranceRef.current.onerror = null;
        currentUtteranceRef.current = null;
      }
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
      setTimeout(() => {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {
          // ignore
        }
      }, 40);
    }

    setIsVoiceActive(false);
    setVoiceStatus('READY TO TALK');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text: "Conversation refreshed. How can I help you explore Ghulam Moin Uddin's portfolio?"
      }
    ]);
    stopVoiceSession();
  };

  // Cleanup voice session on close or tab switch
  useEffect(() => {
    if (!isOpen || activeTab !== 'voice') {
      stopVoiceSession();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  // Voice Interaction (Web Speech API + Simulation Fallback)
  const toggleVoiceSession = () => {
    if (isVoiceActive) {
      stopVoiceSession();
      setVoiceTranscript('');
    } else {
      isVoiceActiveRef.current = true;
      setIsVoiceActive(true);
      setVoiceStatus('LISTENING...');
      setVoiceTranscript('');
      transcriptRef.current = '';

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((r) => r[0].transcript)
              .join('');
            transcriptRef.current = transcript;
            setVoiceTranscript(transcript);
          };

          recognition.onend = () => {
            if (!isVoiceActiveRef.current) return;
            const capturedText = transcriptRef.current.trim();
            if (capturedText) {
              respondWithSpeech(capturedText);
            } else {
              // User was silent, simply resume listening without repeating greeting
              setVoiceStatus('LISTENING...');
              try {
                if (isVoiceActiveRef.current) {
                  recognition.start();
                }
              } catch (e) {
                // ignore
              }
            }
          };

          recognition.onerror = (err) => {
            if (!isVoiceActiveRef.current) return;
            const capturedText = transcriptRef.current.trim();
            if (capturedText) {
              respondWithSpeech(capturedText);
            } else {
              // On silence or error, restart if still active
              setVoiceStatus('LISTENING...');
              try {
                if (isVoiceActiveRef.current) {
                  recognition.start();
                }
              } catch (e) {
                // ignore
              }
            }
          };

          recognition.start();
        } catch {
          simulateVoiceAgent();
        }
      } else {
        simulateVoiceAgent();
      }
    }
  };

  const respondWithSpeech = async (userSaid) => {
    if (!isVoiceActiveRef.current) return;
    setVoiceStatus('THINKING...');
    let answerText = '';

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const isUrdu = isRomanUrduQuery(userSaid);
    try {
      const voicePrompt = `User asked via voice call: "${userSaid}".
STRICT VOICE RULES:
- DO NOT say "Hello", "Hi", "I am Moin's assistant", "Main Moin ka assistant hoon", or introduce yourself.
- Give a direct, accurate answer in 1 or 2 spoken sentences maximum (under 25 words).
- Do NOT use markdown symbols, asterisks, bullet points, or URLs.
- Language: ${isUrdu ? 'Speak strictly in casual, polite Roman Urdu' : 'Speak strictly in clear, natural English'}.`;

      answerText = await callGroqAPI(voicePrompt, messages, groqApiKey, abortController.signal);
    } catch (err) {
      if (!isVoiceActiveRef.current) return;
      console.warn('Groq voice call fallback:', err);
      const local = getLocalAIResponse(userSaid);
      answerText = local.text;
    }

    // Abort if call was ended while waiting for API
    if (!isVoiceActiveRef.current) {
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      return;
    }

    // Clean text for speech synthesis: strip repetitive greetings & robotic intros
    let cleanSpeech = answerText
      .replace(/^(?:hello|hi|hey|salam|assalam-o-alaikum|aoa)?[\s,!-]+(?:i am|i'm|this is|main|mera naam)\s+[^.!?]+(?:assistant|agent|moin)[.!?\s]*/i, '')
      .replace(/^(?:hello|hi|hey|salam|assalam-o-alaikum|aoa|sure|certainly)[,!.\s]+/i, '')
      .replace(/[*_#•`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    // Limit to at most 1-2 short sentences
    const sentenceMatch = cleanSpeech.match(/[^.!?]+[.!?]+/g);
    if (sentenceMatch && sentenceMatch.length > 0) {
      cleanSpeech = sentenceMatch.slice(0, 2).join(' ').trim();
    } else if (cleanSpeech.length > 130) {
      cleanSpeech = cleanSpeech.slice(0, 130) + '.';
    }

    if (!isVoiceActiveRef.current) {
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      return;
    }

    setVoiceStatus('AGENT SPEAKING');
    setVoiceTranscript(`You: "${userSaid}"\nAgent: "${cleanSpeech}"`);
    speakText(cleanSpeech);
  };

  const simulateVoiceAgent = () => {
    if (!isVoiceActiveRef.current) return;
    setVoiceTranscript("Listening for question...");
  };

  const speakText = (text) => {
    if (!isVoiceActiveRef.current || !('speechSynthesis' in window)) return;

    // Cancel any current speech first
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}

    const doSpeak = () => {
      if (!isVoiceActiveRef.current) return;

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtteranceRef.current = utterance;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Pick a natural English voice
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const preferred = voices.find(
            (v) => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('David')) && v.lang.startsWith('en')
          ) || voices.find((v) => v.lang.startsWith('en') && !v.localService)
            || voices.find((v) => v.lang.startsWith('en'));
          if (preferred) utterance.voice = preferred;
        }
      } catch (e) {}

      utterance.onend = () => {
        currentUtteranceRef.current = null;
        if (!isVoiceActiveRef.current) return;
        setVoiceStatus('LISTENING...');
        transcriptRef.current = '';

        // Helper: start a fresh recognition session
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        // Reuse existing or create a new recognition instance
        let recog = recognitionRef.current;
        if (!recog) {
          recog = new SpeechRecognition();
          recog.continuous = false;
          recog.interimResults = true;
          recog.lang = 'en-US';
          recog.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((r) => r[0].transcript)
              .join('');
            transcriptRef.current = transcript;
            setVoiceTranscript(transcript);
          };
          recog.onend = () => {
            if (!isVoiceActiveRef.current) return;
            const captured = transcriptRef.current.trim();
            if (captured) {
              respondWithSpeech(captured);
            } else {
              setVoiceStatus('LISTENING...');
              try { if (isVoiceActiveRef.current) recog.start(); } catch (e) {}
            }
          };
          recog.onerror = () => {
            if (!isVoiceActiveRef.current) return;
            const captured = transcriptRef.current.trim();
            if (captured) {
              respondWithSpeech(captured);
            } else {
              setVoiceStatus('LISTENING...');
              try { if (isVoiceActiveRef.current) recog.start(); } catch (e) {}
            }
          };
          recognitionRef.current = recog;
        }

        try {
          recog.start();
        } catch (e) {}
      };

      utterance.onerror = (event) => {
        currentUtteranceRef.current = null;
        // 'canceled' means we stopped it intentionally — not an error
        if (event.error !== 'canceled' && isVoiceActiveRef.current) {
          setVoiceStatus('LISTENING...');
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('SpeechSynthesis speak() error:', e);
      }
    };

    // Chrome fix: after cancel(), wait a tick before speaking
    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Voices not loaded yet — wait for them
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          doSpeak();
        };
      } else {
        doSpeak();
      }
    }, 80);
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
      <div className={`assistant-widget ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''}`}>
        {/* Robot Floating Launcher Button */}
        {!isOpen && (
          <button
            type="button"
            className="assistant-robot-launcher"
            onClick={() => setIsOpen(true)}
            aria-label="Open Moin's AI Portfolio Assistant"
            title="Chat with Moin's Portfolio Assistant"
          >
            <div className="robot-launcher-aura"></div>
            <div className="robot-launcher-visual">
              <div className="robot-avatar-wrapper">
                <img
                  src="/chatbot.png"
                  alt="AI Chatbot"
                  className="robot-avatar-img"
                />
                <span className="robot-online-dot"></span>
              </div>
              <span className="robot-badge-hint">AI ASSISTANT</span>
            </div>
          </button>
        )}

        {/* Assistant Modal Window */}
        {isOpen && (
          <div className="assistant-panel" role="dialog" aria-label="AI Portfolio Assistant">
            {/* Header */}
            <div className="assistant-header">
              <div className="assistant-identity">
                <div className="assistant-header-avatar">
                  <img
                    src="/chatbot.png"
                    alt="Moin's Assistant"
                    className="assistant-header-img"
                  />
                  <span className="assistant-status-dot"></span>
                </div>
                <div>
                  <strong>Moin's Assistant</strong>
                  <small>PORTFOLIO ASSISTANT</small>
                </div>
              </div>

              <div className="assistant-header-actions">
                {activeTab === 'chat' && (
                  <button
                    type="button"
                    onClick={handleResetChat}
                    title="Reset conversation"
                    aria-label="Reset conversation"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                      <path d="M21 3v5h-5"></path>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                      <path d="M8 16H3v5"></path>
                    </svg>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse modal" : "Expand modal"}
                  aria-label={isExpanded ? "Collapse modal" : "Expand modal"}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isExpanded ? (
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    ) : (
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                    )}
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat / Voice Tabs */}
            <div className="assistant-tabs">
              <button
                type="button"
                className={activeTab === 'chat' ? 'active' : ''}
                onClick={() => setActiveTab('chat')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Chat</span>
              </button>
              <button
                type="button"
                className={activeTab === 'voice' ? 'active' : ''}
                onClick={() => setActiveTab('voice')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                <span>Voice</span>
              </button>
            </div>

            {/* Active Tab: CHAT */}
            {activeTab === 'chat' && (
              <>
                <div className="assistant-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`assistant-message ${msg.sender}`}>
                      {msg.sender === 'assistant' && (
                        <div className="assistant-msg-avatar">
                          <img src="/chatbot.png" alt="Assistant" />
                        </div>
                      )}
                      <div className="assistant-message-content">
                        <span>{msg.text}</span>
                        {msg.cards && msg.cards.length > 0 && (
                          <div className="assistant-cards">
                            {msg.cards.map((card, cIdx) => (
                              <div
                                key={cIdx}
                                className="assistant-card"
                                onClick={() => {
                                  if (card.link) {
                                    window.open(card.link, '_blank');
                                  } else if (card.action === 'scroll-technology') {
                                    scrollToSection('technology');
                                  } else if (card.action === 'scroll-experience') {
                                    scrollToSection('experience');
                                  } else if (card.action === 'projects') {
                                    handleSendMessage('Show me all projects');
                                  }
                                }}
                              >
                                <strong>{card.title} ↗</strong>
                                <p>{card.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="assistant-message assistant">
                      <div className="assistant-msg-avatar">
                        <img src="/chatbot.png" alt="Assistant" />
                      </div>
                      <div className="assistant-message-content">
                        <div className="typing-dots" style={{ padding: '12px' }}>
                          <i></i><i></i><i></i>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4 Starter Quick Actions */}
                  {messages.length === 1 && (
                    <div className="assistant-starter-options">
                      <button type="button" onClick={() => handleStarterOption('projects')}>
                        <span className="starter-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        </span>
                        <div>
                          <strong>Explore projects</strong>
                          <small>See selected ASP.NET, Laravel &amp; PHP work</small>
                        </div>
                        <svg className="starter-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </button>

                      <button type="button" onClick={() => handleStarterOption('services')}>
                        <span className="starter-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                        </span>
                        <div>
                          <strong>View services</strong>
                          <small>Full stack development &amp; AI integrations</small>
                        </div>
                        <svg className="starter-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </button>

                      <button type="button" onClick={() => handleStarterOption('discuss')}>
                        <span className="starter-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </span>
                        <div>
                          <strong>Discuss a project</strong>
                          <small>Share an idea and get a clear next step</small>
                        </div>
                        <svg className="starter-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </button>

                      <button type="button" onClick={() => handleStarterOption('contact')}>
                        <span className="starter-icon-box" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </span>
                        <div>
                          <strong>Contact Moin</strong>
                          <small>Direct WhatsApp, phone, or email</small>
                        </div>
                        <svg className="starter-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Bar */}
                <form
                  className="assistant-input"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about projects, skills, or experience..."
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim()}
                    aria-label="Send message"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              </>
            )}

            {/* Active Tab: VOICE */}
            {activeTab === 'voice' && (
              <div className={`voice-panel ${isVoiceActive ? 'active' : ''}`}>
                <div className="voice-status">
                  <i></i>
                  <span>{voiceStatus}</span>
                </div>

                {/* Pulsating Voice Orb with 3D Robot Image */}
                <div className="voice-orb">
                  <i></i>
                  <i></i>
                  <div className="voice-avatar-frame">
                    <img src="/chatbot.png" alt="Voice Assistant" className="voice-robot-img" />
                  </div>
                </div>

                <h3>Voice Assistant</h3>
                <p>Speak with Moin's interactive assistant about his software engineering experience and projects.</p>

                {voiceTranscript && (
                  <div className="voice-transcript">
                    {voiceTranscript}
                  </div>
                )}

                <button
                  type="button"
                  className={`voice-start ${isVoiceActive ? 'active' : ''}`}
                  onClick={toggleVoiceSession}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                  <span>{isVoiceActive ? 'End Voice Session' : 'Start Voice Session'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
  );
}
