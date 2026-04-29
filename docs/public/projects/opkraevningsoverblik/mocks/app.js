/* ==========================================================================
   Opkraevningsoverblik — Mockup Data & Logic
   Pure vanilla JS, no dependencies (except Chart.js via CDN)
   ========================================================================== */

// -- Helpers ------------------------------------------------------------------

function formatDkk(amount) {
    return amount.toLocaleString('da-DK') + ' kr.';
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateLong(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
}

// -- Data ---------------------------------------------------------------------

const chargeTypes = {
    ejendomsskat:     { name: 'Ejendomsskat',     slug: 'ejendomsskat',     color: '#1565C0' },
    daginstitution:   { name: 'Daginstitution',   slug: 'daginstitution',   color: '#6A1B9A' },
    renovation:       { name: 'Renovation',       slug: 'renovation',       color: '#2E7D32' },
    rottebekaempelse: { name: 'Rottebekaempelse', slug: 'rottebekaempelse', color: '#D84315' },
    skorstensfejer:   { name: 'Skorstensfejer',   slug: 'skorstensfejer',   color: '#5D4037' },
};

// Mock BBR-takster (demo-niveauer baseret på offentligt tilgængelige satser 2025/2026)
const bbrRates = {
    rotte: {
        fast: 75,                // kr. pr. ejendom
        satsLav: 0.73,           // kr. pr. m² (0–250)
        satsHoej: 0.36,          // kr. pr. m² (>250)
        knaek: 250,              // m²
    },
    renovation: {
        grundgebyr: 1200,        // kr. pr. ejendom
        boligtypeTillaeg: {
            beboelse:  600,
            raekkehus: 400,
            lejlighed: 300,
            carport:   0,
            udhus:     0,
        },
    },
    skorsten: {
        prIldsted: 350,          // kr. pr. ildsted pr. år
    },
    ejendomsskat: {
        promille: 22.5,          // grundskyldspromille
    },
};

const bygningstyper = ['beboelse', 'raekkehus', 'lejlighed', 'carport', 'udhus'];

const statusConfig = {
    betalt:   { label: 'Betalt',   color: '#0B6E4F', bg: '#E8F5E9' },
    ubetalt:  { label: 'Ubetalt',  color: '#B8860B', bg: '#FFF8E1' },
    forfalden:{ label: 'Forfalden',color: '#C62828', bg: '#FFEBEE' },
    kommende: { label: 'Kommende', color: '#546E7A', bg: '#ECEFF1' },
};

const overallStatusConfig = {
    ok:       { label: 'Alt i orden',       desc: 'Alle opkraevninger er betalt',                color: '#0B6E4F', bg: '#E8F5E9', icon: '\u2713' },
    upcoming: { label: 'Kommende forfald',  desc: 'Du har opkraevninger der forfalder inden 30 dage', color: '#B8860B', bg: '#FFF8E1', icon: '\u23F1' },
    overdue:  { label: 'Udestaende',        desc: 'Du har ubetalte opkraevninger',               color: '#C62828', bg: '#FFEBEE', icon: '!' },
};

const users = {
    anders: {
        name: 'Anders Hansen',
        email: 'borger@aarhus.test',
        overallStatus: 'ok',
        bbr: {
            ejendomsnummer: '751-123456',
            adresse: 'Eksempelvej 12, 8000 Aarhus C',
            grundareal: 720,
            grundvaerdi: 1850000,
            bygninger: [
                { id: 1, type: 'beboelse', bebyggetAreal: 142, ildsteder: 1 },
                { id: 2, type: 'carport',  bebyggetAreal: 28,  ildsteder: 0 },
            ],
        },
        charges: [
            { id: 1, type: 'ejendomsskat',     amount: 12400, due: '2025-03-01', status: 'betalt',   period: 'Q1 2025', paidAt: '2025-03-01' },
            { id: 2, type: 'daginstitution',    amount: 3200,  due: '2025-02-01', status: 'betalt',   period: 'Feb 2025', paidAt: '2025-02-01' },
            { id: 3, type: 'renovation',        amount: 1850,  due: '2025-03-15', status: 'betalt',   period: 'Q1 2025', paidAt: '2025-03-15' },
            { id: 4, type: 'daginstitution',    amount: 3200,  due: '2025-03-01', status: 'betalt',   period: 'Mar 2025', paidAt: '2025-03-01' },
            { id: 5, type: 'rottebekaempelse',  amount: 500,   due: '2025-01-15', status: 'betalt',   period: 'Q1 2025', paidAt: '2025-01-15' },
            { id: 6, type: 'ejendomsskat',      amount: 12400, due: '2025-06-01', status: 'kommende', period: 'Q2 2025', paidAt: null },
            { id: 7, type: 'renovation',        amount: 1850,  due: '2025-06-15', status: 'kommende', period: 'Q2 2025', paidAt: null },
            { id: 8, type: 'rottebekaempelse',  amount: 500,   due: '2026-01-15', status: 'kommende', period: 'Q1 2026', paidAt: null },
            { id: 23, type: 'skorstensfejer',   amount: 350,   due: '2025-04-15', status: 'betalt',   period: '2025', paidAt: '2025-04-15' },
        ],
        history: [
            { year: 2021, charged: 48680, paid: 48680, arrears: 0 },
            { year: 2022, charged: 51890, paid: 50290, arrears: 1600 },
            { year: 2023, charged: 53600, paid: 53600, arrears: 0 },
            { year: 2024, charged: 55310, paid: 55310, arrears: 0 },
            { year: 2025, charged: 56720, paid: 56720, arrears: 0 },
        ],
    },
    maria: {
        name: 'Maria Jensen',
        email: 'borger2@aarhus.test',
        overallStatus: 'upcoming',
        bbr: {
            ejendomsnummer: '751-654321',
            adresse: 'Nørrevej 45B, 8210 Aarhus V',
            grundareal: 320,
            grundvaerdi: 1200000,
            bygninger: [
                { id: 1, type: 'raekkehus', bebyggetAreal: 95, ildsteder: 0 },
            ],
        },
        charges: [
            { id: 9,  type: 'ejendomsskat',     amount: 12400, due: '2025-03-01', status: 'betalt',  period: 'Q1 2025', paidAt: '2025-03-01' },
            { id: 10, type: 'daginstitution',    amount: 3200,  due: '2025-02-01', status: 'betalt',  period: 'Feb 2025', paidAt: '2025-02-01' },
            { id: 11, type: 'renovation',        amount: 1850,  due: '2025-03-15', status: 'betalt',  period: 'Q1 2025', paidAt: '2025-03-15' },
            { id: 12, type: 'rottebekaempelse',  amount: 500,   due: '2025-01-15', status: 'betalt',  period: 'Q1 2025', paidAt: '2025-01-15' },
            { id: 13, type: 'ejendomsskat',      amount: 12400, due: '2025-06-01', status: 'ubetalt', period: 'Q2 2025', paidAt: null },
            { id: 14, type: 'daginstitution',    amount: 3200,  due: '2025-06-15', status: 'ubetalt', period: 'Q2 2025', paidAt: null },
            { id: 15, type: 'rottebekaempelse',  amount: 500,   due: '2026-01-15', status: 'ubetalt', period: 'Q1 2026', paidAt: null },
        ],
        history: [
            { year: 2021, charged: 45480, paid: 45480, arrears: 0 },
            { year: 2022, charged: 47690, paid: 47690, arrears: 0 },
            { year: 2023, charged: 50300, paid: 50300, arrears: 0 },
            { year: 2024, charged: 51710, paid: 51710, arrears: 0 },
            { year: 2025, charged: 53900, paid: 38300, arrears: 15600 },
        ],
    },
    lars: {
        name: 'Lars Nielsen',
        email: 'borger3@aarhus.test',
        overallStatus: 'overdue',
        bbr: {
            ejendomsnummer: '751-789012',
            adresse: 'Søndergade 88, 8000 Aarhus C',
            grundareal: 1100,
            grundvaerdi: 2400000,
            bygninger: [
                { id: 1, type: 'beboelse', bebyggetAreal: 280, ildsteder: 2 },
                { id: 2, type: 'udhus',    bebyggetAreal: 40,  ildsteder: 0 },
            ],
        },
        charges: [
            { id: 16, type: 'ejendomsskat',     amount: 12400, due: '2025-03-01', status: 'betalt',    period: 'Q1 2025', paidAt: '2025-03-01' },
            { id: 17, type: 'daginstitution',    amount: 3200,  due: '2025-02-01', status: 'forfalden', period: 'Feb 2025', paidAt: null },
            { id: 18, type: 'renovation',        amount: 1850,  due: '2025-03-15', status: 'forfalden', period: 'Q1 2025', paidAt: null },
            { id: 19, type: 'rottebekaempelse',  amount: 500,   due: '2025-01-15', status: 'forfalden', period: 'Q1 2025', paidAt: null },
            { id: 20, type: 'ejendomsskat',      amount: 12400, due: '2025-06-01', status: 'ubetalt',  period: 'Q2 2025', paidAt: null },
            { id: 21, type: 'daginstitution',    amount: 3200,  due: '2025-06-15', status: 'kommende', period: 'Q2 2025', paidAt: null },
            { id: 22, type: 'rottebekaempelse',  amount: 500,   due: '2026-01-15', status: 'kommende', period: 'Q1 2026', paidAt: null },
            { id: 24, type: 'skorstensfejer',    amount: 700,   due: '2025-04-15', status: 'forfalden', period: '2025', paidAt: null },
        ],
        history: [
            { year: 2021, charged: 46980, paid: 44480, arrears: 2500 },
            { year: 2022, charged: 49390, paid: 46290, arrears: 3100 },
            { year: 2023, charged: 51200, paid: 51200, arrears: 0 },
            { year: 2024, charged: 52910, paid: 49810, arrears: 3100 },
            { year: 2025, charged: 54600, paid: 37200, arrears: 17400 },
        ],
    },
};

// -- Calculators (BBR-baserede beregninger) -----------------------------------

function bygningstypeLabel(t) {
    return ({
        beboelse:  'Beboelse',
        raekkehus: 'Rækkehus',
        lejlighed: 'Lejlighed',
        carport:   'Carport',
        udhus:     'Udhus / skur',
    })[t] || t;
}

function round2(n) {
    return Math.round(n * 100) / 100;
}

const calculators = {
    // Rottebekæmpelse: fast gebyr + sats pr. m² (knækket ved 250 m² pr. bygning)
    rottebekaempelse(bbr) {
        const r = bbrRates.rotte;
        const lines = [
            { label: 'Fast gebyr (pr. ejendom)', amount: r.fast },
        ];
        let total = r.fast;
        for (const b of bbr.bygninger) {
            const lavM2 = Math.min(b.bebyggetAreal, r.knaek);
            const hoejM2 = Math.max(0, b.bebyggetAreal - r.knaek);
            const lavBel = round2(lavM2 * r.satsLav);
            total += lavBel;
            lines.push({
                label: `${bygningstypeLabel(b.type)} — 0–${r.knaek} m²`,
                amount: lavBel,
                note: `${lavM2} m² × ${r.satsLav.toString().replace('.', ',')} kr.`,
            });
            if (hoejM2 > 0) {
                const hoejBel = round2(hoejM2 * r.satsHoej);
                total += hoejBel;
                lines.push({
                    label: `${bygningstypeLabel(b.type)} — over ${r.knaek} m²`,
                    amount: hoejBel,
                    note: `${hoejM2} m² × ${r.satsHoej.toString().replace('.', ',')} kr. (halveret sats)`,
                });
            }
        }
        return { total: round2(total), lines };
    },

    // Renovation: grundgebyr + tillæg pr. boligbygning
    renovation(bbr) {
        const r = bbrRates.renovation;
        const lines = [
            { label: 'Grundgebyr (pr. ejendom)', amount: r.grundgebyr },
        ];
        let total = r.grundgebyr;
        for (const b of bbr.bygninger) {
            const tillaeg = r.boligtypeTillaeg[b.type] || 0;
            if (tillaeg > 0) {
                total += tillaeg;
                lines.push({
                    label: `Tillæg — ${bygningstypeLabel(b.type)}`,
                    amount: tillaeg,
                });
            }
        }
        return { total, lines };
    },

    // Skorstensfejer: pr. ildsted
    skorstensfejer(bbr) {
        const r = bbrRates.skorsten;
        const lines = [];
        let total = 0;
        let antalIldsteder = 0;
        for (const b of bbr.bygninger) {
            antalIldsteder += b.ildsteder;
        }
        if (antalIldsteder === 0) {
            lines.push({ label: 'Ingen ildsteder registreret', amount: 0 });
            return { total: 0, lines };
        }
        total = antalIldsteder * r.prIldsted;
        lines.push({
            label: `${antalIldsteder} ildsted${antalIldsteder === 1 ? '' : 'er'}`,
            amount: total,
            note: `${antalIldsteder} × ${r.prIldsted} kr.`,
        });
        return { total, lines };
    },

    // Ejendomsskat (grundskyld): promille af grundværdi
    ejendomsskat(bbr) {
        const r = bbrRates.ejendomsskat;
        const total = round2(bbr.grundvaerdi * r.promille / 1000);
        return {
            total,
            lines: [
                {
                    label: 'Grundskyld',
                    amount: total,
                    note: `${bbr.grundvaerdi.toLocaleString('da-DK')} kr. × ${r.promille.toString().replace('.', ',')} ‰`,
                },
            ],
        };
    },
};

const calculatorOrder = [
    { key: 'rottebekaempelse', fn: 'rottebekaempelse', title: 'Rottebekæmpelse' },
    { key: 'renovation',       fn: 'renovation',       title: 'Renovation' },
    { key: 'skorstensfejer',   fn: 'skorstensfejer',   title: 'Skorstensfejer' },
    { key: 'ejendomsskat',     fn: 'ejendomsskat',     title: 'Ejendomsskat (grundskyld)' },
];

// -- State --------------------------------------------------------------------

let currentUser = null;
let currentFilter = 'alle';
let currentTab = 'oversigt';
let historyChart = null;
let bbrEdit = null;          // arbejdskopi af BBR-data for nuværende bruger (redigerbar)
let scrollToCalcKey = null;  // hvis sat, scroller Beregner-fanen til det kort efter render

// -- Rendering ----------------------------------------------------------------

function render() {
    const app = document.getElementById('app');
    if (!currentUser) {
        app.innerHTML = renderLogin();
        bindLogin();
    } else {
        app.innerHTML = renderDashboard();
        bindDashboard();
    }
}

function renderLogin() {
    return `
        <a href="#main-content" class="skip-link">Ga til indhold</a>
        <header class="header" role="banner">
            <div class="header__inner">
                <div class="header__logo" aria-hidden="true">A</div>
                <div class="header__text">
                    <div class="header__kommune">Aarhus Kommune</div>
                    <div class="header__title">Mine opkraevninger</div>
                </div>
            </div>
        </header>
        <main id="main-content" role="main" class="main">
            <div class="login">
                <div class="login__card">
                    <h1 class="login__title">Log ind</h1>
                    <p class="login__subtitle">Vaelg en testbruger for at se deres opkraevninger.</p>
                    <div class="login__form">
                        <div class="form-group">
                            <label for="user-select" class="form-label">Testbruger</label>
                            <select id="user-select" class="form-input">
                                <option value="anders">Anders Hansen — Alt i orden</option>
                                <option value="maria">Maria Jensen — Kommende forfald</option>
                                <option value="lars">Lars Nielsen — Udestaende</option>
                            </select>
                        </div>
                        <button type="button" id="login-btn" class="btn btn--primary btn--full">Log ind</button>
                    </div>
                    <div class="login__hint">
                        <details>
                            <summary>Om testbrugerne</summary>
                            <ul class="login__test-users">
                                <li><strong>Anders Hansen</strong> — Alle opkraevninger betalt</li>
                                <li><strong>Maria Jensen</strong> — Har kommende forfald</li>
                                <li><strong>Lars Nielsen</strong> — Har forfaldne opkraevninger</li>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer" role="contentinfo">
            <div class="footer__inner">
                <p>&copy; Aarhus Kommune — Opkraevningsoverblik (mockup)</p>
            </div>
        </footer>
    `;
}

function renderDashboard() {
    const user = users[currentUser];
    const status = overallStatusConfig[user.overallStatus];
    const outstanding = user.charges
        .filter(c => c.status === 'ubetalt' || c.status === 'forfalden')
        .reduce((sum, c) => sum + c.amount, 0);

    return `
        <a href="#main-content" class="skip-link">Ga til indhold</a>
        <header class="header" role="banner">
            <div class="header__inner">
                <div class="header__logo" aria-hidden="true">A</div>
                <div class="header__text">
                    <div class="header__kommune">Aarhus Kommune</div>
                    <div class="header__title">Mine opkraevninger</div>
                </div>
                <div class="header__user">
                    <span class="header__user-name">${user.name}</span>
                    <button class="header__logout" id="logout-btn">Log ud</button>
                </div>
            </div>
        </header>
        <main id="main-content" role="main" class="main">
            <div class="dashboard" id="dashboard-view">
                ${renderStatusBanner(status, outstanding)}
                <div class="tabs">
                    <div class="tabs__list" role="tablist" aria-label="Vaelg visning">
                        <button role="tab" id="tab-oversigt" aria-selected="${currentTab === 'oversigt'}" aria-controls="panel-oversigt"
                            class="tabs__tab ${currentTab === 'oversigt' ? 'tabs__tab--active' : ''}"
                            data-tab="oversigt" ${currentTab !== 'oversigt' ? 'tabindex="-1"' : ''}>Oversigt</button>
                        <button role="tab" id="tab-historik" aria-selected="${currentTab === 'historik'}" aria-controls="panel-historik"
                            class="tabs__tab ${currentTab === 'historik' ? 'tabs__tab--active' : ''}"
                            data-tab="historik" ${currentTab !== 'historik' ? 'tabindex="-1"' : ''}>Historik (5 ar)</button>
                        <button role="tab" id="tab-beregner" aria-selected="${currentTab === 'beregner'}" aria-controls="panel-beregner"
                            class="tabs__tab ${currentTab === 'beregner' ? 'tabs__tab--active' : ''}"
                            data-tab="beregner" ${currentTab !== 'beregner' ? 'tabindex="-1"' : ''}>Beregner</button>
                    </div>
                    <div role="tabpanel" id="panel-oversigt" aria-labelledby="tab-oversigt"
                        class="tabs__panel ${currentTab !== 'oversigt' ? 'tabs__panel--hidden' : ''}"
                        ${currentTab !== 'oversigt' ? 'hidden' : ''}>
                        ${renderFilterBar()}
                        ${renderChargeList()}
                    </div>
                    <div role="tabpanel" id="panel-historik" aria-labelledby="tab-historik"
                        class="tabs__panel ${currentTab !== 'historik' ? 'tabs__panel--hidden' : ''}"
                        ${currentTab !== 'historik' ? 'hidden' : ''}>
                        ${renderHistory()}
                    </div>
                    <div role="tabpanel" id="panel-beregner" aria-labelledby="tab-beregner"
                        class="tabs__panel ${currentTab !== 'beregner' ? 'tabs__panel--hidden' : ''}"
                        ${currentTab !== 'beregner' ? 'hidden' : ''}>
                        ${renderCalculatorTab()}
                    </div>
                </div>
            </div>
            <div id="detail-view" style="display:none;"></div>
        </main>
        <footer class="footer" role="contentinfo">
            <div class="footer__inner">
                <p>&copy; Aarhus Kommune — Opkraevningsoverblik (mockup)</p>
            </div>
        </footer>
    `;
}

function renderStatusBanner(status, outstanding) {
    return `
        <section class="status-banner" aria-label="Samlet status" role="status"
            style="background: ${status.bg}; border-color: ${status.color};">
            <div class="status-banner__icon" aria-hidden="true" style="background: ${status.color};">
                ${status.icon}
            </div>
            <div class="status-banner__content">
                <div class="status-banner__label" style="color: ${status.color};">${status.label}</div>
                <div class="status-banner__desc">${status.desc}</div>
            </div>
            ${outstanding > 0 ? `
                <div class="status-banner__amount">
                    <div class="status-banner__amount-label">Samlet udestaende</div>
                    <div class="status-banner__amount-value" style="color: ${status.color};">${formatDkk(outstanding)}</div>
                </div>
            ` : ''}
        </section>
    `;
}

function renderFilterBar() {
    const types = Object.values(chargeTypes);
    const allActive = currentFilter === 'alle';

    let html = '<div class="filter-bar" role="group" aria-label="Filtrer opkraevninger efter type">';
    html += `<button class="filter-bar__btn ${allActive ? 'filter-bar__btn--active' : ''}"
        data-filter="alle" ${allActive ? 'aria-current="true"' : ''}>Alle</button>`;

    for (const t of types) {
        const active = currentFilter === t.slug;
        const activeStyle = active ? `border-color: ${t.color}; background: ${t.color}; color: #fff;` : '';
        html += `<button class="filter-bar__btn ${active ? 'filter-bar__btn--active' : ''}"
            data-filter="${t.slug}" ${active ? 'aria-current="true"' : ''}
            style="${activeStyle}">${t.name}</button>`;
    }

    html += '</div>';
    return html;
}

function renderChargeList() {
    const user = users[currentUser];
    let charges = user.charges;
    if (currentFilter !== 'alle') {
        charges = charges.filter(c => c.type === currentFilter);
    }

    if (charges.length === 0) {
        return '<div class="charge-list"><div class="charge-list__empty"><p>Ingen opkraevninger fundet.</p></div></div>';
    }

    let html = '<div class="charge-list" aria-label="Opkraevninger">';
    for (const c of charges) {
        const type = chargeTypes[c.type];
        const badge = statusConfig[c.status];
        html += `
            <a class="charge-card" data-charge-id="${c.id}" style="border-left-color: ${type.color};">
                <div class="charge-card__info">
                    <div class="charge-card__type">${type.name}</div>
                    <div class="charge-card__meta">${c.period} &middot; Forfald: ${formatDate(c.due)}</div>
                </div>
                <div class="charge-card__amount">${formatDkk(c.amount)}</div>
                <span class="charge-badge" style="color: ${badge.color}; background: ${badge.bg};">${badge.label}</span>
            </a>
        `;
    }
    html += '</div>';
    return html;
}

function renderHistory() {
    const user = users[currentUser];
    const history = user.history;
    const arrearsEntries = history.filter(h => h.arrears > 0);

    let arrearsHtml;
    if (arrearsEntries.length === 0) {
        arrearsHtml = '<span class="history__no-arrears">Ingen restance i perioden</span>';
    } else {
        arrearsHtml = arrearsEntries.map(h => `
            <div class="arrears-badge">
                <span class="arrears-badge__year">${h.year}</span>
                <span class="arrears-badge__amount">Restance: ${formatDkk(h.arrears)}</span>
            </div>
        `).join('');
    }

    let tableRows = history.map(h => {
        const arrearsClass = h.arrears > 0 ? 'text-danger font-semibold' : 'text-success';
        const arrearsVal = h.arrears > 0 ? formatDkk(h.arrears) : '\u2014';
        return `
            <tr>
                <td class="font-medium">${h.year}</td>
                <td class="text-right">${formatDkk(h.charged)}</td>
                <td class="text-right">${formatDkk(h.paid)}</td>
                <td class="text-right ${arrearsClass}">${arrearsVal}</td>
            </tr>
        `;
    }).join('');

    return `
        <div class="history">
            <h2 class="history__title">Udvikling over 5 ar</h2>
            <p class="history__subtitle">Opkraevet vs. betalt belob pr. ar</p>
            <div class="history__chart" role="img" aria-label="Sojlediagram der viser opkraevet og betalt belob over de seneste 5 ar">
                <canvas id="history-chart"></canvas>
            </div>
            <div class="history__arrears">
                <h3 class="history__arrears-title">Perioder med restance</h3>
                <div class="history__arrears-list">${arrearsHtml}</div>
            </div>
            <details class="history__table-toggle">
                <summary>Vis som tabel (tilgaengeligt alternativ)</summary>
                <table class="history-table">
                    <caption class="sr-only">Betalingshistorik over de seneste 5 ar</caption>
                    <thead>
                        <tr>
                            <th scope="col">Ar</th>
                            <th scope="col" class="text-right">Opkraevet</th>
                            <th scope="col" class="text-right">Betalt</th>
                            <th scope="col" class="text-right">Restance</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </details>
        </div>
    `;
}

// -- Beregner-fane ------------------------------------------------------------

function cloneBbr(bbr) {
    return {
        ejendomsnummer: bbr.ejendomsnummer,
        adresse: bbr.adresse,
        grundareal: bbr.grundareal,
        grundvaerdi: bbr.grundvaerdi,
        bygninger: bbr.bygninger.map(b => ({ ...b })),
    };
}

function ensureBbrEdit() {
    if (!bbrEdit) {
        bbrEdit = cloneBbr(users[currentUser].bbr);
    }
    return bbrEdit;
}

function bbrFieldChanged(originalVal, currentVal) {
    return originalVal !== currentVal;
}

function renderBbrPanel() {
    const orig = users[currentUser].bbr;
    const edit = ensureBbrEdit();
    const grundChanged = bbrFieldChanged(orig.grundareal, edit.grundareal);
    const vaerdiChanged = bbrFieldChanged(orig.grundvaerdi, edit.grundvaerdi);

    let bygningerHtml = '';
    edit.bygninger.forEach((b, i) => {
        const o = orig.bygninger[i] || { type: '', bebyggetAreal: 0, ildsteder: 0 };
        const arealChanged = bbrFieldChanged(o.bebyggetAreal, b.bebyggetAreal);
        const ildChanged = bbrFieldChanged(o.ildsteder, b.ildsteder);
        const typeChanged = bbrFieldChanged(o.type, b.type);
        const typeOptions = bygningstyper.map(t =>
            `<option value="${t}" ${t === b.type ? 'selected' : ''}>${bygningstypeLabel(t)}</option>`
        ).join('');
        bygningerHtml += `
            <div class="bbr-bygning" data-bygning-index="${i}">
                <div class="bbr-bygning__header">
                    <span class="bbr-bygning__num">Bygning ${i + 1}</span>
                </div>
                <div class="bbr-field ${typeChanged ? 'bbr-field--changed' : ''}">
                    <label for="bygning-type-${i}">Type</label>
                    <select id="bygning-type-${i}" data-bbr-bygning-type="${i}">
                        ${typeOptions}
                    </select>
                    ${typeChanged ? `<button class="bbr-field__reset" data-bbr-reset-bygning="${i}" data-bbr-reset-field="type" title="Nulstil til BBR-værdi">↺</button>` : ''}
                </div>
                <div class="bbr-field ${arealChanged ? 'bbr-field--changed' : ''}">
                    <label for="bygning-areal-${i}">Bebygget areal (m²)</label>
                    <input type="number" min="0" step="1" id="bygning-areal-${i}" value="${b.bebyggetAreal}" data-bbr-bygning-areal="${i}">
                    ${arealChanged ? `<button class="bbr-field__reset" data-bbr-reset-bygning="${i}" data-bbr-reset-field="areal" title="Nulstil til BBR-værdi (${o.bebyggetAreal})">↺</button>` : ''}
                </div>
                <div class="bbr-field ${ildChanged ? 'bbr-field--changed' : ''}">
                    <label for="bygning-ild-${i}">Antal ildsteder</label>
                    <input type="number" min="0" step="1" id="bygning-ild-${i}" value="${b.ildsteder}" data-bbr-bygning-ild="${i}">
                    ${ildChanged ? `<button class="bbr-field__reset" data-bbr-reset-bygning="${i}" data-bbr-reset-field="ild" title="Nulstil til BBR-værdi (${o.ildsteder})">↺</button>` : ''}
                </div>
            </div>
        `;
    });

    return `
        <section class="bbr-panel" aria-labelledby="bbr-panel-title">
            <header class="bbr-panel__header">
                <div>
                    <h2 id="bbr-panel-title" class="bbr-panel__title">Ejendomsoplysninger</h2>
                    <div class="bbr-panel__meta">${edit.adresse} &middot; Ejendomsnr. ${edit.ejendomsnummer}</div>
                </div>
                <span class="bbr-badge" title="Data hentet fra Bygnings- og Boligregistret">Hentet fra BBR</span>
            </header>

            <div class="bbr-grid">
                <div class="bbr-field ${grundChanged ? 'bbr-field--changed' : ''}">
                    <label for="bbr-grundareal">Grundareal (m²)</label>
                    <input type="number" min="0" step="1" id="bbr-grundareal" value="${edit.grundareal}" data-bbr-grundareal>
                    ${grundChanged ? `<button class="bbr-field__reset" data-bbr-reset="grundareal" title="Nulstil til BBR-værdi (${orig.grundareal})">↺</button>` : ''}
                </div>
                <div class="bbr-field ${vaerdiChanged ? 'bbr-field--changed' : ''}">
                    <label for="bbr-grundvaerdi">Grundværdi (kr.)</label>
                    <input type="number" min="0" step="1000" id="bbr-grundvaerdi" value="${edit.grundvaerdi}" data-bbr-grundvaerdi>
                    ${vaerdiChanged ? `<button class="bbr-field__reset" data-bbr-reset="grundvaerdi" title="Nulstil til BBR-værdi (${orig.grundvaerdi.toLocaleString('da-DK')})">↺</button>` : ''}
                </div>
            </div>

            <h3 class="bbr-panel__subtitle">Bygninger</h3>
            <div class="bbr-bygninger">${bygningerHtml}</div>

            <div class="bbr-whatif">
                <span class="bbr-whatif__label">Hvad hvis:</span>
                <button type="button" class="bbr-chip" data-whatif="addCarport">+ Tilføj carport 30 m²</button>
                <button type="button" class="bbr-chip" data-whatif="addBraendeovn">+ Installer brændeovn</button>
                <button type="button" class="bbr-chip" data-whatif="udvidBolig">+ Udvid bolig 25 m²</button>
                <button type="button" class="bbr-chip bbr-chip--reset" data-whatif="resetAll">↺ Nulstil alt</button>
            </div>
        </section>
    `;
}

function renderCalculatorCards() {
    const orig = users[currentUser].bbr;
    const edit = ensureBbrEdit();

    let html = '<div class="calc-grid">';
    for (const c of calculatorOrder) {
        const type = chargeTypes[c.key];
        const result = calculators[c.fn](edit);
        const origResult = calculators[c.fn](orig);
        const delta = round2(result.total - origResult.total);
        const deltaSign = delta > 0 ? '+' : '';
        const deltaClass = delta > 0 ? 'calc-card__delta--up' : (delta < 0 ? 'calc-card__delta--down' : '');

        const linesHtml = result.lines.map(l => `
            <li class="calc-card__line">
                <div class="calc-card__line-label">
                    <span>${l.label}</span>
                    ${l.note ? `<span class="calc-card__line-note">${l.note}</span>` : ''}
                </div>
                <span class="calc-card__line-amount">${formatDkk(l.amount)}</span>
            </li>
        `).join('');

        html += `
            <article class="calc-card" id="calc-${c.key}" data-calc-key="${c.key}" style="border-top-color: ${type.color};">
                <header class="calc-card__header">
                    <h3 class="calc-card__title">${c.title}</h3>
                    <span class="calc-card__dot" style="background: ${type.color};" aria-hidden="true"></span>
                </header>
                <div class="calc-card__total">
                    <span class="calc-card__total-value">${formatDkk(result.total)}</span>
                    <span class="calc-card__total-period">pr. år</span>
                </div>
                ${delta !== 0 ? `
                    <div class="calc-card__delta ${deltaClass}">
                        ${deltaSign}${formatDkk(delta)} ift. BBR (${formatDkk(origResult.total)})
                    </div>
                ` : ''}
                <ul class="calc-card__lines">${linesHtml}</ul>
            </article>
        `;
    }
    html += '</div>';
    return html;
}

function renderCalculatorTab() {
    return `
        <div class="calculator">
            <div class="calculator__intro">
                <h2 class="calculator__title">Beregn dine kommunale gebyrer</h2>
                <p class="calculator__desc">
                    Gebyrerne nedenfor er beregnet automatisk ud fra dine BBR-oplysninger. Du kan justere felterne i panelet for at se hvordan ændringer (fx en tilbygning, en ny brændeovn eller en ændret grundværdi) påvirker beløbet.
                </p>
                <p class="calculator__disclaimer">
                    <strong>OBS:</strong> Satserne er fiktive demo-værdier baseret på offentligt tilgængelige niveauer for 2025/2026. Den endelige opkrævning afgøres af kommunens takstblad og BBR-registreringen.
                </p>
            </div>
            ${renderBbrPanel()}
            ${renderCalculatorCards()}
        </div>
    `;
}

// -- "Hvad hvis"-scenarier ---------------------------------------------------

function applyWhatIf(scenario) {
    const edit = ensureBbrEdit();
    if (scenario === 'addCarport') {
        const nextId = (Math.max(0, ...edit.bygninger.map(b => b.id)) || 0) + 1;
        edit.bygninger.push({ id: nextId, type: 'carport', bebyggetAreal: 30, ildsteder: 0 });
    } else if (scenario === 'addBraendeovn') {
        const beboelse = edit.bygninger.find(b => b.type === 'beboelse' || b.type === 'raekkehus' || b.type === 'lejlighed');
        if (beboelse) {
            beboelse.ildsteder += 1;
        }
    } else if (scenario === 'udvidBolig') {
        const beboelse = edit.bygninger.find(b => b.type === 'beboelse' || b.type === 'raekkehus');
        if (beboelse) {
            beboelse.bebyggetAreal += 25;
        }
    } else if (scenario === 'resetAll') {
        bbrEdit = cloneBbr(users[currentUser].bbr);
    }
}

function resetBbrField(field) {
    const orig = users[currentUser].bbr;
    const edit = ensureBbrEdit();
    if (field === 'grundareal') edit.grundareal = orig.grundareal;
    if (field === 'grundvaerdi') edit.grundvaerdi = orig.grundvaerdi;
}

function resetBbrBygningField(idx, field) {
    const orig = users[currentUser].bbr.bygninger[idx];
    const edit = ensureBbrEdit().bygninger[idx];
    if (!orig || !edit) return;
    if (field === 'type') edit.type = orig.type;
    if (field === 'areal') edit.bebyggetAreal = orig.bebyggetAreal;
    if (field === 'ild') edit.ildsteder = orig.ildsteder;
}

function renderChargeDetail(chargeId) {
    const user = users[currentUser];
    const charge = user.charges.find(c => c.id === chargeId);
    if (!charge) return '';

    const type = chargeTypes[charge.type];
    const badge = statusConfig[charge.status];

    let paidRow = '';
    if (charge.paidAt) {
        paidRow = `
            <div class="charge-detail__row">
                <dt>Betalt</dt>
                <dd>${formatDateLong(charge.paidAt)}</dd>
            </div>
        `;
    }

    const calcKey = calcKeyForChargeType(charge.type);
    const calcLink = calcKey ? `
        <div class="charge-detail__calc-link">
            <button type="button" class="btn btn--secondary" id="open-calc-btn" data-calc-key="${calcKey}">
                Se beregning →
            </button>
            <span class="charge-detail__calc-hint">Se hvordan dette gebyr er beregnet ud fra dine BBR-oplysninger.</span>
        </div>
    ` : '';

    return `
        <div class="charge-detail">
            <button class="charge-detail__back" id="back-btn">&larr; Tilbage til oversigt</button>
            <div class="charge-detail__card" style="border-left-color: ${type.color};">
                <div class="charge-detail__header">
                    <h1 class="charge-detail__title">${type.name}</h1>
                    <span class="charge-badge charge-badge--large"
                        style="color: ${badge.color}; background: ${badge.bg};">${badge.label}</span>
                </div>
                <dl class="charge-detail__info">
                    <div class="charge-detail__row">
                        <dt>Belob</dt>
                        <dd class="charge-detail__amount">${formatDkk(charge.amount)}</dd>
                    </div>
                    <div class="charge-detail__row">
                        <dt>Periode</dt>
                        <dd>${charge.period}</dd>
                    </div>
                    <div class="charge-detail__row">
                        <dt>Forfaldsdato</dt>
                        <dd>${formatDateLong(charge.due)}</dd>
                    </div>
                    ${paidRow}
                </dl>
                ${calcLink}
            </div>
        </div>
    `;
}

// -- Chart --------------------------------------------------------------------

function initChart() {
    const canvas = document.getElementById('history-chart');
    if (!canvas) return;

    if (historyChart) {
        historyChart.destroy();
        historyChart = null;
    }

    const user = users[currentUser];
    const labels = user.history.map(h => String(h.year));
    const charged = user.history.map(h => h.charged);
    const paid = user.history.map(h => h.paid);

    historyChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Opkraevet',
                    backgroundColor: '#003C50',
                    borderRadius: 4,
                    data: charged,
                },
                {
                    label: 'Betalt',
                    backgroundColor: '#43A047',
                    borderRadius: 4,
                    data: paid,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                    },
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                },
                y: {
                    grid: { color: '#eee' },
                    border: { display: false },
                    ticks: {
                        callback: function(value) { return (value / 1000) + 'k'; },
                    },
                },
            },
        },
    });
}

// -- Event Binding ------------------------------------------------------------

function bindLogin() {
    document.getElementById('login-btn').addEventListener('click', function() {
        const select = document.getElementById('user-select');
        currentUser = select.value;
        currentFilter = 'alle';
        currentTab = 'oversigt';
        bbrEdit = null;
        render();
    });
}

function bindDashboard() {
    // Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        currentUser = null;
        currentFilter = 'alle';
        currentTab = 'oversigt';
        bbrEdit = null;
        render();
    });

    // Tabs
    document.querySelectorAll('.tabs__tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            currentTab = this.dataset.tab;
            render();
        });
    });

    // Filters
    document.querySelectorAll('.filter-bar__btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            render();
        });
    });

    // Charge cards -> detail view
    document.querySelectorAll('.charge-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.chargeId, 10);
            showDetail(id);
        });
    });

    // Init chart if history tab is active
    if (currentTab === 'historik') {
        initChart();
    }

    // Beregner-fanen
    if (currentTab === 'beregner') {
        bindCalculator();

        if (scrollToCalcKey) {
            const target = document.getElementById('calc-' + scrollToCalcKey);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('calc-card--highlight');
                setTimeout(() => target.classList.remove('calc-card--highlight'), 1600);
            }
            scrollToCalcKey = null;
        }
    }
}

// Mappe charge-type -> calculator-kort
function calcKeyForChargeType(chargeType) {
    if (calculators[chargeType]) return chargeType;
    return null;
}

// Opdater kun beregningskort + nulstil-markeringer uden at rerender hele DOM'en
// (så input-feltet beholder fokus mens man taster).
function refreshCalculatorCards() {
    const grid = document.querySelector('.calc-grid');
    if (grid) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = renderCalculatorCards();
        const newGrid = wrapper.firstElementChild;
        grid.replaceWith(newGrid);
    }
    // Opdater "ændret"-markering og nulstil-knapper på BBR-felterne
    refreshBbrFieldStates();
}

function refreshBbrFieldStates() {
    const orig = users[currentUser].bbr;
    const edit = bbrEdit;
    if (!edit) return;

    const setFieldState = (selector, changed, resetAttr, resetTitle) => {
        const input = document.querySelector(selector);
        if (!input) return;
        const wrapper = input.closest('.bbr-field');
        if (!wrapper) return;
        wrapper.classList.toggle('bbr-field--changed', changed);
        const existingReset = wrapper.querySelector('.bbr-field__reset');
        if (changed && !existingReset) {
            const btn = document.createElement('button');
            btn.className = 'bbr-field__reset';
            btn.title = resetTitle;
            btn.textContent = '↺';
            for (const [k, v] of Object.entries(resetAttr)) {
                btn.dataset[k] = v;
            }
            btn.addEventListener('click', handleResetClick);
            wrapper.appendChild(btn);
        } else if (!changed && existingReset) {
            existingReset.remove();
        }
    };

    setFieldState(
        '[data-bbr-grundareal]',
        bbrFieldChanged(orig.grundareal, edit.grundareal),
        { bbrReset: 'grundareal' },
        `Nulstil til BBR-værdi (${orig.grundareal})`,
    );
    setFieldState(
        '[data-bbr-grundvaerdi]',
        bbrFieldChanged(orig.grundvaerdi, edit.grundvaerdi),
        { bbrReset: 'grundvaerdi' },
        `Nulstil til BBR-værdi (${orig.grundvaerdi.toLocaleString('da-DK')})`,
    );
    edit.bygninger.forEach((b, i) => {
        const o = orig.bygninger[i] || { type: '', bebyggetAreal: 0, ildsteder: 0 };
        setFieldState(
            `[data-bbr-bygning-areal="${i}"]`,
            bbrFieldChanged(o.bebyggetAreal, b.bebyggetAreal),
            { bbrResetBygning: String(i), bbrResetField: 'areal' },
            `Nulstil til BBR-værdi (${o.bebyggetAreal})`,
        );
        setFieldState(
            `[data-bbr-bygning-ild="${i}"]`,
            bbrFieldChanged(o.ildsteder, b.ildsteder),
            { bbrResetBygning: String(i), bbrResetField: 'ild' },
            `Nulstil til BBR-værdi (${o.ildsteder})`,
        );
        setFieldState(
            `[data-bbr-bygning-type="${i}"]`,
            bbrFieldChanged(o.type, b.type),
            { bbrResetBygning: String(i), bbrResetField: 'type' },
            `Nulstil til BBR-værdi`,
        );
    });
}

function handleResetClick(ev) {
    const btn = ev.currentTarget;
    if (btn.dataset.bbrReset) {
        resetBbrField(btn.dataset.bbrReset);
    } else if (btn.dataset.bbrResetBygning) {
        resetBbrBygningField(parseInt(btn.dataset.bbrResetBygning, 10), btn.dataset.bbrResetField);
    }
    // Synk DOM'ens input-værdier med ny state
    syncBbrInputsFromEdit();
    refreshCalculatorCards();
}

function syncBbrInputsFromEdit() {
    if (!bbrEdit) return;
    const ga = document.querySelector('[data-bbr-grundareal]');
    if (ga) ga.value = bbrEdit.grundareal;
    const gv = document.querySelector('[data-bbr-grundvaerdi]');
    if (gv) gv.value = bbrEdit.grundvaerdi;
    bbrEdit.bygninger.forEach((b, i) => {
        const a = document.querySelector(`[data-bbr-bygning-areal="${i}"]`);
        if (a) a.value = b.bebyggetAreal;
        const il = document.querySelector(`[data-bbr-bygning-ild="${i}"]`);
        if (il) il.value = b.ildsteder;
        const ty = document.querySelector(`[data-bbr-bygning-type="${i}"]`);
        if (ty) ty.value = b.type;
    });
}

function bindCalculator() {
    const panel = document.getElementById('panel-beregner');
    if (!panel) return;

    // Top-level felter (live opdatering uden full re-render → bevarer fokus)
    const grundareal = panel.querySelector('[data-bbr-grundareal]');
    if (grundareal) {
        grundareal.addEventListener('input', function() {
            ensureBbrEdit().grundareal = parseInt(this.value, 10) || 0;
            refreshCalculatorCards();
        });
    }
    const grundvaerdi = panel.querySelector('[data-bbr-grundvaerdi]');
    if (grundvaerdi) {
        grundvaerdi.addEventListener('input', function() {
            ensureBbrEdit().grundvaerdi = parseInt(this.value, 10) || 0;
            refreshCalculatorCards();
        });
    }

    // Bygnings-felter
    panel.querySelectorAll('[data-bbr-bygning-areal]').forEach(function(el) {
        el.addEventListener('input', function() {
            const i = parseInt(this.dataset.bbrBygningAreal, 10);
            ensureBbrEdit().bygninger[i].bebyggetAreal = parseInt(this.value, 10) || 0;
            refreshCalculatorCards();
        });
    });
    panel.querySelectorAll('[data-bbr-bygning-ild]').forEach(function(el) {
        el.addEventListener('input', function() {
            const i = parseInt(this.dataset.bbrBygningIld, 10);
            ensureBbrEdit().bygninger[i].ildsteder = parseInt(this.value, 10) || 0;
            refreshCalculatorCards();
        });
    });
    panel.querySelectorAll('[data-bbr-bygning-type]').forEach(function(el) {
        el.addEventListener('change', function() {
            const i = parseInt(this.dataset.bbrBygningType, 10);
            ensureBbrEdit().bygninger[i].type = this.value;
            refreshCalculatorCards();
        });
    });

    // Nulstil-knapper
    panel.querySelectorAll('.bbr-field__reset').forEach(function(btn) {
        btn.addEventListener('click', handleResetClick);
    });

    // Hvad-hvis-chips → fuld re-render (kan ændre antallet af bygninger)
    panel.querySelectorAll('[data-whatif]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            applyWhatIf(this.dataset.whatif);
            render();
        });
    });
}

function showDetail(chargeId) {
    const dashboardView = document.getElementById('dashboard-view');
    const detailView = document.getElementById('detail-view');

    dashboardView.style.display = 'none';
    detailView.style.display = 'block';
    detailView.innerHTML = renderChargeDetail(chargeId);

    document.getElementById('back-btn').addEventListener('click', function() {
        detailView.style.display = 'none';
        detailView.innerHTML = '';
        dashboardView.style.display = 'block';
    });

    const calcBtn = document.getElementById('open-calc-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            scrollToCalcKey = this.dataset.calcKey;
            currentTab = 'beregner';
            detailView.style.display = 'none';
            detailView.innerHTML = '';
            dashboardView.style.display = 'block';
            render();
        });
    }
}

// -- Init ---------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', render);
