import { personalInfo, projects, services, valuePillars, experience, education, techStack } from '../data/portfolioData';

// Master System Prompt for Groq LLM and AI Voice/Calling Agent
export const MOIN_SYSTEM_PROMPT = `
You are the official AI Portfolio & Calling Agent for Ghulam Moin Uddin.
Your goal is to represent Ghulam Moin Uddin professionally, accurately, and enthusiastically to potential clients, recruiters, and visitors.

=== ABOUT GHULAM MOIN UD DIN ===
- Name: Ghulam Moin Uddin
- Role: Full Stack Web Developer & Software Engineering Student
- Location: Karachi, Pakistan
- WhatsApp / Phone: +92 370 0100724 (International: +923700100724)
- Email: moin69603@gmail.com
- GitHub: https://github.com/GHULAM-MOIN-UD-DIN
- LinkedIn: https://www.linkedin.com/in/ghulam-moin-uddin-akhtar-39355537b
- Resume: Downloadable ATS Resume (Word docx in public folder)

=== EDUCATION ===
1. ADSE (Advanced Diploma in Software Engineering) at Aptech Computer Education, Karachi (In progress, 3 Semesters Completed).
2. Intermediate in Computer Science at Govt. Degree Science & Commerce College, Asifabad, Karachi (Completed).
3. Matriculation in Computer Science at MAFFH Schooling System, Karachi (Completed).

=== PROFESSIONAL EXPERIENCE ===
- Backend Developer at Developer Hub (Remote, Feb 2026 – Mar 2026):
  Designed backend REST API endpoints, handled server logic, integrated relational database queries, and collaborated in an agile team.

=== MAJOR PRODUCTION PROJECTS ===
1. SMS Site (HiChat):
   - Type: Online SMS Management Platform with Integrated AI Chatbot
   - Stack: ASP.NET Core MVC, C#, SQL Server, AI Chatbot (Groq API), Render
   - Live URL: https://sms-site.onrender.com/
   - Features: Automated customer communication via AI chatbot, secure custom auth (login/signup), responsive multi-screen layout, relational SQL database.

2. RentalX:
   - Type: Modern Property Rental & Booking Platform
   - Stack: Laravel, PHP, MySQL, REST APIs, Blade, Render
   - Live URL: https://rentalx-8cmp.onrender.com/
   - Features: Property listings, real-time booking flows, integrated customer support ticketing & query management, multi-role user dashboards.

3. FoodPOS:
   - Type: Food Ordering & Point-of-Sale Web Application
   - Stack: PHP, MySQL, JavaScript, CSS3, InfinityFree
   - Live URL: https://food-pose.infinityfreeapp.com/login.php
   - Features: Multi-tier auth, dynamic order processing, fast receipt tracking, optimized MySQL transactions for restaurant counters.

=== SERVICES OFFERED ===
1. Full-Stack Web Development (Custom frontend + scalable backend)
2. ASP.NET Core & Backend APIs (C#, MVC architecture, authentication, RESTful APIs)
3. Laravel & PHP Solutions (E-commerce, booking systems, customer ticketing, portals)
4. Database Architecture & SQL (SQL Server, MySQL, schema optimization, indexing)
5. AI Chatbot & API Integrations (Groq API, OpenRouter, Vapi voice calling agents)

=== VALUE PILLARS ===
- Architecture: Clean & Decoupled MVC design
- Speed & Performance: Optimized database queries, fast load times
- User Experience: Pixel-perfect, fluid, mobile-responsive UI
- Intelligence: Embedding high-speed AI chatbots & automated pipelines

=== CONVERSATION RULES ===
1. DO NOT repeatedly introduce yourself. DO NOT say "Hello, I am Moin's assistant" or "Main Moin ka assistant hoon" in every message. Only introduce yourself if specifically asked "Who are you?" or "Aap kon hain?".
2. Answer the user's question directly, clearly, and concisely.
3. If the user asks in Roman Urdu (e.g., "Moin kon hai?", "Moin ke projects batao", "Skills kya hain?", "Kaise contact karoon?"):
   - Reply in natural, polite, and conversational Roman Urdu.
4. If the user asks in English:
   - Reply in crisp, professional, and friendly English.
5. If user mixes English and Roman Urdu:
   - Reply in a natural, polite bilingual style.
6. For Voice Calls:
   - Keep answers strictly to 1 to 2 short spoken sentences (maximum 30 words) so it can be spoken in a few seconds.
   - NEVER use markdown symbols (no **, *, #, bullets) and NEVER speak full URLs.
`;

// Helper: Detect if user is asking in Roman Urdu
export function isRomanUrduQuery(text) {
  const lower = text.toLowerCase();
  const romanUrduWords = [
    'kya', 'kia', 'kaise', 'kese', 'kon', 'kaun', 'kahan', 'kis', 'kisi',
    'hai', 'hain', 'ho', 'hoga', 'hogi', 'batao', 'btao', 'batain',
    'karo', 'karein', 'karna', 'karoon', 'chahiye', 'mujhe', 'apka', 'apki',
    'moin', 'parhai', 'taleem', 'rabta', 'kaam', 'kitna', 'kitni',
    'kesa', 'acha', 'shukriya', 'salam', 'assalam', 'aoa', 'walaikum',
    'bhai', 'yar', 'g', 'ji', 'haan', 'nahi', 'pe', 'par', 'se', 'ko', 'ka', 'ke', 'ki'
  ];
  
  const tokens = lower.split(/[\s,?.!]+/);
  const matchCount = tokens.filter(w => romanUrduWords.includes(w)).length;
  return matchCount >= 2 || (tokens.length <= 3 && matchCount >= 1);
}

export const DEFAULT_GROQ_KEY = import.meta.env?.VITE_GROQ_API_KEY || '';

// Call Groq API (Llama 3.3 70B or Llama 3.1 8B)
export async function callGroqAPI(prompt, conversationHistory = [], apiKey = '', signal = null) {
  const activeKey = apiKey || (import.meta.env?.VITE_GROQ_API_KEY) || (typeof window !== 'undefined' && (localStorage.getItem('groq_api_key') || window.GROQ_API_KEY)) || DEFAULT_GROQ_KEY;
  
  if (!activeKey) {
    throw new Error('NO_API_KEY');
  }

  const messagesPayload = [
    { role: 'system', content: MOIN_SYSTEM_PROMPT },
    ...conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: prompt }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${activeKey.trim()}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: messagesPayload,
      temperature: 0.6,
      max_tokens: 600
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Groq API Error: ${response.status}`);
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || '';
  return answer;
}

// Local High-Intelligence Engine (Zero-API Fallback for English & Roman Urdu)
export function getLocalAIResponse(userText) {
  const lower = userText.toLowerCase().trim();
  const isUrdu = isRomanUrduQuery(lower);

  // 1. GREETING / SALAM
  if (/^(hi|hello|hey|salam|assalam|aoa|hola)/i.test(lower)) {
    if (isUrdu) {
      return {
        text: "Walaikum Assalam! Main Ghulam Moin Uddin ka official AI assistant hoon. Main aap ko Moin ke projects (HiChat, RentalX, FoodPOS), technical skills, experience aur contact details ke baray me mukammal guide kar sakta hoon. Aap kya janna chahein gay?",
        cards: [
          { title: "Moin ke Projects", desc: "ASP.NET Core, Laravel & PHP work", action: "projects" },
          { title: "Direct Contact / WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` }
        ]
      };
    }
    return {
      text: "Hello! I am Ghulam Moin Uddin's official AI assistant. I can guide you through his full-stack projects (HiChat SMS, RentalX, FoodPOS), ASP.NET & Laravel skills, work experience, or direct contact options. How can I help you today?",
      cards: [
        { title: "Explore Projects", desc: "Live ASP.NET, Laravel & PHP web apps", action: "projects" },
        { title: "Get in Touch", desc: "Chat directly on WhatsApp", link: `https://wa.me/${personalInfo.whatsappNumber}` }
      ]
    };
  }

  // 2. IDENTITY / WHO IS MOIN / MOIN KON HAI
  if (lower.includes('who is') || lower.includes('about moin') || lower.includes('kon hai') || lower.includes('kaun hai') || lower.includes('introduce') || lower.includes('taaruf')) {
    if (isUrdu) {
      return {
        text: "Ghulam Moin Uddin Karachi, Pakistan se aik energetic **Full Stack Web Developer** aur Software Engineering student hain.\n\n• **Core Expertise**: ASP.NET Core MVC, C#, Laravel, PHP, MySQL, SQL Server aur React.\n• **AI Integrations**: Web applications me Groq API, OpenRouter aur Vapi AI calling agents lagana.\n• **Education**: Aptech Computer Education me ADSE (3 semesters mukammal) aur Intermediate in CS.\n• **Experience**: Developer Hub me remote Backend Developer ke tor par kaam kiya hai.",
        cards: [
          { title: "Moin ke Projects Dekhein", desc: "HiChat, RentalX, FoodPOS", action: "projects" },
          { title: "WhatsApp pe baat karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin is a Karachi-based **Full Stack Web Developer** and Software Engineering student specializing in building robust, high-performance web applications.\n\n• **Core Stack**: ASP.NET Core MVC, C#, Laravel, PHP, SQL Server, MySQL, and React.\n• **AI Integrations**: Groq API, OpenRouter, and Vapi Voice Agents.\n• **Background**: Remote Backend Developer experience at Developer Hub, currently pursuing ADSE at Aptech (3 semesters completed).",
      cards: [
        { title: "View Selected Work", desc: "3 Production-Grade Web Apps", action: "projects" },
        { title: "Connect via LinkedIn", desc: "Professional Profile", link: personalInfo.linkedin }
      ]
    };
  }

  // 3. PROJECTS / WORK / KAAM / KYA BANAYA HAI
  if (lower.includes('project') || lower.includes('kaam') || lower.includes('built') || lower.includes('portfolio') || lower.includes('banaya') || lower.includes('hichat') || lower.includes('rentalx') || lower.includes('foodpos') || lower.includes('sms site')) {
    if (isUrdu) {
      return {
        text: "Ghulam Moin Uddin ne 3 baray live production projects develop kiye hain:\n\n1. **SMS Site (HiChat)**: ASP.NET Core MVC platform jis me automated customer communication ke liye AI chatbot integrated hai aur custom secure auth hai.\n2. **RentalX**: Laravel-powered property rental aur booking system jis me customer support ticketing workflow shaamil hai.\n3. **FoodPOS**: Fast PHP & MySQL Point-of-Sale web app jo restaurants ke live orders aur receipt tracking manage karti hai.\n\nAap in ke live demo links neeche check kar sakte hain:",
        cards: [
          { title: "SMS Site (HiChat) Live", desc: "ASP.NET Core MVC & AI Chatbot", link: "https://sms-site.onrender.com/" },
          { title: "RentalX Live", desc: "Laravel Rental & Booking Platform", link: "https://rentalx-8cmp.onrender.com/" },
          { title: "FoodPOS Live", desc: "PHP & MySQL POS System", link: "https://food-pose.infinityfreeapp.com/login.php" }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin has engineered 3 major production-grade web platforms:\n\n1. **SMS Site (HiChat)**: Built with ASP.NET Core MVC, C#, SQL Server, featuring an integrated AI Chatbot for 24/7 automated support and custom authentication.\n2. **RentalX**: Developed with Laravel, PHP & MySQL, featuring real-time property listings, booking flows, and support ticket management.\n3. **FoodPOS**: A swift PHP & MySQL Point-of-Sale system built for dining and retail ordering workflows.\n\nExplore them live below:",
      cards: [
        { title: "SMS Site (HiChat) ↗", desc: "ASP.NET Core MVC & AI Chatbot", link: "https://sms-site.onrender.com/" },
        { title: "RentalX Portal ↗", desc: "Laravel Rental Platform", link: "https://rentalx-8cmp.onrender.com/" },
        { title: "FoodPOS System ↗", desc: "PHP & MySQL POS System", link: "https://food-pose.infinityfreeapp.com/login.php" }
      ]
    };
  }

  // 4. SKILLS / TECH STACK / KYA AATA HAI
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('language') || lower.includes('c#') || lower.includes('dotnet') || lower.includes('laravel') || lower.includes('php') || lower.includes('kya aata')) {
    if (isUrdu) {
      return {
        text: "Moin ka technical stack modern backend aur frontend dono par mushtamil hai:\n\n• **Languages**: C#, PHP, JavaScript, SQL, HTML5, CSS3\n• **Frameworks**: ASP.NET Core MVC, Laravel, React, Tailwind CSS, Bootstrap\n• **Databases**: Microsoft SQL Server, MySQL, Relational Database Modeling\n• **AI & APIs**: Groq API, OpenRouter, Vapi Voice AI Agents, RESTful APIs\n• **DevOps & Tools**: Git, GitHub, Render, InfinityFree, VS Code, Visual Studio",
        cards: [
          { title: "Tech Stack Section", desc: "Portfolio me Mukammal Stack Dekhein", action: "scroll-technology" }
        ]
      };
    }
    return {
      text: "Moin's technical stack spans across modern full-stack development:\n\n• **Languages**: C#, PHP, JavaScript, SQL, HTML5, CSS3\n• **Backend Frameworks**: ASP.NET Core MVC, Laravel\n• **Frontend**: React, Tailwind CSS, Bootstrap, Modern JavaScript\n• **Databases**: Microsoft SQL Server, MySQL (Query Optimization & Schema Design)\n• **AI Tools**: Groq API, OpenRouter, Vapi Voice Agents\n• **Deployment**: Git, GitHub, Render, InfinityFree",
      cards: [
        { title: "Explore Tech Stack", desc: "View categorized skills section", action: "scroll-technology" }
      ]
    };
  }

  // 5. EXPERIENCE / JOB / DEVELOPER HUB / TAZURBA
  if (lower.includes('experience') || lower.includes('job') || lower.includes('developer hub') || lower.includes('career') || lower.includes('tazurba') || lower.includes('kahan kaam')) {
    if (isUrdu) {
      return {
        text: "Moin ne **Developer Hub** me **Remote Backend Developer** (Feb 2026 – Mar 2026) ke tor par kaam kiya hai.\n\n• Wahan server-side REST API endpoints design kiye.\n• Relational database queries aur business logic manage kiye.\n• Agile development team ke saath remote collaboration ki.",
        cards: [
          { title: "Experience Timeline", desc: "Career details dekhein", action: "scroll-experience" },
          { title: "LinkedIn Profile", desc: "Professional background", link: personalInfo.linkedin }
        ]
      };
    }
    return {
      text: "Moin worked as a **Remote Backend Developer** at **Developer Hub** (Feb 2026 – Mar 2026).\n\nKey accomplishments:\n• Designed and maintained backend RESTful API endpoints\n• Handled complex SQL queries and server-side business logic\n• Participated in agile sprint cycles and remote code collaboration",
      cards: [
        { title: "Experience Timeline", desc: "Check career milestones", action: "scroll-experience" },
        { title: "LinkedIn Profile", desc: "View verified experience", link: personalInfo.linkedin }
      ]
    };
  }

  // 6. EDUCATION / TALEEM / PARHAI / APTECH
  if (lower.includes('education') || lower.includes('study') || lower.includes('aptech') || lower.includes('college') || lower.includes('degree') || lower.includes('parhai') || lower.includes('taleem') || lower.includes('qualification')) {
    if (isUrdu) {
      return {
        text: "Moin ki taleemi qualification yeh hai:\n\n1. **ADSE (Advanced Diploma in Software Engineering)** - Aptech Computer Education (3 Semesters Completed, In Progress).\n2. **Intermediate in Computer Science** - Govt. Degree Science & Commerce College, Asifabad, Karachi (Completed).\n3. **Matriculation in Computer Science** - MAFFH Schooling System, Karachi (Completed).",
        cards: [
          { title: "Education Timeline", desc: "Taleemi records check karein", action: "scroll-experience" }
        ]
      };
    }
    return {
      text: "Moin's educational background includes:\n\n1. **ADSE (Advanced Diploma in Software Engineering)**: Aptech Computer Education, Karachi (3 Semesters completed, in progress).\n2. **Intermediate in Computer Science**: Govt. Degree Science & Commerce College Asifabad, Karachi.\n3. **Matriculation in Computer Science**: MAFFH Schooling System, Karachi.",
      cards: [
        { title: "Education Timeline", desc: "View full academic credentials", action: "scroll-experience" }
      ]
    };
  }

  // 7. CONTACT / HIRE / WHATSAPP / PHONE / EMAIL / RABTA
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('phone') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('number') || lower.includes('rabta') || lower.includes('call') || lower.includes('milna')) {
    if (isUrdu) {
      return {
        text: "Aap Ghulam Moin Uddin se direct rabta kar sakte hain:\n\n• **WhatsApp & Phone**: +92 370 0100724\n• **Email**: moin69603@gmail.com\n• **Location**: Karachi, Pakistan (Remote kaam ke liye bhi available hain)\n• **GitHub**: github.com/GHULAM-MOIN-UD-DIN\n• **LinkedIn**: linkedin.com/in/ghulam-moin-uddin-akhtar-39355537b",
        cards: [
          { title: "WhatsApp pe message karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
          { title: "Email bhejein", desc: "moin69603@gmail.com", link: `mailto:${personalInfo.email}` }
        ]
      };
    }
    return {
      text: "You can reach Ghulam Moin Uddin directly across multiple channels:\n\n• **WhatsApp / Call**: +92 370 0100724\n• **Direct Email**: moin69603@gmail.com\n• **Location**: Karachi, Pakistan (Available for remote and worldwide opportunities)\n• **GitHub**: github.com/GHULAM-MOIN-UD-DIN\n• **LinkedIn**: linkedin.com/in/ghulam-moin-uddin-akhtar-39355537b",
      cards: [
        { title: "Chat on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
        { title: "Send an Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
      ]
    };
  }

  // 8. RESUME / CV
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    if (isUrdu) {
      return {
        text: "Ghulam Moin Uddin ka ATS-friendly Resume tayyar hai. Aap neeche diye gaye link par click kar ke resume direct download kar sakte hain:",
        cards: [
          { title: "Download ATS Resume", desc: "Word Document (DOCX)", link: "/Ghulam_Moin_Uddin_ATS_Resume (1).docx" },
          { title: "WhatsApp pe Resume mangein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}?text=Hi%20Moin,%20please%20share%20your%20latest%20resume` }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin's ATS-compliant resume is readily available for download. Click below to get a copy:",
      cards: [
        { title: "Download ATS Resume (.docx)", desc: "Direct Word File Download", link: "/Ghulam_Moin_Uddin_ATS_Resume (1).docx" },
        { title: "Request via WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}?text=Hi%20Moin,%20please%20share%20your%20latest%20resume` }
      ]
    };
  }

  // 9. SERVICES / KHIDMAT / KYA BANATE HO
  if (lower.includes('service') || lower.includes('services') || lower.includes('offer') || lower.includes('kya banate') || lower.includes('sahoolat')) {
    if (isUrdu) {
      return {
        text: "Moin yeh khidmaat faraham karte hain:\n\n1. **Full-Stack Web Development**: End-to-end custom web apps modern UI aur fast backend ke sath.\n2. **ASP.NET Core & Backend APIs**: Secure authentication, role management aur scalable APIs.\n3. **Laravel & PHP Solutions**: Custom e-commerce, property rental aur booking portals.\n4. **Database Architecture & SQL**: Relational database schema design aur query optimization.\n5. **AI Chatbots & Integrations**: Websites me Groq API aur voice AI agents lagana.",
        cards: [
          { title: "Project Discuss Karein", desc: "WhatsApp par rabta karein", link: `https://wa.me/${personalInfo.whatsappNumber}` }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin offers 5 key professional services:\n\n1. **Full-Stack Web Development**: Custom responsive web applications built for scalability.\n2. **ASP.NET Core & Backend APIs**: Robust RESTful APIs, enterprise authentication, and high concurrency.\n3. **Laravel & PHP Solutions**: Tailored portals, booking platforms, and ticketing systems.\n4. **Database Architecture & SQL**: Schema normalization, indexing, and SQL query tuning.\n5. **AI Chatbot & Voice Integrations**: Fast LLMs via Groq API and Vapi voice calling agents.",
      cards: [
        { title: "Discuss a Project", desc: "Get an estimate or technical advice", link: `https://wa.me/${personalInfo.whatsappNumber}` }
      ]
    };
  }

  // 10. DEFAULT INTELLIGENT FALLBACK
  if (isUrdu) {
    return {
      text: `Aap ke sawal ka shukriya! Ghulam Moin Uddin Karachi se aik Full Stack Web Developer hain jo ASP.NET Core MVC, Laravel, PHP aur AI Integrations me specialize karte hain.\n\nAap in ke baray me kuch bhi pooch sakte hain:\n• Moin ke live projects (HiChat, RentalX, FoodPOS)\n• Technical skills aur tools\n• Taleem aur Aptech background\n• WhatsApp (+92 370 0100724) ya direct email`,
      cards: [
        { title: "WhatsApp pe baat karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
        { title: "Direct Email bhejein", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
      ]
    };
  }

  return {
    text: `Thank you for your inquiry! Ghulam Moin Uddin is a Full Stack Web Developer based in Karachi, Pakistan specializing in ASP.NET Core MVC, Laravel, PHP, and AI Chatbot Integrations.\n\nFeel free to ask about his:\n• Production projects (HiChat SMS, RentalX, FoodPOS)\n• Technical stack & backend capabilities\n• Work experience at Developer Hub\n• Education at Aptech\n• Contact & hiring information`,
    cards: [
      { title: "Chat on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
      { title: "Direct Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
    ]
  };
}
