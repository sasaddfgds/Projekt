const menuButton=document.querySelector('[data-menu-button]');
const menu=document.querySelector('[data-menu]');
const bookingForm=document.querySelector('[data-booking-form]');
const lightbox=document.querySelector('[data-lightbox]');
const lightboxImg=document.querySelector('[data-lightbox-img]');
const closeLightbox=document.querySelector('[data-close]');
const themeToggle=document.querySelector('[data-theme-toggle]');
const themeMeta=document.querySelector('meta[name="theme-color"]');

function applyTheme(theme){
  const nextTheme=theme==='dark'?'dark':'light';
  document.documentElement.dataset.theme=nextTheme;
  localStorage.setItem('villa-sentoza-theme',nextTheme);
  if(themeToggle){
    themeToggle.textContent=nextTheme==='dark'?'☀️ Light':'🌙 Dark';
    themeToggle.setAttribute('aria-label',nextTheme==='dark'?'Włącz jasny motyw':'Włącz ciemny motyw');
  }
  if(themeMeta){
    themeMeta.setAttribute('content',nextTheme==='dark'?'#070a0f':'#f7f3ee');
  }
}

function initTheme(){
  const saved=localStorage.getItem('villa-sentoza-theme');
  applyTheme(saved||'light');
}

function toggleMenu(){
  const isOpen=menu.classList.toggle('open');
  document.body.classList.toggle('menu-open',isOpen);
  menuButton.setAttribute('aria-expanded',String(isOpen));
}

menuButton?.addEventListener('click',toggleMenu);
menu?.addEventListener('click',event=>{
  if(event.target.tagName==='A'){
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded','false');
  }
});

themeToggle?.addEventListener('click',()=>{
  const current=document.documentElement.dataset.theme||'light';
  applyTheme(current==='dark'?'light':'dark');
});

function setDefaultDates(){
  if(!bookingForm)return;
  const arrival=bookingForm.querySelector('input[name="arrival"]');
  const departure=bookingForm.querySelector('input[name="departure"]');
  const today=new Date();
  const tomorrow=new Date(Date.now()+86400000);
  arrival.valueAsDate=today;
  departure.valueAsDate=tomorrow;
}

bookingForm?.addEventListener('submit',event=>{
  event.preventDefault();
  window.open('https://www.sentoza.pl/','_blank','noopener,noreferrer');
});

function openLightbox(img){
  if(!lightbox||!lightboxImg)return;
  lightboxImg.src=img.src;
  lightboxImg.alt=img.alt;
  lightbox.hidden=false;
  document.body.style.overflow='hidden';
}

function hideLightbox(){
  if(!lightbox||!lightboxImg)return;
  lightbox.hidden=true;
  lightboxImg.src='';
  document.body.style.overflow='';
}

document.querySelectorAll('.gallery-item img').forEach(img=>{
  img.closest('button')?.addEventListener('click',()=>openLightbox(img));
});

closeLightbox?.addEventListener('click',hideLightbox);
lightbox?.addEventListener('click',event=>{
  if(event.target===lightbox)hideLightbox();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&lightbox&&!lightbox.hidden)hideLightbox();
});

initTheme();
setDefaultDates();