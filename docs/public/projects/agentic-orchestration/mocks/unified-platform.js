/**
 * Interaction logic for the Unified Platform mock.
 * Handles panel switching, detail views, modal overlays, and role-based view switching.
 */

var panelTitles = {
  processes: 'Process Map',
  tasks: 'My Tasks',
  automations: 'Automations',
  dashboard: 'Dashboard',
  assistant: 'AI Assistant',
  agents: 'Agents',
  operations: 'Operations',
  settings: 'Settings'
};

// Uses event.currentTarget from inline onclick handlers to highlight the clicked sidebar item
function showPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  event.currentTarget.classList.add('active');
  document.getElementById('panelTitle').textContent = panelTitles[name] || name;
}

// For programmatic navigation (e.g. from modals) where there is no click event — matches sidebar item by text content instead
function showPanel2(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  var labelMap = {
    processes: 'Process Map',
    tasks: 'My Tasks',
    automations: 'Automations',
    dashboard: 'Dashboard',
    assistant: 'AI Assistant',
    agents: 'Agents',
    settings: 'Settings'
  };
  document.querySelectorAll('.sidebar-item').forEach(i => {
    if (i.textContent.trim().replace(/\d/g,'').trim() === labelMap[name]) i.classList.add('active');
  });
  document.getElementById('panelTitle').textContent = panelTitles[name] || name;
}

function openTaskDetail() {
  document.querySelector('.kanban-board').style.display = 'none';
  document.querySelector('.kanban-filters').style.display = 'none';
  document.getElementById('task-detail-view').classList.add('active');
}

function backToKanban() {
  document.getElementById('task-detail-view').classList.remove('active');
  document.querySelector('.kanban-board').style.display = 'flex';
  document.querySelector('.kanban-filters').style.display = 'flex';
}

function openProcess(name) {
  document.querySelectorAll('.process-view').forEach(v => v.classList.remove('active'));
  document.getElementById('process-' + name).classList.add('active');
}

function backToList() {
  document.querySelectorAll('.process-view').forEach(v => v.classList.remove('active'));
  document.getElementById('process-list-view').classList.add('active');
}

function openModal(type) {
  document.getElementById('modal-' + type).classList.add('visible');
}

function closeModal(type) {
  document.getElementById('modal-' + type).classList.remove('visible');
}

function openAutomationDetail() {
  document.getElementById('automation-grid').style.display = 'none';
  document.querySelector('#panel-automations > div:first-child').style.display = 'none';
  document.getElementById('automation-detail-view').classList.add('active');
}

function backToAutomations() {
  document.getElementById('automation-detail-view').classList.remove('active');
  document.getElementById('automation-grid').style.display = 'grid';
  document.querySelector('#panel-automations > div:first-child').style.display = 'flex';
}

function openAgentDetail() {
  document.getElementById('agent-grid').style.display = 'none';
  document.querySelector('#panel-agents .agent-admin-note').style.display = 'none';
  document.querySelector('#panel-agents > div:nth-child(2)').style.display = 'none';
  document.getElementById('agent-detail-view').classList.add('active');
}

function backToAgents() {
  document.getElementById('agent-detail-view').classList.remove('active');
  document.getElementById('agent-grid').style.display = 'grid';
  document.querySelector('#panel-agents .agent-admin-note').style.display = 'flex';
  document.querySelector('#panel-agents > div:nth-child(2)').style.display = 'flex';
}

// Switches the visible UI based on the selected role — hides sidebar items the role cannot access
function switchRole(role) {
  var roleProfiles = {
    admin:      { name: 'Jesper P.',  initials: 'JP', label: 'IT Administrator' },
    designer:   { name: 'Jesper P.',  initials: 'JP', label: 'Process Designer' },
    caseworker: { name: 'Anna S.',    initials: 'AS', label: 'Caseworker' }
  };

  // Update user display
  var profile = roleProfiles[role];
  document.getElementById('user-avatar').textContent = profile.initials;
  document.getElementById('user-name').textContent = profile.name;
  document.getElementById('user-role-label').textContent = profile.label;

  // Show/hide sidebar items based on data-role
  document.querySelectorAll('.sidebar-item[data-role]').forEach(function(item) {
    var roles = item.getAttribute('data-role').split(',');
    if (roles.indexOf(role) !== -1) {
      item.classList.remove('role-hidden');
    } else {
      item.classList.add('role-hidden');
    }
  });

  // Show/hide section headers when all their items are hidden
  document.querySelectorAll('.sidebar-section[data-section]').forEach(function(section) {
    var next = section.nextElementSibling;
    var allHidden = true;
    while (next && !next.classList.contains('sidebar-section') && !next.classList.contains('sidebar-bottom')) {
      if (next.classList.contains('sidebar-item') && !next.classList.contains('role-hidden')) {
        allHidden = false;
      }
      next = next.nextElementSibling;
    }
    if (allHidden) {
      section.classList.add('role-hidden');
    } else {
      section.classList.remove('role-hidden');
    }
  });

  // If the currently active panel is now hidden, navigate to Dashboard
  var activePanel = document.querySelector('.panel.active');
  if (activePanel) {
    var panelName = activePanel.id.replace('panel-', '');
    var matchingItem = document.querySelector('.sidebar-item[data-role][onclick*="' + panelName + '"]');
    if (matchingItem && matchingItem.classList.contains('role-hidden')) {
      showPanel2('dashboard');
    }
  }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('visible');
  });
});
