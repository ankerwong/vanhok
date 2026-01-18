/* Door Sign Generator (A4: 768x1024) - Client side only */

const BRAND = {
  purple: '#3D2B7C',
  navy: '#0D1A4B',
  gold: '#F5B841',
  white: '#FFFFFF'
};

const canvas = document.getElementById('a4Canvas');
const ctx = canvas.getContext('2d');

const form = document.getElementById('signForm');
const fillExampleBtn = document.getElementById('fillExampleBtn');
const downloadPngBtn = document.getElementById('downloadPngBtn');
const downloadJpgBtn = document.getElementById('downloadJpgBtn');
const previewHint = document.getElementById('previewHint');

const jpgQuality = document.getElementById('jpgQuality');
const jpgQualityVal = document.getElementById('jpgQualityVal');

jpgQuality.addEventListener('input', () => {
  jpgQualityVal.textContent = Number(jpgQuality.value).toFixed(2);
});

function pad2(n){return String(n).padStart(2,'0');}
function formatPeriod(startISO, endISO){
  // Example required style: Jan 17 - April 8, 2026
  // We will format as: Mon DD - Mon DD, YYYY (using English month names)
  const start = new Date(startISO + 'T00:00:00');
  const end = new Date(endISO + 'T00:00:00');
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '';

  const mLong = new Intl.DateTimeFormat('en-US', {month:'long'});
  const mShort = new Intl.DateTimeFormat('en-US', {month:'short'});

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = start.getMonth() === end.getMonth();

  const sMonth = sameMonth ? mShort.format(start) : mShort.format(start);
  const eMonth = sameMonth ? mLong.format(end) : mLong.format(end);

  const s = `${sMonth} ${start.getDate()}`;
  const e = `${eMonth} ${end.getDate()}, ${end.getFullYear()}`;

  // If start year differs, show both years
  if (!sameYear){
    return `${mShort.format(start)} ${start.getDate()}, ${start.getFullYear()} - ${mLong.format(end)} ${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${s} - ${e}`;
}

function setError(name, msg){
  const el = document.querySelector(`[data-error-for="${name}"]`);
  if (el) el.textContent = msg || '';
}

function clearErrors(){
  document.querySelectorAll('.field__error').forEach(e => e.textContent='');
}

function validate(data){
  clearErrors();
  let ok = true;
  for (const key of ['room1','user1','start1','end1','room2','user2','start2','end2']){
    if (!data[key] || String(data[key]).trim() === ''){
      setError(key, '必填');
      ok = false;
    }
  }

  // date logic
  const s1 = new Date(data.start1); const e1 = new Date(data.end1);
  const s2 = new Date(data.start2); const e2 = new Date(data.end2);
  if (ok){
    if (s1 > e1){ setError('end1', '结束日期需晚于开始日期'); ok = false; }
    if (s2 > e2){ setError('end2', '结束日期需晚于开始日期'); ok = false; }
  }

  return ok;
}

function getFormData(){
  const fd = new FormData(form);
  return Object.fromEntries(fd.entries());
}

function roundRectPath(c, x, y, w, h, r){
  const rr = Math.min(r, w/2, h/2);
  c.beginPath();
  c.moveTo(x+rr, y);
  c.arcTo(x+w, y, x+w, y+h, rr);
  c.arcTo(x+w, y+h, x, y+h, rr);
  c.arcTo(x, y+h, x, y, rr);
  c.arcTo(x, y, x+w, y, rr);
  c.closePath();
}

function drawHexPattern(c, x, y, w, h, color, alpha){
  c.save();
  c.globalAlpha = alpha;
  c.strokeStyle = color;
  c.lineWidth = 1;

  const size = 26;
  const hexH = Math.sin(Math.PI/3) * size;
  const stepX = size * 1.5;
  const stepY = hexH * 2;

  c.translate(x, y);

  for (let yy = -stepY; yy < h + stepY; yy += hexH){
    for (let xx = -stepX; xx < w + stepX; xx += stepX){
      const offset = (Math.round(yy/hexH) % 2) ? size * 0.75 : 0;
      drawHex(c, xx + offset, yy, size);
      c.stroke();
    }
  }

  c.restore();

  function drawHex(ctx2, cx, cy, s){
    const hh = Math.sin(Math.PI/3) * s;
    ctx2.beginPath();
    ctx2.moveTo(cx + s, cy);
    ctx2.lineTo(cx + s/2, cy + hh);
    ctx2.lineTo(cx - s/2, cy + hh);
    ctx2.lineTo(cx - s, cy);
    ctx2.lineTo(cx - s/2, cy - hh);
    ctx2.lineTo(cx + s/2, cy - hh);
    ctx2.closePath();
  }
}

function drawGlassPanel(c, x, y, w, h){
  c.save();
  // shadow
  c.shadowColor = 'rgba(0,0,0,.35)';
  c.shadowBlur = 18;
  c.shadowOffsetY = 10;
  roundRectPath(c, x, y, w, h, 18);
  c.fillStyle = 'rgba(255,255,255,.08)';
  c.fill();

  // border
  c.shadowColor = 'transparent';
  roundRectPath(c, x, y, w, h, 18);
  c.strokeStyle = 'rgba(255,255,255,.18)';
  c.lineWidth = 1;
  c.stroke();

  // top highlight
  const g = c.createLinearGradient(0, y, 0, y+h);
  g.addColorStop(0, 'rgba(255,255,255,.20)');
  g.addColorStop(0.35, 'rgba(255,255,255,.06)');
  g.addColorStop(1, 'rgba(255,255,255,.02)');
  roundRectPath(c, x, y, w, h, 18);
  c.fillStyle = g;
  c.fill();

  c.restore();
}

function fitText(c, text, maxWidth, startSize, minSize){
  let size = startSize;
  while (size > minSize){
    c.font = `800 ${size}px Inter, system-ui, sans-serif`;
    if (c.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function loadImage(url){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function renderA4(data){
  const W = canvas.width;
  const H = canvas.height;

  // Clear
  ctx.clearRect(0,0,W,H);

  // Background
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0, '#2D1D66');
  bg.addColorStop(0.55, '#0E1A4B');
  bg.addColorStop(1, '#08102F');
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,W,H);

  // Subtle noise / dots
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#fff';
  for (let i=0;i<1600;i++){
    const x = Math.random()*W;
    const y = Math.random()*H;
    const r = Math.random()*1.2;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  }
  ctx.restore();

  // Hex patterns bands for top and bottom halves
  drawHexPattern(ctx, 20, 20, W-40, H/2-40, 'rgba(255,255,255,1)', 0.08);
  drawHexPattern(ctx, 20, H/2+20, W-40, H/2-40, 'rgba(255,255,255,1)', 0.08);

  // Decorative gold diagonal line
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = BRAND.gold;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W*0.62, -40);
  ctx.lineTo(W*1.08, H*0.52);
  ctx.stroke();
  ctx.globalAlpha = 0.10;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(W*0.14, H*0.45);
  ctx.lineTo(W*0.52, H*0.85);
  ctx.stroke();
  ctx.restore();

  // Two signs (A5 each)
  const margin = 28;
  const signW = W - margin*2;
  const signH = (H - margin*3) / 2;
  const sign1 = {x: margin, y: margin, w: signW, h: signH};
  const sign2 = {x: margin, y: margin*2 + signH, w: signW, h: signH};

  // Load logo
  const logo = await loadImage('images/vanhok-logo.png');

  drawDoorSign(ctx, sign1, logo, {
    room: data.room1.trim(),
    user: data.user1.trim(),
    period: formatPeriod(data.start1, data.end1)
  });

  drawDoorSign(ctx, sign2, logo, {
    room: data.room2.trim(),
    user: data.user2.trim(),
    period: formatPeriod(data.start2, data.end2)
  });

  // Cut line hint (subtle)
  ctx.save();
  ctx.setLineDash([8,8]);
  ctx.strokeStyle = 'rgba(255,255,255,.20)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin, margin + signH + margin/2);
  ctx.lineTo(W-margin, margin + signH + margin/2);
  ctx.stroke();
  ctx.restore();
}

function drawDoorSign(c, rect, logoImg, content){
  const {x,y,w,h} = rect;

  // Panel base
  drawGlassPanel(c, x, y, w, h);

  // Inner gradient background
  c.save();
  roundRectPath(c, x, y, w, h, 18);
  c.clip();

  const g = c.createLinearGradient(x, y, x+w, y+h);
  g.addColorStop(0, 'rgba(61,43,124,.55)');
  g.addColorStop(0.55, 'rgba(13,26,75,.55)');
  g.addColorStop(1, 'rgba(8,16,47,.55)');
  c.fillStyle = g;
  c.fillRect(x,y,w,h);

  // soft light blob
  const blob = c.createRadialGradient(x+w*0.22, y+h*0.20, 10, x+w*0.22, y+h*0.20, h*0.60);
  blob.addColorStop(0,'rgba(245,184,65,.25)');
  blob.addColorStop(1,'rgba(245,184,65,0)');
  c.fillStyle = blob;
  c.fillRect(x,y,w,h);

  // geometric line accents
  c.save();
  c.globalAlpha = 0.25;
  c.strokeStyle = 'rgba(255,255,255,.28)';
  c.lineWidth = 1;
  for (let i=0;i<9;i++){
    const yy = y + (h*0.18) + i*18;
    c.beginPath();
    c.moveTo(x + w*0.62, yy);
    c.lineTo(x + w - 18, yy - 14);
    c.stroke();
  }
  c.restore();

  // logo (complete)
  const logoH = Math.min(52, h*0.22);
  const logoW = logoImg.width / logoImg.height * logoH;
  c.drawImage(logoImg, x+18, y+16, logoW, logoH);

  // room number
  const roomMaxW = w*0.52;
  let roomSize = fitText(c, content.room, roomMaxW, 82, 44);
  c.font = `900 ${roomSize}px Inter, system-ui, sans-serif`;
  c.fillStyle = BRAND.gold;
  c.textBaseline = 'top';
  c.textAlign = 'right';
  c.shadowColor = 'rgba(0,0,0,.35)';
  c.shadowBlur = 12;
  c.fillText(content.room, x+w-22, y+18);
  c.shadowColor = 'transparent';

  // labels
  const leftX = x+20;
  const baseY = y + h*0.52;

  c.textAlign = 'left';
  c.fillStyle = 'rgba(255,255,255,.90)';
  c.font = `700 16px Inter, system-ui, sans-serif`;
  c.fillText('Priority User', leftX, baseY);

  c.fillStyle = BRAND.gold;
  c.font = `800 22px Inter, system-ui, sans-serif`;
  // wrap if too long
  wrapText(c, content.user, leftX, baseY+22, w-40, 26, 2);

  // period
  c.fillStyle = 'rgba(255,255,255,.88)';
  c.font = `700 16px Inter, system-ui, sans-serif`;
  c.fillText('Period', leftX, y+h-48);

  c.fillStyle = 'rgba(255,255,255,.92)';
  c.font = `800 18px Inter, system-ui, sans-serif`;
  c.fillText(content.period, leftX, y+h-28);

  // gold corner dot
  c.save();
  c.globalAlpha = 0.9;
  c.fillStyle = BRAND.gold;
  c.beginPath();
  c.arc(x+w-26, y+h-26, 6, 0, Math.PI*2);
  c.fill();
  c.restore();

  c.restore();
}

function wrapText(c, text, x, y, maxWidth, lineHeight, maxLines=2){
  const words = text.split(' ');
  let line = '';
  let lines = [];

  for (let n = 0; n < words.length; n++){
    const testLine = line ? line + ' ' + words[n] : words[n];
    const metrics = c.measureText(testLine);
    if (metrics.width > maxWidth && n > 0){
      lines.push(line);
      line = words[n];
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  lines = lines.slice(0, maxLines);

  for (let i=0; i<lines.length; i++){
    c.fillText(lines[i], x, y + i*lineHeight);
  }

  // ellipsis if overflow
  if (lines.length === maxLines && words.length > 0){
    const reconstructed = lines.join(' ');
    if (reconstructed.length < text.length){
      // add ellipsis to last line
      let last = lines[maxLines-1];
      while (c.measureText(last + '…').width > maxWidth && last.length > 0){
        last = last.slice(0,-1);
      }
      lines[maxLines-1] = last + '…';
      // redraw last line
      c.clearRect(x, y + (maxLines-1)*lineHeight - 2, maxWidth, lineHeight + 6);
      c.fillText(lines[maxLines-1], x, y + (maxLines-1)*lineHeight);
    }
  }
}

function download(dataURL, filename){
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

fillExampleBtn.addEventListener('click', () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = pad2(today.getMonth()+1);
  const dd = pad2(today.getDate());

  form.room1.value = '402A';
  form.user1.value = 'Hercules To (Student)';
  form.start1.value = `${yyyy}-01-17`;
  form.end1.value = `${yyyy}-04-08`;

  form.room2.value = '402A';
  form.user2.value = 'Hercules To (Student)';
  form.start2.value = `${yyyy}-01-17`;
  form.end2.value = `${yyyy}-04-08`;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = getFormData();
  if (!validate(data)) return;

  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.textContent = '生成中…';

  try{
    await renderA4(data);
    previewHint.style.display = 'none';
    downloadPngBtn.disabled = false;
    downloadJpgBtn.disabled = false;
  }catch(err){
    console.error(err);
    alert('生成失败：可能是 Logo 加载失败或浏览器限制跨域。请稍后重试。');
  }finally{
    btn.disabled = false;
    btn.textContent = '生成 A4 图片';
  }
});

downloadPngBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  download(dataURL, `vanhok-door-sign-a4-${Date.now()}.png`);
});

downloadJpgBtn.addEventListener('click', () => {
  const q = Number(jpgQuality.value);
  const dataURL = canvas.toDataURL('image/jpeg', q);
  download(dataURL, `vanhok-door-sign-a4-${Date.now()}.jpg`);
});

// Initial gentle placeholder render (optional)
(function init(){
  ctx.fillStyle = '#111';
  ctx.fillRect(0,0,canvas.width,canvas.height);
})();
