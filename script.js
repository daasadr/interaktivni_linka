// Data o bodech přímo v JS, nyní s obdélníkovými oblastmi (x, y, width, height v %)
const crossButtons = [
  {
    x: 18,
    y: 62,
    link: 'https://example.com/skrin1',
    title: 'Skříňka 1',
    description: 'Tato skříňka nabízí moderní úložné prostory s vysokou kapacitou a elegantním designem. Ideální pro každý domov.'
  },
  {
    x: 51,
    y: 54,
    link: 'https://example.com/stul',
    title: 'Stůl',
    description: 'Odolná pracovní plocha s kvalitním povrchem, který odolává poškrábání. Ideální pro kancelář i domácí využití.'
  },
  {
    x: 88,
    y: 60,
    link: 'https://example.com/drez',
    title: 'Dřez',
    description: 'Nerezový dřez s odkapávačem, který nabízí snadnou údržbu a elegantní vzhled. Skvělá volba pro moderní kuchyň.'
  }
];

const hotspotLayer = document.getElementById('hotspot-layer');
const image = document.querySelector('.main-image');
const container = document.querySelector('.interactive-image-container');

let popupEl = null;
let popupTimeout = null;

function renderCrossButtons() {
  // Smažu staré, pokud existují
  const old = document.querySelectorAll('.cross-btn');
  old.forEach(el => el.remove());
  crossButtons.forEach((btn, i) => {
    const el = document.createElement('button');
    el.className = 'cross-btn';
    el.style.position = 'absolute';
    el.style.left = `calc(${btn.x}% - 24px)`;
    el.style.top = `calc(${btn.y}% - 24px)`;
    el.style.width = '48px';
    el.style.height = '48px';
    el.style.background = 'none';
    el.style.border = 'none';
    el.style.padding = '0';
    el.style.cursor = 'pointer';
    el.style.zIndex = '100';
    el.setAttribute('aria-label', btn.title);
    el.innerHTML = `
      <svg class="cross-svg" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="19" stroke="#1976d2" stroke-width="3" fill="none"/>
        <line x1="22" y1="13" x2="22" y2="31" stroke="#1976d2" stroke-width="3" stroke-linecap="round"/>
        <line x1="13" y1="22" x2="31" y2="22" stroke="#1976d2" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
    el.onclick = (e) => {
      e.stopPropagation();
      window.open(btn.link, '_blank');
    };
    el.addEventListener('mouseenter', () => showPopupForCross(btn, el));
    el.addEventListener('focus', () => showPopupForCross(btn, el));
    el.addEventListener('mouseleave', tryHidePopup);
    el.addEventListener('blur', tryHidePopup);
    hotspotLayer.appendChild(el);
  });
}

function showPopupForCross(btn, anchor) {
  clearTimeout(popupTimeout);
  hidePopup();
  popupEl = document.createElement('div');
  popupEl.className = 'popup-modal visible';
  popupEl.innerHTML = `
    <button class="popup-close" aria-label="Zavřít">&times;</button>
    <div class="popup-title">${btn.title}</div>
    <div class="popup-description">${btn.description}</div>
    <div class="popup-actions"><a class="popup-link" href="${btn.link}" target="_blank" rel="noopener">Více informací</a></div>
  `;
  popupEl.style.position = 'absolute';
  // Nové pozicování: popup bude vedle křížku (vpravo, nebo vlevo pokud by přesahoval)
  const layerRect = hotspotLayer.getBoundingClientRect();
  const crossRect = anchor.getBoundingClientRect();
  const popupWidth = 220; // musí odpovídat max-width v CSS
  const popupHeight = 120; // max-height v CSS
  let left = crossRect.right - layerRect.left + 10;
  let top = (crossRect.top + crossRect.bottom) / 2 - layerRect.top - popupHeight / 2;
  // Pokud by popup přesáhl vpravo, zobraz vlevo od křížku
  if (left + popupWidth > layerRect.width) {
    left = crossRect.left - layerRect.left - popupWidth - 10;
  }
  // Pokud by popup přesáhl nahoru/dolů, zarovnej k okraji
  if (top < 0) top = 0;
  if (top + popupHeight > layerRect.height) top = layerRect.height - popupHeight;
  popupEl.style.left = `${left}px`;
  popupEl.style.top = `${top}px`;
  popupEl.style.minWidth = '160px';
  popupEl.style.maxWidth = '220px';
  popupEl.style.boxSizing = 'border-box';
  popupEl.style.pointerEvents = 'auto';
  popupEl.style.zIndex = '200';
  popupEl.querySelector('.popup-close').onclick = hidePopup;
  popupEl.addEventListener('mouseenter', () => clearTimeout(popupTimeout));
  popupEl.addEventListener('mouseleave', tryHidePopup);
  hotspotLayer.appendChild(popupEl);
}

function tryHidePopup() {
  clearTimeout(popupTimeout);
  popupTimeout = setTimeout(() => {
    if (popupEl && !popupEl.matches(':hover')) {
      hidePopup();
    }
  }, 180);
}

function hidePopup() {
  clearTimeout(popupTimeout);
  if (popupEl && popupEl.parentNode) popupEl.parentNode.removeChild(popupEl);
  popupEl = null;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCrossButtons();
}); 