/* ============================================
   أيقونات تطبيقات iOS (SVG)
   كل أيقونة بمقاس 120×120 بدون زوايا دائرية؛
   الحاوية .icon-img تقصّها بزاوية iOS المستمرة.
   ============================================ */

const IOS_ICON_DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="g-weather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a63d6"/><stop offset="1" stop-color="#5cb8f7"/></linearGradient>
    <radialGradient id="g-sun" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#fff3a0"/><stop offset="1" stop-color="#ffc21a"/></radialGradient>
    <linearGradient id="g-green" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67f07e"/><stop offset="1" stop-color="#0bbd2b"/></linearGradient>
    <linearGradient id="g-blue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fb0ff"/><stop offset="1" stop-color="#0a66f5"/></linearGradient>
    <linearGradient id="g-appstore" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#19d0fd"/><stop offset="1" stop-color="#1b61f0"/></linearGradient>
    <linearGradient id="g-music" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a83"/><stop offset="1" stop-color="#fa233b"/></linearGradient>
    <linearGradient id="g-camera" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e3e8"/><stop offset="1" stop-color="#9d9da6"/></linearGradient>
    <linearGradient id="g-settings" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7a7ae"/><stop offset="1" stop-color="#6b6b72"/></linearGradient>
    <linearGradient id="g-gear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fafafc"/><stop offset="1" stop-color="#c3c3c9"/></linearGradient>
    <linearGradient id="g-compass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#37b4ff"/><stop offset="1" stop-color="#0766f3"/></linearGradient>
    <linearGradient id="g-heart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6c9a"/><stop offset="1" stop-color="#ff2750"/></linearGradient>
    <linearGradient id="g-folder-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc3ff"/><stop offset="1" stop-color="#2c8bff"/></linearGradient>
    <linearGradient id="g-wallet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d3d40"/><stop offset="1" stop-color="#1a1a1c"/></linearGradient>
    <radialGradient id="g-lens" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#5a6a9a"/><stop offset=".45" stop-color="#1b1f33"/><stop offset="1" stop-color="#050507"/></radialGradient>
  </defs>
</svg>`;

const IOS_ICONS = {
  weather: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-weather)"/>
    <circle cx="82" cy="42" r="22" fill="url(#g-sun)"/>
    <path d="M30 98a18 18 0 0 1 2-35 24 24 0 0 1 46-4 20 20 0 0 1 8 39z" fill="#fff"/>
    <text class="temp-display" x="12" y="26" fill="#fff" font-size="19" font-weight="600" font-family="-apple-system,'IBM Plex Sans Arabic',sans-serif">28°</text></svg>`,
    // أضف هذا السطر داخل مصفوفة IOS_ICONS في ملف ios-icons.js
x: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#000"/><path d="M90 25H75L55 50L35 25H20L45 57L20 95H35L57 67L80 95H95L68 60L90 25Z" fill="#fff"/></svg>`,

  clock: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#000"/>
    <circle cx="60" cy="60" r="52" fill="#fff"/>
    <g stroke="#111" stroke-linecap="round">
      ${Array.from({length: 60}, (_, i) => {
        const big = i % 5 === 0, a = i * 6 * Math.PI / 180, r1 = big ? 40 : 45.5, r2 = 49;
        return `<line x1="${(60 + Math.sin(a) * r1).toFixed(1)}" y1="${(60 - Math.cos(a) * r1).toFixed(1)}" x2="${(60 + Math.sin(a) * r2).toFixed(1)}" y2="${(60 - Math.cos(a) * r2).toFixed(1)}" stroke-width="${big ? 2.6 : 1}"/>`;
      }).join('')}
    </g>
    <g class="clock-hand hour"><rect x="57.5" y="30" width="5" height="34" rx="2.5" fill="#111"/></g>
    <g class="clock-hand minute"><rect x="58" y="16" width="4" height="48" rx="2" fill="#111"/></g>
    <g class="clock-hand second"><rect x="59.2" y="14" width="1.6" height="56" rx=".8" fill="#ff9f0a"/><circle cx="60" cy="60" r="3.2" fill="#ff9f0a"/></g></svg>`,

  calculator: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#1c1c1e"/>
    ${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => {
      const fill = c === 3 ? '#ff9f0a' : (r === 0 ? '#a5a5a5' : '#4a4a4d');
      return `<rect x="${13 + c * 24}" y="${13 + r * 24}" width="20" height="20" rx="7" fill="${fill}"/>`;
    }).join('')).join('')}</svg>`,

  photos: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#fff"/>
    <g style="isolation:isolate">
    ${['#ffbf00', '#8ed100', '#25c277', '#12b8d8', '#2f7cf6', '#9b5cf0', '#f0509a', '#ff6a2b'].map((c, i) =>
      `<ellipse cx="60" cy="38" rx="14" ry="23" fill="${c}" opacity=".92" style="mix-blend-mode:multiply" transform="rotate(${i * 45} 60 60)"/>`).join('')}
    </g></svg>`,

  camera: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-camera)"/>
    <path d="M40 34h12l4-7h14l4 7h6a14 14 0 0 1 14 14v38a14 14 0 0 1-14 14H34A14 14 0 0 1 20 86V48a14 14 0 0 1 14-14z" fill="#2b2b2e"/>
    <circle cx="60" cy="66" r="25" fill="#4a4a4f"/><circle cx="60" cy="66" r="21" fill="url(#g-lens)"/>
    <circle cx="52" cy="58" r="5" fill="#fff" opacity=".35"/>
    <circle cx="90" cy="46" r="3.5" fill="#ffd60a"/></svg>`,

  notes: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#fff"/>
    <rect width="120" height="38" fill="#ffd60a"/>
    <g stroke="#d9d9de" stroke-width="2"><line x1="14" y1="60" x2="106" y2="60"/><line x1="14" y1="78" x2="106" y2="78"/><line x1="14" y1="96" x2="106" y2="96"/></g>
    <g fill="#3a3a3c"><rect x="14" y="14" width="40" height="5" rx="2.5"/></g></svg>`,

  settings: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-settings)"/>
    <g fill="url(#g-gear)">
      ${Array.from({length: 8}, (_, i) => `<rect x="51" y="13" width="18" height="26" rx="4" transform="rotate(${i * 45} 60 60)"/>`).join('')}
      <circle cx="60" cy="60" r="37"/>
    </g>
    <circle cx="60" cy="60" r="16" fill="#8a8a91"/><circle cx="60" cy="60" r="12" fill="#6e6e75"/></svg>`,

  safari: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#fff"/>
    <circle cx="60" cy="60" r="52" fill="url(#g-compass)"/>
    <circle cx="60" cy="60" r="46" fill="none" stroke="#fff" stroke-width="1" opacity=".5"/>
    <g stroke="#fff" stroke-linecap="round">
      ${Array.from({length: 36}, (_, i) => {
        const big = i % 3 === 0, a = i * 10 * Math.PI / 180, r1 = big ? 38 : 41, r2 = 45;
        return `<line x1="${(60 + Math.sin(a) * r1).toFixed(1)}" y1="${(60 - Math.cos(a) * r1).toFixed(1)}" x2="${(60 + Math.sin(a) * r2).toFixed(1)}" y2="${(60 - Math.cos(a) * r2).toFixed(1)}" stroke-width="${big ? 1.8 : .9}"/>`;
      }).join('')}
    </g>
    <g transform="rotate(45 60 60)"><polygon points="60,22 69,60 51,60" fill="#ff3b30"/><polygon points="60,98 69,60 51,60" fill="#fff"/></g>
    <circle cx="60" cy="60" r="3" fill="#fff"/></svg>`,

  music: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-music)"/>
    <g fill="#fff">
      <polygon points="44,30 92,20 92,40 44,50"/>
      <rect x="44" y="32" width="7" height="50"/><rect x="85" y="22" width="7" height="50"/>
      <ellipse cx="36" cy="84" rx="14" ry="11" transform="rotate(-20 36 84)"/>
      <ellipse cx="77" cy="74" rx="14" ry="11" transform="rotate(-20 77 74)"/>
    </g></svg>`,

  maps: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#f3f0e8"/>
    <rect x="0" y="0" width="52" height="46" fill="#b5e0a8"/><rect x="78" y="70" width="42" height="50" fill="#b5e0a8"/>
    <path d="M-10 108L108 -6l20 20L10 128z" fill="#ffd54a"/>
    <path d="M-10 108L108 -6" stroke="#fff" stroke-width="2" stroke-dasharray="7 6" transform="translate(7 7)"/>
    <rect x="0" y="52" width="120" height="9" fill="#fff"/><rect x="62" y="0" width="9" height="120" fill="#fff"/>
    <path d="M60 24l23 68-23-15-23 15z" fill="#1a82ff" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>`,

  messages: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-green)"/>
    <path d="M60 22c-24 0-43 15-43 34 0 11 6 20 15 27-1 7-5 13-10 17 9 0 17-4 22-9 5 1 10 2 16 2 24 0 43-15 43-37S84 22 60 22z" fill="#fff"/></svg>`,

  mail: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-blue)"/>
    <rect x="18" y="32" width="84" height="58" rx="9" fill="#fff"/>
    <path d="M22 40l38 29 38-29" fill="none" stroke="#1a7cff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  whatsapp: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#25d366"/>
    <path d="M60 22C38.9 22 21.8 39.1 21.8 60.2c0 6.9 1.8 13.5 5.2 19.3L22 98l19.1-5c5.5 3 11.8 4.6 18.4 4.6 21.1 0 38.2-17.1 38.2-38.2S81.1 22 60 22zm0 69.4c-5.7 0-11.2-1.5-16-4.3l-1.1-.7-11.7 3.1 3.2-11.4-.7-1.2c-3.2-5.1-4.9-11-4.9-17.1 0-17.5 14.2-31.7 31.7-31.7s31.7 14.2 31.7 31.7-14.2 31.7-31.7 31.7zm17.4-23.7c-.9-.5-5.5-2.7-6.4-3-.9-.3-1.6-.5-2.3.5-.7 1-2.7 3.4-3.3 4.1-.6.7-1.3.8-2.2.4-1-.5-4.2-1.5-8-4.9-3-2.7-5-6-5.6-7-.6-1-.1-1.5.4-2 .4-.4.9-1 1.3-1.5.4-.5.6-.9.9-1.5.3-.6.1-1.2-.1-1.7-.3-.5-2.3-5.5-3.2-7.5-.8-1.9-1.7-1.6-2.3-1.6h-2c-.7 0-1.8.3-2.7 1.3-.9 1-3.5 3.4-3.5 8.3s3.6 9.6 4.1 10.3c.5.7 7.1 10.9 17.2 15.3 2.4 1 4.3 1.6 5.8 2.1 2.4.8 4.6.7 6.3.4 1.9-.3 5.5-2.3 6.3-4.4.8-2.1.8-3.9.6-4.3-.2-.4-.8-.7-1.7-1.2z" fill="#fff"/></svg>`,

  linkedin: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#0a66c2"/>
    <rect x="28" y="46" width="14" height="46" rx="3" fill="#fff"/>
    <circle cx="35" cy="27" r="8" fill="#fff"/>
    <path d="M58 46h13.4v6.5h.2c1.9-3.5 6.5-7.2 13.4-7.2 14.3 0 17 9.4 17 21.6V92H88.6V71.8c0-4.8-.1-11-6.7-11-6.7 0-7.7 5.2-7.7 10.6V92H58V46z" fill="#fff"/></svg>`,

  appstore: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-appstore)"/>
    <g stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none">
      <path d="M62 28L36 86"/><path d="M58 28l26 58"/><path d="M28 74h64" stroke-width="8"/>
    </g></svg>`,

  files: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#fff"/>
    <path d="M18 36a8 8 0 0 1 8-8h22l8 8h38a8 8 0 0 1 8 8v8H18z" fill="#2f86f0"/>
    <path d="M18 48a8 8 0 0 1 8-8h68a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8z" fill="url(#g-folder-f)"/></svg>`,

  health: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#fff"/>
    <path d="M60 98C20 70 14 46 24 33 34 20 52 24 60 38c8-14 26-18 36-5 10 13 4 37-36 65z" fill="url(#g-heart)"/></svg>`,

  wallet: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#000"/>
    <rect x="16" y="22" width="88" height="40" rx="9" fill="#ff9f0a"/>
    <rect x="16" y="32" width="88" height="40" rx="9" fill="#ffd60a"/>
    <rect x="16" y="42" width="88" height="40" rx="9" fill="#30d158"/>
    <rect x="16" y="52" width="88" height="40" rx="9" fill="#0a84ff"/>
    <path d="M16 68a9 9 0 0 1 9-9h70a9 9 0 0 1 9 9v26a9 9 0 0 1-9 9H25a9 9 0 0 1-9-9z" fill="url(#g-wallet)"/>
    <rect x="16" y="72" width="88" height="3" fill="#ff453a" opacity=".9"/></svg>`,

  phone: `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="url(#g-green)"/>
    <path transform="translate(15 15) scale(3.75)" fill="#fff" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`
    
};

/* يحقن الأيقونات داخل كل .icon-img حسب data-app للأب */
function renderIosIcons() {
  if (!document.getElementById('ios-icon-defs')) {
    const holder = document.createElement('div');
    holder.id = 'ios-icon-defs';
    holder.innerHTML = IOS_ICON_DEFS;
    document.body.prepend(holder);
  }
  document.querySelectorAll('.app-icon').forEach(icon => {
    const img = icon.querySelector('.icon-img');
    const svg = IOS_ICONS[icon.dataset.app];
    if (img && svg) img.innerHTML = svg;
  });
}