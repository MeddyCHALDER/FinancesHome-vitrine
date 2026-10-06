/**
 * FinancesHome, réception des formulaires du site (projet, partenaire, HomePay).
 * Fonction Vercel, portage de l'ancien api/form.php (Hostinger) : même contrat JSON
 * ({ ok: true } ou { ok: false, error }), envoi via Resend.
 */
import { Resend } from 'resend';

const TO_EMAIL = process.env.CONTACT_EMAIL || 'contact@financeshome.com';
const FROM_EMAIL = process.env.RESEND_FROM || 'FinancesHome <contact@financeshome.com>';

const MSG = {
  fr: { method: 'Méthode non autorisée.', big: 'Demande trop volumineuse.', form: 'Formulaire inconnu.', req: 'Merci de remplir tous les champs obligatoires.', email: 'Adresse email invalide.', siren: 'Le SIREN doit comporter 9 chiffres.', id: "Indiquez l'identifiant de votre entreprise.", fail: "L'envoi n'a pas abouti. Écrivez-nous à contact@financeshome.com." },
  en: { method: 'Method not allowed.', big: 'Request too large.', form: 'Unknown form.', req: 'Please fill in all required fields.', email: 'Invalid email address.', siren: 'The SIREN number must have 9 digits.', id: 'Please enter your company registration number.', fail: 'Your request could not be sent. Please email contact@financeshome.com.' },
  es: { method: 'Método no permitido.', big: 'Solicitud demasiado grande.', form: 'Formulario desconocido.', req: 'Rellene todos los campos obligatorios.', email: 'Correo electrónico no válido.', siren: 'El SIREN debe tener 9 cifras.', id: 'Indique el NIF o CIF de su empresa.', fail: 'No se ha podido enviar. Escríbanos a contact@financeshome.com.' },
};

const FORMS = {
  projet: {
    subject: 'Nouvelle demande de projet',
    required: ['profil', 'projet', 'nom', 'email', 'message', 'consent'],
    fields: { pays: 'Pays du projet', profil: 'Profil', projet: 'Projet', sites: 'Nombre de sites ou de véhicules', organisation: 'Organisation', nom: 'Nom et prénom', email: 'Email', telephone: 'Téléphone', code_postal: 'Code postal', message: 'Message' },
  },
  partenaire: {
    subject: 'Nouvelle demande de partenariat',
    required: ['raison_sociale', 'nom', 'email', 'type', 'volume', 'consent'],
    fields: { pays: 'Pays', raison_sociale: 'Raison sociale', siren: 'SIREN', nif: 'NIF / CIF', company_number: 'Company number', nom: 'Nom et prénom', fonction: 'Fonction', email: 'Email', telephone: 'Téléphone', type: 'Type de partenaire', volume: 'Volume annuel visé', secteurs: 'Secteurs CEE', qualifications: 'Qualifications', message: 'Activité' },
  },
  homepay: {
    subject: "Liste d'attente HomePay",
    required: ['nom', 'email', 'consent'],
    fields: { nom: 'Nom et prénom', organisation: 'Organisation', email: 'Email', usage: 'Usage envisagé' },
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Nettoyage : tableaux joints, balises retirées, longueur bornée
function clean(v) {
  if (v === undefined || v === null) return '';
  if (Array.isArray(v)) v = v.map(String).join(', ');
  return String(v).replace(/<[^>]*>/g, '').replace(/\r\n?/g, '\n').trim().slice(0, 3000);
}

export default async function handler(req, res) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const input = body && typeof body === 'object' ? body : {};
  const lang = ['fr', 'en', 'es'].includes(input._lang) ? input._lang : 'fr';
  const msg = (k) => MSG[lang][k] || MSG.fr[k];
  const out = (code, payload) => res.status(code).json(payload);

  if (req.method !== 'POST') return out(405, { ok: false, error: msg('method') });
  if (JSON.stringify(input).length > 20000) return out(413, { ok: false, error: msg('big') });

  // Anti-robots : champ piège et délai minimal de remplissage
  if (input.website) return out(200, { ok: true });
  const ts = Number(input._ts) || 0;
  if (ts > 0 && Date.now() - ts < 3000) return out(200, { ok: true });

  const cfg = FORMS[clean(input._form)];
  if (!cfg) return out(400, { ok: false, error: msg('form') });

  if (cfg.required.some((k) => clean(input[k]) === '')) return out(422, { ok: false, error: msg('req') });
  const email = clean(input.email);
  if (!EMAIL_RE.test(email)) return out(422, { ok: false, error: msg('email') });
  const siren = clean(input.siren).replace(/\s+/g, '');
  if (siren && !/^\d{9}$/.test(siren)) return out(422, { ok: false, error: msg('siren') });
  if (cfg === FORMS.partenaire && !siren && !clean(input.nif) && !clean(input.company_number)) {
    return out(422, { ok: false, error: msg('id') });
  }

  const lines = Object.entries(cfg.fields)
    .map(([key, label]) => [label, clean(input[key])])
    .filter(([, val]) => val !== '')
    .map(([label, val]) => `${label} : ${val}`);
  const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  const text = `${cfg.subject} reçue depuis www.financeshome.com (version ${lang.toUpperCase()})\n\n${lines.join('\n')}\n\nAccord de recontact : oui\nDate : ${date}`;

  const key = process.env.resend_key || process.env.RESEND_API_KEY;
  if (!key) {
    console.error('[form] clé Resend absente (resend_key / RESEND_API_KEY)');
    return out(500, { ok: false, error: msg('fail') });
  }

  try {
    const { error } = await new Resend(key).emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email.replace(/[\r\n]/g, ''),
      subject: `[Site] ${cfg.subject}`,
      text,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error('[form] envoi Resend échoué :', e.message);
    return out(500, { ok: false, error: msg('fail') });
  }
  return out(200, { ok: true });
}
