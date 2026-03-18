/* ═══════════════════════════════════════════════════
   form.js — EmailJS Contact Form Handler
   ═══════════════════════════════════════════════════

   SETUP — replace the 4 values below, then save.

   1. emailjs.com → Email Services → Add New Service
      → Gmail → connect md10anzar@gmail.com → copy SERVICE_ID

   2. Email Templates → Create New Template (notification to you):
      To:      md10anzar@gmail.com
      Subject: New Portfolio Message from {{from_name}}
      Body:    Name: {{from_name}} / Email: {{from_email}}
               Phone: {{from_phone}} / Message: {{message}}
      → copy TEMPLATE_ID

   3. Email Templates → Create New Template (auto-reply to sender):
      To:      {{from_email}}
      Subject: Thanks for reaching out, {{from_name}}!
      Body:    Hi {{from_name}}, thanks for reaching out!
               I've received your message and will get back
               to you within 24 hours. — Mohammad Anzar
      → copy AUTOREPLY_ID

   4. Account → General → copy PUBLIC_KEY

   ════════════════════════════════════════════════════ */

const EMAILJS_SERVICE_ID = 'service_4k7vi9d'; // ← replace
const EMAILJS_TEMPLATE_ID = 'template_t0limib'; // ← replace (notification to you)
const EMAILJS_AUTOREPLY_ID = 'template_prhgmsq'; // ← replace (auto-reply to sender)
const EMAILJS_PUBLIC_KEY = 'JbRKoa1HmXAbD4Fer';

/* ════════════════════════════════════════════════════
   CORE LOGIC — no need to edit below this line
   ════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Element refs ── */
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIco = document.getElementById('btn-ico');
    const successEl = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');

    if (!btn) return; // safety guard — form not on this page

    /* ── Init EmailJS ── */
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    /* ── Helpers ── */
    const getVal = id => { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function setLoading(on) {
        btn.disabled = on;
        btnText.textContent = on ? 'Sending...' : 'Send Message';
        btnIco.textContent = on ? '⟳' : '→';
    }

    function showSuccess() {
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
        const row = btn.closest('.submit-row');
        const note = document.querySelector('.submit-note');
        if (row) row.style.display = 'none';
        if (note) note.style.display = 'none';
    }

    function showError(msg) {
        errorEl.textContent = '⚠  ' + msg;
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }

    function clearForm() {
        ['f-name', 'f-phone', 'f-email', 'f-message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
    }

    /* ── Submit handler ── */
    btn.addEventListener('click', () => {
        const name = getVal('f-name');
        const phone = getVal('f-phone');
        const email = getVal('f-email');
        const message = getVal('f-message');

        // Validation
        if (!name) {
            document.getElementById('f-name').focus();
            return showError('Please enter your name.');
        }
        if (!email) {
            document.getElementById('f-email').focus();
            return showError('Please enter your email address.');
        }
        if (!isValidEmail(email)) {
            document.getElementById('f-email').focus();
            return showError('Please enter a valid email address.');
        }
        if (!message) {
            document.getElementById('f-message').focus();
            return showError('Please enter a message.');
        }

        // Guard: not yet configured
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            return showError('EmailJS not configured yet — open js/form.js and fill in your credentials.');
        }

        errorEl.style.display = 'none';
        setLoading(true);

        const params = {
            from_name: name,
            from_email: email,
            from_phone: phone || 'Not provided',
            message: message,
            reply_to: email,
        };

        // 1) Notify Mohammad
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
            .then(() => {
                // 2) Auto-reply to sender
                return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, params);
            })
            .then(() => {
                setLoading(false);
                clearForm();
                showSuccess();
            })
            .catch(err => {
                console.error('EmailJS error:', err);
                setLoading(false);
                showError('Something went wrong. Please email me directly at md10anzar@gmail.com');
            });
    });

    /* ── Enter key moves focus to next field ── */
    ['f-name', 'f-phone', 'f-email'].forEach((id, i, arr) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const next = document.getElementById(arr[i + 1] || 'f-message');
                if (next) next.focus();
            }
        });
    });

});