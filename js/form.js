/* ═══════════════════════════════════════════════════
   form.js — EmailJS Contact Form Handler
<<<<<<< HEAD
   ═══════════════════════════════════════════════════

   SETUP — replace the 4 values below, then save.
=======

   SETUP: Replace the 4 values below, then save.
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797

   1. emailjs.com → Email Services → Add New Service
      → Gmail → connect md10anzar@gmail.com → copy SERVICE_ID

<<<<<<< HEAD
   2. Email Templates → Create New Template (notification to you):
      To:      md10anzar@gmail.com
      Subject: New Portfolio Message from {{from_name}}
      Body:    Name: {{from_name}} / Email: {{from_email}}
               Phone: {{from_phone}} / Message: {{message}}
      → copy TEMPLATE_ID

   3. Email Templates → Create New Template (auto-reply to sender):
=======
   2. Email Templates → New Template (notification to you):
      To:      md10anzar@gmail.com
      Subject: New Portfolio Message from {{from_name}}
      Body:    Name: {{from_name}} | Email: {{from_email}}
               Phone: {{from_phone}} | Message: {{message}}
      → copy TEMPLATE_ID

   3. Email Templates → New Template (auto-reply to sender):
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
      To:      {{from_email}}
      Subject: Thanks for reaching out, {{from_name}}!
      Body:    Hi {{from_name}}, thanks for reaching out!
               I've received your message and will get back
               to you within 24 hours. — Mohammad Anzar
      → copy AUTOREPLY_ID

   4. Account → General → copy PUBLIC_KEY
<<<<<<< HEAD

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
=======
   ════════════════════════════════════════════════════ */

var EMAILJS_SERVICE_ID = 'service_4k7vi9d';
var EMAILJS_TEMPLATE_ID = 'template_t0limib';
var EMAILJS_AUTOREPLY_ID = 'template_prhgmsq';
var EMAILJS_PUBLIC_KEY = 'JbRKoa1HmXAbD4Fer';

document.addEventListener('DOMContentLoaded', function() {

    var btn = document.getElementById('submit-btn');
    var btnText = document.getElementById('btn-text');
    var btnIco = document.getElementById('btn-ico');
    var successEl = document.getElementById('form-success');
    var errorEl = document.getElementById('form-error');

    if (!btn) return;

>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

<<<<<<< HEAD
    /* ── Helpers ── */
    const getVal = id => { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
=======
    function getVal(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797

    function setLoading(on) {
        btn.disabled = on;
        btnText.textContent = on ? 'Sending...' : 'Send Message';
        btnIco.textContent = on ? '⟳' : '→';
    }

    function showSuccess() {
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
<<<<<<< HEAD
        const row = btn.closest('.submit-row');
        const note = document.querySelector('.submit-note');
=======
        var row = document.querySelector('.submit-row');
        var note = document.querySelector('.submit-note');
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
        if (row) row.style.display = 'none';
        if (note) note.style.display = 'none';
    }

    function showError(msg) {
        errorEl.textContent = '⚠  ' + msg;
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }

    function clearForm() {
<<<<<<< HEAD
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
=======
        var ids = ['f-name', 'f-phone', 'f-email', 'f-message'];
        for (var i = 0; i < ids.length; i++) {
            var el = document.getElementById(ids[i]);
            if (el) el.value = '';
        }
    }

    btn.addEventListener('click', function() {
        var name = getVal('f-name');
        var phone = getVal('f-phone');
        var email = getVal('f-email');
        var message = getVal('f-message');

>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
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

<<<<<<< HEAD
        // Guard: not yet configured
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            return showError('EmailJS not configured yet — open js/form.js and fill in your credentials.');
=======
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            return showError('EmailJS not configured yet. Open js/form.js and fill in your credentials.');
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
        }

        errorEl.style.display = 'none';
        setLoading(true);

<<<<<<< HEAD
        const params = {
=======
        var params = {
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
            from_name: name,
            from_email: email,
            from_phone: phone || 'Not provided',
            message: message,
<<<<<<< HEAD
            reply_to: email,
        };

        // 1) Notify Mohammad
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
            .then(() => {
                // 2) Auto-reply to sender
                return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, params);
            })
            .then(() => {
=======
            reply_to: email
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
            .then(function() {
                return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, params);
            })
            .then(function() {
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
                setLoading(false);
                clearForm();
                showSuccess();
            })
<<<<<<< HEAD
            .catch(err => {
=======
            .catch(function(err) {
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797
                console.error('EmailJS error:', err);
                setLoading(false);
                showError('Something went wrong. Please email me directly at md10anzar@gmail.com');
            });
    });

<<<<<<< HEAD
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
=======
    /* Enter key moves focus to next field */
    var fieldOrder = ['f-name', 'f-phone', 'f-email', 'f-message'];
    for (var i = 0; i < fieldOrder.length - 1; i++) {
        (function(current, next) {
            var el = document.getElementById(current);
            if (!el) return;
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    var nextEl = document.getElementById(next);
                    if (nextEl) nextEl.focus();
                }
            });
        })(fieldOrder[i], fieldOrder[i + 1]);
    }
>>>>>>> 0531277fef8a1afdd8f952cebac2ddc759be4797

});