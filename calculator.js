/* ============================================================
   TORC UNION — calculator.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollHeader();
    initInputFormatting();
    initCalculator();
    initSignupForm();
});

/* ═══════════════════════════════════════════════════════════
   NAV + HEADER
═══════════════════════════════════════════════════════════ */

function initNav() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function initScrollHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;pointer-events:none';
    document.body.prepend(sentinel);

    new IntersectionObserver(
        ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
        { threshold: 0, rootMargin: '-68px 0px 0px 0px' }
    ).observe(sentinel);
}

/* ═══════════════════════════════════════════════════════════
   INPUT FORMATTING  (live comma-insertion as user types)
═══════════════════════════════════════════════════════════ */

function initInputFormatting() {
    ['ceoPay', 'employees', 'userSalary'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('input', () => {
            const pos    = el.selectionStart;
            const oldLen = el.value.length;
            applyCommaFormat(el);
            const delta  = el.value.length - oldLen;
            el.setSelectionRange(pos + delta, pos + delta);
        });

        el.addEventListener('blur', () => applyCommaFormat(el));
    });
}

function applyCommaFormat(input) {
    const digits = input.value.replace(/\D/g, '');
    if (!digits) { input.value = ''; return; }
    const n = parseInt(digits, 10);
    if (!isNaN(n)) input.value = n.toLocaleString('en-US');
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */

function parseNumeric(val) {
    const n = parseFloat(String(val).replace(/[^\d.]/g, ''));
    return isNaN(n) ? null : n;
}

/* Dollar amount with commas, rounded to nearest dollar */
function $$(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
}

/* Plain number with commas */
function nn(n) {
    return Math.round(n).toLocaleString('en-US');
}

function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

/* ═══════════════════════════════════════════════════════════
   VALIDATION
═══════════════════════════════════════════════════════════ */

function validateAll(ceoPay, employees, salary) {
    /* Run all; don't short-circuit so all errors show at once */
    const a = validateField('ceoPay',     ceoPay,     v => v > 0);
    const b = validateField('employees',  employees,  v => v >= 1);
    const c = validateField('userSalary', salary,     v => v >= 0);
    return a && b && c;
}

function validateField(id, value, test) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    const valid = value !== null && test(value);

    input?.classList.toggle('is-error', !valid);
    input?.setAttribute('aria-invalid', String(!valid));
    if (error) error.hidden = valid;

    if (!valid) {
        input?.addEventListener('input', () => clearFieldError(id), { once: true });
    }
    return valid;
}

function clearFieldError(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    input?.classList.remove('is-error');
    input?.removeAttribute('aria-invalid');
    if (error) error.hidden = true;
}

/* ═══════════════════════════════════════════════════════════
   CORE CALCULATION
═══════════════════════════════════════════════════════════ */

function compute(ceoPay, employees, salary) {
    const perWorkerShare  = ceoPay / employees;
    const newSalary       = salary + perWorkerShare;
    const increase        = perWorkerShare;
    const monthlyIncrease = increase / 12;
    const weeklyIncrease  = increase / 52;
    /* Show how much goes to workers after AI covers the strategic role */
    const aiSavings       = Math.max(0, ceoPay - 100_000);

    return { ceoPay, employees, salary, perWorkerShare,
             newSalary, increase, monthlyIncrease, weeklyIncrease, aiSavings };
}

/* ═══════════════════════════════════════════════════════════
   RESULTS RENDERING
═══════════════════════════════════════════════════════════ */

function renderResults(r) {
    /* ── Input echo ─────────────────────────────────────── */
    setHTML('resCeoPay',        `<strong>${$$(r.ceoPay)}</strong>/year`);
    setHTML('resEmployees',     `<strong>${nn(r.employees)}</strong>`);
    setHTML('resCurrentSalary', `<strong>${$$(r.salary)}</strong>/year`);

    /* ── Main result ────────────────────────────────────── */
    setText('resNewSalary', $$(r.newSalary));
    setText('resGain',      `+${$$(r.increase)}`);
    setText('resMonthly',   $$(r.monthlyIncrease));
    setText('resWeekly',    $$(r.weeklyIncrease));

    /* ── AI savings callout ─────────────────────────────── */
    const aiEl = document.getElementById('resAISavings');
    if (aiEl) {
        if (r.aiSavings > 0) {
            aiEl.textContent = $$(r.aiSavings);
            aiEl.closest('.ai-callout')?.removeAttribute('hidden');
        } else {
            /* CEO makes less than $100k — hide the AI callout */
            aiEl.closest('.ai-callout')?.setAttribute('hidden', '');
        }
    }

    /* ── Personal impact examples ───────────────────────── */
    const list = document.getElementById('impactList');
    if (list) {
        list.innerHTML = buildImpactExamples(r.increase, r.monthlyIncrease, r.weeklyIncrease, r.salary)
            .map(text => `<li class="impact-item">
                <span class="impact-arrow" aria-hidden="true">→</span>
                <span>${text}</span>
            </li>`)
            .join('');
    }
}

/* ═══════════════════════════════════════════════════════════
   IMPACT EXAMPLES
   All dollar amounts are derived from the actual calculation —
   no generic placeholders.
═══════════════════════════════════════════════════════════ */

function buildImpactExamples(increase, monthly, weekly, currentSalary) {
    const yr = Math.round(increase);
    const mo = Math.round(monthly);
    const wk = Math.round(weekly);

    function bold(n) { return `<strong>${$$(n)}</strong>`; }
    function boldN(n) { return `<strong>${nn(n)}</strong>`; }

    /* Under $1k/year */
    if (yr < 1000) {
        return [
            `${bold(wk)} more every single week — groceries, gas, and actual breathing room`,
            `${bold(mo)} more per month — a real cushion against an unexpected car repair or medical bill`,
            `${bold(yr)} per year to start chipping away at high-interest debt`,
        ];
    }

    /* $1k – $5k/year */
    if (yr < 5000) {
        return [
            `${bold(wk)} more per week — that's the difference between making rent comfortably and not`,
            `${bold(mo)}/month to start clearing your highest-interest debt and stop losing ground`,
            `Build a ${bold(yr)} starter emergency fund in your first year`,
            `${bold(yr)} per year toward a first home down payment — ${bold(yr * 5)} in five years`,
        ];
    }

    /* $5k – $15k/year */
    if (yr < 15000) {
        const debtPayoff  = Math.min(yr, 10000);
        const downPayment = yr * 5;
        return [
            `Pay off ${bold(debtPayoff)} in credit card debt within the year — stop paying ${bold(Math.round(debtPayoff * 0.22))} in annual interest`,
            `${bold(mo)}/month toward a home down payment — ${bold(downPayment)} saved in five years`,
            `Cover a year of childcare costs out of your raise alone`,
            `Bank ${bold(yr)} this year as your first real emergency fund`,
        ];
    }

    /* $15k – $30k/year */
    if (yr < 30000) {
        const carBalance   = 20000;
        const monthsEarly  = Math.round(carBalance / mo);
        const emergencyFund = mo * 6;
        const collegeYr    = Math.min(yr, 22000);
        return [
            `Pay off a ${bold(carBalance)} car loan ${boldN(monthsEarly)} months early — and keep that payment as savings`,
            `Build a fully-funded ${bold(emergencyFund)} emergency cushion in just 6 months`,
            `Take that vacation you've been postponing — then still pocket ${bold(yr - 4000)} that year`,
            `Save ${bold(collegeYr)}/year for your kid's college — a full 529 contribution, fully funded`,
        ];
    }

    /* $30k+/year */
    const emergencyFund = Math.round((currentSalary / 12) * 6);
    const downPayment3yr = yr * 3;
    const over401k = Math.max(0, yr - 23000);
    return [
        `Wipe out ${bold(yr)} in student loans every year — cut payoff time in half`,
        `Save a ${bold(downPayment3yr)} house down payment in just 3 years`,
        `Build a 6-month emergency fund of ${bold(emergencyFund)} before the year is out`,
        `Max out your 401(k) at ${bold(23000)} and still have ${bold(over401k)} left over to invest`,
    ];
}

/* ═══════════════════════════════════════════════════════════
   CALCULATOR INIT  (form wiring, results reveal, recalculate)
═══════════════════════════════════════════════════════════ */

function initCalculator() {
    const form      = document.getElementById('calculatorForm');
    const panel     = document.getElementById('resultsPanel');
    const shareBtn  = document.getElementById('shareBtn');
    const recalcBtn = document.getElementById('recalcBtn');
    if (!form || !panel) return;

    let lastResult = null;

    /* ── Submit ─────────────────────────────────────────── */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const ceoPay    = parseNumeric(document.getElementById('ceoPay').value);
        const employees = parseNumeric(document.getElementById('employees').value);
        const salary    = parseNumeric(document.getElementById('userSalary').value);

        if (!validateAll(ceoPay, employees, salary)) return;

        lastResult = compute(ceoPay, employees, salary);
        renderResults(lastResult);

        /* Reveal results with animation */
        panel.hidden = false;

        /* Scroll smoothly to results after paint */
        requestAnimationFrame(() => {
            setTimeout(() => {
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 60);
        });
    });

    /* ── Share ──────────────────────────────────────────── */
    shareBtn?.addEventListener('click', () => {
        if (lastResult) doShare(lastResult, shareBtn);
    });

    /* ── Recalculate ────────────────────────────────────── */
    recalcBtn?.addEventListener('click', () => {
        panel.hidden = true;
        lastResult = null;
        requestAnimationFrame(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => document.getElementById('ceoPay')?.focus(), 400);
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   SHARE FUNCTIONALITY
═══════════════════════════════════════════════════════════ */

function doShare(r, btn) {
    const ceoDisplay = r.ceoPay >= 1_000_000
        ? `$${(r.ceoPay / 1_000_000).toFixed(1)}M`
        : $$(r.ceoPay);

    const shareText =
        `My CEO makes ${ceoDisplay} while I make ${$$(r.salary)}. ` +
        `If that CEO pay was distributed fairly, I'd make ${$$(r.increase)} more per year — ` +
        `that's ${$$(r.monthlyIncrease)} more every month. ` +
        `See what you could make: ${window.location.href}`;

    const originalHTML = btn.innerHTML;

    function showConfirm() {
        btn.innerHTML =
            `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style="width:18px;height:18px;flex-shrink:0">` +
            `<path d="M4 10l5 5 7-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>` +
            `</svg> Copied!`;
        btn.style.background = 'var(--green)';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    }

    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(shareText).then(showConfirm).catch(() => fallbackCopy(shareText, showConfirm));
    } else {
        fallbackCopy(shareText, showConfirm);
    }
}

function fallbackCopy(text, onSuccess) {
    const ta = Object.assign(document.createElement('textarea'), {
        value: text,
        style: 'position:fixed;left:-9999px;top:-9999px;opacity:0',
        readOnly: false,
        contentEditable: true,
    });
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        if (document.execCommand('copy')) onSuccess();
    } catch (_) { /* clipboard unavailable — silent fail */ }
    document.body.removeChild(ta);
}

/* ═══════════════════════════════════════════════════════════
   EMAIL SIGNUP
═══════════════════════════════════════════════════════════ */

function initSignupForm() {
    const form    = document.getElementById('signupForm');
    const input   = document.getElementById('signupEmail');
    const error   = document.getElementById('signup-error');
    const success = document.getElementById('signupSuccess');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = input.value.trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error.hidden = false;
            input.classList.add('is-error');
            input.setAttribute('aria-invalid', 'true');
            input.focus();
            return;
        }

        error.hidden = true;
        input.classList.remove('is-error');
        input.setAttribute('aria-invalid', 'false');
        success.hidden = false;
        form.querySelector('.signup-row').hidden = true;
        form.querySelector('.signup-privacy').hidden = true;

        /* TODO: wire to email service (Mailchimp, ConvertKit, etc.) */
        console.log('Signup:', email);
    });

    input.addEventListener('input', () => {
        if (!input.classList.contains('is-error')) return;
        error.hidden = true;
        input.classList.remove('is-error');
        input.removeAttribute('aria-invalid');
    });
}
