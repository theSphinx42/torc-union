// Torc Union — AI Decision Simulator

// ── TIER CONFIG ────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  OPERATIONAL: {
    label: 'Operational',
    number: 1,
    tagline: 'AI autonomous within worker-set parameters',
    color: '#2D7D4F',
    bg: 'rgba(45,125,79,0.10)',
    border: 'rgba(45,125,79,0.28)',
  },
  TACTICAL: {
    label: 'Tactical',
    number: 2,
    tagline: 'AI recommends — leadership approves',
    color: '#C8922A',
    bg: 'rgba(200,146,42,0.10)',
    border: 'rgba(200,146,42,0.30)',
  },
  STRATEGIC: {
    label: 'Strategic',
    number: 3,
    tagline: 'AI recommends — workers vote',
    color: '#0D1B3E',
    bg: 'rgba(13,27,62,0.08)',
    border: 'rgba(13,27,62,0.22)',
  },
  CONSTITUTIONAL: {
    label: 'Constitutional',
    number: 4,
    tagline: 'Workers only — AI has no role',
    color: '#DC2626',
    bg: 'rgba(220,38,38,0.08)',
    border: 'rgba(220,38,38,0.24)',
  },
};

const SENTIMENT_COLOR = {
  positive: 'var(--green)',
  negative: 'var(--red-data)',
  neutral:  'var(--charcoal)',
};

// ── SCENARIO DATA ──────────────────────────────────────────────────────────

const SCENARIOS = [

  // ── 1. Supply Chain Disruption — TACTICAL ─────────────────────────────
  {
    id: 'supply-chain',
    title: 'Supply Chain Disruption',
    company: 'Riverside Manufacturing',
    employees: 150,
    industry: 'Metal Fabrication',
    tier: 'TACTICAL',

    situation: {
      headline: 'Primary steel supplier shut down overnight by EPA violation',
      context: 'Riverside Manufacturing\'s main supplier was shut down by EPA regulators. An alternative must be secured within one week or customer deadlines are missed and contracts are lost.',
      stakes: '$180,000 in contracts at risk — plus potential layoffs if missed',
      urgency: 'HIGH',
      timeframe: '1-week deadline',
    },

    aiAnalysis: {
      process: [
        { step: 1, label: 'Market scan', detail: 'Scanned regional supplier databases and compliance records. Found 3 qualified alternatives in 4 hours.' },
        { step: 2, label: 'Financial analysis', detail: 'Compared cost, delivery terms, quality certifications, and order minimums for each option.' },
        { step: 3, label: 'Impact modeling', detail: 'Calculated effect on production schedule and worker hours for each supplier path.' },
        { step: 4, label: 'Tier routing', detail: 'Decision affects worker hours and quarterly finances. Routed to TACTICAL: production manager + engineering lead approval required.' },
      ],
      options: [
        {
          id: 'A',
          name: 'Premium Supplier',
          attrs: [
            { label: 'Cost vs. original', value: '+$12,000',           sentiment: 'negative' },
            { label: 'Delivery',          value: '3 days (fastest)',   sentiment: 'positive' },
            { label: 'Quality',           value: 'ISO 9001 certified', sentiment: 'positive' },
            { label: 'Worker hours',      value: 'No overtime needed', sentiment: 'positive' },
          ],
          pros: ['Highest quality — zero defects track record', 'No schedule disruption for workers'],
          cons: ['Reduces quarterly profit margin by 6%'],
          workerImpact: 'Normal schedule maintained. No overtime.',
          chosen: false,
        },
        {
          id: 'B',
          name: 'Budget Supplier',
          attrs: [
            { label: 'Cost vs. original', value: '-$8,000 savings',      sentiment: 'positive' },
            { label: 'Delivery',          value: '6 days (tight)',        sentiment: 'negative' },
            { label: 'Quality',           value: 'Meets specs, not ISO', sentiment: 'neutral'  },
            { label: 'Worker hours',      value: '5 hrs OT for 6 workers', sentiment: 'neutral' },
          ],
          pros: ['Saves $8,000 vs. original supplier', 'Workers earn overtime pay (~$450 each)'],
          cons: ['6-day delivery is tight for the deadline', 'Not ISO certified — minor quality risk'],
          workerImpact: '6 production workers earn ~$450 each in overtime pay.',
          chosen: true,
        },
        {
          id: 'C',
          name: 'Alternative Material',
          attrs: [
            { label: 'Cost',         value: 'Same as original',      sentiment: 'neutral'  },
            { label: 'Delivery',     value: '4 days',                sentiment: 'positive' },
            { label: 'Quality',      value: '316 vs. 304 stainless', sentiment: 'neutral'  },
            { label: 'Worker hours', value: '2–3 days R&D validation', sentiment: 'negative' },
          ],
          pros: ['Same cost as original', 'Potentially better material long-term'],
          cons: ['Engineering validation takes 2–3 days — too long', 'Unknown customer acceptance for different alloy'],
          workerImpact: 'Engineering team must validate compatibility before production can begin.',
          chosen: false,
        },
      ],
    },

    decisionProcess: {
      steps: [
        { actor: 'AI System',       action: 'Presents 3 supplier options to production manager and engineering lead with full financial and schedule analysis.',       duration: '4 hrs',  type: 'ai'    },
        { actor: 'Production Team', action: 'Workers who would do the overtime vote between Option A and B. Their work — their choice.',                               duration: '2 hrs',  type: 'vote'  },
        { actor: 'Engineering Lead',action: 'Evaluates Option C. Concludes 2–3 day validation is too tight for the 1-week deadline. Option C eliminated.',           duration: '3 hrs',  type: 'human' },
        { actor: 'Production Team', action: 'Vote result: 5 of 6 choose Option B. Workers need the overtime pay this month — bills are due.',                         duration: '1 hr',   type: 'vote'  },
        { actor: 'Leadership',      action: 'Approves Option B based on worker vote + net $8k financial benefit. Order placed immediately.',                           duration: '30 min', type: 'human' },
      ],
      voteResults: null,
      decision: {
        chosen: 'Option B — Budget Supplier',
        chosenBy: 'Production workers voted 5/6. Leadership approved.',
        rationale: 'Workers chose overtime pay over the no-OT Option A. Engineering ruled out Option C on timeline grounds. Leadership deferred to worker judgment on a decision directly affecting their hours and income.',
      },
    },

    outcome: {
      result: 'Crisis resolved in 18 hours. All customer deadlines met. Company saved $8,000. Workers chose to earn overtime.',
      timeToResolve: '18 hours',
      metrics: [
        { label: 'Time to resolve',    value: '18 hours',        change: 'positive' },
        { label: 'Contracts protected', value: '$180,000',       change: 'positive' },
        { label: 'Net cost savings',   value: '-$8,000',         change: 'positive' },
        { label: 'OT earned (each)',   value: '+$450',           change: 'positive' },
      ],
      workerImpact: '6 production workers earned an extra $450 each in overtime pay — and they chose this. No mandated cuts, no forced schedule changes.',
      keyInsight: 'AI found 3 vetted options in 4 hours vs. 1–2 weeks through a CEO\'s personal network. The decision was transparent and merit-based — no backroom deals, no golf buddy recommendations. Workers had real agency over a decision that directly affected their paychecks.',
    },

    ceoApproach: {
      action: 'CEO calls personal contacts — limited to whoever he knows. Chooses based on relationships, not analysis. Doesn\'t consult workers.',
      rationale: 'Relies on network over data. "I know a guy." No worker input — just mandates overtime or cost cuts.',
      timeline: '1–2 weeks',
      outcome: 'Misses the 1-week customer deadline. Loses $180,000 in contracts. Considers layoffs to cover the loss.',
      workerImpact: 'Overtime mandated without input. Or cuts made without consultation. Workers with the least power absorb the most damage.',
    },
  },

  // ── 2. Four-Day Workweek Request — STRATEGIC ──────────────────────────
  {
    id: 'four-day-workweek',
    title: 'Four-Day Workweek Request',
    company: 'Riverpoint Customer Service',
    employees: 85,
    industry: 'Customer Service',
    tier: 'STRATEGIC',

    situation: {
      headline: '12-person customer service team formally requests a 4-day workweek',
      context: 'The team cites burnout and deteriorating retention. Three people quit last quarter. Competitors are experimenting with flexible schedules — industry standard is still 5 days.',
      stakes: '$25,500 in turnover costs last quarter alone — and accelerating',
      urgency: 'MEDIUM',
      timeframe: '30-day decision window',
    },

    aiAnalysis: {
      process: [
        { step: 1, label: 'Financial modeling',  detail: 'True net cost: +$63k/year (1.5 FTE coverage), minus $17k prevented turnover (2 fewer quits). Real impact: $46k.' },
        { step: 2, label: 'Productivity research', detail: 'Peer studies show equivalent output on 4-day weeks. Microsoft Japan saw +40% productivity. 61% of pilots became permanent.' },
        { step: 3, label: 'Retention ROI',       detail: 'Replacing one worker: $8,500 in recruiting + training. 3 quits last quarter = $25,500 already spent. The "cost" math inverts.' },
        { step: 4, label: 'Coverage modeling',   detail: 'Staggered rotation (6 workers Mon–Thu, 6 workers Tue–Fri) eliminates any Friday coverage gap — no new full-time hires required.' },
      ],
      options: [
        {
          id: '1',
          name: 'Full Implementation',
          attrs: [
            { label: 'Annual cost impact', value: '-$63k profit',       sentiment: 'negative' },
            { label: 'Time to start',      value: '2 months',           sentiment: 'negative' },
            { label: 'Coverage',           value: '2 new part-timers',  sentiment: 'neutral'  },
            { label: 'Risk level',         value: 'Untested in-house',  sentiment: 'negative' },
          ],
          pros: ['Full immediate benefit for all 12 workers', 'Strongest retention signal to the team'],
          cons: ['Highest cost with zero in-company data to validate', '2-month delay while hiring'],
          workerImpact: 'All 12 on 4-day weeks — but not for 2 months.',
          chosen: false,
        },
        {
          id: '2',
          name: '6-Month Trial',
          attrs: [
            { label: 'Annual cost impact', value: '-$31k (trial period)', sentiment: 'neutral'  },
            { label: 'Time to start',      value: '30 days',             sentiment: 'positive' },
            { label: 'Coverage',           value: '6 volunteers first',  sentiment: 'positive' },
            { label: 'Risk level',         value: 'Low — fully reversible', sentiment: 'positive' },
          ],
          pros: ['Real in-company data before full commitment', 'Reversible if results disappoint', 'Starts in 30 days'],
          cons: ['Only 6 of 12 workers benefit during the trial'],
          workerImpact: '6 volunteers get 4-day weeks. Data drives permanent policy for all.',
          chosen: true,
        },
        {
          id: '3',
          name: 'Rotating Volunteer',
          attrs: [
            { label: 'Annual cost impact', value: 'Minimal',                  sentiment: 'positive' },
            { label: 'Time to start',      value: 'Immediate',                sentiment: 'positive' },
            { label: 'Coverage',           value: 'No new hires needed',      sentiment: 'positive' },
            { label: 'Risk level',         value: 'Scheduling complexity',    sentiment: 'negative' },
          ],
          pros: ['Zero cost', 'Immediate start'],
          cons: ['No consistent benefit for any individual', 'Complex rotating schedules every month'],
          workerImpact: 'No one gets a reliable 4-day schedule — the benefit is diluted.',
          chosen: false,
        },
      ],
    },

    decisionProcess: {
      steps: [
        { actor: 'AI System',          action: 'Hosts live Q&A with customer service team. Addresses coverage gaps, staggered rotations, reversal process, and full financial trade-offs.', duration: '2 hrs',  type: 'ai'   },
        { actor: 'Customer Svc Team',  action: 'Majority indicates preference for Option 2 (trial) — wants real data before full commitment. 1 member prefers 5-day week.',                duration: '2 hrs',  type: 'human' },
        { actor: 'Company-Wide Vote',  action: 'All 85 employees vote — the change affects company profit and culture, so everyone has a say.',                                            duration: '48 hrs', type: 'vote'  },
        { actor: 'AI System',          action: 'Creates 6-month trial plan with metrics: productivity, customer satisfaction scores, retention rates, and monthly review schedule.',       duration: '1 day',  type: 'ai'   },
      ],
      voteResults: {
        total: { yes: 78, total: 85, pct: 91 },
        breakdown: [
          { group: 'Customer Service Team', yes: 11, total: 12, pct: 92 },
          { group: 'Rest of Company',       yes: 67, total: 73, pct: 92 },
        ],
      },
      decision: {
        chosen: 'Option 2 — 6-Month Trial Period',
        chosenBy: '78 of 85 employees voted yes (91%)',
        rationale: 'Workers chose reversibility and data over an untested full commitment. 91% approval companywide gave a clear mandate — not just the team making the request.',
      },
    },

    outcome: {
      result: 'Trial launched. After 4 months: productivity up 12%, customer satisfaction up 8%, zero quits. Trial made permanent.',
      timeToResolve: '30 days to launch',
      metrics: [
        { label: 'Productivity gain',       value: '+12%',  change: 'positive' },
        { label: 'Customer satisfaction',   value: '+8%',   change: 'positive' },
        { label: 'Quits during trial',      value: '0',     change: 'positive' },
        { label: 'Vote approval',           value: '91%',   change: 'positive' },
      ],
      workerImpact: 'All 85 workers had a vote on a policy affecting their culture. The team got the workweek they needed — earned through data and democratic input, not executive mood.',
      keyInsight: 'AI analyzed feasibility objectively instead of gut-rejecting the request. Workers made an informed vote instead of being overruled. The data-driven trial eliminated the "we can\'t afford it" assumption that wasn\'t even true.',
    },

    ceoApproach: {
      action: '"No. We can\'t afford it." No analysis. No consultation with the team. Executive decision in 10 minutes.',
      rationale: 'Gut assumption it won\'t work. Fears setting a precedent. Never runs the turnover cost math.',
      timeline: 'Immediate rejection',
      outcome: 'Morale drops further. 2 more workers quit next quarter. Total new turnover cost: $42,000. Burnout accelerates.',
      workerImpact: 'Formal request ignored. No agency. No data. No vote. No transparency. Just "no."',
    },
  },

  // ── 3. Competitive Pricing Crisis — STRATEGIC ─────────────────────────
  {
    id: 'pricing-crisis',
    title: 'Competitive Pricing Crisis',
    company: 'Westlake Home Goods',
    employees: 210,
    industry: 'Online Retail',
    tier: 'STRATEGIC',

    situation: {
      headline: 'Major competitor drops prices 15% across the entire product line',
      context: 'A key competitor slashes prices. Modeling shows Westlake could lose 40% of revenue if customers switch. Leadership is considering layoffs and salary cuts. Workers don\'t know yet.',
      stakes: '$850,000/year revenue at risk — 40% of the company\'s total',
      urgency: 'HIGH',
      timeframe: '2 weeks to respond or lose market share permanently',
    },

    aiAnalysis: {
      process: [
        { step: 1, label: 'Competitive intelligence', detail: 'Competitor can afford 15% cut due to lower shipping costs + bulk purchasing. Not a better product — a structural cost advantage.' },
        { step: 2, label: 'Response modeling',        detail: 'Match prices: -$285k annual profit. Maintain prices: -$340k revenue. Alternative strategy: unknown upside.' },
        { step: 3, label: 'Customer behavior data',   detail: 'Research shows customers hate hidden shipping fees. Cart abandonment drops 23% with transparent all-in pricing.' },
        { step: 4, label: 'Open innovation call',     detail: 'AI broadcasts to all 210 employees: "Revenue at risk. Four paths. Submit your ideas." 126 workers respond in 72 hours.' },
      ],
      options: [
        {
          id: '1',
          name: 'Match Competitor Prices',
          attrs: [
            { label: 'Price change',    value: '-15% across line',     sentiment: 'negative' },
            { label: 'Profit impact',   value: '-$285k/year',          sentiment: 'negative' },
            { label: 'How to fund it',  value: '8% salary cuts',       sentiment: 'negative' },
            { label: 'Worker risk',     value: 'Pay cut for all 210',  sentiment: 'negative' },
          ],
          pros: ['Directly matches the competitive price threat'],
          cons: ['Requires 8% salary cuts for every single worker', 'Unsustainable long-term', 'Destroys morale immediately'],
          workerImpact: 'Every one of 210 workers takes an 8% pay cut to fund the price match.',
          chosen: false,
        },
        {
          id: '2',
          name: 'Maintain Prices',
          attrs: [
            { label: 'Revenue impact',  value: '-$340k estimated',  sentiment: 'negative' },
            { label: 'Customer risk',   value: '40% churn projected', sentiment: 'negative' },
            { label: 'How to fund gap', value: '18 layoffs',         sentiment: 'negative' },
            { label: 'Worker risk',     value: 'Significant layoffs', sentiment: 'negative' },
          ],
          pros: ['Preserves brand pricing integrity'],
          cons: ['40% customer churn projected', '18 workers lose their jobs to absorb the revenue gap'],
          workerImpact: '18 of 210 workers are laid off.',
          chosen: false,
        },
        {
          id: '3',
          name: 'Bundled Shipping Model',
          attrs: [
            { label: 'Product price',        value: 'Unchanged',                    sentiment: 'positive' },
            { label: 'Customer total cost',  value: '$4 cheaper than competitor',   sentiment: 'positive' },
            { label: 'Our margin',           value: 'Fully preserved',              sentiment: 'positive' },
            { label: 'Launch cost',          value: '$3,500 marketing campaign',    sentiment: 'neutral'  },
          ],
          pros: ['Customers pay less than competitor all-in', 'Margin fully preserved', 'No salary cuts, no layoffs', 'Unique transparent pricing position'],
          cons: ['1-week website update required', 'Requires new marketing messaging'],
          workerImpact: 'Zero cuts, zero layoffs. Shipping dept. employee receives $5,000 bonus for the idea.',
          chosen: true,
        },
      ],
      workerInput: {
        participation: '126 of 210 employees (60%) responded in 72 hours',
        responses: [
          { label: 'Reject salary cuts outright',           pct: 76 },
          { label: 'Prefer alternative strategy over cuts', pct: 89 },
          { label: 'Willing to do extra hours short-term',  pct: 31 },
        ],
      },
      innovation: {
        contributor: 'Shipping Dept. · 3-month new hire · 22 years old',
        idea: '"Why don\'t we bundle free shipping into the product price? The competitor charges shipping separately. We could advertise the \'true total cost\' and be CHEAPER than them even at a higher sticker price — and we make 18% margin on shipping anyway."',
        evaluation: [
          { label: 'Competitor (product + shipping)', value: '$100 + $12 = $112 total' },
          { label: 'Our bundled all-in price',        value: '$108 — $4 cheaper',      isHighlight: true },
          { label: 'Our margin preserved',            value: '32% product + 18% shipping' },
          { label: 'Marketing message',               value: '"Honest pricing. No hidden fees."' },
        ],
      },
    },

    decisionProcess: {
      steps: [
        { actor: 'AI System',      action: 'Broadcasts to all 210 employees: "Revenue at risk. Four paths forward. Which do YOU support? Submit your ideas." No executive filter.',   duration: '< 1 hr', type: 'ai'    },
        { actor: '126 Employees',  action: '60% of the company responds in 72 hours. 89% prefer finding an alternative strategy. New hire in shipping submits the bundled pricing idea.', duration: '72 hrs', type: 'vote'  },
        { actor: 'AI System',      action: 'Evaluates the bundled shipping model. Math confirms: customers save $4 vs. competitor all-in. Our margin is fully preserved.',             duration: '2 hrs',  type: 'ai'    },
        { actor: 'Marketing Team', action: 'Validates customer psychology research: 23% cart abandonment is linked to hidden shipping fees. Campaign concept approved.',               duration: '1 day',  type: 'human' },
        { actor: 'Company Vote',   action: '164 of 210 employees vote yes for the bundled model. 78% approval. Implementation authorized.',                                            duration: '48 hrs', type: 'vote'  },
      ],
      voteResults: {
        total: { yes: 164, total: 210, pct: 78 },
        breakdown: [],
      },
      decision: {
        chosen: 'Option 3 — Bundled Shipping Model',
        chosenBy: '164 of 210 employees voted yes (78%)',
        rationale: 'Workers overwhelmingly rejected salary cuts. The winning idea came from a 3-month employee — surfaced only because AI broadcast the problem to everyone instead of filtering it through management.',
      },
    },

    outcome: {
      result: 'Bundled model launched in 9 days. Company gains 12% market share. Revenue up $102,000 next quarter — instead of down $850k.',
      timeToResolve: '9 days to launch',
      metrics: [
        { label: 'Market share gained',    value: '+12%',      change: 'positive' },
        { label: 'Revenue next quarter',   value: '+$102,000', change: 'positive' },
        { label: 'Layoffs',                value: '0',         change: 'positive' },
        { label: 'Salary cuts',            value: 'None',      change: 'positive' },
      ],
      workerImpact: 'Zero cuts. Zero layoffs. The shipping department employee was promoted and received a $5,000 bonus for the idea that saved the company.',
      keyInsight: 'AI democratized strategic input — the winning idea came from a 22-year-old with 3 months on the job. No CEO could collect and process company-wide ideas in 72 hours. Workers rejected the cuts, surfaced the solution, and voted it in. The newest employee beat the competitor.',
    },

    ceoApproach: {
      action: 'CEO mandates 8% salary cuts across the board. Shipping department employee\'s idea never reaches the executive level.',
      rationale: 'Cutting costs is the default reflex. "Decisive action" means pain flows downward.',
      timeline: '1-week decision',
      outcome: 'Morale destroyed. Best performers quit first — they see the writing on the wall. Competitor wins the market.',
      workerImpact: 'Salary cuts hit lowest-paid workers hardest. The person who had the solution never got to speak.',
    },
  },

  // ── 4. Profit-Sharing Model Change — CONSTITUTIONAL ──────────────────
  {
    id: 'profit-sharing',
    title: 'Profit-Sharing Model Change',
    company: 'Clearwater Software',
    employees: 45,
    industry: 'SaaS / Software',
    tier: 'CONSTITUTIONAL',

    situation: {
      headline: 'Senior engineer proposes switching profit-sharing from annual tenure-based to quarterly contribution-based distributions',
      context: 'Clearwater Software distributes 15% of annual profit to all 45 workers based on tenure. A senior engineer proposes switching to quarterly payouts based on contribution metrics. Newer employees — most hired in the last 18 months — strongly support it. Longer-tenured workers are divided. This touches the most fundamental governance question: who decides how profits are shared, and by what rules?',
      stakes: 'How the company\'s profits are distributed — and who has the right to set the rules',
      urgency: 'LOW',
      timeframe: '60-day constitutional review process',
    },

    aiAnalysis: null,

    decisionProcess: {
      steps: [
        { actor: 'Senior Engineer',    action: 'Formally submits amendment proposal in writing. Governance bylaws require 30-day notice and written proposal before any constitutional vote.', duration: 'Day 1',    type: 'human' },
        { actor: 'Finance Committee',  action: 'Worker-elected sub-committee models both systems using 3 years of historical payroll data: who would have earned what under each model.', duration: 'Days 2–14',  type: 'human' },
        { actor: 'All 45 Workers',     action: 'Town Hall #1: Both sides make their case. Tenure workers: "Loyalty deserves recognition." Newer workers: "My contributions this quarter should matter now."', duration: 'Day 21',   type: 'human' },
        { actor: 'All 45 Workers',     action: 'Town Hall #2: A worker introduces a hybrid amendment — quarterly payouts, 60% contribution metrics + 40% tenure. The framing shifts. Both sides see themselves in it.', duration: 'Day 35',   type: 'human' },
        { actor: 'All 45 Workers',     action: 'Binding vote on the hybrid amendment. Constitutional changes require 66% supermajority. Result: 34 of 45 vote yes (76%).', duration: 'Day 60',   type: 'vote'  },
      ],
      voteResults: {
        total: { yes: 34, total: 45, pct: 76 },
        breakdown: [],
      },
      decision: {
        chosen: 'Hybrid Model — Quarterly, 60% Contribution + 40% Tenure',
        chosenBy: '34 of 45 workers voted yes (76% — exceeds 66% supermajority)',
        rationale: 'Neither the original proposal nor the status quo survived full deliberation. The hybrid emerged from Town Hall #2 — not from AI or management, but from a worker who saw a way to honor both loyalty and recent contribution.',
      },
    },

    outcome: {
      result: 'Hybrid profit-sharing model adopted. Newer workers earn meaningful quarterly distributions immediately. Tenured workers retain recognition for loyalty. First payout under the new model reflects both.',
      timeToResolve: '60-day deliberation',
      metrics: [
        { label: 'Vote result',            value: '76% yes',          change: 'positive' },
        { label: 'Supermajority threshold', value: '66% — passed',    change: 'positive' },
        { label: 'Worker participation',   value: '45 of 45 (100%)',  change: 'positive' },
        { label: 'AI involvement',         value: 'None — by design', change: 'neutral'  },
      ],
      workerImpact: 'Newer workers gain meaningful quarterly profit participation starting next payout. Tenured workers retain 40% tenure weighting — their loyalty is still honored in every distribution. 100% of workers voted. 100% were heard.',
      keyInsight: 'The deliberative process produced a better outcome than either starting position. No algorithm found the hybrid model — a worker did, through open debate. Constitutional tier is slow by design: the deliberation IS the governance. Workers hold absolute authority over how they\'re compensated — and over the AI system that serves them.',
    },

    ceoApproach: {
      action: 'CEO either refuses to change the model ("tenure rewards loyalty, end of discussion") or changes it unilaterally based on what benefits the executive team and their preferred optics.',
      rationale: '"I decide how the money is distributed." Top-down authority. No deliberation. No vote.',
      timeline: '1 meeting',
      outcome: 'Either the status quo is locked in with no worker voice, or a change is imposed without buy-in. Either way, the division between old and new workers festers. No hybrid is ever discovered.',
      workerImpact: 'Newer workers stay locked out. Or older workers feel blindsided. No one votes. The best solution — the one that honors both sides — never emerges because no one had the chance to find it.',
    },
  },

  // ── 5. Automated Shift Scheduling — OPERATIONAL (stub) ────────────────
  {
    id: 'operational-scheduling',
    title: 'Automated Shift Scheduling',
    company: 'Clearwater Logistics Co-op',
    employees: 340,
    industry: 'Logistics',
    tier: 'OPERATIONAL',

    situation: {
      headline: '[Coming soon — Operational tier scenario]',
      context: 'AI manages daily shift scheduling autonomously within worker-set parameters: max hours, preferred shifts, overtime caps. Workers set the rules quarterly — AI executes them.',
      stakes: 'Daily operations for 340 workers',
      urgency: 'LOW',
      timeframe: 'Ongoing',
    },

    aiAnalysis: {
      process: [],
      options: [],
    },

    decisionProcess: {
      steps: [
        { actor: 'AI System', action: '[Scenario content coming soon]', duration: '', type: 'ai' },
      ],
      voteResults: null,
      decision: null,
    },

    outcome: {
      result: '[Coming soon]',
      metrics: [],
      workerImpact: '',
      keyInsight: '',
    },

    ceoApproach: {
      action: '[Coming soon]',
      rationale: '',
      timeline: '',
      outcome: '[Coming soon]',
      workerImpact: '',
    },
  },
];

// ── COMPONENTS ─────────────────────────────────────────────────────────────

function TierBadge({ tier }) {
  const cfg = TIER_CONFIG[tier];
  return (
    <div className="tier-badge" style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}>
      <span className="tier-badge__dot" style={{ background: cfg.color }} aria-hidden="true" />
      <span className="tier-badge__tier">Tier {cfg.number}: {cfg.label}</span>
      <span className="tier-badge__sep" aria-hidden="true">·</span>
      <span className="tier-badge__tagline">{cfg.tagline}</span>
    </div>
  );
}

function SituationPanel({ situation }) {
  const urgencyColor = situation.urgency === 'HIGH' ? 'var(--red)' : situation.urgency === 'MEDIUM' ? 'var(--gold-light)' : 'var(--green-light)';
  return (
    <div className="sim-panel sim-panel--situation">
      <div className="sim-panel__label">The Situation</div>
      <h2 className="sim-panel__headline">{situation.headline}</h2>
      <p className="sim-panel__context">{situation.context}</p>
      <div className="situation-footer">
        {situation.stakes && <div className="stakes-badge">{situation.stakes}</div>}
        <div className="situation-meta">
          <span className="situation-meta__urgency" style={{ color: urgencyColor }}>{situation.urgency} urgency</span>
          {situation.timeframe && <span className="situation-meta__time">{situation.timeframe}</span>}
        </div>
      </div>
    </div>
  );
}

function AIProcessSteps({ steps }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="ai-process-steps">
      <div className="ai-process-steps__heading">How the AI analyzed this</div>
      {steps.map(({ step, label, detail }) => (
        <div key={step} className="ai-process-step">
          <div className="ai-process-step__num" aria-hidden="true">{step}</div>
          <div className="ai-process-step__body">
            <span className="ai-process-step__label">{label}</span>
            <span className="ai-process-step__detail">{detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function OptionCard({ option }) {
  return (
    <div className={`option-card${option.chosen ? ' option-card--chosen' : ''}`}>
      <div className="option-card__header">
        <div className="option-card__id-name">
          <span className="option-card__letter" aria-hidden="true">{option.id}</span>
          <span className="option-card__name">{option.name}</span>
        </div>
        {option.chosen && <span className="option-card__chosen-badge">Chosen</span>}
      </div>

      <div className="option-card__attrs">
        {option.attrs.map((attr, i) => (
          <div key={i} className="option-card__attr">
            <span className="option-card__attr-label">{attr.label}</span>
            <span className="option-card__attr-value" style={{ color: SENTIMENT_COLOR[attr.sentiment] }}>{attr.value}</span>
          </div>
        ))}
      </div>

      <div className="option-card__pros-cons">
        {option.pros.length > 0 && (
          <ul className="option-card__list option-card__list--pros" aria-label="Advantages">
            {option.pros.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        )}
        {option.cons.length > 0 && (
          <ul className="option-card__list option-card__list--cons" aria-label="Disadvantages">
            {option.cons.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        )}
      </div>

      {option.workerImpact && (
        <div className="option-card__worker">
          <span className="option-card__worker-label">Worker impact</span>
          <span className="option-card__worker-text">{option.workerImpact}</span>
        </div>
      )}
    </div>
  );
}

function OptionsGrid({ options }) {
  if (!options || options.length === 0) return null;
  return (
    <div className="options-section">
      <div className="options-section__heading">Options Presented to Decision-Makers</div>
      <div className="options-grid">
        {options.map(opt => <OptionCard key={opt.id} option={opt} />)}
      </div>
    </div>
  );
}

function WorkerInputPanel({ workerInput }) {
  return (
    <div className="worker-input-panel">
      <div className="worker-input-panel__header">
        <span className="worker-input-panel__label">Worker input gathered</span>
        <span className="worker-input-panel__participation">{workerInput.participation}</span>
      </div>
      <div className="worker-responses">
        {workerInput.responses.map((r, i) => (
          <div key={i} className="worker-response">
            <div className="worker-response__pct">{r.pct}%</div>
            <div className="worker-response__bar-wrap" aria-label={`${r.pct}% — ${r.label}`}>
              <div className="worker-response__bar" style={{ width: `${r.pct}%` }} />
            </div>
            <div className="worker-response__label">{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InnovationCallout({ innovation }) {
  return (
    <div className="innovation-callout">
      <div className="innovation-callout__eyebrow">Worker idea that changed everything</div>
      <div className="innovation-callout__contributor">{innovation.contributor}</div>
      <blockquote className="innovation-callout__quote">{innovation.idea}</blockquote>
      <div className="innovation-callout__eval">
        <div className="innovation-callout__eval-heading">AI Evaluation</div>
        {innovation.evaluation.map((row, i) => (
          <div key={i} className={`innovation-callout__eval-row${row.isHighlight ? ' innovation-callout__eval-row--highlight' : ''}`}>
            <span className="innovation-callout__eval-key">{row.label}</span>
            <span className="innovation-callout__eval-val">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIAnalysisPanel({ analysis }) {
  if (!analysis) {
    return (
      <div className="sim-panel sim-panel--no-ai">
        <div className="sim-panel__label">AI Analysis</div>
        <p className="no-ai-message">
          <strong>AI has no role in Constitutional decisions.</strong> When workers deliberate about AI's own scope and powers, the AI is excluded entirely. This is the fundamental safeguard — humans always control the machine.
        </p>
      </div>
    );
  }
  const hasProcess = analysis.process && analysis.process.length > 0;
  const hasOptions = analysis.options && analysis.options.length > 0;
  if (!hasProcess && !hasOptions) {
    return (
      <div className="sim-panel sim-panel--analysis">
        <div className="sim-panel__label">AI Analysis</div>
        <p className="sim-panel__context">Scenario content coming soon.</p>
      </div>
    );
  }
  return (
    <div className="sim-panel sim-panel--analysis">
      <div className="sim-panel__label">AI Analysis</div>
      {hasProcess && <AIProcessSteps steps={analysis.process} />}
      {hasOptions  && <OptionsGrid options={analysis.options} />}
      {analysis.workerInput  && <WorkerInputPanel workerInput={analysis.workerInput} />}
      {analysis.innovation   && <InnovationCallout innovation={analysis.innovation} />}
    </div>
  );
}

function VoteResults({ voteResults }) {
  if (!voteResults) return null;
  return (
    <div className="vote-results">
      <div className="vote-results__label">Vote Results</div>
      {voteResults.breakdown.map((grp, i) => (
        <div key={i} className="vote-bar-row">
          <span className="vote-bar-row__group">{grp.group}</span>
          <div className="vote-bar-row__track" aria-label={`${grp.pct}% yes`}>
            <div className="vote-bar-row__fill" style={{ width: `${grp.pct}%` }} />
          </div>
          <span className="vote-bar-row__stat">{grp.pct}% <span className="vote-bar-row__count">({grp.yes}/{grp.total})</span></span>
        </div>
      ))}
      <div className="vote-results__total">
        <strong>{voteResults.total.pct}% voted yes</strong> — {voteResults.total.yes} of {voteResults.total.total} workers
      </div>
    </div>
  );
}

function ProcessStep({ step, isLast }) {
  return (
    <div className={`process-step process-step--${step.type}`}>
      <div className="process-step__dot" aria-hidden="true" />
      {!isLast && <div className="process-step__connector" aria-hidden="true" />}
      <div className="process-step__content">
        <div className="process-step__actor">{step.actor}</div>
        <div className="process-step__action">{step.action}</div>
        {step.duration && <div className="process-step__duration">{step.duration}</div>}
      </div>
    </div>
  );
}

function DecisionResult({ decision }) {
  return (
    <div className="decision-result">
      <div className="decision-result__chosen">{decision.chosen}</div>
      <div className="decision-result__by">Decided by: {decision.chosenBy}</div>
      <p className="decision-result__rationale">{decision.rationale}</p>
    </div>
  );
}

function DecisionProcessPanel({ process }) {
  return (
    <div className="sim-panel sim-panel--process">
      <div className="sim-panel__label">Decision Process</div>
      <div className="process-timeline">
        {process.steps.map((step, i) => (
          <ProcessStep key={i} step={step} isLast={i === process.steps.length - 1} />
        ))}
      </div>
      {process.voteResults && <VoteResults voteResults={process.voteResults} />}
      {process.decision    && <DecisionResult decision={process.decision} />}
    </div>
  );
}

function MetricChip({ label, value, change }) {
  return (
    <div className="metric-chip">
      <span className="metric-chip__value" style={{ color: SENTIMENT_COLOR[change] || SENTIMENT_COLOR.neutral }}>{value}</span>
      <span className="metric-chip__label">{label}</span>
    </div>
  );
}

function OutcomePanel({ outcome }) {
  return (
    <div className="sim-panel sim-panel--outcome">
      <div className="sim-panel__label">Outcome</div>
      {outcome.timeToResolve && (
        <div className="time-to-resolve">Resolved in <strong>{outcome.timeToResolve}</strong></div>
      )}
      <p className="outcome-result">{outcome.result}</p>
      {outcome.metrics.length > 0 && (
        <div className="metrics-grid">
          {outcome.metrics.map((m, i) => <MetricChip key={i} {...m} />)}
        </div>
      )}
      {outcome.workerImpact && (
        <div className="outcome-worker-impact">
          <span className="outcome-worker-impact__label">Worker Impact</span>
          <p className="outcome-worker-impact__text">{outcome.workerImpact}</p>
        </div>
      )}
      {outcome.keyInsight && (
        <div className="key-insight">
          <span className="key-insight__label">Key Insight</span>
          <p className="key-insight__text">{outcome.keyInsight}</p>
        </div>
      )}
    </div>
  );
}

function ComparisonView({ scenario }) {
  const { outcome, ceoApproach } = scenario;
  return (
    <div className="comparison-view" role="region" aria-label="AI governance vs traditional CEO comparison">
      <div className="comparison-view__header">
        <h3 className="comparison-view__title">What would a traditional CEO do instead?</h3>
      </div>
      <div className="comparison-grid">
        <div className="comparison-card comparison-card--ai">
          <div className="comparison-card__label">Torc AI Governance</div>
          {outcome.timeToResolve && (
            <span className="comparison-card__timeline">Resolved: {outcome.timeToResolve}</span>
          )}
          <p className="comparison-card__body">{outcome.result}</p>
          {outcome.workerImpact && <p className="comparison-card__worker">{outcome.workerImpact}</p>}
        </div>
        <div className="comparison-card comparison-card--ceo">
          <div className="comparison-card__label">Traditional CEO</div>
          {ceoApproach.timeline && (
            <span className="comparison-card__timeline">{ceoApproach.timeline} to decide</span>
          )}
          <p className="comparison-card__body">{ceoApproach.action}</p>
          {ceoApproach.outcome && <p className="comparison-card__outcome-note">{ceoApproach.outcome}</p>}
          {ceoApproach.workerImpact && <p className="comparison-card__worker">{ceoApproach.workerImpact}</p>}
        </div>
      </div>
    </div>
  );
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────
// Wire to PostHog, GA4, or Plausible by setting window.posthog / window.gtag

function trackEvent(name, props) {
  try {
    if (window.posthog) window.posthog.capture(name, props);
    if (window.gtag)    window.gtag('event', name, props);
  } catch (_) {}
}

// ── SHARE BUTTON ───────────────────────────────────────────────────────────

function ShareButton({ scenario }) {
  const [status, setStatus] = React.useState('idle');

  function buildText() {
    const timing = scenario.outcome.timeToResolve && scenario.ceoApproach.timeline
      ? ` AI resolved it in ${scenario.outcome.timeToResolve} vs. ${scenario.ceoApproach.timeline} for a traditional CEO.`
      : '';
    return `See how AI governance handles "${scenario.title}" at ${scenario.company}.${timing} Worker-owned AI: better decisions, full transparency. ${window.location.href}`;
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildText())
      .then(() => { setStatus('copied'); setTimeout(() => setStatus('idle'), 2500); })
      .catch(() => { setStatus('error'); setTimeout(() => setStatus('idle'), 2500); });
    trackEvent('scenario_shared', { scenario: scenario.id, method: 'copy' });
  }

  function handleX() {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(buildText())}`, '_blank', 'noopener,noreferrer');
    trackEvent('scenario_shared', { scenario: scenario.id, method: 'x' });
  }

  const copyLabel = status === 'copied' ? '✓ Copied!' : status === 'error' ? 'Copy failed' : 'Copy link';

  return (
    <div className="share-row" aria-label="Share this scenario">
      <span className="share-row__label">Share</span>
      <button className="btn-share-copy" onClick={handleCopy} aria-live="polite">{copyLabel}</button>
      <button className="btn-share-x" onClick={handleX} aria-label="Share on X (Twitter)">Share on X</button>
    </div>
  );
}

function ScenarioTab({ scenario, isActive, onClick }) {
  const cfg = TIER_CONFIG[scenario.tier];
  return (
    <button
      className={`scenario-tab${isActive ? ' scenario-tab--active' : ''}`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      style={isActive ? { borderColor: cfg.color } : {}}
    >
      <span className="scenario-tab__tier" style={{ color: cfg.color }}>{cfg.label}</span>
      <span className="scenario-tab__title">{scenario.title}</span>
      <span className="scenario-tab__company">{scenario.company}</span>
    </button>
  );
}

const TIER_LEGEND_ITEMS = [
  { tier: 'OPERATIONAL',    desc: 'AI acts within worker-set parameters' },
  { tier: 'TACTICAL',       desc: 'Leadership approves AI recommendation' },
  { tier: 'STRATEGIC',      desc: 'All workers vote on AI recommendation' },
  { tier: 'CONSTITUTIONAL', desc: 'Workers only — AI fully excluded' },
];

function TierLegend() {
  return (
    <div className="tier-legend" aria-label="Governance tier reference">
      {TIER_LEGEND_ITEMS.map(({ tier, desc }) => {
        const cfg = TIER_CONFIG[tier];
        return (
          <div key={tier} className="tier-legend__item">
            <span className="tier-legend__dot" style={{ background: cfg.color }} aria-hidden="true" />
            <span className="tier-legend__name" style={{ color: cfg.color }}>{cfg.label}</span>
            <span className="tier-legend__desc">— {desc}</span>
          </div>
        );
      })}
    </div>
  );
}

function ScenarioDisplay({ scenario, showComparison, onToggleComparison }) {
  return (
    <div className="scenario-display">
      <TierBadge tier={scenario.tier} />
      <div className="scenario-panels">
        <SituationPanel situation={scenario.situation} />
        <AIAnalysisPanel analysis={scenario.aiAnalysis} />
        <DecisionProcessPanel process={scenario.decisionProcess} />
        <OutcomePanel outcome={scenario.outcome} />
      </div>

      <div className="comparison-toggle-wrap">
        <button
          className="btn-comparison-toggle"
          onClick={onToggleComparison}
          aria-expanded={showComparison}
          aria-controls="comparison-view"
        >
          {showComparison ? 'Hide' : 'Compare to'} traditional CEO approach
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" style={{ width: 16, height: 16, flexShrink: 0 }}>
            <path d={showComparison ? 'M5 12l5-5 5 5' : 'M5 8l5 5 5-5'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {showComparison && (
        <div id="comparison-view">
          <ComparisonView scenario={scenario} />
        </div>
      )}

      <div className="scenario-footer-row">
        <ShareButton scenario={scenario} />
      </div>

      <TierLegend />
    </div>
  );
}

function SimulatorApp() {
  const [activeScenario, setActiveScenario] = React.useState(0);
  const [showComparison, setShowComparison] = React.useState(false);
  const displayRef = React.useRef(null);

  const scenario = SCENARIOS[activeScenario];

  function handleScenarioChange(index) {
    setActiveScenario(index);
    setShowComparison(false);
    trackEvent('scenario_viewed', { scenario: SCENARIOS[index].id, tier: SCENARIOS[index].tier, index });
  }

  // Arrow-key navigation between scenario tabs
  React.useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowLeft'  && activeScenario > 0)                    { e.preventDefault(); handleScenarioChange(activeScenario - 1); }
      if (e.key === 'ArrowRight' && activeScenario < SCENARIOS.length - 1) { e.preventDefault(); handleScenarioChange(activeScenario + 1); }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeScenario]);

  // Scroll scenario display into view on change (only if it's below the fold)
  React.useEffect(() => {
    if (!displayRef.current) return;
    const rect = displayRef.current.getBoundingClientRect();
    if (rect.top < 0) displayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeScenario]);

  // Track comparison toggle
  function handleToggleComparison() {
    setShowComparison(prev => {
      if (!prev) trackEvent('comparison_opened', { scenario: scenario.id });
      return !prev;
    });
  }

  return (
    <>
      <section className="sim-hero" aria-labelledby="sim-heading">
        <div className="container">
          <div className="hero-badge">AI Decision Simulator</div>
          <h1 id="sim-heading" className="sim-hero__heading">
            Watch AI Governance <em className="text-gold">in Action</em>
          </h1>
          <p className="sim-hero__subhead">
            Five real-world scenarios. Four governance tiers. See exactly how worker-owned AI handles decisions that CEOs make behind closed doors — then compare the outcomes.
          </p>
        </div>
      </section>

      <section className="sim-main" aria-label="AI Decision Simulator tool">
        <div className="container">
          <div className="scenario-selector" role="tablist" aria-label="Select a governance scenario">
            {SCENARIOS.map((s, i) => (
              <ScenarioTab
                key={s.id}
                scenario={s}
                isActive={i === activeScenario}
                onClick={() => handleScenarioChange(i)}
              />
            ))}
          </div>
          <p className="kbd-hint" aria-hidden="true">
            Navigate with <kbd>←</kbd> <kbd>→</kbd> arrow keys
          </p>
          <div ref={displayRef}>
            <ScenarioDisplay
              scenario={scenario}
              showComparison={showComparison}
              onToggleComparison={handleToggleComparison}
            />
          </div>
        </div>
      </section>
    </>
  );
}

// ── MOUNT ──────────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('simulator-root'));
root.render(<SimulatorApp />);
