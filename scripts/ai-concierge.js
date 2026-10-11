/**
 * BLACKLINE BARBERSHOP — AI CONCIERGE ENGINE
 * Intelligent deterministic rule-based assistant & secure production backend interface.
 * 
 * DESIGN PRINCIPLES:
 * 1. Safe text rendering using textContent and sanitized HTML.
 * 2. Works 100% offline/statically with structured local knowledge base.
 * 3. Transparently discloses simulation mode; never hallucinates appointments or medical advice.
 * 4. Provides clean adapter architecture for future production proxy endpoint.
 */

class BlacklineConcierge {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    // Production API configuration (set to null by default for static demo mode)
    this.apiEndpoint = null; // e.g. "https://api.yourdomain.com/v1/concierge-chat"
    
    this.launcher = null;
    this.window = null;
    this.messagesContainer = null;
    this.inputForm = null;
    this.textInput = null;
    this.pillsContainer = null;

    this.knowledgeBase = [
      {
        keywords: ['find', 'right haircut', 'which haircut', 'recommend', 'choose', 'help me choose'],
        response: "To choose the right service, consider your daily routine and hair length: For textured tops and sharp sides, choose the **Precision Skin Fade** ($40). For natural scissor flow and executive texture, choose our **Signature Haircut** ($35). If you wear facial hair, our **Haircut & Beard Sculpting** ($55) balances both seamlessly.",
        links: [
          { text: "View All Services", url: "services.html" },
          { text: "Book an Appointment", url: "booking.html" }
        ]
      },
      {
        keywords: ['compare', 'difference', 'vs', 'versus'],
        response: "Key service comparisons:\n• **Signature Cut ($35)** vs **Skin Fade ($40)**: The Signature Cut uses scissor-over-comb with clean tapering; the Skin Fade uses micro-foil shavers down to bare skin around the ears and neck.\n• **Beard Sculpting ($25)** vs **Traditional Shave ($30)**: Sculpting shapes your existing beard lines; the Traditional Shave removes facial hair completely with 3 steamed hot towels.",
        links: [
          { text: "Explore Services", url: "services.html" },
          { text: "Book Haircut", url: "booking.html?service=signature-haircut" }
        ]
      },
      {
        keywords: ['beard', 'trim', 'sculpt', 'mustache', 'facial hair'],
        response: "Our beard grooming program is tailored to facial structure: **Beard Sculpting & Lining** ($25, 30 min) features freehand scissor/clipper shaping and hot lather razor contouring. Or combine it with our haircut in the **Haircut & Beard package** ($55).",
        links: [
          { text: "Beard Service Details", url: "service-details.html?service=beard-sculpting" },
          { text: "Book Beard Service", url: "booking.html?service=beard-sculpting" }
        ]
      },
      {
        keywords: ['price', 'pricing', 'cost', 'how much', 'rates'],
        response: "Our illustrative sample service prices:\n• Signature Haircut: $35 (45 min)\n• Precision Skin Fade: $40 (50 min)\n• Haircut & Beard Sculpting: $55 (75 min)\n• Traditional Hot Towel Shave: $30 (40 min)\n• Beard Sculpting: $25 (30 min)\n• Junior Cut (under 12): $25 (30 min)\n• Executive Package: $75 (90 min)\n*All prices are illustrative samples until confirmed at chair.*",
        links: [
          { text: "Full Price List", url: "services.html" }
        ]
      },
      {
        keywords: ['book', 'appointment', 'reserve', 'schedule', 'chair'],
        response: "You can submit an appointment request anytime on our Booking page. Select your desired service, preferred barber, date, and preferred time window. Please note: requests are subject to confirmation.",
        links: [
          { text: "Go to Booking Page", url: "booking.html" }
        ]
      },
      {
        keywords: ['prepare', 'preparation', 'before visit', 'arrive'],
        response: "How to prepare for your visit:\n1. Arrive with clean hair free from heavy glue or wax pomades.\n2. For beard shaping, allow 7-10 days of growth for sharp alignment.\n3. For hot towel shaves, avoid exfoliating 24 hours prior.\n4. Bringing 1-2 reference photos is always welcomed!",
        links: [
          { text: "Read About The Standard", url: "about.html" }
        ]
      },
      {
        keywords: ['barber', 'team', 'who', 'staff', 'alex', 'marcus', 'james'],
        response: "Our atelier features master craftsmen with distinct disciplines: Alex Morgan (Precision Fades & Contemporary Crops), Marcus Reed (Classic Heritage Shearwork & Beard Architecture), and James Carter (Executive Grooming & Bespoke Styling).",
        links: [
          { text: "Meet Our Barbers", url: "barbers.html" }
        ]
      },
      {
        keywords: ['hours', 'open', 'time', 'opening', 'schedule', 'sunday'],
        response: "Illustrative shop hours:\n• Monday – Friday: 9:00 AM – 8:00 PM\n• Saturday: 9:00 AM – 7:00 PM\n• Sunday: 10:00 AM – 5:00 PM\n*Hours are sample placeholders subject to salon management confirmation.*",
        links: [
          { text: "Contact & Hours", url: "contact.html" }
        ]
      },
      {
        keywords: ['location', 'where', 'address', 'directions', 'map'],
        response: "BLACKLINE BARBERSHOP is located in the design district (sample address placeholder: 142 Mercer Street, SoHo, NY). Please check our Contact page for details.",
        links: [
          { text: "View Location Info", url: "contact.html" }
        ]
      }
    ];

    this.defaultFallback = {
      response: "I don't have verified details on that specific topic in my local catalog. As an AI assistant, I avoid speculating on salon policies or unscheduled requests. You can explore our complete services or reach out to our team directly.",
      links: [
        { text: "Browse Services", url: "services.html" },
        { text: "Contact Reception", url: "contact.html" }
      ]
    };

    this.init();
  }

  init() {
    this.renderWidgetDOM();
    this.bindEvents();
  }

  renderWidgetDOM() {
    // If widget already exists, do not duplicate
    if (document.querySelector('.concierge-widget')) return;

    const widget = document.createElement('aside');
    widget.className = 'concierge-widget';
    widget.setAttribute('aria-label', 'AI Barbershop Concierge Assistant');

    widget.innerHTML = `
      <button type="button" class="concierge-launcher" id="concierge-launcher-btn" aria-haspopup="dialog" aria-expanded="false" aria-controls="concierge-window-panel">
        <svg class="concierge-launcher-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="concierge-launcher-text">AI Concierge</span>
        <span class="concierge-launcher-badge">Demo</span>
      </button>

      <div class="concierge-window" id="concierge-window-panel" role="dialog" aria-modal="false" aria-label="BLACKLINE AI Concierge Chat">
        <header class="concierge-header">
          <div class="concierge-header-title">
            <span class="concierge-indicator" aria-hidden="true"></span>
            <strong>BLACKLINE Concierge</strong>
            <span class="concierge-header-sub">· v1.0 Demo</span>
          </div>
          <button type="button" class="concierge-close-btn" id="concierge-close-btn" aria-label="Close Concierge Dialog">✕</button>
        </header>

        <div class="concierge-disclosure">
          Simulated rule-based mode. No live AI model or external API keys connected.
        </div>

        <div class="concierge-messages" id="concierge-messages" role="log" aria-live="polite">
          <div class="concierge-message message-ai">
            Welcome to BLACKLINE. I'm your AI concierge. I can help you explore our services, compare grooming options, and prepare for your next appointment. What are you looking for?
          </div>
        </div>

        <div class="concierge-pills" id="concierge-pills">
          <button type="button" class="concierge-pill-btn" data-query="Find the right haircut">Find haircut</button>
          <button type="button" class="concierge-pill-btn" data-query="Compare haircut services">Compare services</button>
          <button type="button" class="concierge-pill-btn" data-query="Explore beard grooming">Beard grooming</button>
          <button type="button" class="concierge-pill-btn" data-query="Show me sample prices">Sample prices</button>
          <button type="button" class="concierge-pill-btn" data-query="Book an appointment">Book chair</button>
          <button type="button" class="concierge-pill-btn" data-query="Ask about preparing for my visit">Prep guide</button>
        </div>

        <footer class="concierge-footer">
          <form class="concierge-form" id="concierge-form">
            <input type="text" class="concierge-input" id="concierge-input" placeholder="Ask about services, cuts, pricing..." autocomplete="off" aria-label="Your message">
            <button type="submit" class="concierge-send-btn" aria-label="Send Message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </footer>
      </div>
    `;

    document.body.appendChild(widget);

    this.launcher = document.getElementById('concierge-launcher-btn');
    this.window = document.getElementById('concierge-window-panel');
    this.messagesContainer = document.getElementById('concierge-messages');
    this.inputForm = document.getElementById('concierge-form');
    this.textInput = document.getElementById('concierge-input');
    this.pillsContainer = document.getElementById('concierge-pills');
  }

  bindEvents() {
    if (!this.launcher || !this.window) return;

    this.launcher.addEventListener('click', () => this.toggleWindow());
    
    const closeBtn = document.getElementById('concierge-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeWindow());

    // Prompt pills click
    if (this.pillsContainer) {
      this.pillsContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.concierge-pill-btn');
        if (pill) {
          const query = pill.getAttribute('data-query');
          if (query) this.handleUserQuery(query);
        }
      });
    }

    // Form submission
    if (this.inputForm) {
      this.inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = this.textInput.value.trim();
        if (query) {
          this.handleUserQuery(query);
          this.textInput.value = '';
        }
      });
    }

    // Keyboard ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeWindow();
      }
    });
  }

  toggleWindow() {
    if (this.isOpen) {
      this.closeWindow();
    } else {
      this.openWindow();
    }
  }

  openWindow() {
    this.isOpen = true;
    this.window.classList.add('is-open');
    this.launcher.setAttribute('aria-expanded', 'true');
    if (this.textInput) this.textInput.focus();
  }

  closeWindow() {
    this.isOpen = false;
    this.window.classList.remove('is-open');
    this.launcher.setAttribute('aria-expanded', 'false');
    if (this.launcher) this.launcher.focus();
  }

  appendMessage(text, sender, links = []) {
    const msg = document.createElement('div');
    msg.className = `concierge-message message-${sender}`;

    // Convert newlines to breaks safely, markdown bold to strong
    const formatted = this.formatSafeText(text);
    msg.innerHTML = formatted;

    if (links && links.length > 0) {
      const linkWrap = document.createElement('div');
      linkWrap.style.marginTop = '8px';
      linkWrap.style.display = 'flex';
      linkWrap.style.gap = '6px';
      linkWrap.style.flexWrap = 'wrap';

      links.forEach(lnk => {
        const a = document.createElement('a');
        a.href = lnk.url;
        a.textContent = `${lnk.text} →`;
        a.style.display = 'inline-block';
        a.style.fontSize = '0.6875rem';
        a.style.color = '#B39462';
        a.style.border = '1px solid rgba(179, 148, 98, 0.4)';
        a.style.borderRadius = '999px';
        a.style.padding = '2px 8px';
        a.style.textDecoration = 'none';
        linkWrap.appendChild(a);
      });

      msg.appendChild(linkWrap);
    }

    this.messagesContainer.appendChild(msg);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  formatSafeText(text) {
    if (!text) return '';
    // Escape HTML first
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Handle **bold**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Handle newlines
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  }

  showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'concierge-message message-ai typing-msg';
    typing.id = 'concierge-typing-indicator';
    typing.innerHTML = `
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    this.messagesContainer.appendChild(typing);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    this.isTyping = true;
  }

  hideTypingIndicator() {
    const typing = document.getElementById('concierge-typing-indicator');
    if (typing) typing.remove();
    this.isTyping = false;
  }

  async handleUserQuery(query) {
    if (this.isTyping) return;

    // 1. Append user message
    this.appendMessage(query, 'user');

    // 2. Show typing indicator
    this.showTypingIndicator();

    // 3. Check if production API is configured
    if (this.apiEndpoint) {
      try {
        const response = await this.queryProductionBackend(query);
        this.hideTypingIndicator();
        this.appendMessage(response.text, 'ai', response.links);
        return;
      } catch (err) {
        console.warn('Production AI endpoint failed, falling back to local engine:', err);
        // Fall back to rule engine below
      }
    }

    // 4. Deterministic Rule Matching with slight natural delay
    setTimeout(() => {
      this.hideTypingIndicator();
      const match = this.matchRule(query);
      this.appendMessage(match.response, 'ai', match.links);
    }, 450);
  }

  matchRule(query) {
    const qLower = query.toLowerCase();

    for (const rule of this.knowledgeBase) {
      const isMatched = rule.keywords.some(keyword => qLower.includes(keyword));
      if (isMatched) {
        return rule;
      }
    }

    return this.defaultFallback;
  }

  /**
   * Production Backend Integration Adapter
   * In a live deployment, frontend connects to a protected backend proxy:
   * e.g. POST /api/concierge-chat { query: string }
   * The backend securely authenticates against an LLM (OpenAI, Gemini) with server-side keys.
   */
  async queryProductionBackend(query) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: query }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      return {
        text: data.reply || "Thank you for contacting BLACKLINE.",
        links: data.links || []
      };
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}

// Instantiate concierge once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.blacklineConcierge = new BlacklineConcierge();
});
