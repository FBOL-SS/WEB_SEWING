const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('show'));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const chips = document.querySelectorAll('[data-filter]');
const machineCards = document.querySelectorAll('[data-machine]');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    machineCards.forEach((card) => {
      card.style.display = filter === 'all' || card.dataset.machine.includes(filter) ? '' : 'none';
    });
  });
});

const searchInput = document.getElementById('parts-search');
const partCards = document.querySelectorAll('[data-part]');
if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const q = event.target.value.toLowerCase();
    partCards.forEach((card) => {
      card.style.display = card.dataset.part.includes(q) ? '' : 'none';
    });
  });
}

function parseNum(id) {
  return Number(document.getElementById(id)?.value || 0);
}

const roiForm = document.getElementById('roi-form');
if (roiForm) {
  roiForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const employees = parseNum('roi-empleados');
    const payroll = parseNum('roi-nomina');
    const target = parseNum('roi-meta');
    const machineCost = parseNum('roi-inversion');

    const estimatedSaving = payroll * 0.18;
    const newCapacity = target * 1.28;
    const payback = machineCost > 0 ? (machineCost / estimatedSaving) : 0;

    document.getElementById('roi-ahorro').textContent = `$${estimatedSaving.toLocaleString('es-MX')} MXN / mes`;
    document.getElementById('roi-capacidad').textContent = `${Math.round(newCapacity).toLocaleString('es-MX')} piezas / mes`;
    document.getElementById('roi-retorno').textContent = `${payback.toFixed(1)} meses`;
    document.getElementById('roi-result').style.display = 'grid';
  });
}
