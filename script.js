/* Bambu Studio — sabitlenmis hikaye sahnesi
   Sahne araliklari .10k-flow/design-package.md Bolum 9'daki olculmus
   kesisim haritalarindan gelir. Araliklar sirali ve karsilikli dislayicidir. */
(function () {
  'use strict';

  /* ====== DEGISTIRILECEK TEK SATIR: WhatsApp numarasi ====== */
  var WA = '905307160658';           // ulke kodu + numara, bosluk ve isaret yok
  /* ========================================================= */

  var track = document.getElementById('track');
  var stage = document.getElementById('stage');
  var video = document.getElementById('hero');
  var beats = Array.prototype.slice.call(document.querySelectorAll('[data-start]'));

  var STATIC = window.matchMedia(
    '(max-width:960px),(prefers-reduced-motion:reduce),(pointer:coarse)'
  );

  /* ---------- WhatsApp baglantilari ---------- */
  var MSG = {
    filiz: 'Merhaba, FILIZ paketi (aylik 1.099 TL) icin bilgi almak istiyorum.',
    govde: 'Merhaba, GOVDE paketi (aylik 1.999 TL) icin bilgi almak istiyorum.',
    orman: 'Merhaba, ORMAN paketi (aylik 3.499 TL) icin bilgi almak istiyorum.'
  };
  function wa(text) {
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
  }
  var cta = document.getElementById('cta');
  var cta2 = document.getElementById('cta2link');
  if (cta2) cta2.href = wa('Merhaba, Bambu Studio hizmetleri icin bilgi almak istiyorum.');
  var telline = document.getElementById('telline');
  if (telline && WA !== '905000000000') {
    telline.textContent = 'WHATSAPP / +90 530 716 06 58';
    telline.href = wa('Merhaba, Bambu Studio hizmetleri icin bilgi almak istiyorum.');
  }

  /* ---------- paket secici, sitedeki tek etkilesim ---------- */
  var current = 'filiz';
  function selectPk(key) {
    current = key;
    document.querySelectorAll('.pk').forEach(function (b) {
      var on = b.dataset.pk === key;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('.pkd').forEach(function (d) {
      d.classList.toggle('is-on', d.dataset.pk === key);
    });
    if (cta) cta.href = wa(MSG[key]);
  }
  document.querySelectorAll('.pk').forEach(function (b) {
    b.addEventListener('click', function () { selectPk(b.dataset.pk); });
    b.addEventListener('mouseenter', function () { if (!STATIC.matches) selectPk(b.dataset.pk); });
    b.addEventListener('focus', function () { selectPk(b.dataset.pk); });
  });
  selectPk('filiz');

  /* ---------- video hazir / olu ---------- */
  var duration = 24;
  function markReady() {
    if (video.duration && isFinite(video.duration)) duration = video.duration;
    stage.classList.add('ready');
  }
  video.addEventListener('loadedmetadata', markReady);
  video.addEventListener('canplay', markReady);
  video.addEventListener('error', function () { stage.classList.add('dead'); });
  if (video.readyState >= 1) markReady();

  /* ---------- sahne gorunurlugu ---------- */
  /* Opaklik scroll pozisyonundan hesaplanir. Rampa her sahnenin KENDI
     araligi icinde kalir ve sahneler arasinda en az 0.4 saniyelik bos
     aralik vardir, bu yuzden iki sahnenin opakligi asla ayni anda sifirdan
     buyuk olamaz. Dislayicilik yapisal olarak garantidir. */
  var RAMP = 0.25;
  var state = [];
  function applyBeats(t) {
    for (var i = 0; i < beats.length; i++) {
      var el = beats[i];
      var a = parseFloat(el.dataset.start), b = parseFloat(el.dataset.end);
      var op = Math.min((t - a) / RAMP, (b - t) / RAMP);
      op = op < 0 ? 0 : op > 1 ? 1 : op;
      if (state[i] === op) continue;
      var wasOn = state[i] > 0;
      state[i] = op;
      el.style.setProperty('--op', op);
      el.style.opacity = op;
      if ((op > 0) !== wasOn) {
        el.style.visibility = op > 0 ? 'visible' : 'hidden';
        el.setAttribute('aria-hidden', op > 0 ? 'false' : 'true');
        if ('inert' in el) el.inert = op === 0;
      }
    }
  }

  /* ---------- scroll kaydirma ---------- */
  var seeking = false, want = 0, raf = 0;
  video.addEventListener('seeking', function () { seeking = true; });
  video.addEventListener('seeked', function () { seeking = false; });

  function progress() {
    var max = track.offsetHeight - window.innerHeight;
    if (max <= 0) return 0;
    var p = (window.scrollY - track.offsetTop) / max;
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }

  function frame() {
    raf = 0;
    var t = 0.25 + progress() * (duration - 0.25);
    applyBeats(t);
    want = t;
    if (!seeking && video.readyState >= 1 &&
        Math.abs(video.currentTime - want) > 0.02) {
      try { video.currentTime = want; } catch (e) { /* seek edilemedi, bir sonraki karede */ }
    }
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }

  function enable() {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }
  function disable() {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    beats.forEach(function (el, i) {
      state[i] = undefined;
      el.style.removeProperty('--op');
      el.style.removeProperty('opacity');
      el.style.removeProperty('visibility');
      el.removeAttribute('aria-hidden');
      if ('inert' in el) el.inert = false;
    });
  }

  function sync() { if (STATIC.matches) disable(); else enable(); }
  if (STATIC.addEventListener) STATIC.addEventListener('change', sync);
  else if (STATIC.addListener) STATIC.addListener(sync);
  sync();
})();
