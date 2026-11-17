/* ============================================
   iOS Simulator - JavaScript Application
   Professional iPhone Experience
   ============================================ */

const LOCALE = 'ar-SA-u-ca-gregory-nu-latn';

// App Data - Added WhatsApp, LinkedIn, and X (Twitter)
const appData = {
    weather: { name: 'الطقس', url: 'weather-app.html', color: '#47bfff' },
    clock: { name: 'الساعة', url: 'apps/clock.html', color: '#000000' },
    calculator: { name: 'الآلة الحاسبة', url: 'apps/calculator.html', color: '#1a1a1a' },
    photos: { name: 'الصور', url: 'apps/photos.html', color: '#ff6b6b' },
    camera: { name: 'الكاميرا', url: 'apps/camera.html', color: '#3a3a3a' },
    notes: { name: 'الملاحظات', url: 'apps/notes.html', color: '#fff176' },
    settings: { name: 'الإعدادات', url: 'apps/settings.html', color: '#8e8e93' },
    safari: { name: 'Safari', url: 'apps/safari.html', color: '#007aff' },
    music: { name: 'الموسيقى', url: 'apps/music.html', color: '#fc5c7d' },
    maps: { name: 'الخرائط', url: 'apps/maps.html', color: '#34c759' },
    messages: { name: 'الرسائل', url: 'apps/messages.html', color: '#34c759' },
    mail: { name: 'البريد', url: 'apps/mail.html', color: '#007aff' },
    whatsapp: { name: 'WhatsApp', url: 'apps/whatsapp.html', color: '#25d366' },
    linkedin: { name: 'LinkedIn', url: 'apps/linkedin.html', color: '#0a66c2' },
    x: { name: 'X', url: 'apps/x.html', color: '#000000' },
    appstore: { name: 'App Store', url: 'apps/appstore.html', color: '#007aff' },
    files: { name: 'الملفات', url: 'apps/files.html', color: '#007aff' },
    health: { name: 'الصحة', url: 'apps/health.html', color: '#ff2d55' },
    wallet: { name: 'المحفظة', url: 'apps/wallet.html', color: '#1c1c1e' },
    phone: { name: 'الهاتف', url: null, color: '#34c759' }
};

// DOM Elements
const elements = {
    lockScreen: document.getElementById('lock-screen'),
    homeScreen: document.getElementById('home-screen'),
    appView: document.getElementById('app-view'),
    appIframe: document.getElementById('app-iframe'),
    appLoading: document.getElementById('app-loading'),
    controlCenter: document.getElementById('control-center'),
    lockTime: document.getElementById('lock-time'),
    lockDate: document.getElementById('lock-date'),
    statusTime: document.getElementById('status-time'),
    dynamicIsland: document.getElementById('dynamic-island'),
    islandIndicator: document.getElementById('island-indicator'),
    homeIndicator: document.getElementById('home-indicator'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

let isLocked = true;
let isInApp = false;
let isControlCenterOpen = false;
let currentApp = null;
let touchStartY = 0;
let breakNewsTimer = null; // مؤقت خبر عاجل X

function init() {
    if (typeof renderIosIcons === 'function') renderIosIcons();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateClockIcon();
    setInterval(updateClockIcon, 1000);
    setupEventListeners();
    showLockScreen();
    
    // حقن أنماط الانتقال السلس للخروج والدخول
    injectSmoothTransitionsCSS();
}

function injectSmoothTransitionsCSS() {
    if (document.getElementById('smooth-transitions-style')) return;
    const style = document.createElement('style');
    style.id = 'smooth-transitions-style';
    style.textContent = `
        .app-view {
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            opacity: 0;
            transform: scale(0.95);
            pointer-events: none;
        }
        .app-view.active-smooth {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
}

function updateDateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    if (elements.lockTime) elements.lockTime.textContent = timeStr;
    if (elements.statusTime) elements.statusTime.textContent = timeStr;
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString(LOCALE, options);
    if (elements.lockDate) elements.lockDate.textContent = dateStr;
}

function updateClockIcon() {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes() + sec / 60;
    const hr = (now.getHours() % 12) + min / 60;

    const setHand = (sel, deg) => {
        const el = document.querySelector(sel);
        if (el) el.setAttribute('transform', `rotate(${deg} 60 60)`);
    };
    setHand('.clock-hand.hour', hr * 30);
    setHand('.clock-hand.minute', min * 6);
    setHand('.clock-hand.second', sec * 6);
}

function setupEventListeners() {
    elements.lockScreen?.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
    elements.lockScreen?.addEventListener('touchend', (e) => {
        if (touchStartY - e.changedTouches[0].clientY > 100) unlock();
    });
    
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const appId = icon.dataset.app;
            if (appId) openApp(appId);
        });
    });
    
    elements.homeIndicator?.addEventListener('click', goHome);
    elements.homeIndicator?.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
    elements.homeIndicator?.addEventListener('touchend', (e) => {
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (diff > 50 && !isInApp) openControlCenter();
        else if (isInApp) goHome();
    });
    
    elements.controlCenter?.addEventListener('click', (e) => {
        if (e.target === elements.controlCenter) closeControlCenter();
    });
    
    document.querySelector('.control-handle')?.addEventListener('click', closeControlCenter);
    setupControlButtons();
    document.addEventListener('keydown', handleKeyboard);
    
    elements.appIframe?.addEventListener('load', () => {
        setTimeout(() => {
            if (elements.appLoading) elements.appLoading.style.display = 'none';
        }, 300);
    });
}

function handleKeyboard(e) {
    if (e.key === 'Escape') {
        if (isControlCenterOpen) closeControlCenter();
        else if (isInApp) goHome();
    }
    if (e.key === 'Enter' && isLocked) unlock();
}

function showLockScreen() {
    isLocked = true;
    elements.lockScreen.style.display = 'flex';
    elements.lockScreen.classList.remove('unlocking');
    elements.homeScreen.style.display = 'none';
    elements.appView.style.display = 'none';
    elements.appView.classList.remove('active-smooth');
    
    if (breakNewsTimer) clearTimeout(breakNewsTimer);
}

function unlock() {
    if (!isLocked) return;
    elements.lockScreen.classList.add('unlocking');
    setTimeout(() => {
        isLocked = false;
        elements.lockScreen.style.display = 'none';
        elements.homeScreen.style.display = 'flex';
        
        startBreakingNewsTimer();
    }, 500);
}

// جدولة تنبيه خبر سرقة الشركة والهروب بعد دقيقة
function startBreakingNewsTimer() {
    if (breakNewsTimer) return;
    
    breakNewsTimer = setTimeout(() => {
        const xIcon = document.querySelector('.app-icon[data-app="x"]');
        if (xIcon) {
            let badge = xIcon.querySelector('.notification-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'notification-badge';
                badge.textContent = '1';
                xIcon.appendChild(badge);
            } else {
                badge.textContent = parseInt(badge.textContent || '0') + 1;
            }
        }
        
        showXNotificationBanner(
            'عاجل • X',
            'مقيم يقوم بسرقة مبلغ 1.50 مليون ريال من شركة سعودية ويهرب الى وجهة غير معلومة!'
        );
    }, 60000);
}

// عرض إشعار بانر منبثق يشبه iOS
function showXNotificationBanner(title, body) {
    const existingBanner = document.getElementById('ios-notification-banner');
    if (existingBanner) existingBanner.remove();

    const banner = document.createElement('div');
    banner.id = 'ios-notification-banner';
    banner.style.cssText = `
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        background: rgba(30, 30, 30, 0.9);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 0.5px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 14px 16px;
        color: #fff;
        z-index: 99999;
        box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        cursor: pointer;
        animation: slideDownBanner 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        font-family: -apple-system, 'IBM Plex Sans Arabic', sans-serif;
    `;

    banner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 14px; background: #000; width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 0.5px solid #444;">𝕏</span>
                <span style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9);">${title}</span>
            </div>
            <span style="font-size: 11px; color: rgba(255,255,255,0.5);">الآن</span>
        </div>
        <div style="font-size: 14px; font-weight: 500; line-height: 1.4; color: #e5e5ea;">${body}</div>
    `;

    if (!document.getElementById('banner-keyframes')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'banner-keyframes';
        styleSheet.textContent = `
            @keyframes slideDownBanner {
                from { transform: translateY(-100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    banner.addEventListener('click', () => {
        banner.remove();
        if (isInApp) {
            goHome();
        }
        setTimeout(() => {
            openApp('x');
        }, 250);
    });

    const screenEl = document.getElementById('screen');
    if (screenEl) {
        screenEl.appendChild(banner);
        setTimeout(() => {
            if (banner.parentNode) {
                banner.style.transition = 'all 0.3s ease';
                banner.style.transform = 'translateY(-100px)';
                banner.style.opacity = '0';
                setTimeout(() => banner.remove(), 300);
            }
        }, 6000);
    }
}

function unlockAndOpen(appId) {
    if (isLocked) {
        unlock();
    }
    setTimeout(() => {
        openApp(appId);
    }, 450);
}

function openApp(appId) {
    const app = appData[appId];
    if (!app) return;
    currentApp = appId;
    
    if (app.url) {
        isInApp = true;
        elements.appView.style.display = 'block';
        elements.appLoading.style.display = 'flex';
        elements.appLoading.querySelector('.app-loading-icon').style.borderTopColor = app.color;
        elements.appLoading.querySelector('p').textContent = `جارٍ فتح ${app.name}…`;
        elements.appIframe.src = app.url;
        
        // تطبيق الانتقال السلس للدخول
        setTimeout(() => {
            elements.appView.classList.add('active-smooth');
        }, 20);
        
        elements.islandIndicator?.classList.add('active');
    } else {
        showToast(`📱 ${app.name} - قريباً!`);
    }
}

// دالة العودة للشاشة الرئيسية بانسيابية تامة وسلسة
function goHome() {
    if (!isInApp) {
        if (isControlCenterOpen) closeControlCenter();
        return;
    }
    
    // إخفاء حركة الانتقال بسلاسة أولاً
    elements.appView.classList.remove('active-smooth');
    
    setTimeout(() => {
        isInApp = false;
        currentApp = null;
        elements.appView.style.display = 'none';
        elements.appIframe.src = '';
        elements.islandIndicator?.classList.remove('active');
    }, 300); // يتطابق مع مدة الانتقال في الـ CSS
}

function openControlCenter() {
    if (isControlCenterOpen) return;
    isControlCenterOpen = true;
    elements.controlCenter.classList.add('active');
    elements.dynamicIsland.classList.add('expanded');
}

function closeControlCenter() {
    if (!isControlCenterOpen) return;
    isControlCenterOpen = false;
    elements.controlCenter.classList.remove('active');
    elements.dynamicIsland.classList.remove('expanded');
}

function setupControlButtons() {
    document.getElementById('wifi-btn')?.addEventListener('click', function() {
        this.classList.toggle('active');
        showToast(this.classList.contains('active') ? '📶 الواي فاي مفعّل' : '📵 الواي فاي متوقف');
    });
    document.getElementById('bluetooth-btn')?.addEventListener('click', function() {
        this.classList.toggle('active');
        showToast(this.classList.contains('active') ? '🔵 البلوتوث مفعّل' : '⚪ البلوتوث متوقف');
    });
    document.getElementById('airplane-btn')?.addEventListener('click', function() {
        this.classList.toggle('active');
        showToast(this.classList.contains('active') ? '✈️ وضع الطيران مفعّل' : '📱 وضع الطيران متوقف');
    });
    document.getElementById('flashlight-btn')?.addEventListener('click', function() {
        this.classList.toggle('active');
        showToast(this.classList.contains('active') ? '🔦 الكشاف مفعّل' : '🔦 الكشاف متوقف');
    });
}

function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), 2000);
}

document.addEventListener('DOMContentLoaded', init);