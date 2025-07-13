# Interaktivní linka - Webová komponenta

## Popis projektu

Interaktivní webová komponenta pro prezentaci produktů přímo na obrázku. 

Umožňuje návštěvníkům kliknout na aktivní body umístěné na obrázku kuchyňské linky a získat detailní informace o jednotlivých produktech (skříňky, stůl, dřez).

### Hlavní funkce

- **Aktivní body na obrázku** - Návštěvníci vidí označené produkty přímo na fotografii
- **Hover efekty** - Po najetí myší se zobrazí popup s informacemi o produktu  
- **Plynulé animace** - Moderní animace rotace a změny velikosti
- **Mobilní optimalizace** - Automatické skrytí na malých zařízeních
- **Plná dostupnost** - Podpora pro uživatele se zdravotním postižením

## Technické specifikace

- **Pure CSS řešení** - Žádný JavaScript není potřeba
- **CSS Custom Properties** - Snadné přizpůsobení barev a rozměrů
- **Semantic HTML** - Správná struktura pro SEO a accessibility
- **Optimalizace výkonu** - WebP formát s fallback na JPG pro rychlejší načítání

## Přístupnost (Accessibility)

Komponenta podporuje:

- **Klávesovou navigaci** - Tab, Enter
- **Screen readery** - Správné ARIA atributy
- **Reduced motion** - Automatické vypnutí animací pro citlivé uživatele
- **High contrast** - Podpora vysokého kontrastu
- **Semantic HTML** - Správná struktura pro všechny technologie

## Optimalizace výkonu

### Optimalizace obrázků

Komponenta využívá moderní **WebP formát** pro optimální výkon:

- **WebP obrázek** (`foto.webp`) - Komprimovaný formát s více než 10x menší velikostí
- **JPG fallback** (`foto.jpg`) - Záložní obrázek pro starší prohlížeče
- **Automatická detekce** - Prohlížeč si automaticky vybere nejlepší formát

**Výhody WebP:**
- 🔥 Více než 10x menší velikost souboru
- ⚡ Rychlejší načítání stránky
- 📱 Úspora mobilních dat

### Implementace

#### 1. Základní HTML struktura

```html
<main role="main">
  <div class="interactive-image-container" role="img" aria-label="Interaktivní obrázek kuchyňské linky">
    <picture>
      <source srcset="public/foto.webp" type="image/webp">
      <img src="public/foto.jpg" alt="Moderní kuchyňská linka" class="main-image" />
    </picture>
    <div id="hotspot-layer" role="group" aria-label="Interaktivní body s informacemi o produktech">
      <!-- Hotspoty zde -->
    </div>
  </div>
</main>
```

#### 2. Přidání nového hotspotu

```html
<div class="hotspot-wrapper" style="left: calc(X% - 24px); top: calc(Y% - 24px);">
  <button class="cross-btn" aria-label="Název produktu" aria-expanded="false" aria-haspopup="dialog" aria-describedby="popup-id">
    <img src="public/cross-icon.svg" alt="" class="cross-svg" width="44" height="44" role="presentation">
  </button>
  <div class="popup-modal" id="popup-id" role="dialog" aria-labelledby="title-id" aria-describedby="desc-id" aria-hidden="true">
    <div class="popup-title" id="title-id">Název produktu</div>
    <div class="popup-description" id="desc-id">Popis produktu</div>
    <div class="popup-actions">
      <a class="popup-link" href="URL" target="_blank" rel="noopener">Více informací</a>
    </div>
  </div>
</div>
```

### Customizace

#### Změna pozice hotspotů

Upravte hodnoty `left` a `top` v `style` atributu:

```html
<!-- X% = horizontální pozice, Y% = vertikální pozice -->
<div class="hotspot-wrapper" style="left: calc(25% - 24px); top: calc(40% - 24px);">
```