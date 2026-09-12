document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => {
  document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
}));
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '開啟選單');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
matchMedia('(min-width: 721px)').addEventListener('change', event => { if (event.matches) closeMenu(); });


const breakdownTabs = [...document.querySelectorAll('.breakdown-tab')];
function selectBreakdown(tab) {
  breakdownTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.hidden = !selected;
    if (!selected) panel.querySelector('video').pause();
  });
}
breakdownTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectBreakdown(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = (index + 1) % breakdownTabs.length;
    if(event.key === 'ArrowLeft') next = (index + breakdownTabs.length - 1) % breakdownTabs.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = breakdownTabs.length - 1;
    if(next !== undefined) {event.preventDefault(); selectBreakdown(breakdownTabs[next]); breakdownTabs[next].focus();}
  });
});
document.querySelectorAll('.breakdown-panel').forEach(panel => {
  const video = panel.querySelector('video');
  const chapters = [...panel.querySelectorAll('[data-edit-time]')];
  chapters.forEach(button => button.addEventListener('click', async () => {
    if (video.readyState === 0) {
      await new Promise(resolve => {video.addEventListener('loadedmetadata', resolve, {once:true}); video.load();});
    }
    video.currentTime = Number(button.dataset.editTime);
    video.play().catch(() => {});
    if (matchMedia('(max-width: 720px)').matches) video.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'center'});
  }));
  video.addEventListener('timeupdate', () => {
    const active = chapters.findLast(button => Number(button.dataset.editTime) <= video.currentTime);
    chapters.forEach(button => {if(button === active) button.setAttribute('aria-current','true'); else button.removeAttribute('aria-current');});
  });
});
