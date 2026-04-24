(function () {
  "use strict";

  /* predefined q&a database */
  const QA = [
    {
      keywords: [
        "hello",
        "hi",
        "hey",
        "assalam",
        "salam",
        "good morning",
        "good evening",
        "good afternoon",
      ],
      answer: `Welcome to **Digi Horizone**.\n\nHow may I assist you today?\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "services",
        "service",
        "what do you do",
        "what you offer",
        "offer",
        "kya karte ho",
        "kya offer",
      ],
      answer: `We specialise in:\n\n• SEO & SEM\n• Social Media Marketing\n• Performance Marketing\n• Brand Identity\n• Web Design & Development\n• Digital Strategy\n\nFor details, reach us on WhatsApp.\n💬 +92 343 7694472`,
    },

    {
      keywords: [
        "seo",
        "search engine",
        "google ranking",
        "rank",
        "organic",
        "keywords",
        "backlinks",
        "on page",
        "off page",
      ],
      answer: `We provide full **SEO & SEM** solutions — on-page, off-page, Google Ads & technical audits.\n\nLet's discuss your goals.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "social media",
        "instagram",
        "facebook",
        "tiktok",
        "twitter",
        "linkedin",
        "youtube",
        "reels",
        "posts",
        "content",
        "followers",
        "engagement",
      ],
      answer: `We manage **Social Media** end-to-end — content, reels, influencers & analytics.\n\nWe grew a brand by **+120% engagement**. Ready for results?\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "performance",
        "ads",
        "advertising",
        "ppc",
        "paid",
        "google ads",
        "meta ads",
        "facebook ads",
        "roi",
        "return",
        "campaign",
        "leads",
      ],
      answer: `We run **Google Ads & Meta Ads** with full ROI tracking & optimisation.\n\nWe delivered **+200% qualified leads** for one of our clients.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "brand",
        "logo",
        "identity",
        "design",
        "branding",
        "visual",
        "guidelines",
        "color",
        "typography",
      ],
      answer: `We create professional **Brand Identities** — logo, guidelines & full visual system.\n\nLet's build your brand.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "website",
        "web design",
        "web development",
        "landing page",
        "wordpress",
        "ecommerce",
        "ui",
        "ux",
        "mobile",
        "responsive",
      ],
      answer: `We build fast, modern & conversion-focused **websites & landing pages**.\n\nShare your requirements with us.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "price",
        "pricing",
        "cost",
        "how much",
        "rate",
        "package",
        "budget",
        "kitna",
        "charges",
        "fee",
      ],
      answer: `Pricing is tailored to your project scope.\n\nContact us for a **free custom quote**.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "consultation",
        "consult",
        "free",
        "meeting",
        "call",
        "discuss",
        "talk",
        "baat",
        "schedule",
        "book",
        "appointment",
      ],
      answer: `We offer a **FREE Strategy Session**.\n\nBook yours now:\n📧 digihorizone@gmail.com\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "portfolio",
        "results",
        "case study",
        "work",
        "projects",
        "clients",
        "examples",
        "proof",
        "success",
      ],
      answer: `**10+ projects. 98% satisfaction.**\n\n• +65% leads — GlowSkin Care\n• +120% engagement — Urban Fit Gear\n• +200% leads — TechStart Solutions\n\nWant similar results?\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "about",
        "who are you",
        "agency",
        "company",
        "team",
        "digi horizone",
        "founded",
        "experience",
        "years",
      ],
      answer: `**Digi Horizone** — Full-Stack Digital Marketing Agency.\n\n• Founded: 2023\n• 3+ Years experience\n• 5+ Global clients\n• 98% Satisfaction rate\n\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "contact",
        "reach",
        "email",
        "whatsapp",
        "phone",
        "number",
        "address",
        "location",
        "rabta",
        "connect",
      ],
      answer: `📧 digihorizone@gmail.com\n💬 WhatsApp: +92 343 7694472\n\nWe respond within **24 hours**.`,
    },

    {
      keywords: [
        "digital marketing",
        "online marketing",
        "internet marketing",
        "marketing strategy",
        "grow business",
        "grow online",
      ],
      answer: `**Digital marketing** is the fastest way to grow your business in 2025.\n\nLet us build the right strategy for your brand.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "roi",
        "return on investment",
        "worth it",
        "result",
        "growth",
        "increase",
        "sales",
        "revenue",
      ],
      answer: `Our clients see measurable ROI — leads, sales & visibility.\n\nLet's talk about your goals.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "thank",
        "thanks",
        "thank you",
        "shukriya",
        "great",
        "awesome",
        "nice",
        "good",
        "helpful",
      ],
      answer: `You are most welcome.\n\nFeel free to reach out anytime.\n💬 WhatsApp: +92 343 7694472`,
    },

    {
      keywords: [
        "bye",
        "goodbye",
        "see you",
        "later",
        "take care",
        "ok thanks",
        "okay thanks",
      ],
      answer: `Thank you for visiting Digi Horizone.\n\nWe look forward to working with you.\n💬 +92 343 7694472`,
    },
  ];

  /* default fallback */
  const FALLBACK = `For detailed assistance, please connect with our team directly.\n\n📧 digihorizone@gmail.com\n💬 WhatsApp: +92 343 7694472`;

  /* match user message to answer */
  function getAnswer(userMsg) {
    const msg = userMsg.toLowerCase().trim();

    for (const qa of QA) {
      for (const keyword of qa.keywords) {
        if (msg.includes(keyword)) {
          return qa.answer;
        }
      }
    }

    return FALLBACK;
  }

  /* inject css */
  const style = document.createElement("style");
  style.textContent = `
    #dh-chatbot-root {
      position: fixed;
      bottom: 96px;
      right: 28px;
      z-index: 9990;
      font-family: 'Poppins', sans-serif;
    }

    #dh-chat-toggle {
      width: 58px; height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #eaa327, #c8861a);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 28px rgba(234,163,39,0.45);
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
      position: relative;
      margin-left: auto;
    }

    #dh-chat-toggle:hover {
      transform: scale(1.1) rotate(-8deg);
      box-shadow: 0 10px 40px rgba(234,163,39,0.55);
    }

    #dh-chat-toggle svg {
      width: 26px; height: 26px;
      fill: #000;
      transition: opacity 0.2s ease, transform 0.2s ease;
      position: absolute;
    }

    #dh-chat-toggle .icon-chat  { opacity: 1; transform: scale(1) rotate(0); }
    #dh-chat-toggle .icon-close { opacity: 0; transform: scale(0) rotate(90deg); }
    #dh-chat-toggle.open .icon-chat  { opacity: 0; transform: scale(0) rotate(-90deg); }
    #dh-chat-toggle.open .icon-close { opacity: 1; transform: scale(1) rotate(0); }

    #dh-chat-toggle .notif-dot {
      position: absolute;
      top: 3px; right: 3px;
      width: 12px; height: 12px;
      background: #ef4444;
      border: 2px solid #fff;
      border-radius: 50%;
      display: none;
      animation: notifPulse 2s ease infinite;
    }

    @keyframes notifPulse {
      0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
      50%      { transform: scale(1.1); box-shadow: 0 0 0 5px rgba(239,68,68,0); }
    }

    #dh-chat-window {
      width: 370px;
      max-height: 560px;
      background: #0d0d0d;
      border: 1px solid rgba(234,163,39,0.18);
      border-radius: 22px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 80px rgba(0,0,0,0.6);
      margin-bottom: 14px;
      opacity: 0;
      transform: translateY(20px) scale(0.96);
      pointer-events: none;
      transform-origin: bottom right;
      transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1);
    }

    #dh-chat-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    .dh-chat-header {
      background: linear-gradient(135deg, #111 0%, #1a1000 100%);
      border-bottom: 1px solid rgba(234,163,39,0.12);
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .dh-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #eaa327, #c8861a);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 0 0 3px rgba(234,163,39,0.2);
      position: relative;
    }

    .dh-avatar svg { width: 22px; height: 22px; fill: #000; }

    .dh-online-dot {
      position: absolute;
      bottom: 1px; right: 1px;
      width: 10px; height: 10px;
      background: #22c55e;
      border: 2px solid #111;
      border-radius: 50%;
    }

    .dh-header-name {
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
      font-family: 'Alice', serif;
    }

    .dh-header-role {
      font-size: 0.68rem;
      color: rgba(255,255,255,0.35);
      margin-top: 1px;
    }

    .dh-header-status {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.68rem;
      color: #22c55e;
      font-weight: 600;
    }

    .dh-header-status span {
      width: 6px; height: 6px;
      background: #22c55e;
      border-radius: 50%;
      display: inline-block;
      animation: blink 2s ease infinite;
    }

    @keyframes blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.3; }
    }

    .dh-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 13px;
      display: flex;
      flex-direction: column;
      gap: 13px;
      scroll-behavior: smooth;
    }

    .dh-messages::-webkit-scrollbar { width: 3px; }
    .dh-messages::-webkit-scrollbar-thumb { background: rgba(234,163,39,0.2); border-radius: 10px; }

    .dh-msg {
      display: flex;
      flex-direction: column;
      max-width: 86%;
      animation: msgIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
    }

    @keyframes msgIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .dh-msg.bot  { align-self: flex-start; }
    .dh-msg.user { align-self: flex-end; }

    .dh-label {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .dh-msg.bot  .dh-label { color: rgba(234,163,39,0.55); margin-left: 4px; }
    .dh-msg.user .dh-label { color: rgba(255,255,255,0.28); text-align: right; margin-right: 4px; }

    .dh-bubble {
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 0.83rem;
      line-height: 1.65;
      word-break: break-word;
    }

    .dh-msg.bot .dh-bubble {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.88);
      border-bottom-left-radius: 4px;
    }

    .dh-msg.user .dh-bubble {
      background: linear-gradient(135deg, #eaa327, #c8861a);
      color: #000;
      font-weight: 500;
      border-bottom-right-radius: 4px;
    }

    .dh-bubble strong { color: #eaa327; }
    .dh-msg.user .dh-bubble strong { color: #000; }

    .dh-time {
      font-size: 0.58rem;
      color: rgba(255,255,255,0.18);
      margin-top: 3px;
    }

    .dh-msg.user .dh-time { text-align: right; margin-right: 4px; }
    .dh-msg.bot  .dh-time { margin-left: 4px; }

    .dh-typing {
      display: flex;
      gap: 4px;
      padding: 11px 14px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      width: fit-content;
    }

    .dh-typing span {
      width: 6px; height: 6px;
      background: rgba(234,163,39,0.6);
      border-radius: 50%;
      animation: dot 1.2s ease infinite;
    }

    .dh-typing span:nth-child(2) { animation-delay: 0.2s; }
    .dh-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes dot {
      0%,60%,100% { transform: translateY(0); opacity: 0.4; }
      30%          { transform: translateY(-5px); opacity: 1; }
    }

    .dh-chips {
      padding: 4px 13px 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      flex-shrink: 0;
    }

    .dh-chip {
      background: rgba(234,163,39,0.08);
      border: 1px solid rgba(234,163,39,0.22);
      color: #eaa327;
      font-size: 0.71rem;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;
    }

    .dh-chip:hover {
      background: rgba(234,163,39,0.18);
      border-color: rgba(234,163,39,0.45);
      transform: translateY(-2px);
    }

    .dh-input-area {
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 11px 13px;
      display: flex;
      align-items: flex-end;
      gap: 9px;
      background: rgba(0,0,0,0.3);
      flex-shrink: 0;
    }

    #dh-input {
      flex: 1;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 10px 13px;
      color: #fff;
      font-family: 'Poppins', sans-serif;
      font-size: 0.83rem;
      resize: none;
      outline: none;
      max-height: 90px;
      min-height: 40px;
      line-height: 1.5;
      transition: border-color 0.2s, background 0.2s;
      scrollbar-width: none;
    }

    #dh-input::-webkit-scrollbar { display: none; }
    #dh-input::placeholder { color: rgba(255,255,255,0.2); }
    #dh-input:focus { border-color: rgba(234,163,39,0.4); background: rgba(255,255,255,0.07); }

    #dh-send-btn {
      width: 40px; height: 40px;
      min-width: 40px;
      background: linear-gradient(135deg, #eaa327, #c8861a);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
      flex-shrink: 0;
    }

    #dh-send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(234,163,39,0.4); }
    #dh-send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
    #dh-send-btn svg { width: 18px; height: 18px; fill: #000; }

    .dh-footer {
      padding: 6px 13px 9px;
      text-align: center;
      font-size: 0.58rem;
      color: rgba(255,255,255,0.12);
      letter-spacing: 0.5px;
      border-top: 1px solid rgba(255,255,255,0.04);
      flex-shrink: 0;
    }

    .dh-footer span { color: rgba(234,163,39,0.3); }

    @media (max-width: 480px) {
      #dh-chatbot-root { bottom: 80px; right: 12px; left: 12px; }
      #dh-chat-window  { width: 100%; max-height: 68vh; border-radius: 18px; }
      #dh-chat-toggle  { margin-left: auto; width: 52px; height: 52px; }
    }
  `;
  document.head.appendChild(style);

  /* build dom */
  const root = document.createElement("div");
  root.id = "dh-chatbot-root";
  root.innerHTML = `
    <div id="dh-chat-window">
      <div class="dh-chat-header">
        <div class="dh-avatar">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>
          <div class="dh-online-dot"></div>
        </div>
        <div>
          <div class="dh-header-name">Horizon AI</div>
          <div class="dh-header-role">Digi Horizone Assistant</div>
        </div>
        <div class="dh-header-status">
          <span></span> Online
        </div>
      </div>
      <div class="dh-messages" id="dh-messages"></div>
      <div class="dh-chips" id="dh-chips"></div>
      <div class="dh-input-area">
        <textarea id="dh-input" placeholder="Type your message..." rows="1" maxlength="300"></textarea>
        <button id="dh-send-btn" disabled>
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="dh-footer">No API needed · <span>Digi Horizone</span> © 2025</div>
    </div>

    <button id="dh-chat-toggle" aria-label="Open chat">
      <div class="notif-dot" id="dh-notif-dot"></div>
      <svg class="icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
      <svg class="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  `;
  document.body.appendChild(root);

  /* dom refs */
  const chatWindow = document.getElementById("dh-chat-window");
  const toggleBtn = document.getElementById("dh-chat-toggle");
  const messagesEl = document.getElementById("dh-messages");
  const chipsEl = document.getElementById("dh-chips");
  const inputEl = document.getElementById("dh-input");
  const sendBtn = document.getElementById("dh-send-btn");
  const notifDot = document.getElementById("dh-notif-dot");

  let isOpen = false;
  let firstOpen = true;

  /* quick reply chips */
  const CHIPS = [
    "What services do you offer?",
    "Pricing & packages",
    "Book free consultation",
    "Show portfolio results",
  ];

  /* helpers */
  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function scrollBottom() {
    messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: "smooth" });
  }

  /* render message */
  function addMessage(text, role) {
    const wrap = document.createElement("div");
    wrap.className = `dh-msg ${role}`;

    const label = document.createElement("div");
    label.className = "dh-label";
    label.textContent = role === "bot" ? "Horizon AI" : "You";

    const bubble = document.createElement("div");
    bubble.className = "dh-bubble";
    bubble.innerHTML = formatText(text);

    const time = document.createElement("div");
    time.className = "dh-time";
    time.textContent = getTime();

    wrap.appendChild(label);
    wrap.appendChild(bubble);
    wrap.appendChild(time);
    messagesEl.appendChild(wrap);
    scrollBottom();
  }

  /* typing indicator */
  let typingEl = null;

  function showTyping() {
    const wrap = document.createElement("div");
    wrap.className = "dh-msg bot";
    wrap.innerHTML = `
      <div class="dh-label">Horizon AI</div>
      <div class="dh-typing"><span></span><span></span><span></span></div>
    `;
    messagesEl.appendChild(wrap);
    typingEl = wrap;
    scrollBottom();
  }

  function hideTyping() {
    typingEl?.remove();
    typingEl = null;
  }

  /* render chips */
  function renderChips(chips) {
    chipsEl.innerHTML = "";
    chips.forEach((text) => {
      const btn = document.createElement("button");
      btn.className = "dh-chip";
      btn.textContent = text;
      btn.onclick = () => {
        chipsEl.innerHTML = "";
        handleSend(text);
      };
      chipsEl.appendChild(btn);
    });
  }

  /* handle send */
  function handleSend(text) {
    const msg = (text || inputEl.value).trim();
    if (!msg) return;

    inputEl.value = "";
    inputEl.style.height = "auto";
    sendBtn.disabled = true;
    chipsEl.innerHTML = "";

    addMessage(msg, "user");
    showTyping();

    const delay = 600 + Math.random() * 700;

    setTimeout(() => {
      hideTyping();
      const reply = getAnswer(msg);
      addMessage(reply, "bot");
    }, delay);
  }

  /* open / close */
  function openChat() {
    isOpen = true;
    chatWindow.classList.add("open");
    toggleBtn.classList.add("open");
    notifDot.style.display = "none";

    if (firstOpen) {
      firstOpen = false;
      setTimeout(() => {
        addMessage(
          `Hello! Welcome to **Digi Horizone**. 👋\n\nI'm Horizon AI, your digital marketing assistant.\n\nAsk me anything about our services, pricing, or book a free consultation!`,
          "bot",
        );
        renderChips(CHIPS);
      }, 300);
    }

    setTimeout(() => inputEl.focus(), 400);
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove("open");
    toggleBtn.classList.remove("open");
  }

  /* events */
  toggleBtn.addEventListener("click", () =>
    isOpen ? closeChat() : openChat(),
  );
  sendBtn.addEventListener("click", () => handleSend());

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + "px";
    sendBtn.disabled = !inputEl.value.trim();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeChat();
  });

  /* show notif dot after 4 seconds */
  setTimeout(() => {
    if (!isOpen) notifDot.style.display = "block";
  }, 4000);
})();
