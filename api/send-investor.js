import { Resend } from 'resend';
import { LOGO_BASE64 } from './logo-base64.js';

const resend = process.env.resend_key || process.env.RESEND_API_KEY
  ? new Resend(process.env.resend_key || process.env.RESEND_API_KEY)
  : null;
const fromEmail = process.env.RESEND_FROM || 'FinancesHome <contact@financeshome.com>';
const contactEmail = process.env.CONTACT_EMAIL || 'contact@financeshome.com';

const emailStyles = `
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1f2937; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 24px; }
    .card { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
    .header { background: linear-gradient(135deg, #5E17EB 0%, #7c3aed 100%); padding: 32px 24px; text-align: center; }
    .logo { max-height: 48px; width: auto; display: inline-block; }
    .brand { font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 600; color: #fff; letter-spacing: -0.5px; margin: 0; }
    .content { padding: 32px 24px; }
    .label { font-family: 'Consolas', 'Monaco', monospace; font-size: 11px; letter-spacing: 0.1em; color: #5E17EB; text-transform: uppercase; margin-bottom: 8px; }
    h2 { font-family: Georgia, serif; font-size: 22px; color: #111827; margin: 0 0 24px 0; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #111827; }
    .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
    .message-box { background: #f9fafb; border-radius: 8px; padding: 16px; border-left: 4px solid #5E17EB; }
    .footer { padding: 24px; text-align: center; font-size: 12px; color: #9ca3af; }
    .footer a { color: #5E17EB; text-decoration: none; }
  </style>
`;

function confirmationLayout(firstName) {
  const logoHtml = `<img src="${LOGO_BASE64}" alt="FinancesHome" class="logo" />`;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8">${emailStyles}</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">${logoHtml}</div>
      <div class="content">
        <div class="label">// Confirmation</div>
        <h2>Demande d'accès investisseur reçue</h2>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px 0;">Bonjour ${firstName},</p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px 0;">Nous avons bien reçu votre demande d'accès au portail investisseur. Notre équipe l'examine et vous contactera sous 48h pour valider votre accès.</p>
        <div class="message-box">
          <p style="margin:0;font-size:14px;color:#6b7280;">En attendant, n'hésitez pas à consulter notre site pour en savoir plus sur nos solutions CEE.</p>
        </div>
      </div>
      <div class="footer">
        <p>FinancesHome — Plateforme d'orchestration administrative des CEE</p>
        <p>17 King Edwards Road, London HA4 7AE</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function emailLayout(title, content) {
  const logoHtml = `<img src="${LOGO_BASE64}" alt="FinancesHome" class="logo" />`;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8">${emailStyles}</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">${logoHtml}</div>
      <div class="content">
        <div class="label">// Demande investisseur</div>
        <h2>${title}</h2>
        ${content}
      </div>
      <div class="footer">
        <p>FinancesHome — Plateforme d'orchestration administrative des CEE</p>
        <p>17 King Edwards Road, London HA4 7AE</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  if (!resend) {
    return res.status(503).json({ error: 'Service email non configuré. Vérifiez resend_key.' });
  }

  try {
    const { firstName, lastName, email, company, phone, investmentRange, message } = req.body;
    if (!firstName || !lastName || !email || !company || !phone) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }
    const rangeLabels = { '50k-200k': '50k€ - 200k€', '200k-500k': '200k€ - 500k€', '500k-1m': '500k€ - 1M€', '1m+': '1M€+' };
    const rangeText = rangeLabels[investmentRange] || investmentRange || 'Non précisé';
    const content = `
      <div class="field"><div class="field-label">Informations personnelles</div></div>
      <div class="field"><div class="field-value">${firstName} ${lastName}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${email}">${email}</a></div></div>
      <div class="field"><div class="field-label">Téléphone</div><div class="field-value">${phone}</div></div>
      <div class="divider"></div>
      <div class="field"><div class="field-label">Société / Fonds</div><div class="field-value">${company}</div></div>
      <div class="field"><div class="field-label">Fourchette d'investissement</div><div class="field-value">${rangeText}</div></div>
      <div class="divider"></div>
      <div class="field"><div class="field-label">Message</div><div class="message-box">${String(message || '(Aucun message)').replace(/\n/g, '<br/>')}</div></div>
    `;
    const html = emailLayout('Demande d\'accès investisseur', content);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: email,
      subject: `[Investisseur] Demande d'accès - ${firstName} ${lastName}`,
      html
    });
    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Erreur lors de l\'envoi' });
    }
    const confirmHtml = confirmationLayout(firstName);
    resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'FinancesHome — Votre demande d\'accès investisseur a bien été reçue',
      html: confirmHtml
    }).catch((err) => console.warn('Confirmation non envoyée:', err.message));
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
}
