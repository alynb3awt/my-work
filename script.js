// ==========================================================================
// AL-HORIZON ADVANCED COMPANY - JAVASCRIPT LOGIC
// ==========================================================================

const productsData = {
  laptop: {
    name: 'أفق بوك برو (Ofok Book Pro)',
    tag: 'لابتوب فائق الأداء',
    price: '4,999 ريال',
    image: 'product_laptop.jpg',
    desc: 'صُمم للمحترفين والمطورين. مزود بمعالج الأفق M3 الخارق ذو الـ 16 نواة، وهيكل من الألمنيوم الفضائي الفاخر، وشاشة تدعم تقنية Liquid Retina XDR مع معدل تحديث 120Hz.',
    specs: [
      '⚡ معالج M3 ذو 16 نواة للأداء الفائق',
      '🔋 بطارية تدوم حتى 18 ساعة عمل متواصل',
      '💾 32 جيجابايت ذاكرة موحدة فائقة السرعة',
      '🚀 وحدة تخزين 1 تيرابايت NVMe SSD فائقة السرعة',
      '🖥️ شاشة 16 بوصة Liquid Retina XDR بدقة 4K'
    ]
  },
  phone: {
    name: 'أفق فون 15 تيتانيوم (Ofok Phone 15)',
    tag: 'الهاتف الأذكى في العالم',
    price: '3,499 ريال',
    image: 'product_phone.jpg',
    desc: 'هيكل مسبوك من التيتانيوم خفيف الوزن وفائق المتانة. مع نظام كاميرات احترافي بدقة 200 ميغابكسل وتقريب بصري 10x وشاشة OLED بحواف شبه معدومة.',
    specs: [
      '📱 شاشة OLED Super Retina XDR مقاس 6.7 بوصة',
      '📸 كاميرا ثلاثية بدقة 200 ميغابكسل مع تصوير ليلي سينمائي',
      '⚡ معالج A17 Pro بتكنولوجيا 3 نانومتر',
      '📶 دعم شبكات الجيل الخامس 5G والاتصال بالأقمار الصناعية',
      '🛡️ حماية درع السيراميك ومقاومة الماء والغبار بمعيار IP68'
    ]
  },
  earbuds: {
    name: 'أفق بودز برو (Ofok Pods Pro)',
    tag: 'صوت مكاني ثلاثي الأبعاد',
    price: '699 ريال',
    image: 'product_earbuds.jpg',
    desc: 'استمتع بعزل ضوضاء ثوري يصل إلى ضعف الجيل السابق، وصوت مكاني مخصص يتتبع حركة الرأس لتجربة استماع ساحرة ومحيطية.',
    specs: [
      '🎧 إلغاء ضوضاء نشط مضاعف (ANC 2.0)',
      '🎵 صوت مكاني تفاعلي Spatial Audio',
      '🔋 36 ساعة من الاستماع مع علبة الشحن MagSafe',
      '💧 مقاومة للماء والتعرق بمعيار IPX5',
      '🎙️ ميكروفونات موجهة لعزل صوت الرياح أثناء المكالمات'
    ]
  },
  watch: {
    name: 'أفق ووتش Ultra (Ofok Watch Ultra)',
    tag: 'الساعة الرياضية الأكثر صلابة',
    price: '1,299 ريال',
    image: 'product_watch.jpg',
    desc: 'صُممت للمغامرين ومحبي الرياضة. علبة من التيتانيوم قياس 49 مم، مقاومة للماء حتى عمق 100 متر، وشاشة شديدة السطوع تصل إلى 3000 شمعة.',
    specs: [
      '⌚ هيكل تيتانيوم صلب وزجاج ياقوتي مقاوم للخدش',
      '🧭 نظام GPS مزدوج التردد بدقة استثنائية',
      '❤️ حساسات متقدمة لنبضات القلب وتخطيط ECG ونسبة الأكسجين',
      '🏊 مقاومة الماء حتى عمق 100 متر مع معيار الغوص EN13319',
      '🔋 عمر بطارية يصل إلى 72 ساعة في نمط توفير الطاقة'
    ]
  }
};

// Scroll to products smoothly
function scrollToProducts() {
  const section = document.getElementById('products');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Global active toast timer
let toastTimer = null;

// Show Apple Dynamic Island Top Toast
function showTopToast(message) {
  const toast = document.getElementById('topToast');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message || 'هذا عمل مشروع فقط ما تحتاج تشتري 😉';
  toast.classList.add('active');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    hideTopToast();
  }, 6000);
}

function hideTopToast() {
  const toast = document.getElementById('topToast');
  if (toast) toast.classList.remove('active');
}

// Start Apple Checkout flow
function startCheckout(productKey) {
  let p = productsData[productKey];
  if (!p) {
    // If passed a name string directly
    const keys = Object.keys(productsData);
    p = productsData[keys[0]];
  }

  // Set checkout modal data
  const imgEl = document.getElementById('checkoutProdImg');
  const nameEl = document.getElementById('checkoutProdName');
  const descEl = document.getElementById('checkoutProdDesc');
  const priceEl = document.getElementById('checkoutProdPrice');
  const banner = document.getElementById('modalNoticeBanner');

  if (imgEl) {
    imgEl.src = p.image;
    imgEl.alt = p.name;
  }
  if (nameEl) nameEl.textContent = p.name;
  if (descEl) descEl.textContent = p.tag || 'تقنية متطورة فائقة الأداء';
  if (priceEl) priceEl.textContent = p.price;

  // Reset payment option selections and notice
  document.querySelectorAll('.pay-option').forEach(opt => opt.classList.remove('selected'));
  if (banner) banner.style.display = 'none';

  // Close other modals
  closeProductModal();
  
  // Open checkout modal
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) checkoutModal.classList.add('active');
}

// Fallback for buyProduct buttons
function buyProduct(nameOrKey, price) {
  if (productsData[nameOrKey]) {
    startCheckout(nameOrKey);
    return;
  }
  // Find matching key
  for (const k in productsData) {
    if (productsData[k].name.includes(nameOrKey) || nameOrKey.includes(productsData[k].name.split(' ')[0])) {
      startCheckout(k);
      return;
    }
  }
  startCheckout('laptop');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}

// Handle payment method selection
function handlePaymentSelect(methodName) {
  // Highlight selected option
  document.querySelectorAll('.pay-option').forEach(opt => opt.classList.remove('selected'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('selected');
  }

  // 1. Show the Top Toast notification as requested
  showTopToast('هذا عمل مشروع فقط ما تحتاج تشتري 😉');

  // 2. Show in-modal notice banner
  const banner = document.getElementById('modalNoticeBanner');
  if (banner) {
    banner.style.display = 'flex';
  }
}

// Open product quick view modal
function openProduct(key) {
  const p = productsData[key];
  if (!p) return;

  document.getElementById('pmImage').src = p.image;
  document.getElementById('pmImage').alt = p.name;
  document.getElementById('pmTag').textContent = p.tag;
  document.getElementById('pmTitle').textContent = p.name;
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmPrice').textContent = p.price;

  const specsList = document.getElementById('pmSpecs');
  specsList.innerHTML = '';
  p.specs.forEach(spec => {
    const item = document.createElement('div');
    item.className = 'pm-spec-item';
    item.textContent = spec;
    specsList.appendChild(item);
  });

  const buyBtn = document.getElementById('pmBuyBtn');
  buyBtn.onclick = () => {
    closeProductModal();
    startCheckout(key);
  };

  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

// Contact modal handlers
function showContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.add('active');
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('active');
}

function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  closeContactModal();
  showTopToast(`شكراً يا ${name}! هذا عمل مشروع فقط ما تحتاج تشتري 😉`);
}

// Navbar hamburger toggle for mobile
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCheckoutModal();
      closeProductModal();
      closeContactModal();
      hideTopToast();
    }
  });
});