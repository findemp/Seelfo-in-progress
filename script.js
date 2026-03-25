/* ── CONFIG ── */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbwD6rKeRe1atmrOcaoN-hbVexuKUsqStOQmP7TkoWagE3DdXu9UTKP-W9tJ2_8gMH2g/exec";

/* ══════════════════════════════════════
   PAGE TRANSITION
══════════════════════════════════════ */
function showBusiness() {
  const studentView  = document.getElementById('student-view');
  const businessView = document.getElementById('business-view');

  // Fade out student view upward
  studentView.classList.add('slide-out-up');

  setTimeout(() => {
    studentView.classList.add('hidden');
    studentView.classList.remove('slide-out-up');

    // Bring in business view from below
    businessView.classList.remove('hidden');
    businessView.classList.add('slide-in-up');

    setTimeout(() => {
      businessView.classList.remove('slide-in-up');
    }, 450);
  }, 400);
}

function showStudent() {
  const studentView  = document.getElementById('student-view');
  const businessView = document.getElementById('business-view');

  // Fade out business view downward
  businessView.classList.add('slide-out-up');

  setTimeout(() => {
    businessView.classList.add('hidden');
    businessView.classList.remove('slide-out-up');

    // Bring in student view from above
    studentView.classList.remove('hidden');
    studentView.classList.add('slide-in-down');

    setTimeout(() => {
      studentView.classList.remove('slide-in-down');
    }, 450);
  }, 400);
}

/* ══════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════ */
const phrases = [
    "lets you choose your schedule.",
    "can be done from anywhere.",
    "fits a student lifestyle.",
    "requires zero experience.",
    "grows with your ambition.",
    "helps you build valuable skills.",
    "can adapt to your interests."
];

let idx = 0, char = 0, deleting = false;
const el = document.getElementById('typewriter');

function tick() {
  const current = phrases[idx];
  if (!deleting) {
    el.textContent = current.slice(0, char + 1);
    char++;
    if (char === current.length) {
      deleting = true;
      setTimeout(tick, 2200);
      return;
    }
    setTimeout(tick, 55);
  } else {
    el.textContent = current.slice(0, char - 1);
    char--;
    if (char === 0) {
      deleting = false;
      idx = (idx + 1) % phrases.length;
      setTimeout(tick, 350);
      return;
    }
    setTimeout(tick, 30);
  }
}
setTimeout(tick, 900);

/* ══════════════════════════════════════
   STUDENT WAITLIST
══════════════════════════════════════ */
function handleWaitlist() {
  const input  = document.getElementById('emailInput');
  const form   = document.getElementById('waitlistForm');
  const msg    = document.getElementById('successMsg');
  const button = form.querySelector('button');
  const valid  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());

  if (!valid) {
    form.style.borderColor = '#FFBABA';
    form.style.boxShadow   = '0 4px 24px rgba(255,80,80,0.09)';
    input.focus();
    setTimeout(() => { form.style.borderColor = ''; form.style.boxShadow = ''; }, 1300);
    return;
  }

  button.textContent = 'Sending...';
  button.disabled    = true;
  button.style.opacity = '0.7';
  input.disabled     = true;

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({ email: input.value.trim(), type: "student" }),
  })
  .then(() => {
    form.style.display = 'none';
    msg.style.display  = 'block';
  })
  .catch(() => {
    form.style.display = 'none';
    msg.style.display  = 'block';
  });
}

document.getElementById('emailInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleWaitlist();
});

/* ══════════════════════════════════════
   BUSINESS WAITLIST
══════════════════════════════════════ */
function handleBizWaitlist() {
  const input  = document.getElementById('bizEmailInput');
  const form   = document.getElementById('bizForm');
  const msg    = document.getElementById('bizSuccessMsg');
  const button = form.querySelector('button');
  const valid  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());

  if (!valid) {
    form.style.borderColor = 'rgba(255,100,100,0.4)';
    input.focus();
    setTimeout(() => { form.style.borderColor = ''; }, 1300);
    return;
  }

  button.textContent   = 'Sending...';
  button.disabled      = true;
  button.style.opacity = '0.7';
  input.disabled       = true;

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({ email: input.value.trim(), type: "business" }),
  })
  .then(() => {
    form.style.display = 'none';
    msg.style.display  = 'block';
  })
  .catch(() => {
    form.style.display = 'none';
    msg.style.display  = 'block';
  });
}

document.getElementById('bizEmailInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleBizWaitlist();
});