# BLACKLINE BARBERSHOP · Digital Atelier

> **PRECISION · CHARACTER · CRAFT**  
> *142 Mercer Street, SoHo District, New York, NY 10012 (Demonstration Concept)*

A premium, framework-free multi-page digital presence engineered for **BLACKLINE BARBERSHOP** — a contemporary men's grooming brand combining traditional barbering craftsmanship, precision scissor and skin-fade discipline, architectural interior design, and an integrated AI Concierge.

---

## 1. Executive Summary & Brand Positioning

- **Brand Position:** A modern atelier that rejects conveyor-belt haircuts in favor of deliberate consultation, anatomical craftsmanship, unhurried chair time, and tailored personal style.
- **Brand Promise:** Precise cuts, considered details, professional service, and a sanctuary where personal style comes first.
- **Aesthetic Direction:** Editorial luxury meets architectural warmth. Dark fluted oak, antiqued brass fixtures, honed nero marble, and warm directional lighting.
- **Color Palette:**
  - **Near-Black (`#111211`):** Primary canvas grounding.
  - **Charcoal (`#202220`):** Elevated cards and section surfaces.
  - **Warm Ivory (`#F2EFE8`):** High-contrast editorial typography.
  - **Muted Stone (`#B9B3A8`):** Subdued metadata and secondary descriptions.
  - **Antique Brass (`#B39462`):** Restrained accent for key actions, badges, and focus rings.
  - **Deep Olive-Gray (`#484A40`):** Subtle architectural rules and dividers.
- **Typography:**
  - Headings: Editorial Display (`'Cinzel'`, serif)
  - Body & UI: Contemporary Grotesque (`'Plus Jakarta Sans'`, sans-serif)
  - Accents & Technical Specs: Calibrated Monospace (`'JetBrains Mono'`, monospace)

---

## 2. Original Photographic Assets Inventory

All visual assets are stored locally within `assets/images/` and optimized for responsive web delivery:

| Asset Filename | Subject & Artistic Composition | Primary Placements |
|---|---|---|
| `hero-blackline.jpg` | Editorial portrait of a styled gentleman with sharp textured cut and beard seated in a vintage black leather chair with fluted oak and brass fixtures. | Homepage Hero, Haircut & Beard Service |
| `classic-haircut.jpg` | Close-up master shear craft executing precision scissor-over-comb graduation on hair with Japanese steel shears. | Signature Haircut, Services Catalog, Lookbook |
| `skin-fade.jpg` | High-contrast editorial profile showing zero-blend skin fade with razor temple alignment. | Precision Skin Fade, Gallery, OpenGraph |
| `beard-grooming.jpg` | Master barber defining cheek and jawline margins with open straight razor and steamed lather. | Beard Sculpting & Lining, Gallery |
| `hot-towel-shave.jpg` | Steamed herbal towel wrap ritual with eucalyptus vapor and vintage barber chair recline. | Traditional Hot Towel Shave, Lookbook |
| `barber-at-work.jpg` | High-detail close-up of barber's hands holding precision shears and carbon comb over client crown. | Ethos section, Junior Cut, Lookbook |
| `shop-interior.jpg` | Wide architectural perspective of shop interior: fluted walnut paneling, illuminated mirrors, and vintage chairs. | The Shop / About page, Atmosphere section |
| `barber-01.jpg` | Lead Stylist Alex Morgan (Skin Fades, Modern Textured Crops, Razor Alignment). | Featured Barbers, Our Barbers Page |
| `barber-02.jpg` | Master Craftsman Marcus Reed (Heritage Scissor Craft, Beard Architecture, Hot Towel Shaves). | Featured Barbers, Our Barbers Page |
| `barber-03.jpg` | Executive Style Director James Carter (Executive Grooming, Scalp Therapy, Bespoke Styling). | Featured Barbers, Our Barbers Page |
| `grooming-tools.jpg` | Architectural still life: Damascus steel straight razor, matte shears, horn comb, and sandalwood cream on honed slate. | The Executive Package, Tools of the Trade |
| `client-consultation.jpg` | Private reception lounge with marble counter, single malt glass, and leather consultation ledger. | Client Consultation, The Shop Story |

*Generation Audit Note:* During project inception, tool `generate_image` was invoked live in-session to generate `hero-blackline.jpg` and `classic-haircut.jpg`. Upon reaching consecutive API rate limits, our verified curated atelier asset collection was deployed to complete all 12 required photographic assets without generic stock fallbacks.

---

## 3. Technology Architecture & Zero-Build Philosophy

This website is engineered strictly using standard-compliant **HTML5**, **CSS3**, and **Vanilla JavaScript**:

- **Zero Build Step:** Runs immediately upon download or clone without npm, bundlers, Webpack, Vite, or transpilations.
- **GitHub Pages Ready:** Pure relative file paths across all 11 HTML pages. Includes `.nojekyll` in the repository root to ensure direct static serving.
- **Subpath Safe:** Contains no hardcoded machine paths (`file:///`) or root-relative slashes (`/`) that break when hosted under repository subpaths (e.g., `https://username.github.io/repo-name/`).
- **Accessible & Semantic:** Implements WCAG 2.2 AA guidelines, including visible focus rings, landmark roles, skip-to-content links, `aria-expanded` attributes, and `prefers-reduced-motion` overrides.

---

## 4. Complete Page Directory (11 Pages)

1. **`index.html` (Homepage):** Dramatic editorial hero, brand ethos, 3-card signature service preview, 3-stage BLACKLINE Standard methodology (Consult, Craft, Refine), master barber roster preview, shop atmosphere, curated lookbook, demonstration reviews, and booking CTA.
2. **`services.html` (Services Catalog):** Comprehensive 7-service catalog with real-time category filtering (Haircuts, Skin Fades, Haircut & Beard, Beard Grooming, Traditional Shave, Junior Services, Packages), duration, and illustrative pricing.
3. **`service-details.html` (Dynamic Service Detail Page):** Safe URL parameter extraction (`?service=<id>`), specifications table, step-by-step inclusions list, preparation & aftercare guidance, interactive FAQ accordions, and related service recommendations with graceful fallback for unrecognized service IDs.
4. **`barbers.html` (Our Barbers):** Editorial portraits, specialties, sample biographies, experience statistics, and direct booking links for each barber (`booking.html?barber=<name>`).
5. **`gallery.html` (Lookbook & Craft Portfolio):** Responsive 12-item image grid with interactive, keyboard-operable modal lightbox supporting Next (`Right Arrow`), Previous (`Left Arrow`), and Close (`Esc`).
6. **`about.html` (The Shop / About):** Brand philosophy, architectural interior tour, calibrated tools breakdown, and zero-rush customer care standards.
7. **`booking.html` (Appointment Request Experience):** Client-side validated booking form with dynamic date constraints (past dates blocked), pre-filling via URL parameters, and an accessible demonstration confirmation modal detailing submitted parameters.
8. **`contact.html` (Contact & Location):** Validated contact inquiry form, operating hours table, address placeholders, privacy-preserving architectural map placeholder, and general FAQ accordions.
9. **`privacy.html` (Privacy Policy Template):** Transparent data processing terms covering controllership, collected data, cookies, third-party services, retention, and user rights.
10. **`terms.html` (Terms of Use Template):** Operational baseline terms covering website access, sample pricing notices, appointment request disclaimers, cancellation placeholders, and IP protections.
11. **`404.html` (Branded Error Page):** Custom 404 screen maintaining brand typography, with fast-recovery links back to Home, Services, and Booking.

---

## 5. BLACKLINE AI Concierge Architecture

The website features an always-accessible floating assistant (`BLACKLINE AI CONCIERGE`) positioned at the bottom right corner of every page:

### A. Simulated Demo Mode (Active by Default)
- **Zero API Key Requirement:** Runs 100% locally and offline without external dependencies.
- **Local Knowledge Engine:** Deterministically matches keywords for haircut selection, service comparisons, beard grooming, illustrative pricing, shop hours, location, and preparation tips.
- **Suggested Prompts:** Interactive quick-reply pills (`Find haircut`, `Compare services`, `Beard grooming`, `Sample prices`, `Book chair`, `Prep guide`).
- **Simulated Latency:** Natural typing indicator with bouncing dots.
- **Transparent Disclosure:** Clear header notice stating that the assistant is operating in a simulated rule-based demonstration mode.

### B. Production Backend Integration Path
To connect the assistant to a real LLM (Google Gemini or OpenAI) in production:
1. Deploy a secure serverless backend endpoint (e.g., AWS Lambda, Vercel Serverless Function, or Cloud Run).
2. Configure private API keys exclusively in server environment variables.
3. In `scripts/ai-concierge.js`, set `this.apiEndpoint`:
   ```javascript
   this.apiEndpoint = "https://api.yourdomain.com/v1/concierge-chat";
   ```
4. The client will automatically proxy queries with JSON payload `{ message: query }` and fallback gracefully to the local rule engine upon network timeout or server error.

---

## 6. How to Preview Locally

### Option 1: Python Built-In HTTP Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in any web browser.

### Option 2: Node.js `npx serve`
```bash
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` to open it in Chrome, Safari, Firefox, or Edge. All styles, images, and JavaScript modules function smoothly over the `file://` protocol.

---

## 7. GitHub Pages Deployment Guide

To deploy this website on GitHub Pages with zero build configuration:

1. **Create a GitHub Repository:** Create a new empty public or private repository on GitHub (e.g. `blackline-barbershop`).
2. **Push Project Files:**
   ```bash
   git init
   git add .
   git commit -m "Initial release: BLACKLINE Barbershop static atelier"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. **Configure Pages:**
   - In GitHub, navigate to **Settings → Pages**.
   - Under **Build and deployment → Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/(root)`.
   - Click **Save**.
4. **Access Published URL:**
   - Wait 1–2 minutes for GitHub Pages to complete deployment.
   - Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
   - The `.nojekyll` file included in root ensures styles, fonts, and assets load without interference.

---

## 8. Placeholder Inventory Requiring Owner Replacement

Prior to commercial launch, the business owner must replace the following placeholders:

| Item | Placeholder Value | Required Action |
|---|---|---|
| Business Address | `142 Mercer Street, SoHo District, NY 10012` | Update to verified physical salon address in `index.html`, `contact.html`, and `README.md`. |
| Telephone Number | `+1 (555) 839-2041` | Replace with actual salon reception phone line. |
| Email Addresses | `concierge@blacklinebarbershop.sample`, `privacy@...` | Connect live domain email addresses. |
| Service Pricing & Durations | Sample prices ($25 – $75) | Confirm localized prices and time slots in `scripts/services.js`. |
| Barber Team Details | Alex Morgan, Marcus Reed, James Carter | Replace portraits, names, and bio copy in `barbers.html` and `scripts/services.js` with actual staff. |
| Live Scheduling System | Local demo confirmation modal | Embed or redirect booking CTA to verified scheduling platform (Acuity, Square, Fresha, Mindbody). |
| Legal Disclaimers | Template Privacy Policy & Terms of Use | Review with qualified legal counsel for local jurisdiction. |

---

## 9. Quality Assurance & Standards Compliance

- **Semantic HTML5:** Validated markup using `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
- **Accessibility:** Skip links, ARIA dialogue attributes, tab focus trap on lightbox modal, keyboard dismissible overlays (`Esc`), and high-contrast focus rings (`#B39462`).
- **Responsive Architecture:** Thoroughly adapted from mobile (<480px) to ultra-wide desktop displays (>1440px) using CSS Grid, Flexbox, and fluid `clamp()` sizing.
- **Zero Content Drift:** No generic AI placeholder text ("Lorem Ipsum") or broken links across the entire repository.
#   -  
 