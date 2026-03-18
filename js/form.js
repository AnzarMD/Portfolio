/* ═══════════════════════════════════════════════════
   form.js — EmailJS Contact Form Handler

   SETUP: Replace the 4 values below, then save.

   1. emailjs.com → Email Services → Add New Service
      → Gmail → connect md10anzar@gmail.com → copy SERVICE_ID

   2. Email Templates → New Template (notification to you):
      To:      md10anzar@gmail.com
      Subject: New Portfolio Message from {{from_name}}
      Body:    Name: {{from_name}} | Email: {{from_email}}
               Phone: {{from_phone}} | Message: {{message}}
      → copy TEMPLATE_ID

   3. Email Templates → New Template (auto-reply to sender):
      To:      {{from_email}}
      Subject: Thanks for reaching out, {{from_name}}!
      Body:    Hi {{from_name}}, thanks for reaching out!
               I've received your message and will get back
               to you within 24 hours. — Mohammad Anzar
      → copy AUTOREPLY_ID

   4. Account → General → copy PUBLIC_KEY
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

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    function getVal(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setLoading(on) {
        btn.disabled = on;
        btnText.textContent = on ? 'Sending...' : 'Send Message';
        btnIco.textContent = on ? '⟳' : '→';
    }

    function showSuccess() {
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
        var row = document.querySelector('.submit-row');
        var note = document.querySelector('.submit-note');
        if (row) row.style.display = 'none';
        if (note) note.style.display = 'none';
    }

    function showError(msg) {
        errorEl.textContent = '⚠  ' + msg;
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }

    function clearForm() {
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

        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            return showError('EmailJS not configured yet. Open js/form.js and fill in your credentials.');
        }

        errorEl.style.display = 'none';
        setLoading(true);

        var params = {
            from_name: name,
            from_email: email,
            from_phone: phone || 'Not provided',
            message: message,
            reply_to: email
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
            .then(function() {
                return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, params);
            })
            .then(function() {
                setLoading(false);
                clearForm();
                showSuccess();
            })
            .catch(function(err) {
                console.error('EmailJS error:', err);
                setLoading(false);
                showError('Something went wrong. Please email me directly at md10anzar@gmail.com');
            });
    });

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

});