/* ============================================================
   TORC UNION — Governance Framework React App
   Loaded as type="text/babel" — no build step required
   ============================================================ */

// ── DATA ─────────────────────────────────────────────────────

const TIERS = [
  {
    id: 'op',
    cssClass: 'tier-card--op',
    number: 1,
    label: 'Operational',
    tagline: 'AI autonomous within worker-set parameters',
    description: 'Routine, high-frequency decisions that follow rules workers have already agreed on. AI acts immediately — no approval required.',
    examples: [
      'Scheduling shifts within agreed hour ranges',
      'Reordering supplies when inventory drops below threshold',
      'Routing customer service tickets to the right department',
      'Flagging invoices that fall outside pre-approved vendor rates',
      'Sending automated payroll reminders and confirmations',
    ],
    specs: [
      { key: 'Decision Speed', val: 'Seconds to minutes' },
      { key: 'Who Decides', val: 'AI, autonomously' },
      { key: 'Worker Role', val: 'Set the rules — AI operates within them' },
      { key: 'Override', val: 'Any worker can escalate to Tier 2' },
    ],
  },
  {
    id: 'tac',
    cssClass: 'tier-card--tac',
    number: 2,
    label: 'Tactical',
    tagline: 'AI recommends — leadership approves',
    description: 'Time-sensitive business decisions with meaningful consequences. AI analyzes options and presents a recommendation. Elected worker-leaders review and approve.',
    examples: [
      'Sourcing a replacement supplier after one shuts down',
      'Approving overtime to meet a critical deadline',
      'Renegotiating a vendor contract within 15% of current terms',
      'Adjusting project scope after a client change request',
      'Emergency budget reallocation under $25,000',
    ],
    specs: [
      { key: 'Decision Speed', val: 'Hours to 2 days' },
      { key: 'Who Decides', val: 'Elected leadership (board, ops committee)' },
      { key: 'Worker Role', val: 'Leadership represents member interests' },
      { key: 'Override', val: 'Any member can request escalation to Tier 3' },
    ],
  },
  {
    id: 'str',
    cssClass: 'tier-card--str',
    number: 3,
    label: 'Strategic',
    tagline: 'AI recommends — workers vote',
    description: 'Decisions that shape the company\'s direction, affect many workers\' lives, or involve significant resource commitments. AI models impacts. All workers vote.',
    examples: [
      'Adopting a four-day workweek across the organization',
      'Entering a new market or product category',
      'Changing pricing strategy in response to competitive threat',
      'Hiring or not hiring more than 10% of current workforce',
      'Taking on outside investment or a major loan',
    ],
    specs: [
      { key: 'Decision Speed', val: '2–6 weeks (deliberation + vote)' },
      { key: 'Who Decides', val: 'All worker-members by majority vote' },
      { key: 'Worker Role', val: 'Full participation — every voice counted' },
      { key: 'Override', val: 'Supermajority can escalate to Tier 4' },
    ],
  },
  {
    id: 'con',
    cssClass: 'tier-card--con',
    number: 4,
    label: 'Constitutional',
    tagline: 'Workers only — AI has no role',
    description: 'Foundational decisions about who we are, how we govern ourselves, and what we value. AI is explicitly excluded. These moments are purely human.',
    examples: [
      'Changing the ownership or cooperative structure',
      'Revising the profit-sharing or equity model',
      'Merging with or acquiring another company',
      'Defining or amending worker rights and protections',
      'Dissolving the cooperative',
    ],
    specs: [
      { key: 'Decision Speed', val: '1–3 months (deliberation + ratification)' },
      { key: 'Who Decides', val: 'All worker-members, supermajority required' },
      { key: 'Worker Role', val: 'Sole authority — AI has no advisory role' },
      { key: 'Override', val: 'None — this is the highest authority' },
    ],
  },
];

// Keyword routing logic for DecisionRouter
const ROUTING_RULES = [
  // Constitutional signals
  { tier: 'con', keywords: ['ownership', 'structure', 'dissolve', 'merge', 'acquisition', 'equity', 'constitution', 'bylaws', 'charter', 'rights', 'profit-sharing model', 'cooperative model', 'governance structure', 'worker rights', 'voting rights'], weight: 10 },
  // Strategic signals
  { tier: 'str', keywords: ['strategy', 'four-day', '4-day', 'workweek', 'pricing', 'market', 'new product', 'expansion', 'hiring', 'layoff', 'layoffs', 'investment', 'loan', 'compensation model', 'pay structure', 'workforce', 'company direction', 'new market', 'brand', 'rebrand'], weight: 8 },
  // Tactical signals
  { tier: 'tac', keywords: ['supplier', 'vendor', 'contract', 'overtime', 'deadline', 'client', 'budget reallocation', 'emergency', 'scope', 'urgent', 'crisis', 'negotiate', 'short-term', 'replace', 'backup plan', 'contingency', 'approval'], weight: 6 },
  // Operational signals
  { tier: 'op', keywords: ['schedule', 'scheduling', 'inventory', 'reorder', 'ticket', 'route', 'invoice', 'payroll', 'reminder', 'daily', 'routine', 'automatic', 'threshold', 'flag', 'notify', 'alert', 'shift', 'stock', 'supply'], weight: 4 },
];

const TIER_RESULT_DATA = {
  op: {
    badge: 'Tier 1 · Operational',
    cssClass: 'router-result--op',
    heading: 'AI handles this autonomously',
    reasoning: 'This looks like a routine, recurring decision that fits within parameters workers have already agreed on. The AI can act immediately — no human approval needed. Workers set the rules; AI operates within them.',
    who: 'Decision maker: AI system, within pre-approved bounds',
  },
  tac: {
    badge: 'Tier 2 · Tactical',
    cssClass: 'router-result--tac',
    heading: 'AI recommends — leadership approves',
    reasoning: 'This decision has real consequences and time pressure, but it\'s within the scope of elected worker-leaders to handle. AI will analyze options and present a clear recommendation within hours. Leadership reviews and approves.',
    who: 'Decision maker: Elected leadership (ops committee, board)',
  },
  str: {
    badge: 'Tier 3 · Strategic',
    cssClass: 'router-result--str',
    heading: 'AI recommends — all workers vote',
    reasoning: 'This decision significantly affects the organization\'s direction or many workers\' daily lives. AI will model impacts and trade-offs across options. Then every worker-member votes — typically over a 2–4 week deliberation window.',
    who: 'Decision maker: All worker-members, majority vote',
  },
  con: {
    badge: 'Tier 4 · Constitutional',
    cssClass: 'router-result--con',
    heading: 'Workers only — AI excluded',
    reasoning: 'This touches the fundamental structure, values, or rights of the cooperative. AI has no advisory role here. This is a purely human deliberation requiring a supermajority. These moments define who you are as an organization.',
    who: 'Decision maker: All worker-members, supermajority required',
  },
};

const EXAMPLE_QUERIES = [
  'Who should cover Saturday shifts?',
  'Our steel supplier just shut down',
  'Should we move to a four-day workweek?',
  'Change our profit-sharing model',
  'We need to reorder office supplies',
  'New market expansion proposal',
  'Emergency client deadline — need overtime',
  'Merger offer from another co-op',
];

const COMPARISON_ROWS = [
  { dimension: 'Who decides', torcUnion: 'Workers (via tier-appropriate governance)', ceoModel: 'Single executive, often without worker input' },
  { dimension: 'Speed (routine)', torcUnion: 'Seconds — AI acts autonomously on rules workers set', ceoModel: 'Dependent on executive availability and schedule' },
  { dimension: 'Speed (strategic)', torcUnion: '2–6 weeks with structured deliberation', ceoModel: 'Variable — can be rushed or delayed for political reasons' },
  { dimension: 'Transparency', torcUnion: 'Full — AI reasoning visible to all members', ceoModel: 'Often opaque — "executive judgment"' },
  { dimension: 'Accountability', torcUnion: 'Distributed — decisions traceable to tier process', ceoModel: 'Concentrated — hard to challenge after the fact' },
  { dimension: 'Worker influence', torcUnion: 'Structural — every tier has defined worker role', ceoModel: 'Informal at best — suggestion boxes, town halls' },
  { dimension: 'Cost of leadership', torcUnion: 'Fraction of CEO salary — shared across cooperative', ceoModel: 'Average S&P 500 CEO: $16.7M/year (EPI, 2023)' },
  { dimension: 'Reversibility', torcUnion: 'Constitutional tier decisions require supermajority to change — stable by design', ceoModel: 'New CEO can reverse prior strategy unilaterally' },
];

const FAQ_ITEMS = [
  {
    question: 'What stops workers from escalating everything to a full vote?',
    answer: 'The tier framework is deliberately structured with friction at higher tiers. Constitutional-level decisions require significant deliberation time and supermajority thresholds — which discourages unnecessary escalation. Most decisions are genuinely routine (Tier 1) or can be handled by elected leadership (Tier 2). Workers learn to trust the system because they designed the rules themselves.',
  },
  {
    question: 'Can the AI be wrong about which tier a decision belongs in?',
    answer: 'Yes — and that\'s by design. The routing logic is a starting point, not a verdict. Any worker can escalate a decision to a higher tier if they believe it deserves broader oversight. The system errs toward more worker involvement when ambiguous. The tier assignment is a recommendation, not a lock.',
  },
  {
    question: 'What happens when a decision is urgent and voting takes too long?',
    answer: 'Urgency is a factor in tier routing. Tier 2 (Tactical) is specifically designed for time-sensitive decisions — leadership can approve AI recommendations within hours. For true emergencies, elected leaders can act immediately and bring the decision to a retroactive vote. The framework has escape valves without bypassing accountability.',
  },
  {
    question: 'How do workers set the parameters for AI autonomous decisions?',
    answer: 'Through a cooperative rule-setting process run before the system goes live — and re-evaluated quarterly. Workers collectively decide what thresholds, limits, and criteria the AI must operate within. For example: "AI may reorder supplies when inventory drops below 20%, but only from approved vendors, and never over $5,000 per order." These rules are visible to all members.',
  },
  {
    question: 'Is the AI the same as a CEO? Doesn\'t it still hold power?',
    answer: 'No — and this distinction is central to what Torc Union does. A CEO holds discretionary authority and earns millions in compensation for exercising it. The Torc AI holds no authority — it executes rules workers set (Tier 1), makes recommendations workers approve (Tiers 2 and 3), and is entirely excluded from foundational decisions (Tier 4). The AI is a tool. Workers are the principals.',
  },
  {
    question: 'What if workers disagree with an AI recommendation?',
    answer: 'They reject it — and that\'s a valid outcome. At Tier 2, leadership can override any AI recommendation. At Tier 3, workers vote it down. The AI documents its reasoning transparently, which lets workers engage with the substance rather than just saying no. In practice, good AI recommendations get accepted; bad ones reveal where the AI\'s model doesn\'t match workers\' lived experience.',
  },
];

// ── UTILITY ──────────────────────────────────────────────────

function trackEvent(name, props) {
  try {
    if (window.posthog) window.posthog.capture(name, props);
    if (window.gtag)    window.gtag('event', name, props);
  } catch (_) {}
}

function routeDecision(input) {
  if (!input || input.trim().length < 3) return null;
  const lower = input.toLowerCase();
  const scores = { op: 0, tac: 0, str: 0, con: 0 };

  for (const rule of ROUTING_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        scores[rule.tier] += rule.weight;
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    // Default to tactical if truly ambiguous
    return 'tac';
  }
  return Object.keys(scores).find(k => scores[k] === maxScore);
}

// ── COMPONENTS ───────────────────────────────────────────────

function TierCard({ tier }) {
  const [expanded, setExpanded] = React.useState(false);

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    trackEvent('tier_card_toggled', { tier: tier.id, expanded: next });
  }

  function onKey(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  }

  return (
    <div
      className={`tier-card ${tier.cssClass}`}
      aria-expanded={expanded ? 'true' : 'false'}
      role="group"
      aria-label={`Tier ${tier.number}: ${tier.label}`}
    >
      <button
        className="tier-card__header"
        onClick={toggle}
        onKeyDown={onKey}
        aria-expanded={expanded}
        aria-controls={`tier-body-${tier.id}`}
        id={`tier-header-${tier.id}`}
      >
        <span className="tier-card__num" aria-hidden="true">{tier.number}</span>
        <span className="tier-card__meta">
          <span className="tier-card__label">{tier.label}</span>
          <span className="tier-card__tagline">{tier.tagline}</span>
        </span>
        <span className="tier-card__toggle" aria-hidden="true">▾</span>
      </button>

      {expanded && (
        <div
          className="tier-card__body"
          id={`tier-body-${tier.id}`}
          role="region"
          aria-labelledby={`tier-header-${tier.id}`}
        >
          <div>
            <p className="tier-card__detail-heading">Example decisions</p>
            <ul className="tier-card__examples">
              {tier.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tier-card__detail-heading">How it works</p>
            <div className="tier-card__specs">
              {tier.specs.map((spec, i) => (
                <div key={i} className="tier-card__spec">
                  <span className="tier-card__spec-key">{spec.key}</span>
                  <span className="tier-card__spec-val">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TierFlow() {
  return (
    <div className="tier-flow" role="list" aria-label="Governance tiers, from least to most oversight">
      {TIERS.map((tier, i) => (
        <React.Fragment key={tier.id}>
          <div role="listitem">
            <TierCard tier={tier} />
          </div>
          {i < TIERS.length - 1 && (
            <div className="tier-connector" aria-hidden="true">
              <div className="tier-connector__arrow"></div>
              <span className="tier-connector__label">escalate if needed</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function DecisionRouter() {
  const [query, setQuery] = React.useState('');
  const [result, setResult] = React.useState(null);
  const inputRef = React.useRef(null);

  function handleRoute() {
    const tier = routeDecision(query);
    if (!tier) return;
    setResult(tier);
    trackEvent('decision_routed', { query: query.slice(0, 80), result: tier });
  }

  function handleExample(ex) {
    setQuery(ex);
    const tier = routeDecision(ex);
    setResult(tier);
    trackEvent('decision_routed', { query: ex, result: tier, via: 'example_button' });
    if (inputRef.current) inputRef.current.focus();
  }

  function onKey(e) {
    if (e.key === 'Enter') handleRoute();
  }

  const resultData = result ? TIER_RESULT_DATA[result] : null;

  return (
    <div className="router-box">
      <div className="router-input-row">
        <label htmlFor="router-input" className="sr-only">Describe a company decision</label>
        <input
          ref={inputRef}
          id="router-input"
          type="text"
          className="router-input"
          placeholder="Describe a decision, e.g. "Should we open a second location?""
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKey}
          aria-label="Describe a company decision to route it to the correct governance tier"
        />
        <button className="router-btn" onClick={handleRoute} aria-label="Route this decision">
          Route it →
        </button>
      </div>

      <div className="router-examples" role="group" aria-label="Example decisions to try">
        {EXAMPLE_QUERIES.map((ex, i) => (
          <button
            key={i}
            className="router-example-btn"
            onClick={() => handleExample(ex)}
            aria-label={`Try example: ${ex}`}
          >
            {ex}
          </button>
        ))}
      </div>

      {resultData && (
        <div
          className={`router-result ${resultData.cssClass}`}
          role="region"
          aria-live="polite"
          aria-label="Routing result"
        >
          <span className="router-result__tier-badge">{resultData.badge}</span>
          <p className="router-result__heading">{resultData.heading}</p>
          <p className="router-result__reasoning">{resultData.reasoning}</p>
          <p className="router-result__who">{resultData.who}</p>
        </div>
      )}
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="gov-comparison-wrap">
      <table className="gov-comparison-table">
        <caption className="sr-only">AI governance vs traditional CEO model comparison</caption>
        <thead>
          <tr>
            <th scope="col">Dimension</th>
            <th scope="col">Torc Union (4-Tier AI Governance)</th>
            <th scope="col">Traditional CEO Model</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row, i) => (
            <tr key={i}>
              <td>{row.dimension}</td>
              <td>{row.torcUnion}</td>
              <td>{row.ceoModel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQItem({ item, index }) {
  const [open, setOpen] = React.useState(false);

  function toggle() {
    const next = !open;
    setOpen(next);
    trackEvent('faq_toggled', { question_index: index, open: next });
  }

  return (
    <div
      className="faq-item"
      aria-expanded={open ? 'true' : 'false'}
    >
      <button
        className="faq-question"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        {item.question}
        <span className="faq-icon" aria-hidden="true">+</span>
      </button>
      {open && (
        <div
          className="faq-answer"
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
        >
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQAccordion() {
  return (
    <div className="faq-list" role="list" aria-label="Frequently asked questions">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} role="listitem">
          <FAQItem item={item} index={i} />
        </div>
      ))}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────

function GovernanceApp() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="gov-hero" aria-labelledby="gov-hero-heading">
        <div className="container">
          <div className="gov-hero__inner">
            <p className="gov-hero__label">The Four-Tier Framework</p>
            <h1 id="gov-hero-heading" className="gov-hero__heading">
              Every decision lands<br /><em>where it belongs</em>
            </h1>
            <p className="gov-hero__body">
              Not all decisions are equal. Scheduling a shift is not the same as changing profit-sharing. Torc Union routes each decision to the right level of oversight — so AI moves fast where speed matters, and workers hold absolute power where it counts.
            </p>
            <div className="gov-hero__actions">
              <a href="simulator.html" className="btn btn-calculate">
                See It in Action
                <svg className="btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#tier-flow" className="gov-hero__link">
                Explore the tiers ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIER FLOW ── */}
      <section className="section tier-flow-section" id="tier-flow" aria-labelledby="tier-flow-heading">
        <div className="container">
          <p className="section-label">Governance Tiers</p>
          <h2 id="tier-flow-heading" className="section-heading">
            Four tiers. One framework.
          </h2>
          <p className="body-text">
            Click any tier to see what kinds of decisions live there, who makes the call, and how fast it moves. The tiers escalate from routine AI autonomy to constitutional worker authority.
          </p>
          <TierFlow />
        </div>
      </section>

      {/* ── DECISION ROUTER ── */}
      <section className="section router-section" id="router" aria-labelledby="router-heading">
        <div className="container">
          <p className="section-label">Decision Router</p>
          <h2 id="router-heading" className="section-heading">
            Where does your decision belong?
          </h2>
          <p className="body-text">
            Describe a company decision and see which governance tier it falls under. Try the examples or type your own.
          </p>
          <DecisionRouter />
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="section comparison-section" id="comparison" aria-labelledby="comparison-heading">
        <div className="container">
          <p className="section-label">The Comparison</p>
          <h2 id="comparison-heading" className="section-heading">
            AI governance vs. the traditional CEO model
          </h2>
          <p className="body-text">
            Worker-owned AI governance isn't just different — it's structurally better at distributing power and keeping decisions accountable.
          </p>
          <ComparisonTable />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="container">
          <p className="section-label">Common Questions</p>
          <h2 id="faq-heading" className="section-heading">
            How it really works
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gov-cta-section" aria-labelledby="gov-cta-heading">
        <div className="container">
          <div className="gov-cta__inner">
            <h2 id="gov-cta-heading" className="gov-cta__heading">
              Ready to see governance in action?
            </h2>
            <p className="gov-cta__body">
              The AI Decision Simulator walks through five real company scenarios — from supply chain crises to constitutional worker votes. Watch each tier play out with full data.
            </p>
            <div className="gov-cta__actions">
              <a href="simulator.html" className="btn btn-calculate">
                Open the Simulator
                <svg className="btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/#join" className="btn btn-ghost">
                Join the Movement
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── MOUNT ──────────────────────────────────────────────────────

const govRoot = ReactDOM.createRoot(document.getElementById('governance-root'));
govRoot.render(<GovernanceApp />);
