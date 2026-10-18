(() => {
  'use strict';
  const topics = document.querySelector("#page-reading-data") ? JSON.parse(document.querySelector("#page-reading-data").textContent) : {
    new: {
      title: '先熟悉规则，再决定要不要留下。',
      text: '进入一个新环境，先观察基础操作、成长路线与日常节奏。把说明看清楚，再安排自己的下一步。',
      items: ['确认新手指引与基础功能是否容易理解。', '了解门派技能、组队方式和版本差异。', '先体验，再决定是否长期投入。'],
    },
    school: {
      title: '从操作习惯出发，找适合自己的门派。',
      text: '喜欢近距离操作、远程输出，还是配合与辅助？先梳理偏好，再核对当前版本的技能与定位。',
      items: ['先试用基础技能，感受操作频率。', '和伙伴讨论队伍分工与组队节奏。', '不把其他版本的门派排行直接当作结论。'],
    },
    version: {
      title: '版本名称只是起点，规则说明更重要。',
      text: '名称相近的版本也可能有不同的成长节奏与活动安排。把规则逐项对照，减少仅凭宣传词做选择的情况。',
      items: ['核对成长路线和装备获取说明。', '了解日常活动与时间安排。', '记录不清楚的问题，确认后再决定。'],
    },
  };
  const buttons = [...document.querySelectorAll('[data-topic]')];
  const panel = document.querySelector('#reading-content');
  function activate(button, focus = false) {
    const topic = topics[button.dataset.topic];
    buttons.forEach(item => {
      const active = item === button;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    const h = document.createElement('h3'), p = document.createElement('p'), list = document.createElement('ul');
    h.textContent = topic.title;
    p.textContent = topic.text;
    topic.items.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
    panel.replaceChildren(h, p, list);
    panel.setAttribute('aria-labelledby', button.id);
    if (focus) button.focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activate(button));
    button.addEventListener('keydown', event => {
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (direction) { event.preventDefault(); activate(buttons[(index + direction + buttons.length) % buttons.length], true); }
      if (event.key === 'Home') { event.preventDefault(); activate(buttons[0], true); }
      if (event.key === 'End') { event.preventDefault(); activate(buttons[buttons.length - 1], true); }
    });
  });
  const checks = [...document.querySelectorAll('.checklist input')];
  checks.forEach(check => check.addEventListener('change', () => {
    document.querySelector('#check-progress').textContent = `已核对 ${checks.filter(item => item.checked).length} / ${checks.length} 项`;
  }));
})();
