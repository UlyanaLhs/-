/**
 * BLACKLINE BARBERSHOP — SERVICES DATA & CATALOG ENGINE
 * Structured local database of grooming services, categories, and dynamic renderer.
 */

const BLACKLINE_SERVICES = [
  {
    id: "signature-haircut",
    name: "Signature Haircut",
    category: "haircuts",
    price: "$35",
    duration: "45 min",
    image: "assets/images/classic-haircut.jpg",
    badge: "Most Popular",
    shortDesc: "Comprehensive tailored haircut featuring detailed scissor-over-comb craftsmanship, razor neck clean, and bespoke styling.",
    fullDesc: "The quintessential BLACKLINE experience. Every session begins with a personalized one-on-one consultation analyzing head shape, hair density, growth patterns, and everyday routine. Executed with premium Japanese steel shears and calibrated clippers, finished with a warm lather straight-razor neck shave and styling with craft grooming products.",
    outcome: "A sharp, structured, enduring haircut engineered to grow out naturally while maintaining tailored shape.",
    includes: [
      "In-depth personal hair & profile consultation",
      "Precision shear or clipper cut tailored to facial structure",
      "Warm lather straight-razor nape outline",
      "Invigorating scalp wash & conditioning rinse",
      "Blow dry, texture refinement, and artisanal pomade styling"
    ],
    preparation: "Arrive with hair clean and free of heavy pomades or waxes. Bring reference pictures if you are considering a major change in length or style.",
    aftercare: "Rinse with lukewarm water and use a sulfate-free cleansing shampoo. Re-style with a dime-sized amount of matte paste or texture clay.",
    faqs: [
      {
        q: "How often should I book a Signature Haircut?",
        a: "For structured classic styles, we recommend booking every 3 to 4 weeks to maintain clean contours and shape."
      },
      {
        q: "Is a wash included with this service?",
        a: "Yes, an invigorating hot water wash and conditioning rinse is included with all full haircuts."
      }
    ],
    related: ["skin-fade", "haircut-and-beard"]
  },
  {
    id: "skin-fade",
    name: "Precision Skin Fade",
    category: "skin-fades",
    price: "$40",
    duration: "50 min",
    image: "assets/images/skin-fade.jpg",
    badge: "Specialty",
    shortDesc: "Flawless transition from bare skin to tailored top length with razor-sharp temple and neck graduation.",
    fullDesc: "Our signature high-precision technical service. Using micro-calibrated clippers and foil shavers, our specialists execute a seamless graduation from bare skin (low, mid, high, or taper fade) smoothly blended into your styled top. Includes crisp hairline alignment, foil detailing, and matte finish styling.",
    outcome: "Ultra-crisp geometric alignment, seamless zero-blend graduation, and pristine perimeter lines.",
    includes: [
      "Fading specification analysis (Low, Mid, High, or Drop Fade)",
      "Multi-stage foil shaver and clipper graduation down to zero skin",
      "Scissor texturizing across the crown and fringe",
      "Razor temple lineup and warm lather neck cleanup",
      "Cooling aftershave mist and light styling"
    ],
    preparation: "No special preparation needed. Let your barber know whether you prefer a low, mid, or high drop fade.",
    aftercare: "Keep skin hydrated with light daily moisturizer. Fades typically retain peak crispness for 10-14 days.",
    faqs: [
      {
        q: "What is the difference between a taper and a skin fade?",
        a: "A skin fade blends down to zero around the entire perimeter of the head, whereas a taper only drops down to the skin at the sideburns and the back of the neck."
      }
    ],
    related: ["signature-haircut", "haircut-and-beard"]
  },
  {
    id: "haircut-and-beard",
    name: "Haircut & Beard Sculpting",
    category: "haircut-beard",
    price: "$55",
    duration: "75 min",
    image: "assets/images/hero-blackline.jpg",
    badge: "Complete Ritual",
    shortDesc: "The complete head-to-beard grooming ritual. Full tailored haircut combined with hot-towel beard architecture.",
    fullDesc: "Our comprehensive full-service appointment. Combines our precision Signature Haircut with complete beard architecture. We balance your facial hair proportions with your head silhouette, trim stray bulk, shape crisp cheek lines with hot lather straight razor, and condition facial hair with organic cedarwood beard oil.",
    outcome: "A harmonized, complete masculine profile where haircut and facial hair complement each other seamlessly.",
    includes: [
      "Full haircut consultation, shear/clipper craft, and styling",
      "Beard length reduction, balance sculpting, and graduation",
      "Steamed eucalyptus hot towel preparation",
      "Warm lather straight-razor cheek and neckline alignment",
      "Beard balm massage and high-frequency hair refresh"
    ],
    preparation: "Allow your beard to grow for at least 7-10 days prior to your appointment so our barbers have sufficient volume to sculpt clean lines.",
    aftercare: "Brush beard daily with a boar-bristle brush and apply 3-4 drops of quality beard oil to keep skin and bristles supple.",
    faqs: [
      {
        q: "Can I choose a skin fade with this package?",
        a: "Absolutely. You can select either a classic scissor cut or a zero-skin fade for the hair portion of the service."
      }
    ],
    related: ["signature-haircut", "beard-sculpting"]
  },
  {
    id: "beard-sculpting",
    name: "Beard Sculpting & Lining",
    category: "beard-grooming",
    price: "$25",
    duration: "30 min",
    image: "assets/images/beard-grooming.jpg",
    badge: "Facial Craft",
    shortDesc: "Architectural beard trim, clipper symmetry work, and hot-lather straight razor cheek and neck refinement.",
    fullDesc: "Dedicated beard discipline. Whether maintaining a dense full beard, sculpted corporate stubble, or goatee architecture, this service sculpts crisp symmetry. We reduce bulk, taper sideburns into the beard, define jawline angles, and clean cheek margins with a razor-sharp single-edge blade.",
    outcome: "Sharp perimeter lines, sculpted facial symmetry, and conditioned beard texture.",
    includes: [
      "Facial geometry consultation and line definition",
      "Freehand clipper and scissor beard shaping",
      "Steamed hot towel wrap to soften stubborn bristles",
      "Warm lather straight-razor perimeter detailing",
      "Conditioning beard butter or balm treatment"
    ],
    preparation: "Comb out your beard in its natural direction prior to sitting in the chair.",
    aftercare: "Use a daily beard wash (avoid harsh soaps) and finish with a nourishing balm.",
    faqs: [
      {
        q: "Will straight-razor edging cause razor bumps?",
        a: "Our barbers use steamed hot towels, pre-shave oils, and gentle single-pass technique with a fresh blade to prevent irritation."
      }
    ],
    related: ["traditional-shave", "haircut-and-beard"]
  },
  {
    id: "traditional-shave",
    name: "Traditional Hot Towel Shave",
    category: "traditional-shaving",
    price: "$30",
    duration: "40 min",
    image: "assets/images/hot-towel-shave.jpg",
    badge: "Heritage Ritual",
    shortDesc: "Authentic straight-razor wet shave featuring botanical essential oils, alternating hot and cold towels, and soothing balm.",
    fullDesc: "The timeless barbershop ritual re-imagined for the modern gentleman. We prepare the skin with essential pre-shave oils followed by three cycles of steamed herbal towels to open pores and soften bristles. We lather with badger-hair brush and rich sandalwood cream, execute a meticulous straight-razor shave, and finish with a chilled rosewater towel and alcohol-free restoring balm.",
    outcome: "The closest, smoothest possible shave with deep relaxation and invigorated skin.",
    includes: [
      "Skin & grain direction assessment",
      "Pre-shave botanical oil application",
      "Steamed herbal hot towel wraps (3 applications)",
      "Traditional warm lather whip & straight-razor shave",
      "Chilled post-shave closing towel and restoring balm"
    ],
    preparation: "Avoid exfoliating or using retinol-based skin products 24 hours prior to a hot towel shave.",
    aftercare: "Do not expose skin to direct sun or harsh chlorine for 24 hours. Apply cold water when rinsing at home.",
    faqs: [
      {
        q: "Is this suitable for sensitive skin?",
        a: "Yes. Our steamed towel regimen and hypoallergenic lather are specifically curated to minimize irritation."
      }
    ],
    related: ["beard-sculpting", "executive-package"]
  },
  {
    id: "junior-haircut",
    name: "Junior Haircut (Under 12)",
    category: "junior-services",
    price: "$25",
    duration: "30 min",
    image: "assets/images/barber-at-work.jpg",
    badge: "Youth",
    shortDesc: "Patient, age-appropriate styling and haircutting for younger clients in a relaxed, welcoming chair.",
    fullDesc: "A thoughtful, patient haircutting experience for young clients up to age 12. We provide the same caliber of craftsmanship, clean scissor work, and attention to detail as our adult services, conducted in a calm, reassuring environment.",
    outcome: "A handsome, well-blended haircut tailored for active lifestyles and effortless morning maintenance.",
    includes: [
      "Friendly consultation with parent and young client",
      "Gentle shear or clipper styling",
      "Clean neck feathering (no razor blade used)",
      "Light styling wax or water mist"
    ],
    preparation: "Arrive on time so the child has time to acclimate to the shop atmosphere.",
    aftercare: "Standard gentle shampoo and brush.",
    faqs: [
      {
        q: "What is the maximum age for a Junior Haircut?",
        a: "Clients aged 12 and under qualify for this service. Ages 13 and above are booked as our Signature Haircut."
      }
    ],
    related: ["signature-haircut"]
  },
  {
    id: "executive-package",
    name: "The Executive Grooming Package",
    category: "grooming-packages",
    price: "$75",
    duration: "90 min",
    image: "assets/images/grooming-tools.jpg",
    badge: "Master Experience",
    shortDesc: "The pinnacle experience: Signature Cut, complete beard architecture or traditional shave, scalp treatment, and premium beverage.",
    fullDesc: "Our premier comprehensive experience designed for milestone occasions, critical meetings, or an unhurried afternoon of restoration. Combines our Signature Haircut, complete hot towel beard architecture or straight-razor shave, tea-tree scalp massage, and complimentary bespoke beverage from our lounge.",
    outcome: "Total aesthetic renewal from head to beard, with relaxed demeanor and master-level polish.",
    includes: [
      "Signature Haircut or Precision Skin Fade",
      "Complete Beard Sculpting or Traditional Hot Towel Shave",
      "Invigorating tea tree oil scalp treatment & neck massage",
      "Complimentary single malt scotch or artisan espresso in lounge",
      "Full craft product styling and personalized maintenance plan"
    ],
    preparation: "Allow a full 90-minute window for an unhurried, luxury session.",
    aftercare: "Full product samples provided with instructions for home maintenance.",
    faqs: [
      {
        q: "Can I gift this package to someone else?",
        a: "Yes, sample gift cards can be arranged upon inquiry at the shop."
      }
    ],
    related: ["haircut-and-beard", "traditional-shave"]
  }
];

// Helper to escape HTML safely
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Render service card HTML
 */
function renderServiceCard(service) {
  return `
    <article class="double-bezel service-card-wrapper" data-category="${escapeHTML(service.category)}">
      <div class="bezel-core service-card">
        <div class="service-card-media">
          <img src="${escapeHTML(service.image)}" alt="${escapeHTML(service.name)}" class="service-card-img" loading="lazy">
          <span class="service-card-badge">${escapeHTML(service.badge)}</span>
        </div>
        <div class="service-card-body">
          <div class="service-card-header">
            <h3 class="service-card-title">${escapeHTML(service.name)}</h3>
            <span class="service-card-price">${escapeHTML(service.price)}</span>
          </div>
          <div class="service-card-meta">
            <span>⏱ ${escapeHTML(service.duration)}</span>
            <span>·</span>
            <span>Category: ${escapeHTML(service.category.replace('-', ' '))}</span>
          </div>
          <p class="service-card-desc">${escapeHTML(service.shortDesc)}</p>
          <div class="service-card-footer">
            <a href="service-details.html?service=${encodeURIComponent(service.id)}" class="btn-link">
              Details &amp; FAQ
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a href="booking.html?service=${encodeURIComponent(service.id)}" class="btn btn-primary btn-sm">
              Book
              <span class="btn-icon-bead" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initialize Services Page Catalog & Filter
 */
function initServicesCatalog() {
  const container = document.getElementById('services-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  // Render all cards initially
  container.innerHTML = BLACKLINE_SERVICES.map(renderServiceCard).join('');

  // Handle filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      const cards = container.querySelectorAll('.service-card-wrapper');

      cards.forEach(card => {
        if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Initialize Dynamic Service Details Page
 */
function initServiceDetailsPage() {
  const detailsContainer = document.getElementById('service-detail-view');
  if (!detailsContainer) return;

  // Safe URL parameter extraction
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service');

  const service = BLACKLINE_SERVICES.find(s => s.id === serviceId) || BLACKLINE_SERVICES[0];

  // If unrecognized ID provided, show notification banner
  const isFallback = !BLACKLINE_SERVICES.some(s => s.id === serviceId);

  // Update Page Title
  document.title = `${service.name} — BLACKLINE BARBERSHOP`;

  let fallbackBanner = '';
  if (isFallback && serviceId) {
    fallbackBanner = `
      <div class="form-status status-error" style="display:block; margin-bottom: 2rem;">
        Note: The requested service "<em>${escapeHTML(serviceId)}</em>" was not found. Displaying our featured service below.
        <a href="services.html" style="color:var(--color-accent-brass); text-decoration:underline; margin-left:8px;">View Full Services Catalog</a>
      </div>
    `;
  }

  // Render includes list
  const includesHTML = service.includes.map(item => `
    <li style="display:flex; align-items:flex-start; gap:10px; margin-bottom:12px; font-size:var(--fs-sm);">
      <span style="color:var(--color-accent-brass); font-weight:700;">✓</span>
      <span>${escapeHTML(item)}</span>
    </li>
  `).join('');

  // Render FAQs
  const faqsHTML = service.faqs.map((faq, idx) => `
    <div class="accordion-item ${idx === 0 ? 'is-open' : ''}">
      <button type="button" class="accordion-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${escapeHTML(faq.q)}</span>
        <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="accordion-panel">
        <p>${escapeHTML(faq.a)}</p>
      </div>
    </div>
  `).join('');

  // Render related services
  const relatedHTML = service.related.map(relId => {
    const rel = BLACKLINE_SERVICES.find(s => s.id === relId);
    if (!rel) return '';
    return `
      <div style="background:var(--color-bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="font-size:var(--fs-base); color:var(--color-text-primary); margin-bottom:4px;">${escapeHTML(rel.name)}</h4>
          <span style="font-family:var(--font-mono); font-size:var(--fs-xs); color:var(--color-accent-brass);">${escapeHTML(rel.price)} · ${escapeHTML(rel.duration)}</span>
        </div>
        <a href="service-details.html?service=${encodeURIComponent(rel.id)}" class="btn btn-outline btn-sm">View</a>
      </div>
    `;
  }).join('');

  detailsContainer.innerHTML = `
    ${fallbackBanner}
    <div class="editorial-split" style="align-items:start;">
      <!-- Left Column: Media & Quick Specs -->
      <div>
        <div class="editorial-media-frame" style="margin-bottom: var(--space-xl);">
          <img src="${escapeHTML(service.image)}" alt="${escapeHTML(service.name)}" class="editorial-img" style="aspect-ratio: 4/3; width:100%; object-fit:cover;">
          <span class="service-card-badge" style="top:16px; right:16px;">${escapeHTML(service.badge)}</span>
        </div>

        <div class="double-bezel">
          <div class="bezel-core" style="padding: var(--space-lg);">
            <h3 style="font-size:var(--fs-md); margin-bottom:var(--space-md); color:var(--color-text-primary);">Service Specifications</h3>
            <div style="display:flex; flex-direction:column; gap:12px; font-family:var(--font-mono); font-size:var(--fs-xs);">
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-subtle); padding-bottom:8px;">
                <span style="color:var(--color-text-muted);">ILLUSTRATIVE PRICE</span>
                <span style="color:var(--color-accent-brass); font-weight:700; font-size:var(--fs-sm);">${escapeHTML(service.price)}</span>
              </div>
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-subtle); padding-bottom:8px;">
                <span style="color:var(--color-text-muted);">TYPICAL DURATION</span>
                <span style="color:var(--color-text-primary);">${escapeHTML(service.duration)}</span>
              </div>
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-subtle); padding-bottom:8px;">
                <span style="color:var(--color-text-muted);">CATEGORY</span>
                <span style="color:var(--color-text-primary); text-transform:capitalize;">${escapeHTML(service.category.replace('-', ' '))}</span>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">STATUS</span>
                <span style="color:#81c784;">Available by Request</span>
              </div>
            </div>

            <div style="margin-top: var(--space-xl);">
              <a href="booking.html?service=${encodeURIComponent(service.id)}" class="btn btn-primary" style="width:100%;">
                Book This Service
                <span class="btn-icon-bead" aria-hidden="true">→</span>
              </a>
            </div>
            <p style="font-size:0.6875rem; color:var(--color-text-muted); text-align:center; margin-top:8px;">All prices illustrative until confirmed at chair.</p>
          </div>
        </div>
      </div>

      <!-- Right Column: In-depth Description, Includes, Preparation, FAQ -->
      <div>
        <span class="section-kicker">SERVICE PROFILE</span>
        <h1 style="font-size:var(--fs-2xl); margin-bottom:var(--space-md);">${escapeHTML(service.name)}</h1>
        <p style="font-size:var(--fs-md); color:var(--color-text-secondary); line-height:1.7; margin-bottom:var(--space-xl);">
          ${escapeHTML(service.fullDesc)}
        </p>

        <div style="background:var(--color-bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:var(--space-lg); margin-bottom:var(--space-2xl);">
          <h3 style="font-size:var(--fs-sm); font-family:var(--font-mono); color:var(--color-accent-brass); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:var(--space-xs);">Expected Outcome</h3>
          <p style="font-size:var(--fs-sm); color:var(--color-text-primary); margin:0;">${escapeHTML(service.outcome)}</p>
        </div>

        <h3 style="font-size:var(--fs-lg); margin-bottom:var(--space-md);">What is Included</h3>
        <ul style="margin-bottom:var(--space-2xl);">
          ${includesHTML}
        </ul>

        <div class="standards-grid" style="grid-template-columns: 1fr 1fr; margin-top:0; margin-bottom:var(--space-2xl);">
          <div style="background:var(--color-bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:var(--space-md);">
            <h4 style="font-size:var(--fs-sm); color:var(--color-accent-brass); margin-bottom:6px;">Preparation</h4>
            <p style="font-size:var(--fs-xs); color:var(--color-text-secondary); margin:0;">${escapeHTML(service.preparation)}</p>
          </div>
          <div style="background:var(--color-bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:var(--space-md);">
            <h4 style="font-size:var(--fs-sm); color:var(--color-accent-brass); margin-bottom:6px;">Aftercare</h4>
            <p style="font-size:var(--fs-xs); color:var(--color-text-secondary); margin:0;">${escapeHTML(service.aftercare)}</p>
          </div>
        </div>

        <h3 style="font-size:var(--fs-lg); margin-bottom:var(--space-md);">Frequently Asked Questions</h3>
        <div class="accordion" style="margin-bottom:var(--space-2xl);">
          ${faqsHTML}
        </div>

        <h3 style="font-size:var(--fs-lg); margin-bottom:var(--space-md);">Complementary Services</h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${relatedHTML}
        </div>
      </div>
    </div>
  `;

  // Attach accordion toggling for this page
  const accTriggers = detailsContainer.querySelectorAll('.accordion-trigger');
  accTriggers.forEach(trig => {
    trig.addEventListener('click', () => {
      const item = trig.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open');
      trig.setAttribute('aria-expanded', !isOpen);
    });
  });
}

// Auto-run if elements exist
document.addEventListener('DOMContentLoaded', () => {
  initServicesCatalog();
  initServiceDetailsPage();
});
