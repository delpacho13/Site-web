/* Shared product catalog + garment line-art sketches.
   Used by index.html (product cards link to produit.html?id=) and by
   produit.html (renders the matching product from this data). These
   sketches stand in for real product photography — swap GARMENTS'
   markup for real <img> tags once photos are available. */

const GARMENTS = {
  blazer: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M70,72 Q100,56 130,72 L142,180 Q100,196 58,180 Z"/><path d="M58,80 L34,92 L42,172 L60,162 Z"/><path d="M142,80 L166,92 L158,172 L140,162 Z"/><path d="M79,68 L100,122 L121,68"/><circle cx="100" cy="142" r="2.4" fill="#5B4A3E"/><circle cx="100" cy="158" r="2.4" fill="#5B4A3E"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M70,72 Q100,56 130,72 L142,180 Q100,196 58,180 Z"/><path d="M58,80 L34,92 L42,172 L60,162 Z"/><path d="M142,80 L166,92 L158,172 L140,162 Z"/><path d="M100,58 L100,178" stroke-dasharray="1,5"/></svg>'
  },
  dress: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M76,70 Q100,58 124,70 L117,138 Q100,148 83,138 Z"/><path d="M83,138 Q100,148 117,138 L129,228 Q100,241 71,228 Z"/><path d="M80,70 L84,52"/><path d="M120,70 L116,52"/><path d="M80,74 L118,132"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M76,70 Q100,58 124,70 L117,138 Q100,148 83,138 Z"/><path d="M83,138 Q100,148 117,138 L129,228 Q100,241 71,228 Z"/><path d="M80,70 L84,52"/><path d="M120,70 L116,52"/><path d="M100,60 L100,140" stroke-dasharray="1,4"/></svg>'
  },
  sweater: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M64,76 Q100,60 136,76 L141,188 Q100,199 59,188 Z"/><path d="M84,72 Q100,84 116,72"/><path d="M60,86 L36,98 L44,174 L66,166 Z"/><path d="M140,86 L164,98 L156,174 L134,166 Z"/><path d="M60,186 L140,186" stroke-width="2.2"/><path d="M40,168 L64,162" stroke-width="2.2"/><path d="M160,168 L136,162" stroke-width="2.2"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M64,76 Q100,60 136,76 L141,188 Q100,199 59,188 Z"/><path d="M78,78 Q100,90 122,78"/><path d="M60,86 L36,98 L44,174 L66,166 Z"/><path d="M140,86 L164,98 L156,174 L134,166 Z"/><path d="M60,186 L140,186" stroke-width="2.2"/><path d="M40,168 L64,162" stroke-width="2.2"/><path d="M160,168 L136,162" stroke-width="2.2"/></svg>'
  },
  bag: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M60,120 Q60,110 70,110 L130,110 Q140,110 140,120 L140,190 Q140,200 130,200 L70,200 Q60,200 60,190 Z"/><path d="M76,110 Q76,74 100,74 Q124,74 124,110"/><rect x="93" y="107" width="14" height="8" rx="2"/><path d="M60,150 L140,150" stroke-dasharray="1,5" stroke-width="1"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M60,120 Q60,110 70,110 L130,110 Q140,110 140,120 L140,190 Q140,200 130,200 L70,200 Q60,200 60,190 Z"/><path d="M76,110 Q76,74 100,74 Q124,74 124,110"/><rect x="75" y="140" width="50" height="38" rx="3"/></svg>'
  },
  skirt: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="75" y="58" width="50" height="10" rx="2"/><path d="M76,68 L58,228 Q100,240 142,228 L124,68 Z"/><path d="M83,68 L68,228" stroke-width="1"/><path d="M91,68 L84,228" stroke-width="1"/><path d="M100,68 L100,228" stroke-width="1"/><path d="M109,68 L116,228" stroke-width="1"/><path d="M117,68 L132,228" stroke-width="1"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="75" y="58" width="50" height="10" rx="2"/><path d="M76,68 L58,228 Q100,240 142,228 L124,68 Z"/><path d="M100,68 L100,228" stroke-width="1"/></svg>'
  },
  shirt: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M62,76 Q100,62 138,76 L142,196 Q100,207 58,196 Z"/><path d="M86,72 L100,88 L114,72"/><path d="M58,84 L32,96 L40,190 L60,182 Z"/><path d="M142,84 L168,96 L160,190 L140,182 Z"/><path d="M40,182 L60,175" stroke-width="2"/><path d="M160,182 L140,175" stroke-width="2"/><path d="M100,90 L100,200" stroke-width="1"/><circle cx="100" cy="104" r="2" fill="#5B4A3E"/><circle cx="100" cy="124" r="2" fill="#5B4A3E"/><circle cx="100" cy="144" r="2" fill="#5B4A3E"/><circle cx="100" cy="164" r="2" fill="#5B4A3E"/><circle cx="100" cy="184" r="2" fill="#5B4A3E"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M62,76 Q100,62 138,76 L142,196 Q100,207 58,196 Z"/><path d="M76,80 Q100,94 124,80"/><path d="M58,84 L32,96 L40,190 L60,182 Z"/><path d="M142,84 L168,96 L160,190 L140,182 Z"/><path d="M40,182 L60,175" stroke-width="2"/><path d="M160,182 L140,175" stroke-width="2"/></svg>'
  },
  trousers: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="72" y="55" width="56" height="10" rx="2"/><path d="M74,65 L65,232 L92,232 L98,112 Z"/><path d="M126,65 L135,232 L108,232 L102,112 Z"/><path d="M79,70 L78,228" stroke-width="1"/><path d="M121,70 L122,228" stroke-width="1"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="72" y="55" width="56" height="10" rx="2"/><path d="M74,65 L65,232 L92,232 L98,112 Z"/><path d="M126,65 L135,232 L108,232 L102,112 Z"/><path d="M78,80 Q86,86 92,80"/><path d="M122,80 Q114,86 108,80"/></svg>'
  },
  trench: {
    front: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M68,72 Q100,54 132,72 L146,238 Q100,252 54,238 Z"/><path d="M56,82 L30,96 L40,190 L58,180 Z"/><path d="M144,82 L170,96 L160,190 L142,180 Z"/><path d="M56,158 L144,158" stroke-width="2.4"/><path d="M74,66 L88,60"/><path d="M126,66 L112,60"/><path d="M76,68 L100,128 L124,68"/></svg>',
    back: '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5B4A3E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M68,72 Q100,54 132,72 L146,238 Q100,252 54,238 Z"/><path d="M56,82 L30,96 L40,190 L58,180 Z"/><path d="M144,82 L170,96 L160,190 L142,180 Z"/><path d="M56,158 L144,158" stroke-width="2.4"/><path d="M74,66 L88,60"/><path d="M126,66 L112,60"/><path d="M100,56 L100,236" stroke-dasharray="1,5"/></svg>'
  }
};

const PRODUCTS = [
  {
    id: 1, garment: 'blazer', name: 'Blazer Structuré Oversize', cat: 'Vestes', price: 245,
    badge: 'Nouveau', swatches: ['#23180F', '#CBBFAF', '#F6F2EB'],
    desc: "Un blazer à l'épaule marquée et à la coupe oversize assumée, taillé dans une toile épaisse qui garde sa tenue toute la journée. Se porte fermé en total look ou ouvert sur une pièce plus légère.",
    composition: 'Laine 68%, Polyester 30%, Élasthanne 2%. Doublure viscose. Nettoyage à sec recommandé.'
  },
  {
    id: 2, garment: 'dress', name: 'Robe Portefeuille Soie', cat: 'Robes', price: 189,
    swatches: ['#23180F', '#5B4A3E'],
    desc: "Robe portefeuille en soie fluide, nouée à la taille, qui s'ajuste à toutes les silhouettes. Une pièce intemporelle, aussi à l'aise au bureau qu'en soirée.",
    composition: 'Soie 100%. Lavage à la main ou nettoyage à sec.'
  },
  {
    id: 3, garment: 'sweater', name: 'Pull Maille Fine Col Rond', cat: 'Mailles', price: 95,
    swatches: ['#CBBFAF', '#E8DED4', '#5B4A3E'],
    desc: "Pull en maille fine à col rond, coupe légèrement ample pour un confort absolu sans sacrifier l'allure. Une base indispensable de la garde-robe Maison Eva.",
    composition: 'Laine mérinos 80%, Cachemire 20%. Lavage à la main.'
  },
  {
    id: 4, garment: 'bag', name: 'Sac Cuir Structuré', cat: 'Sacs', price: 165,
    badge: 'Nouveau', swatches: ['#5B4A3E', '#23180F'],
    desc: "Sac à main en cuir structuré, ligne épurée et anse courte pour un port à la main ou au pli du coude. La touche finale d'une tenue sobre.",
    composition: 'Cuir de vachette pleine fleur. Intérieur en toile de coton.'
  },
  {
    id: 5, garment: 'skirt', name: 'Jupe Plissée Longue', cat: 'Jupes', price: 129,
    swatches: ['#CBBFAF', '#F6F2EB'],
    desc: "Jupe longue plissée qui bouge avec le corps, taille haute pour un maintien parfait. Le plissé permanent conserve sa forme lavage après lavage.",
    composition: 'Polyester recyclé 100%. Lavage en machine à froid.'
  },
  {
    id: 6, garment: 'shirt', name: 'Chemise Popeline Ample', cat: 'Chemises', price: 89,
    swatches: ['#E8DED4', '#5B4A3E'],
    desc: "Chemise en popeline de coton, coupe ample et manches longues à poignet boutonné. Un basique repensé, à porter rentrée ou nouée à la taille.",
    composition: 'Coton 100%. Lavage en machine à 30°C.'
  },
  {
    id: 7, garment: 'trousers', name: 'Pantalon Large Taille Haute', cat: 'Pantalons', price: 135,
    swatches: ['#23180F', '#CBBFAF'],
    desc: "Pantalon large à taille haute et pinces marquées, pour une silhouette allongée. Le tombé fluide s'adapte à toutes les morphologies.",
    composition: 'Laine 72%, Viscose 26%, Élasthanne 2%. Nettoyage à sec.'
  },
  {
    id: 8, garment: 'trench', name: 'Trench Coat Ceinturé', cat: 'Vestes', price: 275,
    badge: 'Nouveau', swatches: ['#CBBFAF', '#5B4A3E'],
    desc: "Trench coat ceinturé à double revers, taillé dans un coton gabardine déperlant. La pièce de transition par excellence, saison après saison.",
    composition: 'Coton 100%, traitement déperlant. Nettoyage à sec recommandé.'
  }
];
