/*
 * Shared "Free Tools" pricing/unlock logic for The Convergence.
 * Used by: remove-background.html, merge-pdf.html, convert-image.html,
 * resize-image.html, qr-code-generator.html, unlock-success.html.
 *
 * How it works (no backend, no accounts — proportionate to $1/$5 stakes):
 *   1. Two Stripe Payment Links are configured once, in your own Stripe
 *      dashboard: a $1 "single tool" link and a $5 "all tools" link.
 *   2. Each link's "after payment" redirect is set (also once, in Stripe)
 *      to this site's unlock-success.html, with a fixed ?type=single or
 *      ?type=all on the end — see the two constants below.
 *   3. Right before sending someone to the $1 link, we remember which
 *      tool they were unlocking in localStorage, so unlock-success.html
 *      knows which one to flip on when they land back.
 *   4. Unlocks are stored in this browser's localStorage — no login.
 *
 * TODO (Bill): replace the two placeholder URLs below with your real
 * Stripe Payment Links once they're created. Nothing charges anyone
 * until you do — until then the buttons just won't go anywhere useful.
 */

// ---- live Stripe Payment Links ----
const STRIPE_LINK_SINGLE = 'https://buy.stripe.com/aFafZj2q61bQereb8adEs03'; // AI Toolkit — Single Tool Unlock, $1.00
const STRIPE_LINK_ALL = 'https://buy.stripe.com/28E00l9SybQu0AoccedEs04'; // AI Toolkit — All Tools Unlock, $5.00
// ------------------------------------

const TOOLKIT_TOOLS = [
  { slug: 'remove-background', label: 'Remove Background' },
  { slug: 'merge-pdf', label: 'Merge PDF' },
  { slug: 'convert-image', label: 'Convert Image' },
  { slug: 'resize-image', label: 'Resize & Compress Image' },
  { slug: 'qr-code-generator', label: 'QR Code Generator' }
];

const LS_ALL_KEY = 'cvg_pro_all';
const LS_TOOLS_KEY = 'cvg_pro_tools';
const LS_PENDING_KEY = 'cvg_pending_unlock';

function toolkitGetUnlockedTools() {
  try {
    return JSON.parse(localStorage.getItem(LS_TOOLS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function toolkitHasAllAccess() {
  try {
    return localStorage.getItem(LS_ALL_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function toolkitHasAccess(slug) {
  if (toolkitHasAllAccess()) return true;
  return toolkitGetUnlockedTools().includes(slug);
}

function toolkitUnlockAll() {
  try { localStorage.setItem(LS_ALL_KEY, 'true'); } catch (e) {}
}

function toolkitUnlockTool(slug) {
  try {
    const current = toolkitGetUnlockedTools();
    if (!current.includes(slug)) current.push(slug);
    localStorage.setItem(LS_TOOLS_KEY, JSON.stringify(current));
  } catch (e) {}
}

function toolkitStartUnlock(type, slug) {
  if (type === 'single') {
    try { localStorage.setItem(LS_PENDING_KEY, slug); } catch (e) {}
    window.location.href = STRIPE_LINK_SINGLE;
  } else {
    window.location.href = STRIPE_LINK_ALL;
  }
}

// Renders the pricing banner into `el` for the given tool, and wires up
// the two buttons. Call `onChange` again after unlock to re-render your
// page's Pro-only controls.
function toolkitRenderPricingBanner(el, slug, label, onUnlockChange) {
  if (!el) return;
  const unlocked = toolkitHasAccess(slug);
  if (unlocked) {
    el.className = 'pricing-banner unlocked';
    el.innerHTML = '<div class="pricing-copy">✓ <strong>Pro unlocked</strong> for ' + label + ' on this browser.</div>';
    return;
  }
  el.className = 'pricing-banner';
  el.innerHTML =
    '<div class="pricing-copy">The core tool is free, always. <strong>$1</strong> unlocks the extras for ' + label +
    ' — or <strong>$5</strong> unlocks every tool’s extras, including ones we add later.</div>' +
    '<div class="pricing-actions">' +
    '<a href="#" class="unlock-btn" data-unlock="single">Unlock this tool — $1</a>' +
    '<a href="#" class="unlock-btn primary" data-unlock="all">Unlock all tools — $5</a>' +
    '</div>';
  el.querySelector('[data-unlock="single"]').addEventListener('click', function (e) {
    e.preventDefault();
    toolkitStartUnlock('single', slug);
  });
  el.querySelector('[data-unlock="all"]').addEventListener('click', function (e) {
    e.preventDefault();
    toolkitStartUnlock('all', slug);
  });
}
