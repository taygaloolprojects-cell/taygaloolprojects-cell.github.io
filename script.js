// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Operational Pillar Filter Tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach((card) => {
      const pillar = card.getAttribute('data-pillar');
      if (filter === 'all' || pillar === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Workflow Screenshot Lightbox
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  img.src = src;
  cap.textContent = caption;
  lightbox.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// Sample Pydantic JSON Schema & Operational Spec Inspector
const sampleSchemas = {
  sales: {
    title: 'POST /enrich-lead -> LeadEnrichmentResponse (Pydantic v2)',
    opsNote: 'Error Handling: FastAPI returns HTTP 422 on missing lead fields; Make.com router isolates scores < 70 from priority outreach.',
    payload: {
      lead_id: 'LD-409',
      company_name: 'Kovai Logistics',
      icp_fit_score: 88,
      pain_point_summary: 'Manual freight quote triage across 14 regional dispatchers',
      personalized_opener: 'Noticed Kovai Logistics is scaling regional dispatch—we help ops teams automate quote intake in n8n.',
      route_to_priority_crm: true
    }
  },
  finance: {
    title: 'POST /audit-invoice -> InvoiceAuditResponse (Pydantic v2)',
    opsNote: 'Error Handling: Deterministic Python arithmetic reconciles subtotal + tax against total; discrepancies or bills >= $1,000 route to Review_Queue.',
    payload: {
      invoice_number: 'INV-2026-0891',
      vendor_name: 'CloudScale Infrastructure Ltd',
      subtotal: 1250.0,
      tax: 125.0,
      total: 1375.0,
      math_verified: true,
      needs_review: true,
      review_reason: 'Invoice total ($1,375.00) exceeds $1,000.00 auto-approval threshold'
    }
  },
  support: {
    title: 'POST /triage-ticket -> TicketTriageResponse (Pydantic v2)',
    opsNote: 'Error Handling: Grounds replies strictly against company_sop.md; routes confidence < 0.75 or refund/security keywords to Escalation_Queue.',
    payload: {
      ticket_id: 'TCK-102',
      customer_email: 'finance@client.example',
      category: 'billing',
      confidence_score: 0.7,
      draft_reply: 'Your refund request has been received. Per our Escalation Policy, refund requests require manual billing review.',
      sources_used: ['1. Billing & Invoices', '4. Escalation Policy'],
      needs_human_escalation: true,
      escalation_reason: 'Refund request requires manual review and escalation.'
    }
  }
};

function openJsonModal(pillar) {
  const modal = document.getElementById('jsonModal');
  const title = document.getElementById('jsonModalTitle');
  const ops = document.getElementById('jsonModalOps');
  const code = document.getElementById('jsonModalCode');
  const entry = sampleSchemas[pillar];

  if (!entry) return;
  title.textContent = entry.title;
  ops.textContent = entry.opsNote;
  code.textContent = JSON.stringify(entry.payload, null, 2);
  modal.classList.add('open');
}

function closeJsonModal() {
  document.getElementById('jsonModal').classList.remove('open');
}

// One-Click Copy Email
function copyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  navigator.clipboard.writeText('taygaloolprojects@gmail.com').then(() => {
    btn.textContent = 'Copied! (taygaloolprojects@gmail.com)';
    setTimeout(() => {
      btn.textContent = 'Copy Email';
    }, 2500);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeJsonModal();
  }
});