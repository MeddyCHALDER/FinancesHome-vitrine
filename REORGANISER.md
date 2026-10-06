# FinancesHome, site vitrine

Site statique multipage (FR / EN / ES), sans framework.

- `site/` : les pages HTML, `assets/css/site.css`, `assets/js/site.js`, images, polices.
- `api/form.js` : fonction Vercel qui reçoit les formulaires (projet, partenaire, HomePay) et les envoie par email via Resend (`resend_key` ou `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM`). Les pages appellent `api/form.php`, réécrit vers `/api/form` dans `vercel.json`.
- `vercel.json` : redirections des anciennes routes React, en-têtes de sécurité.

Commandes : `npm run dev` (port 3000, formulaires actifs avec la clé Resend du `.env`), `npm run build` (copie `site/` dans `dist/`), `npm run lint`.
