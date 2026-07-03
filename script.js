/* ============================================
   PATIENT TRIAGE SYSTEM — script.js
   ============================================ */

'use strict';

/* ─────────────────────────────────────────
   MOCK DATA — Patient Queue
   Priority: 1=Emergency, 2=Moderate, 3=Normal
───────────────────────────────────────── */
const MOCK_PATIENTS = [
  {
    id: 1,
    name: 'สมชาย ใจดี',
    age: 55,
    symptom: 'เจ็บหน้าอก แน่นหน้าอก เหนื่อยง่าย',
    level: 'red',
    levelText: 'ฉุกเฉิน',
    priority: 1,
    time: '08:12',
    queue: 'E001',
  },
  {
    id: 2,
    name: 'วิภา รักสุข',
    age: 34,
    symptom: 'ไข้สูง 39.5 องศา ปวดศีรษะ',
    level: 'yellow',
    levelText: 'ปานกลาง',
    priority: 2,
    time: '08:25',
    queue: 'M002',
  },
  {
    id: 3,
    name: 'ประพัทธ์ มั่นคง',
    age: 28,
    symptom: 'หายใจลำบาก แน่นหน้าอก',
    level: 'red',
    levelText: 'ฉุกเฉิน',
    priority: 1,
    time: '08:33',
    queue: 'E003',
  },
  {
    id: 4,
    name: 'นงนุช สดใส',
    age: 42,
    symptom: 'ปวดท้อง คลื่นไส้เล็กน้อย',
    level: 'green',
    levelText: 'ปกติ',
    priority: 3,
    time: '08:40',
    queue: 'N004',
  },
  {
    id: 5,
    name: 'เกียรติศักดิ์ ทองดี',
    age: 61,
    symptom: 'ไข้สูง ปวดเมื่อยตัว ไอ',
    level: 'yellow',
    levelText: 'ปานกลาง',
    priority: 2,
    time: '08:55',
    queue: 'M005',
  },
  {
    id: 6,
    name: 'อรุณี ศรีสุข',
    age: 19,
    symptom: 'ปวดหัวเล็กน้อย เพลีย',
    level: 'green',
    levelText: 'ปกติ',
    priority: 3,
    time: '09:05',
    queue: 'N006',
  },
  {
    id: 7,
    name: 'ธนกร ใสสะอาด',
    age: 70,
    symptom: 'เจ็บหน้าอก ใจสั่น เหงื่อออกมาก',
    level: 'red',
    levelText: 'ฉุกเฉิน',
    priority: 1,
    time: '09:18',
    queue: 'E007',
  },
];

/* ─────────────────────────────────────────
   TRIAGE LOGIC
───────────────────────────────────────── */
function triagePatient(symptom) {
  const s = symptom.toLowerCase();
  if (s.includes('เจ็บหน้าอก') || s.includes('หายใจลำบาก')) {
    return {
      level: 'red',
      levelText: 'ฉุกเฉิน',
      priority: 1,
      advice: [
        'รีบไปห้องฉุกเฉินทันที',
        'แจ้งเจ้าหน้าที่พยาบาลทันที',
        'ห้ามเดินคนเดียว ต้องมีผู้ดูแล',
        'เตรียมประวัติยาที่รับประทานอยู่',
      ],
    };
  }
  if (s.includes('ไข้สูง')) {
    return {
      level: 'yellow',
      levelText: 'ปานกลาง',
      priority: 2,
      advice: [
        'นั่งพักในบริเวณที่กำหนด',
        'ดื่มน้ำให้เพียงพอ',
        'หากไข้เกิน 39 องศา แจ้งพยาบาลเพิ่มเติม',
        'รอคิวตรวจในลำดับถัดไป',
      ],
    };
  }
  return {
    level: 'green',
    levelText: 'ปกติ',
    priority: 3,
    advice: [
      'รอรับบัตรคิวที่เคาน์เตอร์',
      'นั่งพักในห้องรอตรวจ',
      'พบแพทย์ตามลำดับคิว',
      'หากอาการแย่ลงแจ้งพยาบาลทันที',
    ],
  };
}

/* ─────────────────────────────────────────
   LOGIN — logic
───────────────────────────────────────── */
function initLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const pwInput  = document.getElementById('password');
  const togglePw = document.getElementById('toggle-pw');
  const errMsg   = document.getElementById('login-error');
  const loginBtn = document.getElementById('login-btn');

  if (togglePw && pwInput) {
    togglePw.addEventListener('click', () => {
      const isText = pwInput.type === 'text';
      pwInput.type = isText ? 'password' : 'text';
      togglePw.setAttribute('aria-label', isText ? 'แสดงรหัสผ่าน' : 'ซ่อนรหัสผ่าน');
      togglePw.innerHTML = isText
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = pwInput.value.trim();

    loginBtn.disabled = true;
    loginBtn.textContent = 'กำลังเข้าสู่ระบบ...';

    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        window.location.href = 'admin.html';
      } else if (username !== '' && password !== '') {
        window.location.href = 'user.html';
      } else {
        if (errMsg) {
          errMsg.textContent = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน';
          errMsg.style.display = 'block';
        }
        loginBtn.disabled = false;
        loginBtn.textContent = 'เข้าสู่ระบบ';
      }
    }, 800);
  });
}

/* ─────────────────────────────────────────
   USER — submit triage form
───────────────────────────────────────── */
function initUser() {
  const form = document.getElementById('triage-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('patient-name').value.trim();
    const age     = document.getElementById('patient-age').value.trim();
    const symptom = document.getElementById('patient-symptom').value.trim();

    if (!name || !age || !symptom) return;

    const result = triagePatient(symptom);

    // Store in sessionStorage for result page
    const patientData = { name, age, symptom, ...result, time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) };
    sessionStorage.setItem('currentPatient', JSON.stringify(patientData));

    window.location.href = 'result.html';
  });
}

/* ─────────────────────────────────────────
   RESULT — display triage result
───────────────────────────────────────── */
function initResult() {
  const container = document.getElementById('result-container');
  if (!container) return;

  const raw = sessionStorage.getItem('currentPatient');
  if (!raw) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <p>ไม่พบข้อมูลผู้ป่วย กรุณากรอกข้อมูลใหม่</p>
        <a href="user.html" class="btn btn-primary mt-16" style="max-width:200px;margin:16px auto 0;">กลับไปกรอกข้อมูล</a>
      </div>`;
    return;
  }

  const p = JSON.parse(raw);
  const levelMap = {
    red:    { label: 'ระดับฉุกเฉิน', sub: 'ต้องได้รับการรักษาทันที',    icon: 'E' },
    yellow: { label: 'ระดับปานกลาง',  sub: 'รอรับการรักษาในลำดับถัดไป', icon: 'M' },
    green:  { label: 'ระดับปกติ',     sub: 'รอรับการรักษาตามคิว',       icon: 'N' },
  };
  const lm = levelMap[p.level];

  container.innerHTML = `
    <div class="result-hero ${p.level}">
      <div class="level-label">${lm.label}</div>
      <div class="level-title">${p.levelText}</div>
      <div class="level-sub">${lm.sub}</div>
    </div>

    <div class="card">
      <div class="card-title">
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2f80ed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        ข้อมูลผู้ป่วย
      </div>
      <div class="info-row">
        <span class="info-label">ชื่อ-สกุล</span>
        <span class="info-value">${escapeHtml(p.name)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">อายุ</span>
        <span class="info-value">${escapeHtml(p.age)} ปี</span>
      </div>
      <div class="info-row">
        <span class="info-label">เวลาที่บันทึก</span>
        <span class="info-value">${p.time} น.</span>
      </div>
      <div class="info-row">
        <span class="info-label">ระดับความรุนแรง</span>
        <span class="info-value">
          <span class="badge badge-${p.level}">
            <span class="badge-dot"></span>
            ${p.levelText}
          </span>
        </span>
      </div>
      <div class="divider"></div>
      <div class="form-group mb-8" style="margin-bottom:0">
        <div class="info-label" style="margin-bottom:6px">อาการที่แจ้ง</div>
        <div style="font-size:14px;color:#1e293b;line-height:1.6;">${escapeHtml(p.symptom)}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <div class="icon" style="background:#e8f8ef">
          <svg viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </div>
        คำแนะนำเบื้องต้น
      </div>
      <div class="advice-box ${p.level}">
        <div class="advice-title">
          ${p.level === 'red' ? 'แจ้งเจ้าหน้าที่ทันที' : p.level === 'yellow' ? 'ปฏิบัติตามขั้นตอนต่อไปนี้' : 'ปฏิบัติตามขั้นตอนต่อไปนี้'}
        </div>
        <ul>
          ${p.advice.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>

    <a href="user.html" class="btn btn-outline mt-8">บันทึกผู้ป่วยรายใหม่</a>
  `;
}

/* ─────────────────────────────────────────
   ADMIN — patient queue dashboard
───────────────────────────────────────── */
function initAdmin() {
  const listEl   = document.getElementById('patient-list');
  const sortEl   = document.getElementById('sort-select');
  const statRed  = document.getElementById('stat-red');
  const statYel  = document.getElementById('stat-yellow');
  const statGrn  = document.getElementById('stat-green');
  const statAll  = document.getElementById('stat-all');
  if (!listEl) return;

  // Fill stats
  const counts = { red: 0, yellow: 0, green: 0 };
  MOCK_PATIENTS.forEach(p => counts[p.level]++);
  if (statRed)  statRed.textContent  = counts.red;
  if (statYel)  statYel.textContent  = counts.yellow;
  if (statGrn)  statGrn.textContent  = counts.green;
  if (statAll)  statAll.textContent  = MOCK_PATIENTS.length;

  function renderList(patients) {
    listEl.innerHTML = '';
    if (patients.length === 0) {
      listEl.innerHTML = `<div class="empty-state"><p>ไม่มีข้อมูลผู้ป่วย</p></div>`;
      return;
    }
    patients.forEach((p, idx) => {
      const initials = p.name.charAt(0);
      const div = document.createElement('div');
      div.className = `patient-item ${p.level}`;
      div.style.animationDelay = `${idx * 0.05}s`;
      div.innerHTML = `
        <div class="patient-avatar ${p.level}">${initials}</div>
        <div class="patient-info">
          <div class="patient-name">${escapeHtml(p.name)}</div>
          <div class="patient-symptom">${escapeHtml(p.symptom)}</div>
          <div class="mt-4">
            <span class="badge badge-${p.level}" style="font-size:11px;padding:3px 10px;">
              <span class="badge-dot"></span>${p.levelText}
            </span>
          </div>
        </div>
        <div class="patient-meta">
          <div class="queue-num">${p.queue}</div>
          <div class="patient-age">${p.age} ปี</div>
          <div class="patient-age" style="margin-top:2px;">${p.time} น.</div>
        </div>
      `;
      listEl.appendChild(div);
    });
  }

  function getSorted(mode) {
    const copy = [...MOCK_PATIENTS];
    if (mode === 'priority') {
      copy.sort((a, b) => a.priority - b.priority || a.id - b.id);
    } else if (mode === 'time') {
      copy.sort((a, b) => a.id - b.id);
    } else if (mode === 'name') {
      copy.sort((a, b) => a.name.localeCompare(b.name, 'th'));
    }
    return copy;
  }

  renderList(getSorted('priority'));

  if (sortEl) {
    sortEl.addEventListener('change', () => {
      renderList(getSorted(sortEl.value));
    });
  }
}

/* ─────────────────────────────────────────
   UTIL
───────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─────────────────────────────────────────
   ROUTER — auto-detect current page
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('login') || path === '/' || path.endsWith('index.html')) initLogin();
  if (path.includes('user'))   initUser();
  if (path.includes('result')) initResult();
  if (path.includes('admin'))  initAdmin();
});
