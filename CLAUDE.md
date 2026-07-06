# CLAUDE.md — laragonzalez.com

Project documentation and working notes for the Lara González portfolio website.
Written for both humans and AI assistants (Claude Code) working on this repo.

---

## 1. Overview

- **Site:** https://www.laragonzalez.com — portfolio website for Lara González (architecture/design studio).
- **Type:** Static website (no runtime backend).
- **Framework:** [Astro](https://astro.build) `^5.x` with React islands.
- **Status:** In production. Originally built by the agency **Workoholics**; ownership handed over to the client (Isaure / ilohest) in June 2026.

---

## 2. Repository structure

⚠️ **The Astro project is nested one level deep.** The git repository root contains a single tracked folder, and the actual project (with `package.json`, `src/`, `astro.config.mjs`) lives inside it:

```
<repo root>/                     ← git root, working directory
└── lara-gonzalez-web/           ← the actual Astro project (run npm commands HERE)
    ├── astro.config.mjs
    ├── package.json
    ├── src/
    └── public/
```

All `npm` / `astro` commands must be run from inside the nested `lara-gonzalez-web/` directory.

### Source layout (`lara-gonzalez-web/src/`)
- `pages/` — one `.astro` file per route (`index`, `contacto`, `proyectos`, `el-estudio`, `404`, plus legal pages `aviso-legal`, `politica-privacidad`, `politica-cookies`).
- `layouts/` — `Layout.astro` (base), `Header.tsx`, `Footer.astro`.
- `components/` — UI components (React `.tsx` + Astro `.astro`): Form, Card, Hero, slider, cursor, marquee, side-menu, project items, etc.
- `atoms/` — small primitives (`Input.tsx`, `Picture.tsx`).
- `content/` + `content.config.ts` — Astro **content collections** (Zod-validated markdown) holding page copy: home/hero, projects section, shared footer logos, etc.
- `services/` — `contact.service.ts` (form submission + field validation).
- `models/` — TypeScript types (`contact.model.ts`, `generic.model.ts`).
- `i18n.ts` — locale config. **Only `es` (Spanish) is active**; `en` and `fr` are scaffolded but commented out.
- `theme/`, `utils/`, `hooks/`, `assets/`.

---

## 3. Tech stack

| Concern | Tool |
|---|---|
| Framework | Astro 5 (`output: "static"`) |
| UI islands | React 19 (`@astrojs/react`) |
| Styling | Sass (`sass`) |
| Carousels | Swiper 11 |
| Smooth scroll | Lenis |
| Internal lib | `dawuti` (agency utility lib) |
| Language | TypeScript 5 |
| Node | v20.18.1 (see `.nvmrc`; tested fine on v22) |

Key config in `lara-gonzalez-web/astro.config.mjs`: `site` set to `https://www.laragonzalez.com`, build output to `dist/`, path aliases under `@lara/*`, and a CSP header allowing the CookieYes script.

---

## 4. Local development

```bash
cd lara-gonzalez-web        # nested project dir
npm install                 # first time
npm run dev                 # dev server
npm run build               # production build → dist/
npm run preview             # preview the built site
```

No `.env` is needed to run or build the site — the contact form now posts to a same-origin PHP endpoint (see section 6). (A leftover `.env` with the old agency `PUBLIC_EMAIL_SERVICE_*` vars was removed in July 2026; those vars are no longer read anywhere.)

---

## 5. Deployment

**There is NO CI/CD.** Deployment is **manual, over FTP**.

1. `npm run build` → produces `dist/`.
2. Upload the **contents of `dist/`** into `httpdocs/` on the hosting server (FTPS, explicit TLS).

- **Host:** **loading.es** (grupoloading) managed hosting — Plesk-based, IP `195.192.255.158` (also reachable by SSH, `/bin/bash` chrooted). *(Not IONOS — an earlier note said IONOS by mistake.)* DNS and email for the domain are also on loading.es (NS `ns*.grupoloading.com`, MX `lin158.loading.es`).
- **Plan:** currently loading.es **"Smart"** (~16.19 €/mo) — heavily oversized (usage ~2.5 GB of 50 GB, 96 % of it email). The **"Starter"** plan (5 GB, ~5.39 €/mo) is enough (site is ~20 MB, static, no DB) and includes email → candidate downgrade, ~130 €/yr saving. Pending Lara's go-ahead.
- **Web root on server:** `httpdocs/`.
- **FTP/SSH user:** `laragonz` (the FTP login is the same as the system user). **Passwords are NOT stored in this repo — keep them in a password manager.**
- **⚠️ FTP deploy gotcha:** loading.es rejects many rapid separate FTPS connections (one per file → connection failures). Upload **reusing a single connection** — e.g. one `curl` call with several `-T localfile ftp://…/remotepath` pairs, or an FTP client that keeps the session open. `--ftp-create-dirs` recreates the page subfolders.
- Astro static output maps each page to a folder with its own `index.html` (e.g. `/contacto/index.html`), plus hashed bundles in `_astro/`.

**Housekeeping note:** FTP upload does not delete old files, so `_astro/` accumulates stale hashed bundles (multiple `Form.*.js`, `Cursor.*.js`, …). For a clean deploy, clear `httpdocs/` before re-uploading.

**Verifying local == live:** because Astro names bundles by content hash, a matching filename (e.g. `client.CTmmreJ3.js`) in both local `dist/` and the live `_astro/` confirms the code matches. Git being in sync with the remote does **not** by itself prove the live site is up to date — deploy is a separate step.

---

## 6. Contact form & email service

**Self-hosted since July 2026.** The form (`src/components/Form/Form.tsx` → `src/services/contact.service.ts`) POSTs `FormData` to a same-origin PHP endpoint **`/contact.php`**.

- **`public/contact.php`** — lives in `public/` so `astro build` copies it verbatim to `dist/contact.php` → deployed to `httpdocs/contact.php`. It validates fields, checks a honeypot, escapes input (`htmlspecialchars`), and sends **two styled HTML emails** (with the studio logo `public/static-icons/lara-gonzalez-email.png`) via PHP `mail()` — **no SMTP credentials needed**, because the server itself hosts the domain's mail.
  - **Notification** → To `hola@laragonzalez.com`, **From `web@laragonzalez.com`**, Reply-To = visitor. (From is `web@`, not `hola@`: a message from `hola@` *to* `hola@` was flagged as spam by Lara's own mailbox — the "mail from myself" heuristic. `web@` is a real mailbox forwarding to `hola@`.)
  - **Confirmation** → To the visitor, From `hola@laragonzalez.com`.
- **Anti-spam:** hidden honeypot field `website` (added in `Form.tsx` + `contact.model.ts`); if filled, the endpoint fakes success and sends nothing.
- **Deliverability:** domain email auth is fully configured — **SPF** (`include:_spf.loading.es`), **DKIM** (Plesk `default` selector), **DMARC** (`p=quarantine`, strict alignment). Mail sent from the server with a `@laragonzalez.com` From therefore passes DMARC.
- **To change the email texts/branding:** edit the HTML templates directly in `public/contact.php` (functions `email_shell` / the two `inner_*` blocks), then rebuild + redeploy.

The previous agency **"dawuti"** service (`dawuti-email-service.workoholics.es`, client id `lara-gonzalez`, template `template_lara_contact`) is **no longer used** — it kept returning `ok` but had stopped delivering to Lara.

---

## 7. Git remotes

- `origin` → `git@github.com:ilohest/lara-gonzalez.git` (client-owned, **current source of truth**).
- `old-agency` → `https://gitlab.workoholics.es/clients/lara-gonzalez/lara-gonzalez-web.git` (agency's original GitLab, kept temporarily as backup — safe to remove once the handover is confirmed stable).

Full history (branches `main` and `27-ajustes-post-prod`) was mirror-pushed from the agency GitLab to the client's GitHub in June 2026. Original developers: Noelia & Nerea (Workoholics).

---

## 8. Handover TODO / status

- [x] Migrate the contact form off the agency's "dawuti" service → done, self-hosted `contact.php` (see section 6).
- [ ] Rotate the hosting/FTP/SSH password (single shared password for system + SSH + FTP) — it circulated a lot during the handover.
- [ ] Decide on the **Smart → Starter** plan downgrade with Lara (~130 €/yr saving, see section 5).
- [ ] Confirm/transfer: domain & DNS control (loading.es), CookieYes account, web analytics access. (Hosting panel access is already available.)
- [ ] (Optional cleanup) Replace the default Astro starter `README.md` with real project docs.
