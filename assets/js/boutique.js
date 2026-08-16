document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const catParam = (params.get('cat') || '').trim();
  const grid = document.getElementById('boutiqueGrid');
  const titleEl = document.getElementById('boutiqueTitle');
  const countEl = document.getElementById('boutiqueCount');
  const emptyEl = document.getElementById('boutiqueEmpty');
  if (!grid || typeof PRODUCTS === 'undefined') return;

  const isAll = !catParam || ['all', 'toutes', 'tout voir'].includes(catParam.toLowerCase());
  let filtered;

  if (isAll) {
    filtered = PRODUCTS;
    titleEl.textContent = 'Toutes nos pièces';
  } else {
    const needle = catParam.toLowerCase();
    filtered = PRODUCTS.filter(p => {
      const cat = p.cat.toLowerCase();
      return needle.includes(cat) || cat.includes(needle);
    });
    titleEl.textContent = catParam;
  }

  document.querySelectorAll('.filter-pill').forEach(pill => {
    const pillCat = (pill.dataset.cat || '').toLowerCase();
    pill.classList.toggle('active', isAll ? pillCat === 'all' : pillCat === catParam.toLowerCase());
  });

  if (filtered.length === 0) {
    grid.style.display = 'none';
    if (emptyEl) {
      emptyEl.style.display = 'block';
      const nameEl = emptyEl.querySelector('.empty-cat');
      if (nameEl) nameEl.textContent = catParam;
    }
    if (countEl) countEl.textContent = '0 pièce';
  } else if (typeof productCardHTML === 'function') {
    grid.innerHTML = filtered.map(productCardHTML).join('');
    if (countEl) countEl.textContent = `${filtered.length} pièce${filtered.length > 1 ? 's' : ''}`;
  }
});
