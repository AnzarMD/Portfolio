# Mohammad Anzar — Portfolio Website

A violet-themed developer portfolio with live contact form via EmailJS.

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main page (open this in your browser)
├── css/
│   └── style.css       ← All styles (violet developer theme)
├── js/
│   ├── main.js         ← Animations, counters, canvas background
│   └── form.js         ← EmailJS contact form handler
└── README.md           ← This file
```

## 🚀 How to Run

Just open `index.html` in any modern browser. No build step needed.

---

## ✉️ Setting Up the Contact Form (EmailJS)

The contact form sends emails directly to **md10anzar@gmail.com** using
[EmailJS](https://www.emailjs.com) — a free, client-side email service.
**No server or backend required.**

### Step 1 — Create a free EmailJS account
Go to → https://www.emailjs.com and sign up (free tier allows 200 emails/month).

### Step 2 — Add a Gmail service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** → sign in with **md10anzar@gmail.com**
4. Copy your **Service ID** (looks like `service_abc123`)

### Step 3 — Create an email template
1. Dashboard → **Email Templates** → **Create New Template**
2. Use this template:

   **Subject:**
   ```
   New Portfolio Message from {{from_name}}
   ```

   **Body:**
   ```
   Hi Mohammad,

   You received a new message from your portfolio website.

   ──────────────────────────────
   Name:    {{from_name}}
   Email:   {{from_email}}
   Phone:   {{from_phone}}
   ──────────────────────────────
   Message:
   {{message}}
   ──────────────────────────────

   You can reply directly to: {{reply_to}}
   ```

3. Save the template — copy your **Template ID** (looks like `template_xyz456`)

### Step 4 — Get your Public Key
1. Dashboard → **Account** → **General**
2. Copy your **Public Key** (looks like `aBcDeFgHiJkLmNoP`)

### Step 5 — Add the credentials to the code
Open `js/form.js` and replace lines 28–30:

```js
const EMAILJS_SERVICE_ID  = 'service_abc123';    // ← your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz456';   // ← your Template ID
const EMAILJS_PUBLIC_KEY  = 'aBcDeFgHiJkLmNoP';  // ← your Public Key
```

Save the file — the form is now live! 🎉

---

## 🌐 Deploying Online (optional)

To put the portfolio online for free:

**Option A — Netlify (recommended, drag & drop)**
1. Go to https://netlify.com → sign up free
2. Drag the entire `portfolio/` folder onto the Netlify dashboard
3. You'll get a live URL like `https://yourname.netlify.app`

**Option B — GitHub Pages**
1. Push the `portfolio/` folder to a GitHub repo
2. Settings → Pages → Deploy from main branch → root folder
3. Live at `https://yourusername.github.io/portfolio`

---

## 🎨 Customisation Tips

- **Colors** — edit CSS variables at the top of `css/style.css` (`:root` block)
- **Add a LinkedIn** — add a new `.cd-row` in the contact section of `index.html`
- **Add a GitHub** — same as above with your GitHub profile link
- **Profile photo** — replace the terminal block in the hero with an `<img>` tag
