/* Vanhok Academy Door Sign Generator
 * - A4 canvas: 768x1024
 * - Two A5 panels: 768x512 each
 * - Three styles: modern / minimal / tech
 */

const A4_W = 768;
const A4_H = 1024;
const A5_H = 512;

const LOGO_URL = 'https://www.genspark.ai/api/files/s/JU9AT3kH';

const el = {
  form: document.getElementById('form'),
  canvas: document.getElementById('canvas'),
  btnGenerate: document.getElementById('btnGenerate'),
  btnPng: document.getElementById('btnPng'),
  btnJpg: document.getElementById('btnJpg'),
  btnReset: document.getElementById('btnReset'),
  errorBox: document.getElementById('errorBox'),
  badgeStyle: document.getElementById('badgeStyle'),
  year: document.getElementById('year')
};

el.year.textContent = new Date().getFullYear();

const ctx = el.canvas.getContext('2d');

// --- utilities ---
function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function roundedRectPath(ctx, x, y, w, h, r){
  const rr = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y, x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x, y+h, rr);
  ctx.arcTo(x, y+h, x, y, rr);
  ctx.arcTo(x, y, x+w, y, rr);
  ctx.closePath();
}

function fillRoundedRect(ctx, x, y, w, h, r){
  roundedRectPath(ctx, x, y, w, h, r);
  ctx.fill();
}

function strokeRoundedRect(ctx, x, y, w, h, r){
  roundedRectPath(ctx, x, y, w, h, r);
  ctx.stroke();
}

function drawShadowedText(ctx, text, x, y, opt={}){
  const {
    font='700 24px Inter',
    color='white',
    align='left',
    baseline='alphabetic',
    shadow='rgba(0,0,0,.45)',
    blur=10,
    offsetX=0,
    offsetY=3,
    glow=null
  } = opt;

  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;

  ctx.shadowColor = shadow;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = offsetX;
  ctx.shadowOffsetY = offsetY;
  ctx.fillText(text, x, y);

  if (glow){
    ctx.shadowColor = glow;
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillText(text, x, y);
  }

  ctx.restore();
}

function formatPeriod(startISO, endISO){
  // Make like: Jan 17, 2026 - Apr 8, 2026
  const opts = { year: 'numeric', month: 'short', day: 'numeric' };
  const s = new Date(startISO);
  const e = new Date(endISO);
  const sTxt = s.toLocaleDateString('en-US', opts);
  const eTxt = e.toLocaleDateString('en-US', opts);
  return `${sTxt} - ${eTxt}`;
}

function downloadCanvas(canvas, type='image/png', filename='vanhok-door-sign.png', quality=0.92){
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(type, quality);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function getSelectedStyle(){
  const checked = document.querySelector('input[name="style"]:checked');
  return checked ? checked.value : 'modern';
}

function setBadge(style){
  const map = { modern: '方案 1', minimal: '方案 2', tech: '方案 3' };
  el.badgeStyle.textContent = map[style] || '方案 1';
}

// --- logo load ---
let logoImg = new Image();
logoImg.crossOrigin = 'anonymous';
let logoReady = false;
logoImg.onload = () => { logoReady = true; renderPreview(); };
logoImg.onerror = () => { logoReady = false; renderPreview(); };
logoImg.src = LOGO_URL;

function drawLogoWithTreatment(ctx, style, x, y, targetH){
  if (!logoReady) {
    // fallback placeholder
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,.12)';
    fillRoundedRect(ctx, x, y, targetH*2.6, targetH, 14);
    ctx.fillStyle = 'rgba(245,184,65,.9)';
    ctx.font = '900 22px Inter';
    ctx.textBaseline = 'middle';
    ctx.fillText('Vanhok', x+14, y+targetH/2);
    ctx.restore();
    return;
  }

  const scale = targetH / logoImg.height;
  const w = logoImg.width * scale;
  const h = targetH;

  ctx.save();

  if (style === 'modern') {
    // Put logo on glass card; reduce white harshness using multiply
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,.10)';
    fillRoundedRect(ctx, x-10, y-8, w+20, h+16, 16);
    ctx.strokeStyle = 'rgba(255,255,255,.18)';
    ctx.lineWidth = 1;
    strokeRoundedRect(ctx, x-10, y-8, w+20, h+16, 16);

    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(logoImg, x, y, w, h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.25;
    ctx.drawImage(logoImg, x, y, w, h);
  } else if (style === 'minimal') {
    // clean: logo on slightly tinted card
    ctx.fillStyle = 'rgba(10,6,32,.22)';
    fillRoundedRect(ctx, x-10, y-8, w+20, h+16, 14);
    ctx.strokeStyle = 'rgba(255,255,255,.16)';
    ctx.lineWidth = 1;
    strokeRoundedRect(ctx, x-10, y-8, w+20, h+16, 14);

    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(logoImg, x, y, w, h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.18;
    ctx.drawImage(logoImg, x, y, w, h);
  } else {
    // tech: place in glowing circular badge
    const r = Math.max(h*0.62, 44);
    const cx = x + r;
    const cy = y + r;

    // glow
    ctx.shadowColor = 'rgba(8,145,178,.55)';
    ctx.shadowBlur = 18;
    ctx.fillStyle = 'rgba(8,145,178,.18)';
    ctx.beginPath();
    ctx.arc(cx, cy, r+10, 0, Math.PI*2);
    ctx.fill();

    ctx.shadowColor = 'rgba(245,184,65,.35)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(255,255,255,.20)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.stroke();

    // clip & draw logo centered
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r-6, 0, Math.PI*2);
    ctx.clip();

    // scale to fit badge
    const scale2 = (r*2 - 12) / logoImg.height;
    const w2 = logoImg.width * scale2;
    const h2 = logoImg.height * scale2;
    const lx = cx - w2/2;
    const ly = cy - h2/2;

    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(logoImg, lx, ly, w2, h2);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.20;
    ctx.drawImage(logoImg, lx, ly, w2, h2);

    ctx.restore();
  }

  ctx.restore();
}

// --- patterns ---
function drawHexPattern(ctx, x, y, w, h){
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = 'rgba(255,255,255,.22)';
  ctx.lineWidth = 1;

  const size = 22;
  const rowH = Math.sqrt(3)*size;

  for (let yy = -rowH; yy < h + rowH; yy += rowH){
    const offset = (Math.round(yy/rowH) % 2) ? size*1.5 : 0;
    for (let xx = -size*2; xx < w + size*2; xx += size*3){
      const cx = xx + offset;
      const cy = yy;
      ctx.beginPath();
      for (let i=0; i<6; i++){
        const a = Math.PI/3*i + Math.PI/6;
        const px = cx + size*Math.cos(a);
        const py = cy + size*Math.sin(a);
        if (i===0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawLightStreaks(ctx, x, y, w, h){
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.22;
  for (let i=0;i<6;i++){
    const gx = -w*0.2 + i*(w*0.25);
    const grad = ctx.createLinearGradient(gx, 0, gx+w*0.5, h);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.5, 'rgba(255,255,255,.35)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.save();
    ctx.rotate(-0.18);
    ctx.fillRect(gx, -h, w*0.25, h*3);
    ctx.restore();
  }
  ctx.restore();
}

function drawDotMatrix(ctx, x, y, w, h, color='rgba(255,255,255,.18)'){
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = color;
  const step = 18;
  for (let yy=0; yy<h; yy+=step){
    for (let xx=0; xx<w; xx+=step){
      const r = ((xx+yy) % (step*4) === 0) ? 2.2 : 1.2;
      ctx.beginPath();
      ctx.arc(xx, yy, r, 0, Math.PI*2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawTechAngles(ctx, x, y, w, h){
  ctx.save();
  ctx.translate(x, y);

  // angular shapes
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = 'rgba(8,145,178,.16)';
  ctx.beginPath();
  ctx.moveTo(w*0.62, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, h*0.38);
  ctx.lineTo(w*0.82, h*0.28);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(245,184,65,.10)';
  ctx.beginPath();
  ctx.moveTo(0, h*0.72);
  ctx.lineTo(w*0.24, h*0.58);
  ctx.lineTo(w*0.40, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // thin lines
  ctx.globalAlpha = 0.30;
  ctx.strokeStyle = 'rgba(255,255,255,.28)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w*0.56, h*0.12);
  ctx.lineTo(w*0.92, h*0.12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w*0.08, h*0.88);
  ctx.lineTo(w*0.44, h*0.88);
  ctx.stroke();

  ctx.restore();
}

function drawGlassCard(ctx, x, y, w, h, radius=18){
  ctx.save();
  // glass
  const grad = ctx.createLinearGradient(x, y, x+w, y+h);
  grad.addColorStop(0, 'rgba(255,255,255,.14)');
  grad.addColorStop(1, 'rgba(255,255,255,.06)');
  ctx.fillStyle = grad;
  fillRoundedRect(ctx, x, y, w, h, radius);

  ctx.strokeStyle = 'rgba(255,255,255,.18)';
  ctx.lineWidth = 1;
  strokeRoundedRect(ctx, x, y, w, h, radius);

  ctx.restore();
}

// --- drawing styles ---
function drawPanel(style, panelY, data){
  const x = 0;
  const y = panelY;
  const w = A4_W;
  const h = A5_H;

  // background gradients
  ctx.save();
  if (style === 'modern'){
    const bg = ctx.createLinearGradient(x, y, x+w, y+h);
    bg.addColorStop(0, '#2B1B5C');
    bg.addColorStop(1, '#1A0F3D');
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);

    // vignette
    const vg = ctx.createRadialGradient(x+w*0.25, y+h*0.15, 30, x+w*0.45, y+h*0.45, h);
    vg.addColorStop(0, 'rgba(245,184,65,.16)');
    vg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vg;
    ctx.fillRect(x, y, w, h);

    drawHexPattern(ctx, x, y, w, h);

  } else if (style === 'minimal'){
    const bg = ctx.createLinearGradient(x, y, x+w, y+h);
    bg.addColorStop(0, '#3D2B7C');
    bg.addColorStop(1, '#1E3A8A');
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);

    drawLightStreaks(ctx, x, y, w, h);

    // subtle frame
    ctx.strokeStyle = 'rgba(255,255,255,.18)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x+14, y+14, w-28, h-28);

  } else {
    const bg = ctx.createLinearGradient(x, y, x+w, y+h);
    bg.addColorStop(0, '#4C2C7C');
    bg.addColorStop(1, '#0891B2');
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);

    drawDotMatrix(ctx, x, y, w, h, 'rgba(255,255,255,.20)');
    drawTechAngles(ctx, x, y, w, h);
  }

  // divider between two A5s handled by full render

  // logo
  if (style === 'minimal'){
    drawLogoWithTreatment(ctx, style, x+24, y+24, 70);
  } else {
    drawLogoWithTreatment(ctx, style, x+24, y+24, 80);
  }

  // Common text layout areas
  if (style === 'modern'){
    // Room number focal (140px) center-right
    drawShadowedText(ctx, data.room, x+w-46, y+168, {
      font: '900 140px Inter',
      color: '#F5B841',
      align: 'right',
      baseline: 'top',
      shadow: 'rgba(0,0,0,.55)',
      blur: 18,
      glow: 'rgba(245,184,65,.22)'
    });

    // glass card for user info
    const cardX = x+40;
    const cardY = y+270;
    const cardW = w-80;
    const cardH = 170;
    drawGlassCard(ctx, cardX, cardY, cardW, cardH, 20);

    drawShadowedText(ctx, 'Priority User', cardX+26, cardY+26, {
      font: '700 22px Inter',
      color: 'rgba(255,255,255,.92)',
      align: 'left',
      baseline: 'top',
      blur: 10
    });
    drawShadowedText(ctx, data.user, cardX+26, cardY+62, {
      font: '800 32px Inter',
      color: '#F5B841',
      align: 'left',
      baseline: 'top',
      blur: 16,
      glow: 'rgba(245,184,65,.18)'
    });
    drawShadowedText(ctx, `(${data.role})`, cardX+26, cardY+104, {
      font: '700 24px Inter',
      color: '#B8A4E8',
      align: 'left',
      baseline: 'top',
      blur: 14
    });

    // period bottom-left
    const period = `Period: ${formatPeriod(data.start, data.end)}`;
    drawShadowedText(ctx, period, x+44, y+h-44, {
      font: '700 20px Inter',
      color: 'rgba(255,255,255,.92)',
      align: 'left',
      baseline: 'alphabetic',
      blur: 12
    });

  } else if (style === 'minimal'){
    // Room number top-center, bigger 160px
    drawShadowedText(ctx, data.room, x+w/2, y+96, {
      font: '900 160px Inter',
      color: '#F5B841',
      align: 'center',
      baseline: 'top',
      blur: 18,
      glow: 'rgba(245,184,65,.18)'
    });

    // divider line
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = 'rgba(255,255,255,.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x+120, y+298);
    ctx.lineTo(x+w-120, y+298);
    ctx.stroke();
    ctx.restore();

    // user centered
    drawShadowedText(ctx, data.user, x+w/2, y+320, {
      font: '800 28px Inter',
      color: '#F5B841',
      align: 'center',
      baseline: 'top',
      blur: 12
    });
    drawShadowedText(ctx, `(${data.role})`, x+w/2, y+358, {
      font: '700 22px Inter',
      color: 'rgba(255,255,255,.86)',
      align: 'center',
      baseline: 'top',
      blur: 10
    });

    // period bottom center
    const period = `Period: ${formatPeriod(data.start, data.end)}`;
    drawShadowedText(ctx, period, x+w/2, y+h-44, {
      font: '700 20px Inter',
      color: 'rgba(255,255,255,.92)',
      align: 'center',
      baseline: 'alphabetic',
      blur: 12
    });

  } else {
    // tech room number outlined + glow (150px)
    const rx = x+w-52;
    const ry = y+112;
    ctx.save();
    ctx.font = '900 150px Inter';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';

    // glow fill
    ctx.shadowColor = 'rgba(245,184,65,.25)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(245,184,65,.18)';
    ctx.fillText(data.room, rx, ry);

    // outline
    ctx.shadowBlur = 0;
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(245,184,65,.95)';
    ctx.strokeText(data.room, rx, ry);

    // inner fill
    ctx.fillStyle = 'rgba(245,184,65,.55)';
    ctx.fillText(data.room, rx, ry);
    ctx.restore();

    // angular glass card for user
    const cardX = x+40;
    const cardY = y+280;
    const cardW = w-80;
    const cardH = 170;
    drawGlassCard(ctx, cardX, cardY, cardW, cardH, 14);

    // left accent line
    ctx.save();
    ctx.strokeStyle = 'rgba(8,145,178,.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cardX+18, cardY+22);
    ctx.lineTo(cardX+18, cardY+cardH-22);
    ctx.stroke();
    ctx.restore();

    drawShadowedText(ctx, 'Priority User', cardX+34, cardY+26, {
      font: '700 22px Inter',
      color: 'rgba(255,255,255,.92)',
      align: 'left',
      baseline: 'top',
      blur: 10
    });
    drawShadowedText(ctx, data.user, cardX+34, cardY+64, {
      font: '900 30px Inter',
      color: '#F5B841',
      align: 'left',
      baseline: 'top',
      blur: 16,
      glow: 'rgba(245,184,65,.18)'
    });
    drawShadowedText(ctx, `(${data.role})`, cardX+34, cardY+106, {
      font: '800 24px Inter',
      color: '#22D3EE',
      align: 'left',
      baseline: 'top',
      blur: 14,
      glow: 'rgba(34,211,238,.22)'
    });

    // period with icon
    const period = `⏱  ${formatPeriod(data.start, data.end)}`;
    drawShadowedText(ctx, period, x+44, y+h-44, {
      font: '800 22px Inter',
      color: 'rgba(255,255,255,.92)',
      align: 'left',
      baseline: 'alphabetic',
      blur: 14
    });
  }

  ctx.restore();
}

function clearA4(){
  ctx.clearRect(0,0,A4_W,A4_H);
  // base paper background
  ctx.save();
  ctx.fillStyle = '#0a0620';
  ctx.fillRect(0,0,A4_W,A4_H);
  ctx.restore();
}

function drawA4Divider(){
  ctx.save();
  // white cut line
  ctx.globalAlpha = 0.65;
  ctx.strokeStyle = 'rgba(255,255,255,.55)';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(28, A5_H);
  ctx.lineTo(A4_W-28, A5_H);
  ctx.stroke();
  ctx.setLineDash([]);

  // scissors hint
  ctx.globalAlpha = 0.55;
  ctx.font = '700 14px Inter';
  ctx.fillStyle = 'rgba(255,255,255,.72)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Cut Here', A4_W/2, A5_H);
  ctx.restore();
}

function getFormData(){
  const fd = new FormData(el.form);
  const data = {
    room1: (fd.get('room1') || '').toString().trim(),
    user1: (fd.get('user1') || '').toString().trim(),
    role1: (fd.get('role1') || '').toString().trim(),
    start1: (fd.get('start1') || '').toString(),
    end1: (fd.get('end1') || '').toString(),

    room2: (fd.get('room2') || '').toString().trim(),
    user2: (fd.get('user2') || '').toString().trim(),
    role2: (fd.get('role2') || '').toString().trim(),
    start2: (fd.get('start2') || '').toString(),
    end2: (fd.get('end2') || '').toString(),
  };
  return data;
}

function validate(data){
  const errors = [];

  function checkOne(prefix){
    const room = data[`room${prefix}`];
    const user = data[`user${prefix}`];
    const role = data[`role${prefix}`];
    const start = data[`start${prefix}`];
    const end = data[`end${prefix}`];
    if (!room) errors.push(`第 ${prefix} 张：房号必填`);
    if (!user) errors.push(`第 ${prefix} 张：Priority User 必填`);
    if (!role) errors.push(`第 ${prefix} 张：Role 必填`);
    if (!start) errors.push(`第 ${prefix} 张：Start Date 必填`);
    if (!end) errors.push(`第 ${prefix} 张：End Date 必填`);

    if (start && end){
      const s = new Date(start).getTime();
      const e = new Date(end).getTime();
      if (!(e > s)) errors.push(`第 ${prefix} 张：End Date 必须晚于 Start Date`);
    }
  }

  checkOne('1');
  checkOne('2');

  return errors;
}

function render(style, data){
  clearA4();

  const d1 = {
    room: data.room1,
    user: data.user1,
    role: data.role1,
    start: data.start1,
    end: data.end1
  };
  const d2 = {
    room: data.room2,
    user: data.user2,
    role: data.role2,
    start: data.start2,
    end: data.end2
  };

  drawPanel(style, 0, d1);
  drawPanel(style, A5_H, d2);
  drawA4Divider();
}

function renderPreview(){
  // For preview, allow empty fields with placeholders
  const style = getSelectedStyle();
  setBadge(style);

  const d = getFormData();
  const mock = {
    room1: d.room1 || '402A',
    user1: d.user1 || 'Hercules To',
    role1: d.role1 || 'Student',
    start1: d.start1 || '2026-01-17',
    end1: d.end1 || '2026-04-08',

    room2: d.room2 || (d.room1 || '402A'),
    user2: d.user2 || (d.user1 || 'Hercules To'),
    role2: d.role2 || (d.role1 || 'Student'),
    start2: d.start2 || (d.start1 || '2026-01-17'),
    end2: d.end2 || (d.end1 || '2026-04-08'),
  };
  render(style, mock);
}

function showErrors(errors){
  if (!errors || errors.length === 0){
    el.errorBox.hidden = true;
    el.errorBox.textContent = '';
    return;
  }
  el.errorBox.hidden = false;
  el.errorBox.innerHTML = `<strong>请修正以下问题：</strong><ul>${errors.map(e=>`<li>${e}</li>`).join('')}</ul>`;
}

// --- events ---

document.querySelectorAll('input[name="style"]').forEach(r => {
  r.addEventListener('change', () => {
    renderPreview();
  });
});

el.form.addEventListener('input', () => {
  renderPreview();
});

el.btnGenerate.addEventListener('click', () => {
  const style = getSelectedStyle();
  const data = getFormData();
  const errors = validate(data);
  showErrors(errors);
  if (errors.length) {
    el.btnPng.disabled = true;
    el.btnJpg.disabled = true;
    return;
  }

  render(style, data);
  el.btnPng.disabled = false;
  el.btnJpg.disabled = false;
});

el.btnPng.addEventListener('click', () => {
  downloadCanvas(el.canvas, 'image/png', `vanhok-door-sign-${getSelectedStyle()}.png`);
});

el.btnJpg.addEventListener('click', () => {
  downloadCanvas(el.canvas, 'image/jpeg', `vanhok-door-sign-${getSelectedStyle()}.jpg`, 0.92);
});

el.btnReset.addEventListener('click', (e) => {
  e.preventDefault();
  el.form.reset();
  showErrors([]);
  el.btnPng.disabled = true;
  el.btnJpg.disabled = true;
  // default style modern
  document.querySelector('input[name="style"][value="modern"]').checked = true;
  renderPreview();
});

// initial preview
renderPreview();
