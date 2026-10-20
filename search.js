/* ============================================================
   Degner Construction — shared site search
   Single source of truth for the search index + behaviour.
   Included on every page via <script src="search.js" defer></script>
   Keep entries in step with what the pages actually say.
   ============================================================ */
(function () {
  'use strict';

  const searchItems = [
    // Pages
    { title: 'Home', desc: 'Degner Construction — municipal infrastructure contractor in Acheson, Alberta', category: 'Page', url: 'index.html', keywords: ['home', 'homepage', 'degner', 'start', 'main', 'about', 'company', 'who we are'] },
    { title: 'What We Do', desc: 'General contracting, water, sanitary & storm, earthworks, renewal, lift stations and project management', category: 'Page', url: 'index.html#services', keywords: ['services', 'what we do', 'capabilities', 'offerings', 'municipal infrastructure', 'civil', 'utilities', 'underground'] },
    // Projects page hidden: { title: 'Our Projects', desc: 'Portfolio of completed infrastructure projects across Alberta', category: 'Page', url: 'projects.html', keywords: ['projects', 'portfolio', 'work', 'completed', 'gallery', 'schonsee', 'melcor', 'qualico', 'brookfield'] },
    { title: 'Safety', desc: 'Our health and safety commitment, protocols, memberships and safety coordinator', category: 'Page', url: 'safety.html', keywords: ['safety', 'health', 'health and safety', 'ohs', 'cor', 'training', 'programs', 'hse', 'workplace safety'] },
    { title: 'Our Team', desc: 'Meet Dale Degner, Shaun Andreas, Tom Thornton, Matt Dudka and Evan Dirk', category: 'Page', url: 'team.html', keywords: ['team', 'staff', 'people', 'leadership', 'management', 'employees', 'dale', 'shaun', 'tom', 'matt', 'evan'] },
    { title: 'Careers', desc: 'Now hiring for the upcoming construction season — apply online or send your resume', category: 'Page', url: 'careers.html', keywords: ['careers', 'jobs', 'hiring', 'employment', 'apply', 'openings', 'positions', 'join our team', 'work for us', 'resume', 'acheson', 'edmonton', 'alberta'] },
    { title: 'Contact', desc: 'Phone, email, address, office hours and map for our Acheson, Alberta office', category: 'Page', url: 'contact.html', keywords: ['contact', 'get in touch', 'reach us', 'phone', 'email', 'address', 'map', 'directions', 'location', 'office'] },
    // Services
    { title: 'General Contracting', desc: 'General contracting for municipal infrastructure projects, managed from start to finish and delivered on schedule', category: 'Service', url: 'general-contracting.html', keywords: ['general contracting', 'general contractor', 'gc', 'contractor', 'municipal', 'civil construction', 'construction management', 'prime contractor'] },
    { title: 'Water, Sanitary & Storm', desc: 'Water, sanitary and storm systems for new developments and existing communities, built to municipal standards', category: 'Service', url: 'water-sanitary-storm.html', keywords: ['water', 'sanitary', 'storm', 'watermain', 'water main', 'sewer', 'sanitary sewer', 'storm sewer', 'pipe', 'pipeline', 'utilities', 'underground', 'deep utilities', 'servicing', 'subdivision'] },
    { title: 'Earthworks', desc: 'Excavation and earthworks for infrastructure and development projects, including mass excavation for stormwater facilities', category: 'Service', url: 'earthworks.html', keywords: ['earthworks', 'excavation', 'mass excavation', 'grading', 'earth moving', 'dirt', 'stormwater management', 'stormwater pond', 'pond', 'site prep'] },
    { title: 'Infrastructure Renewal', desc: 'Rehabilitation and replacement work that extends the life of existing infrastructure', category: 'Service', url: 'infrastructure-renewal.html', keywords: ['renewal', 'rehabilitation', 'rehab', 'replacement', 'aging infrastructure', 'repair', 'upgrade', 'watermain replacement', 'sewer replacement'] },
    { title: 'Lift Station Construction', desc: 'Storm and sanitary lift stations for reliable wastewater management and flood prevention', category: 'Service', url: 'lift-station-construction.html', keywords: ['lift station', 'pump station', 'pumping station', 'storm lift station', 'sanitary lift station', 'wastewater', 'flood prevention', 'pumps'] },
    { title: 'Project Management & Design-Build', desc: 'Project management and design-build services, from early planning through to completion', category: 'Service', url: 'project-management.html', keywords: ['project management', 'design build', 'design-build', 'planning', 'concept to completion', 'pm', 'turnkey', 'scheduling'] },
    // Contact
    { title: 'Request a Quote', desc: 'Send project details to estimating@degner.ca or call 780-960-8723', category: 'Contact', url: 'contact.html', keywords: ['quote', 'estimate', 'estimating', 'bid', 'tender', 'pricing', 'price', 'cost', 'estimating@degner.ca'] },
    { title: 'Phone & Email', desc: 'Phone 780-960-8723 · Fax 780-960-8809 · info@degner.ca', category: 'Contact', url: 'contact.html', keywords: ['phone', 'call', 'telephone', 'number', '780-960-8723', 'fax', '780-960-8809', 'email', 'info@degner.ca'] },
    { title: 'Office Location', desc: '27575 Ellis Road, Acheson, Alberta T7X 5A4', category: 'Contact', url: 'contact.html', keywords: ['address', 'location', 'where', 'directions', 'map', 'acheson', 'ellis road', 'parkland county', 'edmonton', 'spruce grove', 't7x 5a4'] },
    { title: 'Office Hours', desc: 'Monday – Friday 8:00 AM – 5:00 PM, closed weekends', category: 'Contact', url: 'contact.html', keywords: ['hours', 'open', 'opening hours', 'office hours', 'monday', 'friday', '8am', '5pm', 'closed', 'weekend'] },
    // Team
    { title: 'Dale Degner — President', desc: 'BCom., MBA', category: 'Team', url: 'team.html', keywords: ['dale degner', 'president', 'owner', 'ceo', 'bcom', 'mba'] },
    { title: 'Shaun Andreas — General Manager', desc: 'CET, MBA', category: 'Team', url: 'team.html', keywords: ['shaun andreas', 'general manager', 'gm', 'cet', 'mba'] },
    { title: 'Tom Thornton — Operations Manager', desc: 'GSC · Send resumes to Tom at hr@degner.ca', category: 'Team', url: 'team.html', keywords: ['tom thornton', 'operations manager', 'operations', 'gsc', 'hr', 'hiring manager'] },
    { title: 'Matt Dudka — Project Manager', desc: 'CET', category: 'Team', url: 'team.html', keywords: ['matt dudka', 'project manager', 'pm', 'cet'] },
    { title: 'Evan Dirk — Project Manager', desc: 'CET', category: 'Team', url: 'team.html', keywords: ['evan dirk', 'project manager', 'pm', 'cet'] },
    { title: 'Michelle Gregoire — Safety Coordinator', desc: 'NCSO · COR Peer Auditor · H&S Administrator', category: 'Team', url: 'safety.html', keywords: ['michelle gregoire', 'safety coordinator', 'ncso', 'national construction safety officer', 'cor peer auditor', 'safety officer', 'hse'] },
    // Careers
    { title: 'Open Positions', desc: 'Foreman, topman, pipelayers, pipelayer helpers, general labourers and equipment operators', category: 'Career', url: 'careers.html#positions', keywords: ['positions', 'openings', 'vacancies', 'jobs', 'hiring', 'seasonal', 'construction season', 'summer jobs', 'acheson', 'edmonton', 'alberta'] },
    { title: 'Foreman', desc: 'Now hiring for the upcoming construction season', category: 'Career', url: 'careers.html#positions', keywords: ['foreman', 'forman', 'foremen', 'crew lead', 'supervisor', 'site lead'] },
    { title: 'Topman', desc: 'Now hiring for the upcoming construction season', category: 'Career', url: 'careers.html#positions', keywords: ['topman', 'top man', 'grade checker'] },
    { title: 'Pipelayers & Pipelayer Helpers', desc: 'Now hiring for the upcoming construction season', category: 'Career', url: 'careers.html#positions', keywords: ['pipelayer', 'pipe layer', 'pipelaying', 'pipe laying', 'pipelayer helper', 'helper', 'pipe'] },
    { title: 'General Labourers', desc: 'Now hiring for the upcoming construction season', category: 'Career', url: 'careers.html#positions', keywords: ['labourer', 'laborer', 'general labour', 'labor', 'entry level', 'no experience', 'helper', 'student'] },
    { title: 'Equipment Operators', desc: 'Mainline and side hoe excavator, dozer, wheel loader and packer operators', category: 'Career', url: 'careers.html#positions', keywords: ['equipment operator', 'heavy equipment operator', 'operator', 'excavator', 'mainline', 'side hoe', 'hoe', 'backhoe', 'dozer', 'bulldozer', 'wheel loader', 'loader', 'packer', 'compactor', 'machine operator'] },
    { title: 'How to Apply', desc: 'Upload your resume online, or send it to Tom at hr@degner.ca or fax 780-960-8809', category: 'Career', url: 'careers.html#positions', keywords: ['apply', 'application', 'resume', 'cv', 'cover letter', 'hr@degner.ca', 'hr', 'human resources', 'fax'] },
    { title: 'Benefits of Working Here', desc: 'Competitive wages, health and dental after 3 months, safety training and room to grow', category: 'Career', url: 'careers.html#benefits', keywords: ['benefits', 'wages', 'pay', 'salary', 'compensation', 'health', 'dental', 'insurance', 'training', 'mentorship', 'advancement', 'growth'] },
    { title: 'Life at Degner', desc: 'Team collaboration, modern equipment and ongoing training', category: 'Career', url: 'careers.html#benefits', keywords: ['culture', 'life at degner', 'team environment', 'equipment', 'photos', 'workplace'] },
    // Safety
    { title: 'Our Safety Commitment', desc: 'Protecting the health and safety of employees, suppliers, customers, community and the environment', category: 'Safety', url: 'safety.html', keywords: ['commitment', 'safety policy', 'policy', 'safe', 'sustainable', 'environment', 'community'] },
    { title: 'Daily Safety Briefings', desc: 'Every workday begins with a tailgate meeting covering hazards, weather and emergency procedures', category: 'Safety', url: 'safety.html#protocols', keywords: ['tailgate meeting', 'toolbox talk', 'safety meeting', 'briefing', 'hazards', 'weather', 'emergency procedures'] },
    { title: 'Incident Reporting & Investigation', desc: 'All near-misses and incidents are investigated and analyzed to prevent recurrence', category: 'Safety', url: 'safety.html#protocols', keywords: ['incident', 'near miss', 'near-miss', 'accident', 'investigation', 'reporting'] },
    { title: 'Subcontractor Safety Requirements', desc: 'Subcontractors must meet our training, insurance and SMS standards before working on site', category: 'Safety', url: 'safety.html#protocols', keywords: ['subcontractor', 'contractor', 'requirements', 'insurance', 'sms', 'safety management system', 'prequalification'] },
    { title: 'Trailblazer Award', desc: 'Presented by the Alberta Construction Safety Association in 2011 for dedication to workplace health and safety', category: 'Safety', url: 'safety.html', keywords: ['trailblazer', 'award', 'acsa', 'recognition', '2011'] },
    { title: 'Industry Memberships', desc: 'WCB, ACSA, UDI Edmonton Region, ARHCA, ECA, Regional Safety Committee, CSSE and Skills Canada', category: 'Safety', url: 'safety.html#memberships', keywords: ['memberships', 'member', 'associations', 'wcb', 'workers compensation', 'acsa', 'alberta construction safety association', 'udi', 'bild', 'urban development institute', 'arhca', 'roadbuilders', 'eca', 'edmonton construction association', 'rscm', 'csse', 'skills canada', 'good standing'] },
    // Projects (hidden) — Infrastructure
    // Projects page hidden: { title: 'Schonsee Stage 14 Offsite', desc: 'Deep sanitary main — 0.5km with directional drilling. Client: Brookfield Residential. City of Edmonton, 2013', category: 'Project', url: 'projects.html', keywords: ['schonsee', 'brookfield', 'directional drilling', 'sanitary mains', 'edmonton', 'sheffer andrew', 'deep utility', '0.5 kilometers'] },
    // Projects page hidden: { title: 'Melcor Collector Roadway', desc: 'Collector roadway with utility infrastructure for Edmonton communities. Client: Melcor Developments, 2013', category: 'Project', url: 'projects.html', keywords: ['melcor', 'collector roadway', 'roadway', 'transportation infrastructure', 'edmonton', 'ibi group', 'residential development'] },
    // Projects page hidden: { title: 'MLC Arterial Roadway', desc: 'Major arterial roadway for Edmonton\'s municipal infrastructure. Client: MLC Developments, 2013', category: 'Project', url: 'projects.html', keywords: ['mlc', 'arterial roadway', 'arterial', 'transportation corridor', 'edmonton', 'stantec', 'heavy traffic'] },
    // Projects (hidden) — Renewal
    // Projects page hidden: { title: 'St. Albert Sedimentation Control', desc: 'Environmental renewal with sedimentation/erosion control and 1350mm outfall. Client: St. Albert County, 2013', category: 'Project', url: 'projects.html', keywords: ['st albert', 'saint albert', 'sedimentation', 'erosion control', 'outfall', 'stormwater', 'environmental', 'stantec', '1350mm'] },
    // Projects page hidden: { title: 'Edmonton Watermain Renewal', desc: 'Critical watermain renewal to upgrade aging infrastructure and improve water distribution reliability. City of Edmonton, 2013', category: 'Project', url: 'projects.html', keywords: ['edmonton', 'watermain renewal', 'water main', 'aging infrastructure', 'water distribution', 'reliability', 'stantec'] },
    // Projects page hidden: { title: 'Canada Lands Infrastructure Renewal', desc: 'Removal of 2.8km of aging AC water and sanitary systems with modern replacement infrastructure. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['canada lands', 'infrastructure renewal', '2.8 kilometers', 'ac water', 'sanitary', 'replacement', 'edmonton', 'select engineering'] },
    // Projects (hidden) — Urban Land
    // Projects page hidden: { title: 'Rohit Lands Residential', desc: '179 fully-serviced residential lots with infrastructure and roadway. City of Edmonton, 2013', category: 'Project', url: 'projects.html', keywords: ['rohit', 'residential development', '179 lots', 'serviced lots', 'mmm group', 'edmonton', 'urban land'] },
    // Projects page hidden: { title: 'Qualico Communities Development', desc: '125 residential lots with full municipal infrastructure. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['qualico', '125 lots', 'residential community', 'stantec', 'edmonton', 'multi-phase', 'municipal infrastructure'] },
    // Projects page hidden: { title: 'Brookfield Residential Community', desc: '102 fully-serviced lots with advanced infrastructure planning. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['brookfield', '102 lots', 'premium residential', 'sheffer andrew', 'edmonton', 'serviced lots', 'sustainable design'] },
    // Projects page hidden: { title: 'Melcor Mixed Development', desc: '188 residential lots with collector roadway. City of Edmonton, 2012', category: 'Project', url: 'projects.html', keywords: ['melcor mixed', '188 lots', 'mixed development', 'collector roadway', 'ibi group', 'edmonton', 'multi-component'] },
    // Projects page hidden: { title: 'Qualico Fort Saskatchewan', desc: '96 residential lots in Fort Saskatchewan. Client: Qualico Communities, 2013', category: 'Project', url: 'projects.html', keywords: ['qualico', 'fort saskatchewan', '96 lots', 'al-terra', 'suburban', 'residential', 'housing'] },
    // Projects page hidden: { title: 'Qualico Spruce Grove', desc: '109 residential lots in Spruce Grove. Client: Qualico Communities, 2013', category: 'Project', url: 'projects.html', keywords: ['qualico', 'spruce grove', '109 lots', 'select engineering', 'suburban', 'residential', 'municipal standards'] },
  ];

  // Shown before anything is typed
  const QUICK_LINKS = ['What We Do', 'Request a Quote', 'Open Positions', 'Safety', 'Contact'];
  const MAX_RESULTS = 8;
  // Small words people type that shouldn't have to match ("water and sewer", "jobs in acheson")
  const STOP_WORDS = new Set(['a', 'an', 'and', 'the', 'of', 'in', 'for', 'to', 'at', 'on', 'with', 'do', 'you', 'your', 'i', 'me', 'my', 'is', 'are']);

  // ---- inject the few extra styles this enhanced search needs (dark theme) ----
  const style = document.createElement('style');
  style.textContent = `
    .suggestion-item.active { background: rgba(255,255,255,0.08); outline: none; }
    .suggestion-item mark { background: rgba(255,255,255,0.22); color: inherit; border-radius: 2px; padding: 0 1px; }
    .search-count { font-size: 0.75rem; color: var(--text-light, rgba(255,255,255,0.45)); padding: 0.25rem 1rem 0.5rem; }
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

  // Lower-case, drop accents and hyphens ("design-build" = "design build", "780-960-8723" = "7809608723"),
  // turn other punctuation into spaces but keep @ and . so email addresses still match.
  function normalize(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/&/g, ' and ')
      .replace(/-/g, '')
      .replace(/[^a-z0-9@.\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(query) {
    const all = normalize(query).split(' ').filter(t => t && t !== '.');
    const meaningful = all.filter(t => !STOP_WORDS.has(t));
    return meaningful.length ? meaningful : all;
  }

  // Pre-normalise every entry once
  const index = searchItems.map(item => ({
    item,
    title: normalize(item.title),
    titleWords: normalize(item.title).split(' '),
    desc: normalize(item.desc),
    kws: item.keywords.map(normalize),
  }));

  // Wrap each matched word of the visible text in <mark>.
  function highlight(text, tokens) {
    let safe = escapeHtml(text);
    tokens.forEach(tok => {
      if (tok.length < 2) return;
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

  // How strongly one word matches an entry (0 = not at all)
  function scoreToken(e, tok) {
    let best = 0;
    if (e.title.startsWith(tok)) best = 60;
    else if (e.titleWords.some(w => w.startsWith(tok))) best = 50;
    else if (e.title.includes(tok)) best = 40;
    if (e.kws.some(k => k === tok)) best = Math.max(best, 45);
    else if (e.kws.some(k => k.startsWith(tok) || k.split(' ').some(w => w.startsWith(tok)))) best = Math.max(best, 30);
    else if (e.kws.some(k => k.includes(tok))) best = Math.max(best, 20);
    if (best === 0 && e.desc.includes(tok)) best = 10;
    // typo tolerance against title words / keyword words
    if (best === 0 && tok.length >= 4) {
      const max = tok.length > 6 ? 2 : 1;
      const words = e.titleWords.concat(...e.kws.map(k => k.split(' ')));
      if (words.some(w => w.length >= 3 && within(w, tok, max))) best = 8;
    }
    return best;
  }

  // Every word must hit somewhere (AND); the strength of each hit adds up.
  function scoreEntry(e, tokens) {
    let total = 0;
    for (const tok of tokens) {
      let best = scoreToken(e, tok);
      // plurals: "operators", "jobs", "benefits"
      if (best === 0 && tok.length > 3 && tok.endsWith('s')) best = scoreToken(e, tok.slice(0, -1));
      if (best === 0) return 0;
      total += best;
    }
    if (e.item.category === 'Page') total += 5; // gentle nudge for top-level pages
    return total;
  }

  function search(query) {
    const tokens = tokenize(query);
    if (!tokens.length) return [];
    return index
      .map(e => ({ item: e.item, score: scoreEntry(e, tokens) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.item);
  }

  function rowsHtml(items, tokens) {
    return items.map((item, i) => `
        <button type="button" class="suggestion-item" role="option" id="search-opt-${i}" aria-selected="false" data-url="${escapeHtml(item.url)}">
            <div class="suggestion-header">
                <span class="suggestion-title">${highlight(item.title, tokens)}</span>
                <span class="suggestion-category">${item.category}</span>
            </div>
            <span class="suggestion-desc">${highlight(item.desc, tokens)}</span>
        </button>
      `).join('');
  }

  function wireRows() {
    container.querySelectorAll('.suggestion-item').forEach((btn, i) => {
      btn.addEventListener('click', () => go(btn.dataset.url));
      btn.addEventListener('mousemove', () => setActive(i));
    });
  }

  function render(query) {
    activeIndex = -1;
    input.removeAttribute('aria-activedescendant');

    if (query.length < 2) {
      results = QUICK_LINKS.map(t => searchItems.find(i => i.title === t)).filter(Boolean);
      container.innerHTML = '<p class="search-hint">Try "water main", "foreman" or "quote" — or jump to:</p>' + rowsHtml(results, []);
      wireRows();
      return;
    }

    const tokens = tokenize(query);
    const all = search(query);
    results = all.slice(0, MAX_RESULTS);

    if (!results.length) {
      container.innerHTML = '<p class="search-no-results" role="status">No results for "' + escapeHtml(query) +
        '". Try another word, or call us at <a href="tel:780-960-8723">780-960-8723</a>.</p>';
      return;
    }

    const countLabel = all.length > results.length
      ? `Showing ${results.length} of ${all.length} matches`
      : `${all.length} match${all.length === 1 ? '' : 'es'}`;

    container.innerHTML =
      `<p class="search-count" role="status" aria-live="polite">${countLabel}</p>` + rowsHtml(results, tokens);
    wireRows();
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
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('spellcheck', 'false');
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
        // Highlighted row, otherwise the best match for what's typed
        if (activeIndex >= 0 && items[activeIndex]) go(items[activeIndex].dataset.url);
        else if (this.value.trim().length >= 2) {
          const best = search(this.value.trim())[0];
          if (best) go(best.url);
        }
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
