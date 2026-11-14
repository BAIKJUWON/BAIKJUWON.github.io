// 모바일 메뉴
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  menuBtn.setAttribute('aria-label', opened ? '메뉴 닫기' : '메뉴 열기');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// 스크롤 시 상단바 구분선
const topbar = document.querySelector('.topbar');
const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 등장 애니메이션 + 이수시간 막대
const revealTargets = document.querySelectorAll('.reveal, .stat-card');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in'));
}

// 현재 섹션 메뉴 표시
const navLinks = [...nav.querySelectorAll('a')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => spy.observe(s));

// 프로젝트 필터
const filterBtns = document.querySelectorAll('.filter button');
const pcards = document.querySelectorAll('.pcard');
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.toggle('on', b === btn));
    pcards.forEach((c) => {
      const show = f === 'all' || c.dataset.cat === f;
      c.classList.toggle('hidden', !show);
      if (show) c.classList.add('in');
    });
  });
});

// 프로젝트 게시물 페이지 (#p01 ~ #p08)
const postView = document.getElementById('post-view');
const posts = [...postView.querySelectorAll('.post')];
const baseTitle = document.title;
let listScroll = null;

const route = () => {
  const id = location.hash.slice(1);
  const post = posts.find((p) => p.id === id);
  if (post) {
    if (postView.hidden) listScroll = window.scrollY;
    posts.forEach((p) => { p.hidden = p !== post; });
    postView.hidden = false;
    document.body.classList.add('post-open');
    postView.scrollTop = 0;
    document.title = post.querySelector('h2').textContent + ' | 백주원';
  } else if (!postView.hidden) {
    postView.hidden = true;
    document.body.classList.remove('post-open');
    document.title = baseTitle;
    if (listScroll !== null && (id === 'project' || id === 'research')) {
      const y = listScroll;
      requestAnimationFrame(() => window.scrollTo(0, y));
    }
  }
};
window.addEventListener('hashchange', route);
route();

// 사진 크게 보기 (같은 묶음 안에서 이전/다음 이동)
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('figcaption');
const lbPrev = lb.querySelector('.lb-prev');
const lbNext = lb.querySelector('.lb-next');
let lbGroup = [];
let lbIndex = 0;

const showLb = () => {
  const a = lbGroup[lbIndex];
  lbImg.src = a.getAttribute('href');
  lbImg.alt = a.querySelector('img').alt;
  lbCap.textContent = (a.dataset.caption || '') + (lbGroup.length > 1 ? `  (${lbIndex + 1}/${lbGroup.length})` : '');
  lbPrev.hidden = lbNext.hidden = lbGroup.length < 2;
};
const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; };
const moveLb = (step) => {
  lbIndex = (lbIndex + step + lbGroup.length) % lbGroup.length;
  showLb();
};

document.querySelectorAll('[data-lightbox]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const box = a.closest('.gallery');
    lbGroup = box ? [...box.querySelectorAll('[data-lightbox]')] : [a];
    lbIndex = lbGroup.indexOf(a);
    showLb();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); moveLb(-1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); moveLb(1); });
lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLb(); });
document.addEventListener('keydown', (e) => {
  if (lb.hidden) {
    if (e.key === 'Escape' && !postView.hidden) location.hash = postView.querySelector('.post:not([hidden]) .post-back').getAttribute('href').slice(1);
    return;
  }
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft' && lbGroup.length > 1) moveLb(-1);
  if (e.key === 'ArrowRight' && lbGroup.length > 1) moveLb(1);
});

// 버튼으로 내용 바꾸기 (학력 · 경력 · 수상/자격/활동)
document.querySelectorAll('.aa').forEach((set) => {
  const tabs = [...set.querySelectorAll('.aa-tab')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    set.querySelectorAll('.stat-card').forEach((c) => c.classList.add('in'));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!k) return;
      e.preventDefault();
      const next = tabs[(i + k + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
