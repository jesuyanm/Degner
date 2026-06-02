/* ============================================================
   Degner Construction — shared site search
   Single source of truth for the search index + behaviour.
   Included on every page via <script src="search.js" defer></script>
   ============================================================ */
(function () {
  'use strict';

  const searchItems = [
    // Pages
    { title: 'Home', desc: 'Degner Construction — Alberta municipal infrastructure contractor', category: 'Page', url: 'index.html', keywords: ['home', 'homepage', 'degner', 'start', 'main'] },
    { title: 'Our Projects', desc: 'Portfolio of completed infrastructure projects across Alberta', category: 'Page', url: 'projects.html', keywords: ['projects', 'portfolio', 'work', 'completed', 'gallery', 'schonsee', 'melcor', 'qualico', 'brookfield'] },
    { title: 'Our Team', desc: 'Meet Dale Degner, Shaun Andreas, Matt Dudka, and Tom Thornton', category: 'Page', url: 'team.html', keywords: ['team', 'staff', 'people', 'leadership', 'crew', 'employees', 'dale', 'shaun', 'matt', 'tom'] },
    { title: 'Careers', desc: 'Job opportunities at Degner Construction — foremen, operators, labourers', category: 'Page', url: 'careers.html', keywords: ['careers', 'jobs', 'hiring', 'work', 'employment', 'apply', 'openings', 'positions', 'join our team'] },
    { title: 'Safety', desc: 'Our health and safety commitment — zero incidents, COR certified', category: 'Page', url: 'safety.html', keywords: ['safety', 'health', 'cor', 'certification', 'training', 'programs', 'zero incidents', 'michelle', 'gregoire', 'ncso'] },
    { title: 'Contact', desc: 'Get in touch — phone, email, address, and office hours in Acheson, Alberta', category: 'Page', url: 'contact.html', keywords: ['contact', 'get in touch', 'reach us', 'phone', 'email', 'address', 'map', 'directions', 'location'] },
    // Company
    { title: 'About Degner Construction', desc: 'Full-service municipal infrastructure contractor specializing in water, sanitary, and storm systems', category: 'About', url: 'index.html#about', keywords: ['about', 'company', 'who we are', 'history', 'story', 'alberta', 'acheson', 'edmonton', 'municipal infrastructure'] },
    { title: 'Our Mission', desc: 'Building community value into every project with professional expertise and quality construction', category: 'About', url: 'index.html#about', keywords: ['mission', 'values', 'community', 'quality', 'purpose', 'vision'] },
    { title: 'Location — Acheson, Alberta', desc: '27575 Ellis Road, Acheson, Alberta T7X 6N3 — strategically located to serve municipalities across Alberta', category: 'Contact', url: 'contact.html', keywords: ['acheson', 'alberta', 'ellis road', 'location', 'address', 'where', 't7x 6n3'] },
    { title: '25 Years of Experience', desc: 'Over 25 years building Alberta\'s essential municipal infrastructure', category: 'About', url: 'index.html#about', keywords: ['25 years', 'experience', 'decades', 'established', 'founded'] },
    { title: '500+ Projects Completed', desc: '500+ projects completed across 50+ Alberta communities', category: 'About', url: 'index.html#about', keywords: ['500 projects', '50 communities', 'stats', 'numbers', 'track record'] },
    // Contact
    { title: 'Contact Us', desc: 'Phone: 780-960-8723 | Email: info@degner.ca | Fax: 780-960-8809', category: 'Contact', url: 'contact.html', keywords: ['contact', 'phone', 'call', '780-960-8723', 'reach', 'get in touch', 'hours', 'monday friday'] },
    { title: 'Request a Quote', desc: 'Send project details to estimating@degner.ca or call 780-960-8723', category: 'Contact', url: 'contact.html', keywords: ['quote', 'estimate', 'bid', 'estimating@degner.ca', 'request', 'pricing', 'tender'] },
    { title: 'HR & Employment Inquiries', desc: 'Send your resume to hr@degner.ca to apply for a position', category: 'Contact', url: 'careers.html', keywords: ['hr', 'human resources', 'hr@degner.ca', 'resume', 'apply', 'employment contact'] },
    { title: 'Office Hours', desc: 'Monday – Friday 8:00 AM – 5:00 PM, closed weekends', category: 'Contact', url: 'contact.html', keywords: ['hours', 'open', 'office hours', 'monday', 'friday', '8am', '5pm', 'closed', 'weekend'] },
    // Services
    { title: 'General Contracting', desc: 'Full-service general contracting for all aspects of municipal infrastructure projects — project management, execution, complex developments', category: 'Service', url: 'index.html#services', keywords: ['general contracting', 'gc', 'contractor', 'municipal', 'project execution', 'construction management'] },
    { title: 'Water, Sanitary & Storm Services', desc: 'Installation of water, sanitary and storm services — reliable, efficient systems meeting all municipal standards', category: 'Service', url: 'index.html#services', keywords: ['water', 'sanitary', 'storm', 'services', 'watermain', 'sewer', 'storm sewer', 'municipal standards', 'installation'] },
    { title: 'Infrastructure Rehabilitation', desc: 'Infrastructure rehabilitation and renewal — extending service life and improving performance of aging systems', category: 'Service', url: 'index.html#services', keywords: ['rehabilitation', 'renewal', 'aging infrastructure', 'repair', 'upgrade', 'replacement', 'renewal', 'revitalize'] },
    { title: 'Lift Station Construction', desc: 'Storm and sanitary lift station construction for proper waste management and flood prevention', category: 'Service', url: 'index.html#services', keywords: ['lift station', 'pump station', 'storm lift', 'sanitary lift', 'flood prevention', 'waste management', 'pumping'] },
    { title: 'Project Management & Design Build', desc: 'Comprehensive project management and design build from concept to completion', category: 'Service', url: 'index.html#services', keywords: ['project management', 'design build', 'design-build', 'concept to completion', 'pm', 'turnkey', 'epc'] },
    { title: 'Mass Excavation', desc: 'Mass excavation for storm water management facilities — large-scale earthworks and water management solutions', category: 'Service', url: 'index.html#services', keywords: ['excavation', 'mass excavation', 'earthworks', 'grading', 'stormwater management', 'dig', 'earth moving', 'pond', 'retention'] },
    { title: 'Directional Drilling', desc: 'Horizontal directional drilling — trenchless technology for underground pipe installation with minimal surface disruption', category: 'Service', url: 'index.html#services', keywords: ['directional drilling', 'hdd', 'horizontal drilling', 'trenchless', 'boring', 'no-dig', 'pipe bursting'] },
    { title: 'Road Restoration', desc: 'Asphalt and concrete road restoration after underground utility work', category: 'Service', url: 'index.html#services', keywords: ['road', 'road restoration', 'asphalt', 'concrete', 'pavement', 'paving', 'reinstatement', 'roadway'] },
    // Projects — Infrastructure
    { title: 'Schonsee Stage 14 Offsite', desc: 'Deep sanitary main — 0.5km with directional drilling. Client: Brookfield Residential. City of Edmonton, 2013', category: 'Project', url: 'projects.html', keywords: ['schonsee', 'brookfield', 'directional drilling', 'sanitary mains', 'edmonton', 'sheffer andrew', 'deep utility', '0.5 kilometers'] },
    { title: 'Melcor Collector Roadway', desc: 'Collector roadway with utility infrastructure for Edmonton communities. Client: Melcor Developments, 2013', category: 'Project', url: 'projects.html', keywords: ['melcor', 'collector roadway', 'roadway', 'transportation infrastructure', 'edmonton', 'ibi group', 'residential development'] },
    { title: 'MLC Arterial Roadway', desc: 'Major arterial roadway for Edmonton\'s municipal infrastructure. Client: MLC Developments, 2013', category: 'Project', url: 'projects.html', keywords: ['mlc', 'arterial roadway', 'arterial', 'transportation corridor', 'edmonton', 'stantec', 'heavy traffic'] },
    // Projects — Renewal
    { title: 'St. Albert Sedimentation Control', desc: 'Environmental renewal with sedimentation/erosion control and 1350mm outfall. Client: St. Albert County, 2013', category: 'Project', url: 'projects.html', keywords: ['st albert', 'saint albert', 'sedimentation', 'erosion control', 'outfall', 'stormwater', 'environmental', 'stantec', '1350mm'] },
    { title: 'Edmonton Watermain Renewal', desc: 'Critical watermain renewal to upgrade aging infrastructure and improve water distribution reliability. City of Edmonton, 2013', category: 'Project', url: 'projects.html', keywords: ['edmonton', 'watermain renewal', 'water main', 'aging infrastructure', 'water distribution', 'reliability', 'stantec'] },
    { title: 'Canada Lands Infrastructure Renewal', desc: 'Removal of 2.8km of aging AC water and sanitary systems with modern replacement infrastructure. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['canada lands', 'infrastructure renewal', '2.8 kilometers', 'ac water', 'sanitary', 'replacement', 'edmonton', 'select engineering'] },
    // Projects — Urban Land
    { title: 'Rohit Lands Residential', desc: '179 fully-serviced residential lots with infrastructure and roadway. City of Edmonton, 2013', category: 'Project', url: 'projects.html', keywords: ['rohit', 'residential development', '179 lots', 'serviced lots', 'mmm group', 'edmonton', 'urban land'] },
    { title: 'Qualico Communities Development', desc: '125 residential lots with full municipal infrastructure. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['qualico', '125 lots', 'residential community', 'stantec', 'edmonton', 'multi-phase', 'municipal infrastructure'] },
    { title: 'Brookfield Residential Community', desc: '102 fully-serviced lots with advanced infrastructure planning. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['brookfield', '102 lots', 'premium residential', 'sheffer andrew', 'edmonton', 'serviced lots', 'sustainable design'] },
    { title: 'Melcor Mixed Development', desc: '188 residential lots with collector roadway. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['melcor mixed', '188 lots', 'mixed development', 'collector roadway', 'ibi group', 'edmonton', 'multi-component'] },
    { title: 'Qualico Fort Saskatchewan', desc: '96 residential lots in Fort Saskatchewan. Client: Qualico Communities, 2013', category: 'Project', url: 'projects.html', keywords: ['qualico', 'fort saskatchewan', '96 lots', 'al-terra', 'suburban', 'residential', 'housing'] },
    { title: 'Qualico Spruce Grove', desc: '109 residential lots in Spruce Grove. Client: Qualico Communities, 2013', category: 'Project', url: 'projects.html', keywords: ['qualico', 'spruce grove', '109 lots', 'select engineering', 'suburban', 'residential', 'municipal standards'] },
    // Team
    { title: 'Dale Degner — President', desc: 'BCom., MBA. Over two decades of leadership — strategic vision, operational excellence, and community value', category: 'Team', url: 'team.html', keywords: ['dale degner', 'president', 'bcom', 'mba', 'owner', 'founder', 'leadership', 'ceo', 'degner'] },
    { title: 'Shaun Andreas — General Manager', desc: 'CET, MBA. Certified Engineering Technologist overseeing project quality, safety, and field operations', category: 'Team', url: 'team.html', keywords: ['shaun andreas', 'general manager', 'cet', 'mba', 'certified engineering technologist', 'project management', 'field operations'] },
    { title: 'Matt Dudka — Project Manager', desc: 'CET. Technical project management — on-time, on-budget delivery with client communication focus', category: 'Team', url: 'team.html', keywords: ['matt dudka', 'project manager', 'cet', 'certified engineering technologist', 'budget', 'schedule', 'client'] },
    { title: 'Tom Thornton — Operations Manager', desc: 'Operational expertise in field operations, equipment management, and resource coordination', category: 'Team', url: 'team.html', keywords: ['tom thornton', 'operations manager', 'operations', 'equipment management', 'resources', 'field', 'productivity'] },
    // Careers — Positions
    { title: 'Foreman', desc: 'Lead field crews in municipal infrastructure — daily operations, safety compliance, project coordination. 5+ years experience required', category: 'Career', url: 'careers.html', keywords: ['foreman', 'crew lead', 'site lead', 'field operations', 'leadership', 'safety compliance', '5 years'] },
    { title: 'Topman', desc: 'Field operations support — crew coordination, project specifications, municipal infrastructure. 3+ years experience', category: 'Career', url: 'careers.html', keywords: ['topman', 'top man', 'field operations', 'crew coordination', '3 years', 'specifications', 'driver\'s license'] },
    { title: 'Pipelayers', desc: 'Install and maintain water, sanitary, and storm pipeline systems with modern equipment to municipal specs', category: 'Career', url: 'careers.html', keywords: ['pipelayer', 'pipe layer', 'pipeline', 'water sanitary storm', 'pipe installation', 'pipelaying', 'pipe laying'] },
    { title: 'Equipment Operators', desc: 'Operate excavators, dozers, wheel loaders, and packers — mainline, side hoe, dozer, loader, packer positions', category: 'Career', url: 'careers.html', keywords: ['equipment operator', 'excavator', 'dozer', 'wheel loader', 'packer', 'mainline', 'side hoe', 'heavy equipment', 'operate', 'machine operator'] },
    { title: 'General Labourers', desc: 'Support all aspects of construction — excellent entry point for career growth. Strong work ethic and fitness required', category: 'Career', url: 'careers.html', keywords: ['labourer', 'laborer', 'general labour', 'entry level', 'construction', 'work ethic', 'labour', 'helper'] },
    { title: 'Pipelayer Helpers', desc: 'Assist experienced pipelayers in water, sanitary, storm installation — great entry point to skilled trades', category: 'Career', url: 'careers.html', keywords: ['pipelayer helper', 'helper', 'entry level', 'pipeline', 'skilled trades', 'water sanitary', 'assistant'] },
    // Benefits
    { title: 'Competitive Wages & Compensation', desc: 'Competitive wages reflecting skills and experience, with regular performance-based increases', category: 'Benefit', url: 'careers.html', keywords: ['wages', 'pay', 'salary', 'compensation', 'competitive', 'performance', 'increase', 'raise'] },
    { title: 'Health & Dental Benefits', desc: 'Comprehensive health and dental benefits after 3 months, plus additional perks for well-being', category: 'Benefit', url: 'careers.html', keywords: ['health benefits', 'dental', 'benefits', '3 months', 'well-being', 'extended health', 'insurance', 'rrsp'] },
    { title: 'Professional Growth & Advancement', desc: 'Clear career advancement with mentorship from experienced professionals and ongoing skills development', category: 'Benefit', url: 'careers.html', keywords: ['professional growth', 'advancement', 'career', 'mentorship', 'development', 'skills', 'promotion', 'training'] },
    { title: 'Safety Training Programs', desc: 'Comprehensive safety training ensuring every team member goes home safely every day', category: 'Benefit', url: 'careers.html', keywords: ['safety training', 'training', 'safe', 'certification', 'first aid', 'whmis', 'safety courses'] },
    // Safety
    { title: 'Safety Culture', desc: 'We promote a culture where people truly care about one another and everyone shares the goal of zero incidents', category: 'Safety', url: 'safety.html', keywords: ['safety culture', 'zero incidents', 'culture', 'care', 'everyone', 'commitment', 'workplace safety'] },
    { title: 'Health & Safety Commitment', desc: 'Protecting employees, suppliers, customers, community and the environment through OHS compliance', category: 'Safety', url: 'safety.html', keywords: ['health and safety', 'ohs', 'occupational health', 'compliance', 'regulations', 'protect', 'environment', 'sustainable'] },
    { title: 'Safety Mandate', desc: '"To promote and sustain a safe work environment for everyone and continually improve our process"', category: 'Safety', url: 'safety.html', keywords: ['safety mandate', 'mandate', 'promote', 'sustain', 'safe environment', 'continually improve'] },
    { title: 'Michelle Gregoire — Safety Coordinator', desc: 'NCSO (National Construction Safety Officer) — site inspections, safety program oversight, regulatory compliance', category: 'Safety', url: 'safety.html', keywords: ['michelle gregoire', 'safety coordinator', 'ncso', 'national construction safety officer', 'site inspection', 'compliance', 'regulations'] },
    { title: 'Daily Safety Briefings', desc: 'Tailgate safety meetings every workday covering hazards, weather conditions, and emergency procedures', category: 'Safety', url: 'safety.html', keywords: ['daily briefing', 'tailgate meeting', 'safety meeting', 'hazards', 'weather', 'emergency procedures', 'toolbox'] },
    { title: 'Incident Reporting & Investigation', desc: 'Comprehensive reporting system — all near-misses and incidents analyzed to prevent recurrence', category: 'Safety', url: 'safety.html', keywords: ['incident reporting', 'investigation', 'near miss', 'near-miss', 'accident', 'prevent', 'recurrence', 'reporting system'] },
    { title: 'Contractor Safety Requirements', desc: 'All subcontractors must meet our stringent safety standards — training, insurance, and SMS compliance required', category: 'Safety', url: 'safety.html', keywords: ['contractor', 'subcontractor', 'safety requirements', 'sms', 'safety management system', 'insurance', 'standards'] },
  ];

  const MAX_RESULTS = 8;

  // ---- inject the few extra styles this enhanced search needs ----
  const style = document.createElement('style');
  style.textContent = `
    .suggestion-item.active { background: var(--background-light, #f8f9fa); outline: none; }
    .suggestion-item mark { background: rgba(0,0,0,0.12); color: inherit; border-radius: 3px; padding: 0 1px; }
    .search-count { font-size: 0.75rem; color: var(--text-light, #888); padding: 0.25rem 1rem 0.5rem; }
  `;
  document.head.appendChild(style);

  // ---- elements (bail out quietly if the page has no search UI) ----
  const toggle = document.getElementById('searchToggle');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const input = document.querySelector('.search-overlay .search-input');
  const container = document.querySelector('.search-suggestions');
  if (!toggle || !overlay || !input || !container) return;

  let results = [];        // current result set
  let activeIndex = -1;    // keyboard-highlighted row
  let lastFocused = null;  // element focused before opening (for restore)

  // ---- helpers ----
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  // Wrap each matched token in the text with <mark>.
  function highlight(text, tokens) {
    let safe = escapeHtml(text);
    tokens.forEach(tok => {
      if (!tok) return;
      const re = new RegExp('(' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      safe = safe.replace(re, '<mark>$1</mark>');
    });
    return safe;
  }

  // Levenshtein distance, capped — used for typo tolerance only.
  function within(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return false;
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
      if (Math.min(...dp[i]) > max) return false; // early out
    }
    return dp[a.length][b.length] <= max;
  }

  // Score one item against the token list. Returns 0 = no match.
  // Every token must hit somewhere (AND); the strength of each hit adds up.
  function scoreItem(item, tokens) {
    const title = item.title.toLowerCase();
    const desc = item.desc.toLowerCase();
    const kws = item.keywords.map(k => k.toLowerCase());
    let total = 0;

    for (const tok of tokens) {
      let best = 0;
      if (title.startsWith(tok)) best = Math.max(best, 60);
      else if (title.includes(tok)) best = Math.max(best, 40);
      if (kws.some(k => k === tok)) best = Math.max(best, 45);
      else if (kws.some(k => k.startsWith(tok))) best = Math.max(best, 30);
      else if (kws.some(k => k.includes(tok))) best = Math.max(best, 20);
      if (desc.includes(tok)) best = Math.max(best, 10);
      // fuzzy fallback: tolerate small typos against title words / keywords
      if (best === 0 && tok.length >= 4) {
        const fuzzy = title.split(/\s+/).some(w => within(w, tok, tok.length > 6 ? 2 : 1)) ||
                      kws.some(k => within(k, tok, tok.length > 6 ? 2 : 1));
        if (fuzzy) best = 8;
      }
      if (best === 0) return 0; // this token matched nothing → drop item
      total += best;
    }
    if (item.category === 'Page') total += 5; // gentle nudge for top-level pages
    return total;
  }

  function search(query) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    return searchItems
      .map(item => ({ item, score: scoreItem(item, tokens) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.item);
  }

  function render(query) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

    if (query.length < 2) {
      results = [];
      activeIndex = -1;
      container.innerHTML = '<p class="search-hint">Try: "water main", "foreman", "safety programs"</p>';
      return;
    }

    const all = search(query);
    results = all.slice(0, MAX_RESULTS);
    activeIndex = -1;

    if (!results.length) {
      container.innerHTML = '<p class="search-no-results" role="status">No results for "' + escapeHtml(query) + '"</p>';
      return;
    }

    const countLabel = all.length > results.length
      ? `Showing ${results.length} of ${all.length} matches`
      : `${all.length} match${all.length === 1 ? '' : 'es'}`;

    container.innerHTML =
      `<p class="search-count" role="status" aria-live="polite">${countLabel}</p>` +
      results.map((item, i) => `
        <button class="suggestion-item" role="option" id="search-opt-${i}" aria-selected="false" data-url="${item.url}">
            <div class="suggestion-header">
                <span class="suggestion-title">${highlight(item.title, tokens)}</span>
                <span class="suggestion-category">${item.category}</span>
            </div>
            <span class="suggestion-desc">${highlight(item.desc, tokens)}</span>
        </button>
      `).join('');

    container.querySelectorAll('.suggestion-item').forEach((btn, i) => {
      btn.addEventListener('click', () => go(btn.dataset.url));
      btn.addEventListener('mousemove', () => setActive(i));
    });
  }

  function setActive(i) {
    const items = container.querySelectorAll('.suggestion-item');
    if (!items.length) return;
    activeIndex = (i + items.length) % items.length;
    items.forEach((el, idx) => {
      const on = idx === activeIndex;
      el.classList.toggle('active', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) {
        el.scrollIntoView({ block: 'nearest' });
        input.setAttribute('aria-activedescendant', el.id);
      }
    });
  }

  function open() {
    lastFocused = document.activeElement;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render('');
    setTimeout(() => input.focus(), 300);
  }

  function close() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    input.value = '';
    input.removeAttribute('aria-activedescendant');
    render('');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function go(url) {
    close();
    window.location.href = url;
  }

  // ---- ARIA wiring ----
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Site search');
  overlay.setAttribute('aria-hidden', 'true');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-expanded', 'true');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', 'search-suggestions-list');
  container.id = 'search-suggestions-list';
  container.setAttribute('role', 'listbox');

  // ---- events ----
  toggle.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);

  // debounce input rendering
  let t;
  input.addEventListener('input', function () {
    const v = this.value.trim();
    clearTimeout(t);
    t = setTimeout(() => render(v), 120);
  });

  input.addEventListener('keydown', function (e) {
    const items = container.querySelectorAll('.suggestion-item');
    switch (e.key) {
      case 'ArrowDown':
        if (items.length) { e.preventDefault(); setActive(activeIndex + 1); }
        break;
      case 'ArrowUp':
        if (items.length) { e.preventDefault(); setActive(activeIndex - 1); }
        break;
      case 'Enter': {
        e.preventDefault();
        const target = activeIndex >= 0 ? items[activeIndex] : items[0];
        if (target) go(target.dataset.url);
        break;
      }
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  });

  // click outside the panel closes it
  document.addEventListener('click', function (e) {
    if (overlay.classList.contains('active') && !overlay.contains(e.target) && !toggle.contains(e.target)) {
      close();
    }
  });

  // Escape anywhere closes the overlay (mobile-nav has its own handler)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  // focus trap while the dialog is open
  overlay.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !overlay.classList.contains('active')) return;
    const focusable = overlay.querySelectorAll('input, button, [href], [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
