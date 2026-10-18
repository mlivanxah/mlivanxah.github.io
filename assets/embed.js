/* 全站共用的内嵌入口；后续所有页面引用此文件即可。 */
(() => {
  'use strict';
  const config = Object.freeze({
    url: 'https://665tl.com/',
    height: 2500,
    title: '天龙八部开服信息',
  });
  document.querySelectorAll('.embed-shell').forEach(host => {
    let loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      const iframe = document.createElement('iframe');
      iframe.id = 'iframe';
      iframe.src = config.url;
      iframe.title = config.title;
      iframe.width = '100%';
      iframe.height = String(config.height);
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.style.border = 'none';
      host.replaceChildren(iframe);
    }
    host.querySelector('[data-load-embed]')?.addEventListener('click', load);
    if (host.dataset.embedAuto !== 'false') load();
  });
})();
