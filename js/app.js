(function () {
  /* opening intro: logo animates over the (veiled) site, flies into the header at ~2s, gone by ~2.5s, then flies into the header logo spot */
  (function () {
    const intro = document.querySelector('.intro'); if (!intro) return;
    const root = document.documentElement, logo = intro.querySelector('.intro__logo');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now(), MIN = 1900, TARGET = 2000, MAX = 2300;
    let gone = false;
    const finish = () => { intro.classList.add('done'); root.classList.remove('js-splash'); };
    const reveal = () => {
      if (gone) return; gone = true;
      document.dispatchEvent(new Event('mk:splashdone'));
      const target = document.querySelector('.hdr .logo__img');
      if (reduced || !target || !target.offsetWidth) { intro.classList.add('out'); intro.style.opacity = '0'; intro.style.transition = 'opacity .6s'; return setTimeout(finish, 650); }
      const a = logo.getBoundingClientRect(), b = target.getBoundingClientRect();
      const s = b.width / a.width;
      logo.style.transition = 'transform .55s cubic-bezier(.7,0,.2,1)';
      logo.style.transform = `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${s})`;
      intro.classList.add('out');
      setTimeout(() => { root.classList.remove('js-splash'); }, 530);   // header logo appears exactly as the flying logo lands
      setTimeout(finish, 600);
    };
    const ready = () => setTimeout(reveal, Math.max(0, Math.max(MIN, Math.min(TARGET, MAX)) - (performance.now() - t0)));
    if (document.readyState === 'complete') ready(); else addEventListener('load', ready, { once: true });
    setTimeout(reveal, MAX);
  })();

  const C = window.MK_CONFIG, P = window.MK_PRODUCTS, CATS = window.MK_CATEGORIES;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const img = (n, sm) => `assets/products/${n}${sm ? '-sm' : ''}.jpg`;
  const catLabel = id => (CATS.find(c => c.id === id) || {}).label || id;
  const WA_ICON = '<svg class="wa-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = n => C.currency + Number(n).toLocaleString('en-IN');
  const priceHTML = p => p.price == null ? 'Price on request'
    : money(p.price) + (p.mrp && p.mrp > p.price ? ` <s>${money(p.mrp)}</s>` : '');
  const priceText = p => p.price == null ? 'price on request' : money(p.price);
  const waLink = text => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const pageUrl = id => location.origin + location.pathname + '#p=' + id;
  const orderMsg = (p, color, size, qty, cu) => {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    let m = `Hi ${C.brand}! I'd like to order:\n\n*${p.name}*`;
    if (color) m += `\nColour: ${color}`;
    m += `\nSize: ${size || '(please help me choose)'}`;
    m += `\nQuantity: ${qty}`;
    m += `\nPrice: ${priceText(p)}${p.price != null && qty > 1 ? ` each · Total ${money(p.price * qty)}` : ''}`;
    if (cu) {
      m += `\n\n*Delivery details*\nName: ${cu.name}\nPhone: ${cu.phone}\nAddress: ${cu.address}`;
      if (cu.lat != null) m += `\nLocation: https://maps.google.com/?q=${cu.lat},${cu.lng}`;
      if (cu.note) m += `\nNote: ${cu.note}`;
    }
    if (location.protocol.startsWith('http')) m += `\n\n${pageUrl(p.id)}`;
    return m + `\n\nPlease confirm availability & delivery. Thank you!`;
  };

  /* reveal on scroll */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
  function observe(root) { $$('[data-reveal]:not(.is-in)', root).forEach(el => io ? io.observe(el) : el.classList.add('is-in')); }
  /* WhatsApp hello links */
  $$('.js-wa-hello').forEach(a => a.href = waLink(`Hi ${C.brand}! I'd like to know more about your collection.`));
  $('.js-year').textContent = new Date().getFullYear();

  /* menu */
  const burger = $('.burger');
  burger.addEventListener('click', () => { const o = document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded', o); });
  $$('.menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  /* cards */
  const card = p => `
    <article class="card" data-reveal>
      <button class="card__media" data-open="${p.id}" aria-label="View ${esc(p.name)}">
        ${p.isNew ? '<span class="badge">New</span>' : ''}
        <img src="${img(p.images[0], 1)}" alt="${esc(p.name)}" loading="lazy">
        ${p.images[1] ? `<img src="${img(p.images[1], 1)}" alt="" loading="lazy">` : ''}
      </button>
      <p class="card__cat">${catLabel(p.category)}</p>
      <button class="card__name" data-open="${p.id}">${esc(p.name)}</button>
      <p class="card__price">${priceHTML(p)}</p>
      <a class="wa-btn card__wa" data-order="${p.id}" href="${waLink(orderMsg(p))}" target="_blank" rel="noopener">${WA_ICON}<span>Order on WhatsApp</span></a>
    </article>`;

  /* categories */
  const catImg = { shirts: 'shirt-palm-pinstripe-back', tees: 'tee-rottweiler-back', jeans: 'jeans-wide-leg-blue-black', trousers: 'trouser-pleated-black-cream', 'track-pants': 'track-dragon-dagger-1' };
  $('.js-cats').innerHTML = CATS.map(c => `
    <button class="cat" data-cat="${c.id}" data-reveal><img src="${img(catImg[c.id] || P.find(p => p.category === c.id).images[0], 1)}" alt="" loading="lazy">
      <span>${c.label}<small>${P.filter(p => p.category === c.id).length} pieces →</small></span></button>`).join('');
  $('.js-foot-cats').innerHTML = CATS.map(c => `<a href="#shop" data-cat="${c.id}">${c.label}</a>`).join('');

  /* new arrivals */
  $('.js-new').innerHTML = P.filter(p => p.isNew).slice(0, 8).map(card).join('');

  /* shop + filters */
  const shop = $('.js-shop'), filters = $('.js-filters');
  filters.innerHTML = [{ id: 'all', label: 'All' }, ...CATS].map(c => `<button class="pill" role="tab" data-filter="${c.id}">${c.label}</button>`).join('');
  function renderShop(cat, animate) {
    const list = cat === 'all' ? P : P.filter(p => p.category === cat);
    $$('.pill', filters).forEach(b => b.classList.toggle('is-active', b.dataset.filter === cat));
    const go = () => {
      shop.innerHTML = list.map(card).join('');
      $('.js-count').textContent = `${list.length} piece${list.length === 1 ? '' : 's'}`;
      observe(shop); shop.classList.remove('is-filtering');
    };
    if (animate) { shop.classList.add('is-filtering'); setTimeout(go, 300); } else go();
  }
  filters.addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (b) renderShop(b.dataset.filter, true); });
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-cat]'); if (!c) return;
    e.preventDefault(); renderShop(c.dataset.cat, true);
    $('#shop').scrollIntoView({ behavior: 'smooth' });
  });
  renderShop('all');

  /* hero carousel */
  /* hero slides: product id, photo shown in the circle, and crop focus */
  const HERO = [
    { id: 'signature-script-gingham', img: 'shirt-gingham-back', pos: '50% 50%' },
    { id: 'wide-leg-denim', img: 'jeans-wide-leg-blue-black', pos: '50% 52%' },
    { id: 'phantom-smoke-tee', img: 'tee-smoke-wings-front', pos: '50% 50%' },
    { id: 'racing-raglan-tee', img: 'tee-raglan-back', pos: '50% 50%' }
  ];
  const heroItems = HERO.map(h => Object.assign({}, P.find(p => p.id === h.id), { heroImg: h.img, heroPos: h.pos })).filter(p => p.id);
  const stage = $('.stage__main');
  stage.innerHTML = heroItems.map(p => `<img src="${img(p.heroImg)}" alt="${esc(p.name)}" style="object-position:${p.heroPos}">`).join('');
  $('.js-hero-total').textContent = String(heroItems.length).padStart(2, '0');
  let hi = 0, timer;
  function showHero(i) {
    hi = (i + heroItems.length) % heroItems.length;
    const p = heroItems[hi];
    $$('img', stage).forEach((im, k) => im.classList.toggle('is-active', k === hi));
    const info = $('.hero__info'); info.classList.add('is-swapping');
    setTimeout(() => {
      $('.js-hero-idx').textContent = String(hi + 1).padStart(2, '0');
      $('.js-hero-cat').textContent = catLabel(p.category);
      $('.js-hero-name').textContent = p.name;
      $('.js-hero-price').innerHTML = priceHTML(p);
      info.classList.remove('is-swapping');
    }, 250);
    clearInterval(timer); timer = setInterval(() => showHero(hi + 1), 5000);
  }
  $('.js-hero-prev').onclick = () => showHero(hi - 1);
  $('.js-hero-next').onclick = () => showHero(hi + 1);
  $$('.js-hero-open').forEach(b => b.onclick = () => openProduct(heroItems[hi].id));
  showHero(0);
  document.addEventListener('mk:splashdone', () => showHero(0)); // start the slideshow fresh once the intro clears

  /* product modal */
  const modal = $('.modal');
  let cur = null, imgIdx = 0, selColor = null, selSize = null, lastFocus = null;
  function setImg(i) {
    imgIdx = (i + cur.images.length) % cur.images.length;
    $('.js-pm-img').src = img(cur.images[imgIdx]);
    $('.js-pm-img').alt = `${cur.name} — photo ${imgIdx + 1}`;
    $$('.js-pm-thumbs button').forEach((b, k) => b.classList.toggle('is-active', k === imgIdx));
  }
  function updateWa() {
    $('.js-pm-wa').href = waLink(orderMsg(cur, selColor, selSize));
    $('.js-pm-color').textContent = selColor || '';
    $('.js-pm-size').textContent = selSize || 'select';
  }
  function openProduct(id) {
    const p = P.find(x => x.id === id); if (!p) return;
    cur = p; selColor = p.colors && p.colors.length ? p.colors[0] : null; selSize = null;
    lastFocus = document.activeElement;
    $('.js-pm-cat').textContent = catLabel(p.category);
    $('#pm-name').textContent = p.name;
    $('.js-pm-price').innerHTML = priceHTML(p);
    $('.js-pm-tag').textContent = p.tagline || '';
    $('.js-pm-desc').textContent = p.description || '';
    $('.js-pm-details').innerHTML = (p.details || []).map(d => `<li>${esc(d)}</li>`).join('');
    const multi = p.images.length > 1;
    $$('.pm__arrow').forEach(b => b.hidden = !multi);
    $('.js-pm-thumbs').innerHTML = multi ? p.images.map((n, k) => `<button data-i="${k}" aria-label="Photo ${k + 1}"><img src="${img(n, 1)}" alt=""></button>`).join('') : '';
    $('.js-pm-colors-wrap').hidden = !(p.colors && p.colors.length);
    $('.js-pm-colors').innerHTML = (p.colors || []).map(c => `<button class="chip${c === selColor ? ' is-active' : ''}" data-color="${esc(c)}">${esc(c)}</button>`).join('');
    $('.js-pm-sizes').innerHTML = (p.sizes || []).map(s => `<button class="chip" data-size="${s}">${s}</button>`).join('');
    setImg(0); updateWa();
    modal.hidden = false; document.body.classList.add('no-scroll');
    $('.modal__panel').scrollTop = 0; $('.modal__close').focus();
    if (location.hash !== '#p=' + id) history.replaceState(null, '', '#p=' + id);
  }
  function closeModal() {
    modal.hidden = true; document.body.classList.remove('no-scroll');
    if (location.hash.startsWith('#p=')) history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); openProduct(o.dataset.open); } });
  modal.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return closeModal();
    const t = e.target.closest('[data-i]'); if (t) return setImg(+t.dataset.i);
    const c = e.target.closest('[data-color]');
    if (c) { selColor = c.dataset.color; $$('[data-color]', modal).forEach(b => b.classList.toggle('is-active', b === c)); updateWa(); }
    const s = e.target.closest('[data-size]');
    if (s) { selSize = s.dataset.size; $$('[data-size]', modal).forEach(b => b.classList.toggle('is-active', b === s)); updateWa(); }
  });
  $('.js-pm-prev').onclick = () => setImg(imgIdx - 1);
  $('.js-pm-next').onclick = () => setImg(imgIdx + 1);
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') setImg(imgIdx - 1);
    if (e.key === 'ArrowRight') setImg(imgIdx + 1);
  });
  let sx = null; const main = $('.pm__main');
  main.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  main.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) setImg(imgIdx + (dx < 0 ? 1 : -1)); sx = null; });
  /* ---------- order flow: size first, then "Your details" sheet, then WhatsApp ---------- */
  const sheet = $('.ofm'), form = $('.js-ofm-form'), CU_KEY = 'mk_customer';
  let geo = null;
  const loadCu = () => { try { return JSON.parse(localStorage.getItem(CU_KEY)) || {}; } catch (e) { return {}; } };
  function needSize() {
    const wrap = $('.js-pm-sizes').closest('.pm__opt');
    wrap.classList.remove('is-error'); void wrap.offsetWidth; wrap.classList.add('is-error');
    $('.js-pm-size').textContent = 'please select a size';
    wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function renderSheetOpts() {
    const multi = cur.colors && cur.colors.length > 1;
    $('.js-ofm-colors-wrap').hidden = !multi;
    $('.js-ofm-colors').innerHTML = multi ? cur.colors.map(c => `<button type="button" class="chip${c === selColor ? ' is-active' : ''}" data-ofm-color="${esc(c)}">${esc(c)}</button>`).join('') : '';
    $('.js-ofm-sizes').innerHTML = (cur.sizes || []).map(s => `<button type="button" class="chip${s === selSize ? ' is-active' : ''}" data-ofm-size="${s}">${s}</button>`).join('');
    $('.js-ofm-item').innerHTML = `<b>${esc(cur.name)}</b><span>${[selColor, selSize ? 'Size ' + selSize : ''].filter(Boolean).map(esc).join(' · ')}${selColor || selSize ? ' · ' : ''}${priceHTML(cur)}</span>`;
  }
  function openSheet() {
    const cu = loadCu();
    form.name.value = cu.name || ''; form.phone.value = cu.phone || ''; form.address.value = cu.address || '';
    form.note.value = ''; form.qty.value = 1;
    geo = cu.lat != null ? { lat: cu.lat, lng: cu.lng } : null;
    $('.js-ofm-geo-msg').textContent = geo ? 'Saved location will be shared.' : '';
    $$('.ofm__field', sheet).forEach(f => f.classList.remove('is-invalid'));
    renderSheetOpts();
    sheet.hidden = false;
    setTimeout(() => (form.name.value ? form.address : form.name).focus({ preventScroll: true }), 50);
  }
  const closeSheet = () => { sheet.hidden = true; };
  $('.js-pm-wa').addEventListener('click', e => { e.preventDefault(); openSheet(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-order]'); if (!b) return;
    e.preventDefault();
    const p = P.find(x => x.id === b.dataset.order); if (!p) return;
    if (modal.hidden || cur !== p) { cur = p; selColor = p.colors && p.colors.length ? p.colors[0] : null; selSize = null; }
    openSheet();
  });
  sheet.addEventListener('click', e => {
    if (e.target.closest('[data-ofm-close]')) return closeSheet();
    const s = e.target.closest('[data-ofm-size]'), c = e.target.closest('[data-ofm-color]');
    if (s) { selSize = s.dataset.ofmSize; $('[data-field=size]', sheet).classList.remove('is-invalid'); }
    if (c) selColor = c.dataset.ofmColor;
    if (s || c) {
      renderSheetOpts();
      if (!modal.hidden) { $$('[data-size]', modal).forEach(b => b.classList.toggle('is-active', b.dataset.size === selSize)); $$('[data-color]', modal).forEach(b => b.classList.toggle('is-active', b.dataset.color === selColor)); updateWa(); }
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { e.stopImmediatePropagation(); closeSheet(); } }, true);
  $('.js-ofm-qty-minus').onclick = () => form.qty.value = Math.max(1, (+form.qty.value || 1) - 1);
  $('.js-ofm-qty-plus').onclick = () => form.qty.value = Math.min(20, (+form.qty.value || 1) + 1);
  form.addEventListener('input', e => { const f = e.target.closest('.ofm__field'); if (f) f.classList.remove('is-invalid'); });
  form.phone.addEventListener('input', () => { form.phone.value = form.phone.value.replace(/[^0-9+ ]/g, ''); });

  /* current location → address (OpenStreetMap Nominatim) + Google Maps link */
  $('.js-ofm-geo').addEventListener('click', () => {
    const msg = $('.js-ofm-geo-msg'), btn = $('.js-ofm-geo');
    if (!('geolocation' in navigator)) { msg.textContent = 'Location is not supported on this device — please type your address.'; return; }
    btn.disabled = true; btn.classList.add('is-loading'); msg.textContent = 'Getting your location…';
    navigator.geolocation.getCurrentPosition(async pos => {
      geo = { lat: +pos.coords.latitude.toFixed(6), lng: +pos.coords.longitude.toFixed(6) };
      msg.textContent = 'Location found. Looking up the address…';
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${geo.lat}&lon=${geo.lng}&addressdetails=1&accept-language=en`, { headers: { Accept: 'application/json' } });
        const d = await r.json(); const ad = d.address || {};
        const parts = [ad.house_number && ad.road ? ad.house_number + ' ' + ad.road : ad.road, ad.neighbourhood || ad.suburb, ad.city || ad.town || ad.village || ad.county, ad.state, ad.postcode].filter(Boolean);
        const text = parts.length ? [...new Set(parts)].join(', ') : (d.display_name || '');
        if (text) { form.address.value = text; form.address.closest('.ofm__field').classList.remove('is-invalid'); }
        msg.textContent = 'Address filled from your location — please add house/flat no. and check it.';
      } catch (err) {
        msg.textContent = 'Location saved (map link will be shared), but the address lookup failed — please type your address.';
      }
      btn.disabled = false; btn.classList.remove('is-loading');
    }, err => {
      geo = null; btn.disabled = false; btn.classList.remove('is-loading');
      msg.textContent = err.code === 1 ? 'Location permission denied — please type your address.' : 'Could not get your location — please type your address.';
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = {
      name: form.name.value.trim().replace(/\s+/g, ' '),
      phone: form.phone.value.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, ''),
      address: form.address.value.trim().replace(/\s*\n\s*/g, ', '),
      note: form.note.value.trim(), qty: Math.max(1, Math.min(20, parseInt(form.qty.value, 10) || 1))
    };
    const bad = [];
    if (!selSize) bad.push('size');
    if (v.name.length < 2) bad.push('name');
    if (!/^[6-9]\d{9}$/.test(v.phone)) bad.push('phone');
    if (v.address.length < 10 || !/\b\d{6}\b/.test(v.address)) bad.push('address');
    $$('.ofm__field', sheet).forEach(f => f.classList.toggle('is-invalid', bad.includes(f.dataset.field)));
    if (bad.length) { if (bad[0] === 'size') $('[data-field=size]', sheet).scrollIntoView({ behavior: 'smooth', block: 'center' }); else form[bad[0]].focus(); return; }
    const cu = { name: v.name, phone: v.phone, address: v.address, note: v.note, lat: geo ? geo.lat : null, lng: geo ? geo.lng : null };
    try { localStorage.setItem(CU_KEY, JSON.stringify({ name: cu.name, phone: cu.phone, address: cu.address, lat: cu.lat, lng: cu.lng })); } catch (err) {}
    const url = waLink(orderMsg(cur, selColor, selSize, v.qty, cu));
    const w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (err) {} } else location.href = url;
    closeSheet();
  });

  const fromHash = () => { const m = location.hash.match(/^#p=(.+)$/); if (m) openProduct(decodeURIComponent(m[1])); };
  window.addEventListener('hashchange', fromHash); fromHash();

  observe(document);
  /* floating WhatsApp: hide while the CTA band / footer (which have their own WhatsApp buttons) are on screen */
  const fab = $('.wa-fab'), zones = new Set();
  if ('IntersectionObserver' in window) {
    const zio = new IntersectionObserver(es => { es.forEach(en => en.isIntersecting ? zones.add(en.target) : zones.delete(en.target)); fab.classList.toggle('is-hidden', zones.size > 0); });
    $$('.cta-band, .footer').forEach(el => zio.observe(el));
  }
})();
