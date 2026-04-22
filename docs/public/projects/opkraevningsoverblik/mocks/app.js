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
};

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
        charges: [
            { id: 1, type: 'ejendomsskat',     amount: 12400, due: '2025-03-01', status: 'betalt',   period: 'Q1 2025', paidAt: '2025-03-01' },
            { id: 2, type: 'daginstitution',    amount: 3200,  due: '2025-02-01', status: 'betalt',   period: 'Feb 2025', paidAt: '2025-02-01' },
            { id: 3, type: 'renovation',        amount: 1850,  due: '2025-03-15', status: 'betalt',   period: 'Q1 2025', paidAt: '2025-03-15' },
            { id: 4, type: 'daginstitution',    amount: 3200,  due: '2025-03-01', status: 'betalt',   period: 'Mar 2025', paidAt: '2025-03-01' },
            { id: 5, type: 'rottebekaempelse',  amount: 500,   due: '2025-01-15', status: 'betalt',   period: 'Q1 2025', paidAt: '2025-01-15' },
            { id: 6, type: 'ejendomsskat',      amount: 12400, due: '2025-06-01', status: 'kommende', period: 'Q2 2025', paidAt: null },
            { id: 7, type: 'renovation',        amount: 1850,  due: '2025-06-15', status: 'kommende', period: 'Q2 2025', paidAt: null },
            { id: 8, type: 'rottebekaempelse',  amount: 500,   due: '2026-01-15', status: 'kommende', period: 'Q1 2026', paidAt: null },
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
        charges: [
            { id: 16, type: 'ejendomsskat',     amount: 12400, due: '2025-03-01', status: 'betalt',    period: 'Q1 2025', paidAt: '2025-03-01' },
            { id: 17, type: 'daginstitution',    amount: 3200,  due: '2025-02-01', status: 'forfalden', period: 'Feb 2025', paidAt: null },
            { id: 18, type: 'renovation',        amount: 1850,  due: '2025-03-15', status: 'forfalden', period: 'Q1 2025', paidAt: null },
            { id: 19, type: 'rottebekaempelse',  amount: 500,   due: '2025-01-15', status: 'forfalden', period: 'Q1 2025', paidAt: null },
            { id: 20, type: 'ejendomsskat',      amount: 12400, due: '2025-06-01', status: 'ubetalt',  period: 'Q2 2025', paidAt: null },
            { id: 21, type: 'daginstitution',    amount: 3200,  due: '2025-06-15', status: 'kommende', period: 'Q2 2025', paidAt: null },
            { id: 22, type: 'rottebekaempelse',  amount: 500,   due: '2026-01-15', status: 'kommende', period: 'Q1 2026', paidAt: null },
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

// -- State --------------------------------------------------------------------

let currentUser = null;
let currentFilter = 'alle';
let currentTab = 'oversigt';
let historyChart = null;

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
        render();
    });
}

function bindDashboard() {
    // Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        currentUser = null;
        currentFilter = 'alle';
        currentTab = 'oversigt';
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
}

// -- Init ---------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', render);
