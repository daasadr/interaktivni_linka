// Data o bodech přímo v JS, nyní s obdélníkovými oblastmi (x, y, width, height v %)
const areas = [
  {
    "id": "skrin1",
    "type": "modal",
    "title": "Skříňka 1",
    "description": "Moderní úložný prostor s elegantním designem.",
    "link": "https://example.com/skrin1",
    "x": 8,
    "y": 45,
    "width": 28,
    "height": 38
  },
  {
    "id": "stul",
    "type": "modal",
    "title": "Stůl",
    "description": "Odolná pracovní plocha vhodná do každé domácnosti.",
    "link": "https://example.com/stul",
    "x": 36,
    "y": 50,
    "width": 32,
    "height": 32
  },
  {
    "id": "zasuvka",
    "type": "modal",
    "title": "Zásuvkový modul",
    "description": "Rychlý přístup k často používaným nástrojům.",
    "link": "https://example.com/zasuvka",
    "x": 16,
    "y": 62,
    "width": 24,
    "height": 30
  },
  {
    "id": "drez",
    "type": "modal",
    "title": "Dřez s odkapávačem",
    "description": "Nerezový dřez s odkapávačem pro snadné mytí.",
    "link": "https://example.com/drez",
    "x": 66,
    "y": 55,
    "width": 28,
    "height": 32
  },
  {
    "id": "bezpecnost",
    "type": "modal",
    "highlight": true,
    "title": "Bezpečnostní upozornění",
    "description": "Používejte ochranné pomůcky. Bezpečnost na prvním místě!",
    "link": "https://example.com/bezpecnost",
    "x": 44,
    "y": 25,
    "width": 32,
    "height": 32
  },
  {
    "id": "info1",
    "type": "tooltip",
    "title": "Tip: Úspora místa",
    "description": "Využijte horní police na lehké předměty.",
    "x": 12,
    "y": 12,
    "width": 22,
    "height": 20
  },
  {
    "id": "info2",
    "type": "tooltip",
    "title": "Tip: Údržba",
    "description": "Kontrolujte těsnění dřezu.",
    "x": 70,
    "y": 15,
    "width": 22,
    "height": 20
  }
];

const hotspotLayer = document.getElementById('hotspot-layer');
const image = document.querySelector('.main-image');
const container = document.querySelector('.interactive-image-container');

let tooltipEl = null;
let modalEl = null;
let currentArea = null;

function createAreaDiv(area) {
  const el = document.createElement('div');
  el.className = 'active-area';
  el.style.left = area.x + '%';
  el.style.top = area.y + '%';
  el.style.width = area.width + '%';
  el.style.height = area.height + '%';
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', area.title);
  return el;
}

function showPopupSticky(area) {
  if (currentArea === area) return;
  hidePopup();
  currentArea = area;
  let popup;
  if (area.type === 'tooltip') {
    popup = document.createElement('div');
    popup.className = 'popup-tooltip visible';
    popup.innerHTML = `<div class='popup-title'>${area.title}</div><div>${area.description}</div>`;
    tooltipEl = popup;
  } else {
    popup = document.createElement('div');
    popup.className = 'popup-modal visible' + (area.highlight ? ' highlight' : '');
    popup.innerHTML = `
      <button class="popup-close" aria-label="Zavřít">&times;</button>
      <div class="popup-title">${area.title}</div>
      <div class="popup-description">${area.description}</div>
      ${area.link ? `<div class="popup-actions"><a class="popup-link" href="${area.link}" target="_blank" rel="noopener">Více informací</a></div>` : ''}
    `;
    modalEl = popup;
    popup.querySelector('.popup-close').onclick = hidePopup;
    document.addEventListener('keydown', escClose);
  }
  popup.style.position = 'absolute';
  // Pozice popupu do středu oblasti
  const imgRect = image.getBoundingClientRect();
  const layerRect = hotspotLayer.getBoundingClientRect();
  const left = ((area.x + area.width / 2) / 100) * imgRect.width + imgRect.left - layerRect.left;
  const top = ((area.y + area.height / 2) / 100) * imgRect.height + imgRect.top - layerRect.top;
  popup.style.left = `calc(${left}px)`;
  popup.style.top = `calc(${top}px)`;
  popup.style.transform = 'translate(-50%, -50%) scale(1)';
  popup.style.minWidth = '220px';
  popup.style.maxWidth = '320px';
  popup.style.boxSizing = 'border-box';
  popup.style.pointerEvents = 'auto';
  hotspotLayer.appendChild(popup);
}

function hidePopup() {
  if (tooltipEl && tooltipEl.parentNode) tooltipEl.parentNode.removeChild(tooltipEl);
  if (modalEl && modalEl.parentNode) modalEl.parentNode.removeChild(modalEl);
  tooltipEl = null;
  modalEl = null;
  currentArea = null;
  document.removeEventListener('keydown', escClose);
}

function escClose(e) {
  if (e.key === 'Escape') hidePopup();
}

function renderAreas() {
  hotspotLayer.innerHTML = '';
  areas.forEach(area => {
    const el = createAreaDiv(area);
    hotspotLayer.appendChild(el);
  });
}

function getRelativeCoords(e, img) {
  const rect = img.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  return { x, y };
}

function findAreaAt(x, y) {
  return areas.find(area =>
    x >= area.x && x <= area.x + area.width &&
    y >= area.y && y <= area.y + area.height
  );
}

function handleContainerMouseMove(e) {
  const coords = getRelativeCoords(e, image);
  const area = findAreaAt(coords.x, coords.y);
  if (area) {
    showPopupSticky(area);
  } else {
    hidePopup();
  }
}

function handleContainerMouseLeave() {
  hidePopup();
}

window.addEventListener('resize', hidePopup);
window.addEventListener('scroll', hidePopup);

document.addEventListener('DOMContentLoaded', () => {
  renderAreas();
  container.addEventListener('mousemove', handleContainerMouseMove);
  container.addEventListener('mouseleave', handleContainerMouseLeave);
}); 