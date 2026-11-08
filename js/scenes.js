// TAMAKARA — scene (latar cross-fade), tema header, carousel karya, desain bergerak, transisi halaman.
// Dimuat setelah main.js (memakai $, $$, lang, CATN, locOf, PROJECTS, showProject, pri).
(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const raf=window.requestAnimationFrame.bind(window);

// ---------- Menu ----------
safe(()=>{const mc=$('#mclose');if(mc)mc.onclick=()=>window.setMenu&&setMenu(false)});

// ---------- Teks scene: dipecah per kata (efek terangkat) ----------
function splitWords(el){
 const txt=el.textContent;let k=0;const tmp=document.createElement('div');
 const walk=(node,parent)=>node.childNodes.forEach(n=>{
  if(n.nodeType===3){
   n.textContent.split(/(\s+)/).forEach(t=>{
    if(!t)return;
    if(/^\s+$/.test(t)){parent.appendChild(document.createTextNode(' '));return}
    const w=document.createElement('span'),i=document.createElement('span');
    w.className='w';i.style.setProperty('--k',k++);i.textContent=t;w.appendChild(i);parent.appendChild(w);
   });
  }else if(n.nodeType===1){const c=n.cloneNode(false);parent.appendChild(c);walk(n,c)}
 });
 walk(el,tmp);el.setAttribute('aria-label',txt);el.replaceChildren(...tmp.childNodes);
}
function splitAll(){$$('.st').forEach(el=>{if(!el.querySelector('.w'))safe(()=>splitWords(el))})}

// ---------- Scene: latar tetap ----------
const scenes=$$('.scene'),imgs=$$('#stage img,#stage video');
let curScene=-1;
function setScene(n){
 if(n===curScene||!imgs.length)return;curScene=n;
 imgs.forEach((im,k)=>{
  const on=k===Math.min(n,imgs.length-1);im.classList.toggle('on',on);
  if(im.tagName==='VIDEO'){im.muted=true;if(on&&!reduce)im.play().catch(()=>{});else im.pause()}
 });
 scenes.forEach((sc,k)=>sc.classList.toggle('act',k===n));
 $$('.dots button').forEach((b,k)=>b.classList.toggle('on',k===n));
}
safe(()=>{
 if(!scenes.length)return;
 if(scenes.length>1){
  const d=document.createElement('div');d.className='dots';
  scenes.forEach((sc,k)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Scene ${k+1}`);b.onclick=()=>scrollTo({top:sc.offsetTop+(k===0?0:innerHeight*.05),behavior:reduce?'auto':'smooth'});d.appendChild(b)});
  document.body.appendChild(d);
 }
 setScene(0);
});

// ---------- Satu loop scroll: scene aktif + warna header ----------
let ticking=false;
function onScroll(){
 ticking=false;
 const mid=innerHeight*.3;
 if(scenes.length){
  let n=-1;scenes.forEach((sc,k)=>{const r=sc.getBoundingClientRect();if(r.top<=mid&&r.bottom>mid)n=k});
  if(n>=0)setScene(n);document.body.classList.toggle('in-scene',n>=0);
 }
 let theme=null;
 for(const el of $$('[data-theme]')){const r=el.getBoundingClientRect();if(r.top<=44&&r.bottom>44){theme=el.dataset.theme;break}}
 if(theme)document.body.dataset.hd=theme==='light'?'dark':'light';
}
const req=()=>{if(!ticking){ticking=true;raf(onScroll)}};
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);onScroll();

// ---------- Carousel karya ----------
function slideLabels(){
 splitAll();
 $$('.cz-s').forEach(a=>{
  const p=PROJECTS[+a.dataset.i];if(!p)return;
  const cc=$('.cc',a),cl=$('.cl2',a);
  if(cc)cc.textContent=CATN[lang][p.c];
  if(cl)cl.textContent=locOf(p);
 });
 if(window.drawArt&&$('#art'))drawArt(pri,true);
}
window.slideLabels=slideLabels;
safe(()=>{
 const tr=$('#cz');if(!tr)return;
 // slide dibuat dari js/projects.js: proyek terbaru (paling bawah di daftar) tampil duluan
 const total=Math.min(SITE.homeCount||12,PROJECTS.length);
 PROJECTS.map((_,i)=>i).reverse().slice(0,total).forEach((i,k)=>{
  const p=PROJECTS[i],a=document.createElement('a'),im=new Image(),fc=document.createElement('span');
  a.className='cz-s'+(k===0?' on':'');a.href='karya.html#proyek-'+(i+1);a.dataset.i=i;
  im.alt=p.t;im.draggable=false;im.decoding='async';if(k>1)im.loading='lazy';im.style.background=p.k||'';im.src=cover(p);
  fc.className='fc';fc.innerHTML='<span><b></b><small><span class="cc"></span> \u00b7 <span class="cl2"></span></small></span><i data-en="Details">Detail</i>';
  $('b',fc).textContent=p.t;a.append(im,fc);tr.appendChild(a);
 });
 applyLang(lang,true);
 const sl=$$('.cz-s',tr),num=$('#czn'),bar=$('#czb');
 const onKarya=!!$('#grid')&&typeof showProject==='function';
 let act=0,moved=false;
 const centerOf=s=>s.offsetLeft-(tr.clientWidth-s.offsetWidth)/2;
 const go=(i,smooth=true)=>{i=Math.max(0,Math.min(sl.length-1,i));tr.scrollTo({left:centerOf(sl[i]),behavior:smooth&&!reduce?'smooth':'auto'})};
 function upd(){
  const mid=tr.scrollLeft+tr.clientWidth/2;let best=0,bd=1e9;
  sl.forEach((s,i)=>{const d=Math.abs(s.offsetLeft+s.offsetWidth/2-mid);if(d<bd){bd=d;best=i}});
  if(best!==act||!sl[best].classList.contains('on')){act=best;sl.forEach((s,i)=>s.classList.toggle('on',i===best))}
  num.innerHTML=`<b>${pad(act+1)}</b> / ${pad(sl.length)}`;
  const w=100/sl.length;bar.style.width=w+'%';bar.style.left=(act*w)+'%';
 }
 tr.addEventListener('scroll',()=>raf(upd),{passive:true});
 $('#czp').onclick=()=>go(act-1);$('#czx').onclick=()=>go(act+1);
 tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(act+1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(act-1)}});
 let down=false,sx=0,sl0=0;
 tr.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;down=true;moved=false;sx=e.clientX;sl0=tr.scrollLeft});
 addEventListener('pointermove',e=>{
  if(!down)return;const dx=e.clientX-sx;
  if(!moved&&Math.abs(dx)>6){moved=true;tr.classList.add('drag')}
  if(moved)tr.scrollLeft=sl0-dx;
 });
 addEventListener('pointerup',()=>{
  if(!down)return;down=false;
  if(moved){tr.classList.remove('drag');go(act);setTimeout(()=>moved=false,60)}
 });
 sl.forEach((s,i)=>s.addEventListener('click',e=>{
  if(moved){e.preventDefault();return}
  if(i!==act){e.preventDefault();go(i);return}
  if(onKarya){e.preventDefault();showProject(+s.dataset.i)}
 }));
 upd();
});

// ---------- Prinsip: desain bergerak (SVG, tanpa foto) ----------
const P=(d,k,cls='')=>`<path class="dr ${cls}" pathLength="1" d="${d}" style="--d:${k}s"/>`;
const ART=[
 // 1. Denah dulu: dinding tergambar sendiri, lalu perabot, garis ukur merah bergerak
 ()=>`<svg viewBox="0 0 400 300">${P('M60 50H340V250H60Z',0)}${P('M70 60H330V240H70Z',.4)}${P('M200 60V160M70 160H150M190 160H330',.9)}${P('M150 160V122A38 38 0 0 1 188 160',1.4,'rd')}
  <rect class="fd" x="82" y="72" width="82" height="52" style="--d:1.6s"/><rect class="fd" x="214" y="76" width="60" height="40" style="--d:1.9s"/><circle class="fd" cx="270" cy="200" r="22" style="--d:2.2s"/><rect class="fd" x="90" y="184" width="70" height="40" style="--d:2.5s"/>
  ${P('M60 272H340M60 264V280M340 264V280',2.7,'rd')}<rect class="rf" y="269" width="6" height="6"><animate attributeName="x" values="57;337;57" dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/></rect></svg>`,
 // 2. Cahaya: matahari merah bergerak, berkas cahaya menyapu lantai
 ()=>{const sp='keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="8s" repeatCount="indefinite"';
  return `<svg viewBox="0 0 400 300">${P('M40 250H360M40 70V250M360 70V250M40 70H150M230 70H360',0)}${P('M150 62V78M230 62V78',.5,'rd')}
  <polygon class="wf" opacity=".14"><animate attributeName="points" values="150,70 230,70 342,250 262,250;150,70 230,70 118,250 40,250;150,70 230,70 342,250 262,250" ${sp}/></polygon>
  <circle class="rf" cy="26" r="8"><animate attributeName="cx" values="110;270;110" ${sp}/></circle>
  <path d="M300 250V222H340V250M312 222V204H328V222" class="fd" style="--d:1.2s"/><path d="M70 250h60" class="rd"/></svg>`},
 // 3. Tropis: teritis lebar, angin silang, pohon bergoyang, matahari berputar
 ()=>`<svg viewBox="0 0 400 300">${P('M20 250H380',0)}${P('M115 250V212M115 172V132M285 250V212M285 172V132',.4)}${P('M62 132L200 88L338 132Z',.9)}${P('M115 212H285',1.3)}
  <path class="flow rd" d="M20 192H380"/><path class="flow rd" style="animation-delay:-.8s" d="M20 178H380" opacity=".55"/>
  <g class="spin"><circle class="rf" cx="340" cy="52" r="9"/><path class="rd" d="M340 30V36M340 68V74M318 52H324M356 52H362"/></g>
  <g class="sway"><path d="M52 250V190"/><circle cx="52" cy="176" r="22"/><circle cx="38" cy="198" r="14"/><circle cx="68" cy="198" r="14"/></g></svg>`,
 // 4. Satu bahasa: ritme bilah yang sama dari fasad sampai laci
 ()=>{let f='',d='';for(let i=0;i<15;i++)f+=`<line class="slat" style="--k:${i}" x1="${52+i*14}" y1="62" x2="${52+i*14}" y2="238"/>`;
  for(let i=0;i<8;i++)d+=`<line class="slat" style="--k:${i+6}" x1="${288+i*9}" y1="136" x2="${288+i*9}" y2="184"/>`;
  return `<svg viewBox="0 0 400 300">${P('M40 50H266V250H40Z',0)}${f}${P('M276 120H368V200H276Z',.6)}${d}<circle class="rf" cx="322" cy="214" r="3"/>
  <path class="rd flow" d="M266 160H276"/><path class="rd" d="M40 270H266M276 270H368" opacity=".6"/></svg>`},
 // 5. Anggaran: batang naik melewati garis, lalu menyesuaikan di bawah garis merah
 ()=>{const A=[.95,.88,1,.9,.97,.85],B=[.5,.62,.7,.4,.66,.55];let r='';
  A.forEach((a,i)=>r+=`<rect class="bar wf" opacity=".85" style="--k:${i};--a:${a};--b:${B[i]}" x="${58+i*50}" y="70" width="30" height="180"/>`);
  return `<svg viewBox="0 0 400 300">${P('M40 250H360',0)}${r}<line class="rd pulse" x1="30" y1="128" x2="370" y2="128" stroke-dasharray="6 5"/><rect class="rf" x="26" y="124" width="8" height="8"/></svg>`}
];
window.drawArt=function(i,keep){
 const el=$('#art');if(!el)return;
 if(keep&&el.dataset.i===String(i)&&el.firstChild)return;
 el.dataset.i=i;el.innerHTML=ART[i%ART.length]();
 if(reduce){const s=$('svg',el);if(s&&s.pauseAnimations)s.pauseAnimations()}
};
safe(()=>{if($('#art'))drawArt(pri)});

// ---------- Transisi antarhalaman ----------
safe(()=>{
 addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});
 document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a[href]');
  if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
  if(a.target==='_blank'||a.hasAttribute('download'))return;
  const u=new URL(a.href,location.href);
  if(u.origin!==location.origin||!/\.html$|\/$/.test(u.pathname))return;
  if(u.pathname===location.pathname&&(u.hash||!u.search))return;
  e.preventDefault();
  const en=document.documentElement.lang==='en',f=u.pathname.split('/').pop()||'index.html';
  const NM={'index.html':['Beranda','Home'],'about.html':['Tentang','About'],'karya.html':['Karya','Work'],'faq.html':['FAQs','FAQs'],'kontak.html':['Kontak','Contact']};
  const lb=(NM[f]||['',''])[en?1:0];
  try{sessionStorage.setItem('ptl',lb)}catch(_){}
  const pl=$('#ptl');if(pl)pl.textContent=lb;
  document.body.classList.add('leaving');
  setTimeout(()=>{location.href=u.href},reduce?0:640);
 });
});

// ---------- Menu: meja gambar arsitek (gambar kerja animasi + kisi mengikuti kursor) ----------
safe(()=>{
 const m=$('#menu');if(!m)return;
 const links=$$('.mnav a',m),svgs=$$('.mart svg',m),lbls=$$('.mlbl',m),rd=$('.mhair b',m);
 const home=Math.max(0,links.findIndex(a=>a.getAttribute('aria-current')==='page'));
 let cur=-1;
 const show=i=>{if(i===cur)return;cur=i;svgs.forEach((s,k)=>s.classList.toggle('on',k===i));lbls.forEach((l,k)=>l.classList.toggle('on',k===i))};
 links.forEach((a,i)=>{a.addEventListener('pointerenter',()=>show(i));a.addEventListener('focus',()=>show(i))});
 const pad=n=>String(Math.max(0,Math.round(n))).padStart(4,'0');
 m.addEventListener('pointermove',e=>{
  if(e.pointerType==='touch')return;
  const w=innerWidth,h=innerHeight;
  m.style.setProperty('--mx',(e.clientX/w).toFixed(3));m.style.setProperty('--my',(e.clientY/h).toFixed(3));
  m.style.setProperty('--cx',e.clientX+'px');m.style.setProperty('--cy',e.clientY+'px');
  m.style.setProperty('--hx',e.clientX+'px');m.style.setProperty('--hy',e.clientY+'px');
  if(rd)rd.textContent='X '+pad(e.clientX)+'   Y '+pad(e.clientY);
  m.classList.add('live');
 });
 m.addEventListener('pointerleave',()=>m.classList.remove('live'));
 let was=false;
 new MutationObserver(()=>{
  const op=m.classList.contains('open');if(op===was)return;was=op;
  if(op){cur=-1;requestAnimationFrame(()=>show(home))}
  else{svgs.forEach(s=>s.classList.remove('on'));lbls.forEach(l=>l.classList.remove('on'));m.classList.remove('live');cur=-1}
 }).observe(m,{attributes:true,attributeFilter:['class']});
});

// ---------- Tema terang / gelap ----------
safe(()=>{
 const b=$('#themebtn');if(!b)return;const root=document.documentElement;
 const sync=()=>b.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));
 b.onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;st.set('tema',t);sync()};
 sync();
});

// ---------- Karya: filter dari menu (?c=residensial) ----------
safe(()=>{
 const c=new URLSearchParams(location.search).get('c');
 if(!c||!$('#grid'))return;
 const b=$$('.filters button').find(x=>x.dataset.f===c);if(b)b.click();
});
splitAll();
})();
