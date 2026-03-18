/* ═══════════════════════════════════════
   main.js — Animations & Interactions
   ═══════════════════════════════════════ */

<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {

  /* ── Progress bar ── */
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });

  /* ── Scroll reveal ── */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  /* ── Counter animation ── */
  function animCount(el, target, duration = 1600) {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  // Hero counters on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.hctr').forEach(el => {
        animCount(el, parseInt(el.dataset.t));
=======
document.addEventListener('DOMContentLoaded', function() {

  /* ── Progress bar ── */
  var bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', function() {
    var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });

  /* ── Mobile nav toggle ── */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navHire = document.querySelector('.nav-hire');
  if (toggle) {
    toggle.addEventListener('click', function() {
      var open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '68px';
      navLinks.style.left = '0'; navLinks.style.right = '0';
      navLinks.style.background = 'rgba(7,6,15,0.97)';
      navLinks.style.padding = '20px 32px 24px';
      navLinks.style.borderBottom = '1px solid rgba(139,92,246,0.12)';
      navLinks.style.gap = '18px';
      if (open) navLinks.style.display = 'none';
    });
  }

  /* ── Scroll reveal ── */
  var reveals = document.querySelectorAll('.reveal');
  var ro = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('vis');
    });
  }, { threshold: 0.1 });
  reveals.forEach(function(el) { ro.observe(el); });

  /* ── Counter animation ── */
  function animCount(el, target, duration) {
    duration = duration || 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* Hero counters on load */
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.querySelectorAll('.hctr').forEach(function(el) {
        animCount(el, parseInt(el.getAttribute('data-t')));
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
      });
    }, 800);
  });

<<<<<<< HEAD
  // Stats band counters on scroll
  const so = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        animCount(e.target, parseInt(e.target.dataset.t));
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sctr').forEach(el => so.observe(el));

  /* ── Skill bars ── */
  const bo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach((b, i) => {
          setTimeout(() => {
            b.style.width = b.dataset.w + '%';
            b.classList.add('animated');
=======
  /* Stats band counters on scroll */
  var so = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !e.target.getAttribute('data-done')) {
        e.target.setAttribute('data-done', '1');
        animCount(e.target, parseInt(e.target.getAttribute('data-t')));
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sctr').forEach(function(el) { so.observe(el); });

  /* ── Skill bars ── */
  var bo = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var bars = e.target.querySelectorAll('.bar-fill');
        bars.forEach(function(b, i) {
          setTimeout(function() {
            b.style.width = b.getAttribute('data-w') + '%';
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
          }, i * 80 + 150);
        });
      }
    });
  }, { threshold: 0.15 });
<<<<<<< HEAD
  document.querySelectorAll('.skill-group').forEach(g => bo.observe(g));

  /* ── Particle canvas background ── */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
=======
  document.querySelectorAll('.skill-group').forEach(function(g) { bo.observe(g); });

  /* ── Particle canvas ── */
  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

<<<<<<< HEAD
  const COLORS = ['rgba(124,58,237,', 'rgba(168,85,247,', 'rgba(192,132,252,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : canvas.height + 10;
      this.r = Math.random() * 1.6 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.2);
      this.life = 0; this.maxLife = Math.random() * 300 + 200;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + alpha + ')';
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 90 }, () => new Particle());

  // Grid lines
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(124,58,237,0.03)';
    ctx.lineWidth = 1;
    const step = 60;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
=======
  var COLORS = ['rgba(124,58,237,', 'rgba(168,85,247,', 'rgba(192,132,252,'];

  function Particle() { this.reset(true); }
  Particle.prototype.reset = function(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : canvas.height + 10;
    this.r = Math.random() * 1.5 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.28;
    this.vy = -(Math.random() * 0.45 + 0.18);
    this.life = 0;
    this.maxLife = Math.random() * 300 + 200;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  };
  Particle.prototype.update = function() {
    this.x += this.vx; this.y += this.vy; this.life++;
    if (this.life > this.maxLife || this.y < -10) this.reset();
  };
  Particle.prototype.draw = function() {
    var alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.55;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + alpha + ')';
    ctx.fill();
  };

  var particles = [];
  for (var i = 0; i < 85; i++) particles.push(new Particle());

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(124,58,237,0.028)';
    ctx.lineWidth = 1;
    var step = 60;
    for (var x = 0; x < canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (var y = 0; y < canvas.height; y += step) {
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
  }

  function animate() {
    drawGrid();
<<<<<<< HEAD
    particles.forEach(p => { p.update(); p.draw(); });
=======
    particles.forEach(function(p) { p.update(); p.draw(); });
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
    requestAnimationFrame(animate);
  }
  animate();

<<<<<<< HEAD
  /* ── Typing effect for terminal ── */
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s';
      line.style.opacity = '1';
    }, 600 + i * 200);
  });

  /* ── Nav active highlight ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
=======
  /* ── Terminal line stagger ── */
  document.querySelectorAll('.t-line').forEach(function(line, i) {
    line.style.opacity = '0';
    setTimeout(function() {
      line.style.transition = 'opacity 0.3s';
      line.style.opacity = '1';
    }, 600 + i * 180);
  });

  /* ── Nav active state ── */
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a');
  var navObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        links.forEach(function(a) { a.classList.remove('active'); });
        var active = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
<<<<<<< HEAD
  sections.forEach(s => navObs.observe(s));

  /* ── Smooth section scrolling with offset for fixed nav ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 68; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
=======
  sections.forEach(function(s) { navObs.observe(s); });

  /* ── Smooth scroll with nav offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top: top, behavior: 'smooth' });
        /* close mobile nav if open */
        if (navLinks) navLinks.style.display = 'none';
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
      }
    });
  });

});
