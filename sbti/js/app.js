/**
 * SBTI 人格测试 - 主逻辑
 * Silly Big Personality Test
 */

// ==============================
// 状态管理
// ==============================
const state = {
  currentQuestion: 0,
  answers: [],
  resultType: null,
  resultData: null,
  ratings: { accuracy: 0, funny: 0 },
  feedbackSubmitted: false
};

// ==============================
// 工具函数
// ==============================
function $(id) { return document.getElementById(id); }

function showSection(id) {
  ['hero', 'intro', 'test', 'result'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  const target = $(id);
  if (target) {
    target.style.display = '';
    target.classList.add('section-in');
    setTimeout(() => target.classList.remove('section-in'), 500);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==============================
// 导航函数
// ==============================
function startTest() {
  state.currentQuestion = 0;
  state.answers = [];
  state.ratings = { accuracy: 0, funny: 0 };
  state.feedbackSubmitted = false;
  showSection('test');
  renderQuestion();
}

function backToHome() {
  showSection('hero');
  $('intro').style.display = '';
}

function scrollToIntro() {
  $('intro').scrollIntoView({ behavior: 'smooth' });
}

function restartTest() {
  startTest();
}

// ==============================
// 测试逻辑
// ==============================
function renderQuestion() {
  const total = QUESTIONS.length;
  const current = state.currentQuestion;

  if (current >= total) {
    calculateResult();
    return;
  }

  const q = QUESTIONS[current];

  // 更新进度
  $('q-current').textContent = current + 1;
  $('q-total').textContent = total;
  $('q-badge').textContent = 'Q' + (current + 1);
  const pct = Math.max(5, Math.round(((current + 1) / total) * 100));
  $('progress-fill').style.width = pct + '%';

  // 更新题目文字
  $('q-text').textContent = q.text;

  // 生成选项
  const container = $('options-container');
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.text}</span>`;
    btn.onclick = () => selectOption(i, opt.key, btn);
    container.appendChild(btn);
  });

  // 随机提示
  const tips = [
    '凭直觉选，别想太多',
    '第一反应往往最准',
    '选最真实的那个',
    '不用想太久，想多了会骗自己',
    '宁可选错，不可不选',
    '闭上眼睛，用直觉选',
    '你的答案没有对错，只有真实与不真实'
  ];
  $('tip-text').textContent = tips[Math.floor(Math.random() * tips.length)];

  // 卡片动画
  const card = $('question-card');
  card.style.animation = 'none';
  setTimeout(() => { card.style.animation = 'cardIn 0.4s ease'; }, 10);
}

function selectOption(index, key, btnEl) {
  // 视觉反馈
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');

  // 记录答案
  state.answers.push(key);

  // 延迟跳转下一题
  setTimeout(() => {
    state.currentQuestion++;
    renderQuestion();
  }, 350);
}

// ==============================
// 结果计算
// ==============================
function calculateResult() {
  showSection('result');

  // 基于答案计算分数
  const scores = {};
  PERSONALITY_KEYS.forEach(k => { scores[k] = 0; });

  // 计分矩阵（每个答案key对应增加哪些人格的分数）
  const scoreMap = {
    'E': { JOKE: 3, FAKE: 2, NPC: -1 },
    'I': { SOLO: 3, DEAD: 2, WIFI: 1 },
    'T': { CTRL: 2, SHIT: 2, BOSS: 1 },
    'F': { ATM: 2, MUM: 3, IMSB: 2 },
    'J': { CTRL: 3, BOSS: 2, NPC: 1 },
    'P': { DEAD: 2, WIFI: 2, NPC: 1 },
    'S': { NPC: 2, FAKE: 1, SHIT: 1 },
    'N': { SOLO: 2, IMSB: 1, WIFI: 1 },
    'C': { CTRL: 3, BOSS: 3, SHIT: 1 },
    'A': { ATM: 3, MUM: 2, IMSB: 1 },
    'D': { DEAD: 4, NPC: 2, WIFI: 1 },
    'M': { ATM: 2, MUM: 2 }
  };

  state.answers.forEach(key => {
    const mapping = scoreMap[key] || {};
    Object.keys(mapping).forEach(type => {
      if (scores[type] !== undefined) {
        scores[type] += mapping[type];
      }
    });
  });

  // 添加随机扰动（让测试更"抽象"）
  PERSONALITY_KEYS.forEach(k => {
    scores[k] += randomBetween(0, 3);
  });

  // 找最高分
  let topType = PERSONALITY_KEYS[0];
  let topScore = scores[PERSONALITY_KEYS[0]];
  PERSONALITY_KEYS.forEach(k => {
    if (scores[k] > topScore) {
      topScore = scores[k];
      topType = k;
    }
  });

  state.resultType = topType;
  state.resultData = PERSONALITY_TYPES[topType];

  // 渲染结果
  renderResult();
}

function renderResult() {
  const data = state.resultData;
  const matchPct = randomBetween(data.match[0], data.match[1]);

  $('result-match-num').textContent = matchPct;
  $('result-code').textContent = data.code;
  $('result-name').textContent = data.name;
  $('result-emoji').textContent = data.emoji;
  $('result-desc').textContent = data.desc;
  $('result-note').textContent = data.note;

  // 结果卡片边框色
  const card = $('result-card');
  card.style.borderColor = data.color + '88';
  card.style.boxShadow = `0 0 60px ${data.color}25, 0 8px 32px rgba(0,0,0,0.4)`;

  // 维度雷达
  renderDimensions(data.dimensions);

  // 加载社区数据
  loadCommunity();
}

function renderDimensions(dimensions) {
  const container = $('dimensions-grid');
  container.innerHTML = '';

  Object.entries(dimensions).forEach(([label, value], idx) => {
    const color = DIMENSION_COLORS[idx % DIMENSION_COLORS.length];
    const item = document.createElement('div');
    item.className = 'dim-item';
    item.innerHTML = `
      <span class="dim-label">${label}</span>
      <div class="dim-bar-bg">
        <div class="dim-bar-fill" style="width:0%; background:${color};" data-target="${value}%"></div>
      </div>
      <span class="dim-val">${value}</span>
    `;
    container.appendChild(item);
  });

  // 动画进入
  setTimeout(() => {
    document.querySelectorAll('.dim-bar-fill').forEach(el => {
      el.style.width = el.dataset.target;
    });
  }, 300);
}

// ==============================
// 分享功能
// ==============================
function shareResult() {
  const data = state.resultData;
  const text = `我的SBTI人格是【${data.code} · ${data.name}】${data.emoji}\n${window.location.href}\n#SBTI测试 #MBTI已经过时`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(showShareToast);
  } else {
    // fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showShareToast();
  }
}

function showShareToast() {
  const toast = $('share-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==============================
// 评分星星
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  ['accuracy', 'funny'].forEach(key => {
    const starsEl = $('stars-' + key);
    if (!starsEl) return;
    const stars = starsEl.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        const val = parseInt(star.dataset.val);
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.val) <= val);
        });
      });
      star.addEventListener('mouseout', () => {
        const current = state.ratings[key];
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.val) <= current);
        });
      });
      star.addEventListener('click', () => {
        state.ratings[key] = parseInt(star.dataset.val);
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.val) <= state.ratings[key]);
        });
      });
    });
  });
});

// ==============================
// 提交反馈
// ==============================
async function submitFeedback() {
  if (state.feedbackSubmitted) return;

  const username = $('fb-username').value.trim() || '匿名测试者';
  const comment = $('fb-comment').value.trim();
  const accuracy = state.ratings.accuracy || 3;
  const funny = state.ratings.funny || 3;

  if (!state.resultType) return;

  const btn = $('btn-submit-fb');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';

  try {
    const response = await fetch('tables/sbti_feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        result_type: state.resultType,
        result_name: state.resultData.name,
        username: username,
        comment: comment,
        accuracy_rating: accuracy,
        funny_rating: funny
      })
    });

    if (response.ok) {
      state.feedbackSubmitted = true;
      btn.style.display = 'none';
      $('feedback-success').style.display = 'flex';
      // 刷新社区列表
      setTimeout(loadCommunity, 500);
    } else {
      throw new Error('提交失败');
    }
  } catch (e) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> 提交反馈';
    alert('提交失败，请稍后再试 😅');
  }
}

// ==============================
// 社区数据加载
// ==============================
async function loadCommunity() {
  const container = $('community-list');
  if (!container) return;

  container.innerHTML = '<div class="loading-text"><i class="fas fa-spinner fa-spin"></i> 加载中...</div>';

  let items = [];

  try {
    const res = await fetch('tables/sbti_feedback?limit=10&sort=created_at');
    const data = await res.json();
    if (data && data.data && data.data.length > 0) {
      items = data.data;
    }
  } catch (e) {
    // 网络失败时使用模拟数据
  }

  // 如果没有真实数据，填充模拟数据
  if (items.length === 0) {
    items = generateMockCommunityData();
  } else if (items.length < 5) {
    // 补足模拟数据
    items = [...items, ...generateMockCommunityData().slice(0, 5 - items.length)];
  }

  renderCommunity(items);
}

function generateMockCommunityData() {
  const mockItems = [];
  const types = PERSONALITY_KEYS;
  for (let i = 0; i < 6; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const typeData = PERSONALITY_TYPES[type];
    mockItems.push({
      id: 'mock_' + i,
      username: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
      result_type: type,
      result_name: typeData.name,
      comment: MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)],
      accuracy_rating: randomBetween(3, 5),
      funny_rating: randomBetween(3, 5),
      _mock: true
    });
  }
  return mockItems;
}

function renderCommunity(items) {
  const container = $('community-list');
  container.innerHTML = '';

  const avatarEmojis = ['😺', '🐻', '🦊', '🐧', '🦁', '🐸', '🐨', '🐼', '🦄', '🐙'];

  items.forEach(item => {
    const typeData = PERSONALITY_TYPES[item.result_type] || { name: item.result_name, emoji: '🤔', color: '#7c3aed' };
    const avatarEmoji = avatarEmojis[Math.floor(Math.random() * avatarEmojis.length)];
    const stars = '⭐'.repeat(item.accuracy_rating || 3);

    const div = document.createElement('div');
    div.className = 'community-item';
    div.innerHTML = `
      <div class="comm-avatar">${avatarEmoji}</div>
      <div class="comm-content">
        <div class="comm-header">
          <span class="comm-name">${escapeHTML(item.username || '匿名用户')}</span>
          <span class="comm-type" style="color:${typeData.color || '#a855f7'}; border-color:${typeData.color || '#a855f7'}44; background:${typeData.color || '#a855f7'}18;">
            ${typeData.emoji || ''} ${item.result_type} · ${item.result_name}
          </span>
        </div>
        ${item.comment ? `<div class="comm-comment">"${escapeHTML(item.comment)}"</div>` : ''}
        <div class="comm-stars">${stars} 准确度${item.accuracy_rating || '-'}/5 · 趣味性${item.funny_rating || '-'}/5</div>
      </div>
    `;
    container.appendChild(div);
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ==============================
// 初始化显示Hero+Intro
// ==============================
window.addEventListener('load', () => {
  $('hero').style.display = '';
  $('intro').style.display = '';
  $('test').style.display = 'none';
  $('result').style.display = 'none';
});
