// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = null; // no localStorage per template; defaults to dark
themeBtn.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeBtn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
});

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => navList.classList.toggle('open'));
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

// Scroll progress + active link + back to top
const progress = document.getElementById('progress');
const backTop = document.getElementById('backTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navList a');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
  backTop.classList.toggle('show', h.scrollTop > 500);

  let current = '';
  sections.forEach(s => { if (h.scrollTop >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Typing animation
const words = ['Assistant Professor', 'Thermal Engineering Researcher', 'Mentor & Educator'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type(){
  const w = words[wi];
  typedEl.textContent = deleting ? w.slice(0, ci--) : w.slice(0, ci++);
  if (!deleting && ci === w.length + 1) { deleting = true; setTimeout(type, 1200); return; }
  if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  setTimeout(type, deleting ? 40 : 80);
}
type();

// Animated counters + skill bars via IntersectionObserver
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.count) animateCount(e.target);
    if (e.target.classList.contains('bar')) e.target.querySelector('span').style.width = e.target.dataset.pct + '%';
    io.unobserve(e.target);
  });
}, {threshold:.3});
document.querySelectorAll('.reveal, .bar').forEach(el => io.observe(el));

function animateCount(el){
  const target = +el.dataset.count;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target/40));
  const tick = () => {
    cur += step;
    el.textContent = cur >= target ? target : cur;
    if (cur < target) requestAnimationFrame(tick);
  };
  tick();
}

// Contact form (front-end only placeholder)
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out! (Connect this form to a backend or a service like Formspree to receive messages.)');
  e.target.reset();
});
