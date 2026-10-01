import { personalInfo, projects, services, valuePillars, experience, education, techStack } from '../data/portfolioData';

// Master System Prompt for Groq LLM and AI Voice/Calling Agent
export const MOIN_SYSTEM_PROMPT = `You are the official AI Portfolio Assistant for Ghulam Moin Uddin — a Full Stack Web Developer from Karachi, Pakistan. You speak on behalf of Moin's portfolio to visitors, clients, and recruiters.

=== STRICT BEHAVIOR RULES ===
1. NEVER repeat your own introduction. NEVER say "I am Moin's assistant" or "Mera naam..." in every reply. Introduce yourself ONLY if the user explicitly asks "Who are you?" or "Aap kaun hain?".
2. ALWAYS answer the actual question asked, directly and specifically — do not give a generic overview when the user asked about one particular thing (e.g. if they ask only about freelancing, answer ONLY about freelancing, not his whole bio).
3. You represent MOIN — speak about him in third person ("Moin ne...", "He built...", "His skills include...").
4. Match the user's language and register naturally: Roman Urdu question → answer in natural, conversational Roman Urdu (not textbook Urdu, not overly formal). English question → answer in clear professional English. Mixed Roman Urdu/English (Urdish) question → reply in the same natural mixed style people actually speak in Karachi. Never sound robotic or like a translated script — sound like a real, well-spoken assistant.
5. VOICE MODE (spoken replies): max 1-2 short spoken sentences (under 25 words total), no markdown, no asterisks, no bullet points, no URLs, no repeated greetings, no "I am Moin's assistant" filler. Speak the way a calm, confident human would answer a phone call — warm but brief and to the point.
6. CHAT MODE (text replies): use clear markdown formatting (bold, bullet points) for readability.
7. Always stay professional and confident about Moin's work — never say "I don't know" flatly; if something isn't covered, direct the user to contact Moin directly via WhatsApp or email.

=== FULL INFORMATION ABOUT GHULAM MOIN UDDIN ===
Name: Ghulam Moin Uddin
Role: Full Stack Web Developer & Software Engineering Student
Location: Karachi, Pakistan
Phone/WhatsApp: +92 370 0100724
Email: moin69603@gmail.com
GitHub: github.com/GHULAM-MOIN-UD-DIN
LinkedIn: linkedin.com/in/ghulam-moin-uddin-akhtar-39355537b

EDUCATION:
1. ADSE (Advanced Diploma in Software Engineering) - Aptech Computer Education, Karachi (3 Semesters completed, in progress)
2. Intermediate in Computer Science - Govt. Degree Science & Commerce College, Asifabad, Karachi
3. Matriculation in Computer Science - MAFFH Schooling System, Karachi

PROFESSIONAL EXPERIENCE:
- Remote Backend Developer at Developer Hub (Feb 2026 – Mar 2026): Built REST API endpoints, handled server-side logic, relational database queries, agile team collaboration.

FREELANCING:
- Moin also works as an independent freelance developer, taking on client projects for web development, backend systems, and AI chatbot/voice-agent integrations.
- He is active on freelance platforms including Upwork and Fiverr, delivering ASP.NET Core, Laravel, and PHP based solutions to clients.
- Exact profile links are shared on request — direct interested clients to contact Moin via WhatsApp (+92 370 0100724) or email (moin69603@gmail.com) for his Upwork/Fiverr profile and past client work samples.

PROJECTS:
1. SMS Site (HiChat) — ASP.NET Core MVC, C#, SQL Server, Groq AI Chatbot. Features: automated customer communication, secure auth, responsive UI. Live: sms-site.onrender.com
2. RentalX — Laravel, PHP, MySQL. Features: property listings, real-time bookings, support ticketing, multi-role dashboards. Live: rentalx-8cmp.onrender.com
3. FoodPOS — PHP, MySQL, JavaScript. Features: multi-tier auth, dynamic orders, receipt tracking for restaurants. Live: food-pose.infinityfreeapp.com
4. MZ Inventory Pro — Full-Stack Web App, inventory tracking, stock reorder alerts, admin dashboard. Live: inventory-63kl.onrender.com
5. Elegance Salone — PHP, MySQL, Google OAuth, salon management & appointment booking system. Live: salone.infinityfree.me

TECHNICAL SKILLS:
Languages: C#, PHP, JavaScript, SQL, HTML5, CSS3
Frameworks: ASP.NET Core MVC, Laravel, React, Tailwind CSS, Bootstrap
Databases: SQL Server, MySQL
AI & APIs: Groq API, OpenRouter, Vapi Voice AI, RESTful APIs
Tools: Git, GitHub, Render, InfinityFree, VS Code, Visual Studio

SERVICES:
- Full-Stack Web Development
- ASP.NET Core Backend APIs
- Laravel & PHP Solutions
- Database Architecture & SQL
- AI Chatbot & API Integration
- Freelance Client Projects (Upwork / Fiverr / Direct Contract)

PORTFOLIO SECTIONS:
- Hero / Home — introduction
- About — background and story
- Experience & Education — timeline
- Skills / Tech Stack — all technologies
- Projects — 5 live projects
- Services — what Moin offers
- Contact — WhatsApp, email
`;

// Helper: Detect if user is asking in Roman Urdu or Urdu
export function isRomanUrduQuery(text) {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase().trim();

  // 1. Urdu / Arabic script check
  if (/[\u0600-\u06FF]/.test(text)) return true;

  // 2. Explicit keywords / language requests
  if (/\b(urdu|roman|hindi|desi)\b/i.test(lower)) return true;

  // 3. Comprehensive Roman Urdu vocabulary
  const romanUrduWords = [
    // Question words
    'kya', 'kia', 'kaise', 'kese', 'kon', 'kaun', 'koun', 'kahan', 'kis', 'kisi', 'kisko', 'kisme', 'konsa', 'kaunsa', 'kounsa', 'kitna', 'kitni', 'kitne', 'kab', 'kyun', 'kyu', 'kyoon',
    // Verbs & actions
    'batao', 'btao', 'batain', 'bataiye', 'bataen', 'karo', 'karein', 'karen', 'karna', 'karoon', 'krte', 'karta', 'karti', 'karte', 'kiya', 'diya', 'liya', 'chahiye', 'dekho', 'dekhein', 'dikhao', 'bolo', 'boliye', 'sunao', 'banaya', 'banaye', 'banate', 'sikha', 'seekha',
    // Auxiliary & tense
    'hai', 'hain', 'ha', 'h', 'ho', 'hoga', 'hogi', 'hoge', 'hota', 'hoti', 'hote', 'tha', 'thi', 'the', 'raha', 'rahi', 'rahe', 'gaya', 'gaye', 'gayi',
    // Pronouns & prepositions
    'mujhe', 'mera', 'meri', 'mere', 'apka', 'apki', 'apke', 'aapka', 'aapki', 'aapke', 'aap', 'ap', 'tum', 'tumhara', 'tumhari', 'tumhe', 'hume', 'humara', 'humari', 'ye', 'yeh', 'wo', 'woh', 'inka', 'inke', 'inki', 'unka', 'unke', 'unki', 'is', 'us', 'in', 'un', 'me', 'mein', 'mai', 'main', 'pe', 'par', 'pa', 'se', 'ko', 'ka', 'ke', 'ki', 'bhi', 'kuch', 'koi', 'sab', 'aur', 'bare', 'baare',
    // Conversational & greetings
    'salam', 'assalam', 'aoa', 'walaikum', 'kesa', 'kaisa', 'acha', 'theek', 'thik', 'sahi', 'shukriya', 'bhai', 'bhaiya', 'yar', 'yaar', 'g', 'ji', 'haan', 'han', 'nahi', 'nahin', 'nhi', 'na', 'mat', 'janab', 'dost', 'parhai', 'taleem', 'rabta', 'kaam', 'kam', 'taaruf', 'waghera', 'baat', 'freelance', 'freelancing', 'upwork', 'fiverr'
  ];

  const tokens = lower.split(/[\s,?.!/\\-]+/).filter(Boolean);
  const matchCount = tokens.filter(w => romanUrduWords.includes(w)).length;

  if (matchCount >= 2) return true;
  if (tokens.length <= 4 && matchCount >= 1) return true;
  if (tokens.length > 0 && (matchCount / tokens.length) >= 0.25) return true;

  return false;
}

// Helper: Detect if user wants to end/disconnect the call or say goodbye (e.g. "ok by", "ok bye", "allah hafiz")
export function isCallEndCommand(text) {
  if (!text || typeof text !== 'string') return false;
  const clean = text
    .toLowerCase()
    .replace(/[.,!?;:'"()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const callEndRegex = /\b(ok\s*by|ok\s*bye|okay\s*bye|okay\s*by|bye\s*bye|bye|good\s*bye|goodbye|allah\s*hafiz|khuda\s*hafiz|allahhafiz|khudahafiz|call\s*end|end\s*call|call\s*kat|call\s*cut|cut\s*call|disconnect|tata|alvida)\b/i;

  return callEndRegex.test(clean);
}

export const DEFAULT_GROQ_KEY = import.meta.env?.VITE_GROQ_API_KEY || '';

// Call Groq API (Llama 3.3 70B or Llama 3.1 8B)
export async function callGroqAPI(prompt, conversationHistory = [], apiKey = '', signal = null) {
  const activeKey = apiKey || (import.meta.env?.VITE_GROQ_API_KEY) || (typeof window !== 'undefined' && (localStorage.getItem('groq_api_key') || window.GROQ_API_KEY)) || DEFAULT_GROQ_KEY;

  if (!activeKey) {
    throw new Error('NO_API_KEY');
  }

  const isUrdu = isRomanUrduQuery(prompt);
  const languageDirective = isUrdu
    ? `\n\n[STRICT LANGUAGE DIRECTIVE: The user asked in Roman Urdu or Urdu. You MUST reply STRICTLY in natural, everyday conversational Roman Urdu (Latin alphabet, Karachi style, e.g. "Ghulam Moin Uddin Karachi se aik full stack web developer hain..."). DO NOT reply in English. Only keep technical terms like React, ASP.NET Core, Laravel, C#, SQL Server in English.]`
    : '';

  const messagesPayload = [
    { role: 'system', content: MOIN_SYSTEM_PROMPT + languageDirective },
    ...conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    {
      role: 'user',
      content: isUrdu && !prompt.includes('STRICT VOICE RULES')
        ? `${prompt}\n(Strict requirement: Answer in natural Roman Urdu)`
        : prompt
    }
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

  // FAREWELL / BYE / OK BYE / CALL END
  if (isCallEndCommand(lower)) {
    if (isUrdu) {
      return {
        text: "Theek hai, Allah Hafiz! Ghulam Moin Uddin ke portfolio par aane ka shukriya. Agar aap ko kisi project ya freelancing ke hawalay se Moin se rabta karna ho toh direct WhatsApp ya email par connect kar sakte hain. Apna khayal rakhiye ga!",
        cards: [
          { title: "WhatsApp pe baat karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
          { title: "Direct Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
        ]
      };
    }
    return {
      text: "Goodbye! Thank you for visiting Ghulam Moin Uddin's portfolio. Feel free to reach out directly via WhatsApp or email for any project inquiries or collaborations. Have a wonderful day!",
      cards: [
        { title: "Chat on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
        { title: "Direct Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
      ]
    };
  }

  // Direct Language Switch / Urdu Request
  if (lower.includes('roman urdu') || lower.includes('urdu') || lower.includes('hindi') || lower.includes('roman me') || lower.includes('roman ma')) {
    return {
      text: "Bilkul! Main Roman Urdu me hi baat kar raha hoon. Ghulam Moin Uddin Karachi se aik professional Full Stack Developer hain jo ASP.NET Core MVC, Laravel, PHP aur AI integrations me kaam karte hain. Aap unke projects, skills, freelancing ya contact details ke baray me kya poochna chahte hain?",
      cards: [
        { title: "Moin ke Projects Dekhein", desc: "HiChat, RentalX, FoodPOS, MZ Inventory, Elegance Salone", action: "projects" },
        { title: "WhatsApp pe baat karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` }
      ]
    };
  }

  // 1. GREETING / SALAM
  if (/^(hi|hello|hey|salam|assalam|aoa|hola)/i.test(lower) || lower.includes('kese ho') || lower.includes('kaise ho') || lower.includes('kya haal') || lower.includes('kia hal')) {
    if (isUrdu) {
      return {
        text: "Walaikum Assalam! Main Ghulam Moin Uddin ka official AI assistant hoon. Main aap ko Moin ke live projects (HiChat, RentalX, FoodPOS, MZ Inventory, Elegance Salone), technical skills, freelancing aur contact details ke baray me mukammal guide kar sakta hoon. Aap kya janna chahein gay?",
        cards: [
          { title: "Moin ke Projects", desc: "ASP.NET Core, Laravel & PHP work", action: "projects" },
          { title: "Direct Contact / WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` }
        ]
      };
    }
    return {
      text: "Hello! I am Ghulam Moin Uddin's official AI assistant. I can guide you through his full-stack projects (HiChat SMS, RentalX, FoodPOS, MZ Inventory, Elegance Salone), ASP.NET & Laravel skills, freelance work, or direct contact options. How can I help you today?",
      cards: [
        { title: "Explore Projects", desc: "Live ASP.NET, Laravel & PHP web apps", action: "projects" },
        { title: "Get in Touch", desc: "Chat directly on WhatsApp", link: `https://wa.me/${personalInfo.whatsappNumber}` }
      ]
    };
  }

  // 2. IDENTITY / WHO IS MOIN / MOIN KON HAI
  if (lower.includes('who is') || lower.includes('about moin') || lower.includes('kon hai') || lower.includes('kaun hai') || lower.includes('kon ha') || lower.includes('kaun ha') || lower.includes('bare me') || lower.includes('baare me') || lower.includes('kaisa hai') || lower.includes('introduce') || lower.includes('taaruf') || lower.includes('ap kon') || lower.includes('aap kon')) {
    if (isUrdu) {
      return {
        text: "Ghulam Moin Uddin Karachi, Pakistan se aik energetic **Full Stack Web Developer** aur Software Engineering student hain.\n\n• **Core Expertise**: ASP.NET Core MVC, C#, Laravel, PHP, MySQL, SQL Server aur React.\n• **AI Integrations**: Web applications me Groq API, OpenRouter aur Vapi AI calling agents lagana.\n• **Freelancing**: Upwork aur Fiverr par bhi client projects deliver karte hain.\n• **Education**: Aptech Computer Education me ADSE (3 semesters mukammal) aur Intermediate in CS.\n• **Experience**: Developer Hub me remote Backend Developer ke tor par kaam kiya hai.",
        cards: [
          { title: "Moin ke Projects Dekhein", desc: "5 Production-Grade Web Apps", action: "projects" },
          { title: "WhatsApp pe baat karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin is a Karachi-based **Full Stack Web Developer** and Software Engineering student specializing in building robust, high-performance web applications.\n\n• **Core Stack**: ASP.NET Core MVC, C#, Laravel, PHP, SQL Server, MySQL, and React.\n• **AI Integrations**: Groq API, OpenRouter, and Vapi Voice Agents.\n• **Freelancing**: Also active on Upwork and Fiverr, delivering client projects.\n• **Background**: Remote Backend Developer experience at Developer Hub, currently pursuing ADSE at Aptech (3 semesters completed).",
      cards: [
        { title: "View Selected Work", desc: "5 Production-Grade Web Apps", action: "projects" },
        { title: "Connect via LinkedIn", desc: "Professional Profile", link: personalInfo.linkedin }
      ]
    };
  }

  // 3. FREELANCING / UPWORK / FIVERR
  if (lower.includes('freelanc') || lower.includes('upwork') || lower.includes('fiverr') || lower.includes('freelance')) {
    if (isUrdu) {
      return {
        text: "Ji haan, Moin freelance developer ke tor par bhi kaam karte hain. Woh **Upwork** aur **Fiverr** dono platforms par active hain aur clients ke liye ASP.NET Core, Laravel, PHP aur AI chatbot/voice-agent projects deliver karte hain.\n\nExact profile links WhatsApp ya email par share kiye jaate hain — direct contact kar ke portfolio samples aur profile mangwa sakte hain.",
        cards: [
          { title: "WhatsApp pe profile mangein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}?text=Hi%20Moin,%20I%27d%20like%20your%20Upwork/Fiverr%20profile` },
          { title: "Email par rabta karein", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
        ]
      };
    }
    return {
      text: "Yes, Moin also works as an independent freelance developer on **Upwork** and **Fiverr**, delivering client projects in ASP.NET Core, Laravel, PHP, and AI chatbot/voice-agent integrations.\n\nExact profile links are shared directly — reach out on WhatsApp or email for his Upwork/Fiverr profile and client work samples.",
      cards: [
        { title: "Request profile on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}?text=Hi%20Moin,%20I%27d%20like%20your%20Upwork/Fiverr%20profile` },
        { title: "Send an Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
      ]
    };
  }

  // 4. PROJECTS / WORK / KAAM / KYA BANAYA HAI
  if (lower.includes('project') || lower.includes('kaam') || lower.includes('built') || lower.includes('portfolio') || lower.includes('banaya') || lower.includes('hichat') || lower.includes('rentalx') || lower.includes('foodpos') || lower.includes('sms site') || lower.includes('inventory') || lower.includes('salone') || lower.includes('salon')) {
    if (isUrdu) {
      return {
        text: "Ghulam Moin Uddin ne 5 baray live production projects develop kiye hain:\n\n1. **SMS Site (HiChat)**: ASP.NET Core MVC platform jis me automated customer communication ke liye AI chatbot integrated hai aur custom secure auth hai.\n2. **RentalX**: Laravel-powered property rental aur booking system jis me customer support ticketing workflow shaamil hai.\n3. **FoodPOS**: Fast PHP & MySQL Point-of-Sale web app jo restaurants ke live orders aur receipt tracking manage karti hai.\n4. **MZ Inventory Pro**: Cloud-hosted inventory & stock management system jo stock alerts aur control dashboard provide karta hai.\n5. **Elegance Salone**: Modern salon booking & management platform jis me Google OAuth aur appointment booking system hai.\n\nAap in ke live demo links neeche check kar sakte hain:",
        cards: [
          { title: "SMS Site (HiChat) Live", desc: "ASP.NET Core MVC & AI Chatbot", link: "https://sms-site.onrender.com/" },
          { title: "RentalX Live", desc: "Laravel Rental & Booking Platform", link: "https://rentalx-8cmp.onrender.com/" },
          { title: "FoodPOS Live", desc: "PHP & MySQL POS System", link: "https://food-pose.infinityfreeapp.com/login.php" },
          { title: "MZ Inventory Pro Live", desc: "Inventory & Stock Control Dashboard", link: "https://inventory-63kl.onrender.com/login" },
          { title: "Elegance Salone Live", desc: "Salon Booking & Management System", link: "https://salone.infinityfree.me/login.php?i=2" }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin has engineered 5 major production-grade web platforms:\n\n1. **SMS Site (HiChat)**: Built with ASP.NET Core MVC, C#, SQL Server, featuring an integrated AI Chatbot for 24/7 automated support and custom authentication.\n2. **RentalX**: Developed with Laravel, PHP & MySQL, featuring real-time property listings, booking flows, and support ticket management.\n3. **FoodPOS**: A swift PHP & MySQL Point-of-Sale system built for dining and retail ordering workflows.\n4. **MZ Inventory Pro**: Enterprise-grade cloud inventory and stock control dashboard hosted on Render.\n5. **Elegance Salone**: Complete salon management and appointment system with Google OAuth and dynamic service catalogs.\n\nExplore them live below:",
      cards: [
        { title: "SMS Site (HiChat) ↗", desc: "ASP.NET Core MVC & AI Chatbot", link: "https://sms-site.onrender.com/" },
        { title: "RentalX Portal ↗", desc: "Laravel Rental Platform", link: "https://rentalx-8cmp.onrender.com/" },
        { title: "FoodPOS System ↗", desc: "PHP & MySQL POS System", link: "https://food-pose.infinityfreeapp.com/login.php" },
        { title: "MZ Inventory Pro ↗", desc: "Inventory & Stock Dashboard", link: "https://inventory-63kl.onrender.com/login" },
        { title: "Elegance Salone ↗", desc: "Salon Booking & Management", link: "https://salone.infinityfree.me/login.php?i=2" }
      ]
    };
  }

  // 5. SKILLS / TECH STACK / KYA AATA HAI
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

  // 6. EXPERIENCE / JOB / DEVELOPER HUB / TAZURBA
  if (lower.includes('experience') || lower.includes('job') || lower.includes('developer hub') || lower.includes('career') || lower.includes('tazurba') || lower.includes('kahan kaam')) {
    if (isUrdu) {
      return {
        text: "Moin ne **Developer Hub** me **Remote Backend Developer** (Feb 2026 – Mar 2026) ke tor par kaam kiya hai, aur is ke sath sath woh **freelance client projects** bhi Upwork aur Fiverr par leta rehta hai.\n\n• Wahan server-side REST API endpoints design kiye.\n• Relational database queries aur business logic manage kiye.\n• Agile development team ke saath remote collaboration ki.",
        cards: [
          { title: "Experience Timeline", desc: "Career details dekhein", action: "scroll-experience" },
          { title: "LinkedIn Profile", desc: "Professional background", link: personalInfo.linkedin }
        ]
      };
    }
    return {
      text: "Moin worked as a **Remote Backend Developer** at **Developer Hub** (Feb 2026 – Mar 2026), alongside ongoing **freelance client projects** on Upwork and Fiverr.\n\nKey accomplishments:\n• Designed and maintained backend RESTful API endpoints\n• Handled complex SQL queries and server-side business logic\n• Participated in agile sprint cycles and remote code collaboration",
      cards: [
        { title: "Experience Timeline", desc: "Check career milestones", action: "scroll-experience" },
        { title: "LinkedIn Profile", desc: "View verified experience", link: personalInfo.linkedin }
      ]
    };
  }

  // 7. EDUCATION / TALEEM / PARHAI / APTECH
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

  // 8. CONTACT / HIRE / WHATSAPP / PHONE / EMAIL / RABTA
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

  // 9. RESUME / CV
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

  // 10. SERVICES / KHIDMAT / KYA BANATE HO
  if (lower.includes('service') || lower.includes('services') || lower.includes('offer') || lower.includes('kya banate') || lower.includes('sahoolat')) {
    if (isUrdu) {
      return {
        text: "Moin yeh khidmaat faraham karte hain:\n\n1. **Full-Stack Web Development**: End-to-end custom web apps modern UI aur fast backend ke sath.\n2. **ASP.NET Core & Backend APIs**: Secure authentication, role management aur scalable APIs.\n3. **Laravel & PHP Solutions**: Custom e-commerce, property rental aur booking portals.\n4. **Database Architecture & SQL**: Relational database schema design aur query optimization.\n5. **AI Chatbots & Integrations**: Websites me Groq API aur voice AI agents lagana.\n6. **Freelance Projects**: Upwork aur Fiverr ke zariye bhi client work available hai.",
        cards: [
          { title: "Project Discuss Karein", desc: "WhatsApp par rabta karein", link: `https://wa.me/${personalInfo.whatsappNumber}` }
        ]
      };
    }
    return {
      text: "Ghulam Moin Uddin offers 6 key professional services:\n\n1. **Full-Stack Web Development**: Custom responsive web applications built for scalability.\n2. **ASP.NET Core & Backend APIs**: Robust RESTful APIs, enterprise authentication, and high concurrency.\n3. **Laravel & PHP Solutions**: Tailored portals, booking platforms, and ticketing systems.\n4. **Database Architecture & SQL**: Schema normalization, indexing, and SQL query tuning.\n5. **AI Chatbot & Voice Integrations**: Fast LLMs via Groq API and Vapi voice calling agents.\n6. **Freelance Projects**: Also available for hire via Upwork and Fiverr.",
      cards: [
        { title: "Discuss a Project", desc: "Get an estimate or technical advice", link: `https://wa.me/${personalInfo.whatsappNumber}` }
      ]
    };
  }

  // 11. DEFAULT INTELLIGENT FALLBACK
  if (isUrdu) {
    return {
      text: `Aap ke sawal ka shukriya! Ghulam Moin Uddin Karachi se aik Full Stack Web Developer hain jo ASP.NET Core MVC, Laravel, PHP aur AI Integrations me specialize karte hain, aur Upwork/Fiverr par freelance kaam bhi karte hain.\n\nAap in ke baray me kuch bhi pooch sakte hain:\n• Moin ke 5 live projects (HiChat, RentalX, FoodPOS, MZ Inventory, Elegance Salone)\n• Technical skills aur tools\n• Freelancing (Upwork/Fiverr)\n• Taleem aur Aptech background\n• WhatsApp (+92 370 0100724) ya direct email`,
      cards: [
        { title: "WhatsApp pe baat karein", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
        { title: "Direct Email bhejein", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
      ]
    };
  }

  return {
    text: `Thank you for your inquiry! Ghulam Moin Uddin is a Full Stack Web Developer based in Karachi, Pakistan specializing in ASP.NET Core MVC, Laravel, PHP, and AI Chatbot Integrations, and also freelances on Upwork and Fiverr.\n\nFeel free to ask about his:\n• 5 Production projects (HiChat SMS, RentalX, FoodPOS, MZ Inventory Pro, Elegance Salone)\n• Technical stack & backend capabilities\n• Freelancing (Upwork/Fiverr)\n• Work experience at Developer Hub\n• Education at Aptech\n• Contact & hiring information`,
    cards: [
      { title: "Chat on WhatsApp", desc: "+92 370 0100724", link: `https://wa.me/${personalInfo.whatsappNumber}` },
      { title: "Direct Email", desc: personalInfo.email, link: `mailto:${personalInfo.email}` }
    ]
  };
}