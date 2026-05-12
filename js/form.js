/* ═══════════════════════════════════════════════════
   form.js — EmailJS Contact Form Handler

   Credentials are loaded from js/config.js (git-ignored).
   See js/config.example.js for the template.
   ════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

    var btn = document.getElementById('submit-btn');
    var btnText = document.getElementById('btn-text');
    var btnIco = document.getElementById('btn-ico');
    var successEl = document.getElementById('form-success');
    var errorEl = document.getElementById('form-error');

    if (!btn) return;

    /* Load keys from config.js (git-ignored) */
    if (typeof EMAILJS_CONFIG === 'undefined') {
        console.error('config.js not loaded — copy config.example.js → config.js and fill in your keys.');
        return;
    }

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
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

        if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
            return showError('EmailJS not configured yet. Copy js/config.example.js → js/config.js and fill in your credentials.');
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

        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, params)
            .then(function() {
                return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.AUTOREPLY_ID, params);
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