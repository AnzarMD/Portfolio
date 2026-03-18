/* ═══════════════════════════════════════
   main.js — Animations & Interactions
   ═══════════════════════════════════════ */

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
      });
    }, 800);
  });

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
          }, i * 80 + 150);
        });
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.skill-group').forEach(g => bo.observe(g));

  /* ── Particle canvas background ── */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

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
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
  }

  function animate() {
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

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
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
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
      }
    });
  });

});
