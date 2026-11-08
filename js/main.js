// ===== PENGATURAN: ganti nomor WhatsApp (format 62xxxxxxxxxx) =====
const WA='6285771143871';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const st={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const safe=f=>{try{f()}catch(e){console.warn('TAMAKARA:',e)}};
const pad=n=>String(n).padStart(2,'0');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
let lang=st.get('lang')||((navigator.language||'id').toLowerCase().startsWith('en')?'en':'id');lang=lang==='en'?'en':'id';

// ---------- Teks dinamis (galeri karya, favorit, kontak) ----------
const D={
 id:{ask:'Mau yang seperti ini?',favadd:'Disimpan ke favorit',favdel:'Dihapus dari favorit',favsend:n=>`Kirim ${n} favorit ke WhatsApp`,favmsg:l=>`Halo TAMAKARA, aku suka proyek-proyek ini: ${l}. Boleh ngobrol soal yang serupa?`,vcs:'Kontak tersimpan',shtxt:'Studio arsitektur dan interior. Intip karya mereka.',ph:'Cari proyek atau lokasi',more:'Tampilkan lebih banyak',none:'Belum ada yang cocok. Coba kata lain?',count:(a,b)=>`Menampilkan ${a} dari ${b} proyek`,pv:'‹ Proyek sebelumnya',nx:'Proyek berikutnya ›',copy:'Salin tautan',copied:'Tersalin!',favt:'Favorit',mc:'Kategori',ms:'Lingkup',mp:'Foto',
  msgS:'WhatsApp dibuka di tab baru. Kalau tidak muncul, izinkan pop-up di browsermu.',
  msgP:t=>`Halo TAMAKARA, aku tertarik dengan proyek "${t}". Boleh ngobrol?`},
 en:{ask:'Want something like this?',favadd:'Saved to favourites',favdel:'Removed from favourites',favsend:n=>`Send ${n} saved to WhatsApp`,favmsg:l=>`Hi TAMAKARA, I like these projects: ${l}. Can we talk about something similar?`,vcs:'Contact saved',shtxt:'An architecture and interior studio. Have a look at their work.',ph:'Search projects or locations',more:'Show more',none:'Nothing matches yet. Try another word?',count:(a,b)=>`Showing ${a} of ${b} projects`,pv:'‹ Previous project',nx:'Next project ›',copy:'Copy link',copied:'Copied!',favt:'Saved',mc:'Category',ms:'Scope',mp:'Photos',
  msgS:"WhatsApp opens in a new tab. If it doesn't show up, allow pop-ups in your browser.",
  msgP:t=>`Hi TAMAKARA, I'm interested in the project "${t}". Can we talk?`}
};
const dlg=$('#dlg');

// ---------- Bahasa: elemen ber-atribut data-en ----------
const orig=new WeakMap();
function applyLang(l,init){
 lang=l;document.documentElement.lang=l;st.set('lang',l);
 $$('[data-en]').forEach(el=>{
  let o=orig.get(el);if(!o){o={};orig.set(el,o)}
  if(o.h===undefined)o.h=el.innerHTML;
  const v=l==='en'?el.dataset.en:o.h;if(el.innerHTML!==v)el.innerHTML=v;
 });
 ['placeholder','alt','aria-label'].forEach(a=>$$(`[data-en-${a}]`).forEach(el=>{
  let o=orig.get(el);if(!o){o={};orig.set(el,o)}
  if(o[a]===undefined)o[a]=el.getAttribute(a);
  el.setAttribute(a,l==='en'?el.getAttribute(`data-en-${a}`):o[a]);
 }));
 const h=document.documentElement.dataset;document.title=(l==='en'?h.tEn:h.tId)||document.title;
 $('#lang').textContent=l==='en'?'ID':'EN';
 const y=$('#yr');if(y)y.textContent=new Date().getFullYear();
 safe(labels);safe(renderPrinciples);safe(renderOpen);safe(()=>window.slideLabels&&slideLabels());
 if(!init&&dlg&&dlg.open)dlg.close();
}
$('#lang').onclick=()=>applyLang(lang==='id'?'en':'id');

// ---------- Menu & scroll ----------
safe(()=>{
 const totop=$('#totop'),burger=$('#burger'),menu=$('#menu'),pr=$('#prog');
 const upd=()=>{
  if(totop)totop.classList.toggle('show',scrollY>600);
  const h=document.documentElement.scrollHeight-innerHeight;pr.style.transform=`scaleX(${h>0?Math.min(scrollY/h,1):0})`;
 };
 addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
 if(totop)totop.onclick=()=>scrollTo({top:0,behavior:still?'auto':'smooth'});
 const setMenu=o=>{document.body.classList.toggle('menu-open',o);menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.documentElement.style.overflow=o?'hidden':''};
 burger.onclick=()=>setMenu(!menu.classList.contains('open'));
 menu.onclick=e=>{if(e.target.tagName==='A')setMenu(false)};
 addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
 window.setMenu=setMenu;
});

// ---------- Utilitas ----------
async function copyText(t){
 try{await navigator.clipboard.writeText(t);return true}catch(e){
  try{const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();const ok=document.execCommand('copy');a.remove();return ok}catch(e2){return false}
 }
}
function toast(m){const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(toast.k);toast.k=setTimeout(()=>t.classList.remove('on'),1900)}
const pIndex=id=>PROJECTS.findIndex(p=>p.id===id);
// tautan ke proyek tertentu (Beranda, Tentang) selalu sinkron dengan js/projects.js
safe(()=>$$('[data-pid]').forEach(a=>{const i=pIndex(a.dataset.pid);if(i<0)return;if(a.tagName==='A')a.href='karya.html#proyek-'+(i+1);const c=$('.cap',a);if(c)c.textContent=PROJECTS[i].t}));

// ---------- Galeri & indeks (halaman Karya) ----------
const SC={id:{A:'Arsitektur',I:'Interior',AI:'Arsitektur & Interior',M:'Masterplan & Arsitektur'},en:{A:'Architecture',I:'Interior',AI:'Architecture & Interior',M:'Masterplan & Architecture'}};
const CATN={id:{residensial:'Residensial',hospitality:'Hospitality',komersial:'Komersial'},en:{residensial:'Residential',hospitality:'Hospitality',komersial:'Commercial'}};
let cards=[],rows=[],flt='all',qry='',idset=null,idsetLabel='',shown=12,cur=0,gi=0,view='grid',sortK='n',sortD=1;
const locOf=p=>p.loc||SC[lang][p.s];

let favs=[];try{favs=JSON.parse(st.get('tamakara-favs')||'[]')||[]}catch(e){favs=[]}
let favOnly=false;
const favTitles=()=>favs.map(id=>(PROJECTS.find(p=>p.id===id)||{}).t).filter(Boolean).join(', ');
function syncFav(){
 $$('.fav').forEach(b=>b.setAttribute('aria-pressed',favs.includes(b.dataset.id)));
 const fc=$('#fc');if(fc)fc.textContent=favs.length;
 const dv=$('#dfv');if(dv&&PROJECTS[cur])dv.setAttribute('aria-pressed',favs.includes(PROJECTS[cur].id));
 const fs=$('#favsend');if(fs){fs.hidden=!favs.length;fs.textContent=D[lang].favsend(favs.length)}
}
function toggleFav(id){
 const k=favs.indexOf(id);if(k<0)favs.push(id);else favs.splice(k,1);
 st.set('tamakara-favs',JSON.stringify(favs));syncFav();toast(D[lang][k<0?'favadd':'favdel']);
 if(favOnly)refresh(true);
}
function order(){
 const idx=PROJECTS.map((_,i)=>i);
 if(sortK==='n')return sortD>0?idx:idx.reverse();
 const key={t:p=>p.t,l:p=>p.loc||'~',c:p=>CATN[lang][p.c],s:p=>SC[lang][p.s]}[sortK];
 return idx.sort((a,b)=>sortD*key(PROJECTS[a]).localeCompare(key(PROJECTS[b]),lang));
}
function refresh(reset){
 if(!cards.length)return;
 if(reset)shown=12;
 const q=qry.trim().toLowerCase(),d=D[lang];
 const match=order().filter(i=>{const p=PROJECTS[i];return(flt==='all'||p.c===flt)&&(!idset||idset.includes(p.id))&&(!favOnly||favs.includes(p.id))&&(!q||(p.t+' '+p.loc+' '+CATN[lang][p.c]+' '+SC[lang][p.s]).toLowerCase().includes(q))});
 const vis=match.slice(0,view==='grid'?shown:match.length),g=$('#grid'),l=$('#il');
 cards.forEach(c=>c.classList.add('hide'));rows.forEach(r=>r.classList.add('hide'));
 vis.forEach((i,k)=>{
  const c=cards[i],r=rows[i];
  c.classList.remove('hide');c.classList.add('in');c.dataset.s=k%3;g.appendChild(c);
  r.classList.remove('hide');r.classList.add('in');l.appendChild(r);
 });
 $('#cnt').textContent=d.count(vis.length,match.length);syncFav();
 $$('#qs button').forEach(x=>x.setAttribute('aria-pressed',String(!!q&&x.textContent.toLowerCase()===q)));
 const m=$('#more');m.hidden=!(view==='grid'&&match.length>shown);m.textContent=d.more;
 const n=$('#none');n.hidden=match.length>0;n.textContent=d.none;
 const ch=$('#chip');ch.hidden=!idset;if(idset)ch.textContent=idsetLabel+'  ×';
 $$('#ih button').forEach(b=>{if(b.dataset.k===sortK)b.setAttribute('aria-sort',sortD>0?'ascending':'descending');else b.removeAttribute('aria-sort')});
}
function labels(){
 cards.forEach((c,i)=>{
  const p=PROJECTS[i];$('span',c).textContent=locOf(p);
  const r=rows[i];if(r){$('span',r).textContent=locOf(p);const e=$$('em',r);e[0].textContent=CATN[lang][p.c];e[1].textContent=SC[lang][p.s]}
 });
 const q=$('#q');if(q)q.placeholder=D[lang].ph;
 const fbn=$('#favb');if(fbn)fbn.setAttribute('aria-label',D[lang].favt);
 refresh(false);
}
function buildCards(){
 const g=$('#grid'),l=$('#il');g.textContent='';l.textContent='';
 PROJECTS.forEach((p,i)=>{
  const f=document.createElement('figure');f.className='card';
  const im=new Image();im.loading='lazy';im.decoding='async';im.alt=p.t;im.style.background=p.k||'';im.onload=()=>im.classList.add('ld');im.src=cover(p);im.onerror=()=>{im.style.display='none'};
  const cap=document.createElement('figcaption');cap.append(document.createElement('b'),document.createElement('span'));$('b',cap).textContent=p.t;
  const a=document.createElement('a');a.className='cl';a.href='#proyek-'+(i+1);a.setAttribute('aria-label',p.t);a.append(im);if(p.v&&p.v.length){const pv=document.createElement('b');pv.className='pv';pv.setAttribute('aria-label','Video');pv.textContent='\u25B6';a.appendChild(pv)}
  const fb=document.createElement('button');fb.type='button';fb.className='fav';fb.dataset.id=p.id;fb.setAttribute('aria-label','Favorit');fb.innerHTML='<svg class="ic" aria-hidden="true"><use href="#ic-heart"/></svg>';
  fb.onclick=e=>{e.stopPropagation();toggleFav(p.id)};
  f.append(a,cap,fb);g.appendChild(f);cards.push(f);
  f.onclick=e=>{if(e.target.closest('.fav'))return;e.preventDefault();showProject(i)};
  const r=document.createElement('a');r.className='irow';r.href='#proyek-'+(i+1);
  ['i','b','span','em','em','u'].forEach(t=>r.appendChild(document.createElement(t)));
  $('i',r).textContent=pad(i+1);$('b',r).textContent=p.t;$('u',r).textContent='→';
  r.onclick=e=>{e.preventDefault();showProject(i)};
  const prev=()=>{$('#ipi').src=cover(p);$('#ipt').textContent=p.t};
  r.onmouseenter=prev;r.onfocus=prev;
  l.appendChild(r);rows.push(r);
 });
 $('#ipi').src=cover(PROJECTS[0]);$('#ipt').textContent=PROJECTS[0].t;
}

// ---------- Penampil proyek ----------
const media=p=>[...imgs(p).map(n=>({t:'i',n})),...(p.v||[]).map(n=>({t:'v',n}))];
function setImg(n){
 const p=PROJECTS[cur],di=$('#di'),dv=$('#dv'),m=media(p);
 gi=(n+m.length)%m.length;const it=m[gi];
 if(it.t==='i'){
  if(dv){dv.pause();dv.hidden=true}
  di.style.display='';di.classList.remove('cover');di.src=it.n;di.alt=`${p.t} ${gi+1}`;
 }else if(dv){
  di.style.display='none';dv.hidden=false;dv.poster=`video/${it.n}.jpg`;dv.src=`video/${it.n}.mp4`;dv.muted=true;dv.play().catch(()=>{});
 }
 $('#gcnt').textContent=`${pad(gi+1)} / ${pad(m.length)}`;
 $$('#th button').forEach((b,k)=>b.classList.toggle('on',k===gi));
 const on=$('#th .on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest',inline:'center'});
}
function showProject(i){
 cur=(i+PROJECTS.length)%PROJECTS.length;
 const p=PROJECTS[cur],d=D[lang],title=p.t;
 $('#vn').textContent=`${pad(cur+1)} / ${pad(PROJECTS.length)}`;
 $('#dt').textContent=title;$('#dl').textContent=p.loc||'';
 $('#dm').innerHTML=`<div><dt>${d.mc}</dt><dd>${CATN[lang][p.c]}</dd></div><div><dt>${d.ms}</dt><dd>${SC[lang][p.s]}</dd></div><div><dt>${d.mp}</dt><dd id="dmp">${imgs(p).length}</dd></div>`;
 $('#dd').textContent=lang==='en'?p.d[1]:p.d[0];
 $('#dc').textContent=d.ask;$('#dc').href=wa(d.msgP(title));$('#dcp').textContent=d.copy;
 $('#dpv').textContent=d.pv;$('#dnx').textContent=d.nx;
 const th=$('#th');
 const buildThumbs=()=>{th.textContent='';
 media(p).forEach((it,k)=>{const b=document.createElement('button'),im=new Image(),n=it.n;b.type='button';b.setAttribute('aria-label',`${title} ${k+1}`);
  if(it.t==='v'){b.classList.add('vid');im.onerror=()=>{im.style.display='none'};im.src=`video/${n}.jpg`}
  else{im.src=n}
  im.alt='';im.loading='lazy';b.appendChild(im);b.onclick=()=>setImg(k);th.appendChild(b)});};
 buildThumbs();
 setImg(0);syncFav();
 gallery(p).then(()=>{if(PROJECTS[cur]!==p)return;buildThumbs();const m=$('#dmp');if(m)m.textContent=imgs(p).length;const c=media(p).length;$('#gcnt').textContent=`${pad(gi+1)} / ${pad(c)}`;$$('#th button').forEach((b,k)=>b.classList.toggle('on',k===gi))});
 try{history.replaceState(null,'','#proyek-'+(cur+1))}catch(e){}
 if(!dlg.open){
  if(typeof dlg.showModal==='function')dlg.showModal();else dlg.setAttribute('open','');
  document.documentElement.style.overflow='hidden';
 }
}
if($('#grid'))safe(()=>{
 buildCards();setTimeout(()=>cards.forEach(c=>{const i=$('img',c);if(i)i.classList.add('ld')}),6000);
 const di=$('#di');di.onerror=()=>{di.style.display='none'};
 di.onclick=()=>di.classList.toggle('cover');
 {const vs=$('.vs');if(vs){let x0=null,y0=0;vs.addEventListener('touchstart',e=>{if(e.touches.length!==1){x0=null;return}x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});vs.addEventListener('touchend',e=>{if(x0===null)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4)setImg(gi+(dx<0?1:-1))},{passive:true})}}
 $('#gp').onclick=()=>setImg(gi-1);$('#gx').onclick=()=>setImg(gi+1);
 $('#dx').onclick=()=>dlg.close();
 $('#dpv').onclick=()=>showProject(cur-1);$('#dnx').onclick=()=>showProject(cur+1);
 dlg.addEventListener('close',()=>{const dv=$('#dv');if(dv)dv.pause();document.documentElement.style.overflow='';try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}});
 addEventListener('keydown',e=>{
  if(!dlg.open)return;
  if(e.key==='ArrowLeft')setImg(gi-1);else if(e.key==='ArrowRight')setImg(gi+1);
  else if(e.key==='ArrowUp'){e.preventDefault();showProject(cur-1)}else if(e.key==='ArrowDown'){e.preventDefault();showProject(cur+1)}
 });
 $('#dcp').onclick=async()=>{const ok=await copyText(location.href.split('#')[0]+'#proyek-'+(cur+1));toast(ok?D[lang].copied:D[lang].copy)};
 const btns=$$('.filters button');
 btns.forEach(b=>b.onclick=()=>{btns.forEach(x=>x.setAttribute('aria-pressed',x===b));flt=b.dataset.f;refresh(true)});
 $('#q').oninput=e=>{qry=e.target.value;refresh(true)};
 $('#more').onclick=()=>{shown+=12;refresh(false)};
 $('#chip').onclick=()=>{idset=null;refresh(true)};
 const fbtn=$('#favb');fbtn.onclick=()=>{favOnly=!favOnly;fbtn.setAttribute('aria-pressed',favOnly);refresh(true)};
 $('#dfv').onclick=()=>toggleFav(PROJECTS[cur].id);
 $('#favsend').onclick=()=>window.open(wa(D[lang].favmsg(favTitles())),'_blank');
 ['Bali','Bandung','Jakarta','Tanzania','Interior'].forEach(w=>{const b=document.createElement('button');b.type='button';b.textContent=w;b.setAttribute('aria-pressed','false');b.onclick=()=>{const on=b.getAttribute('aria-pressed')==='true';qry=on?'':w;$('#q').value=qry;refresh(true)};$('#qs').appendChild(b)});
 const vg=$('#vg'),vi=$('#vi');
 const setView=v=>{view=v;$('#grid').hidden=v!=='grid';$('#idx').hidden=v!=='index';vg.setAttribute('aria-pressed',v==='grid');vi.setAttribute('aria-pressed',v==='index');refresh(true)};
 vg.onclick=()=>setView('grid');vi.onclick=()=>setView('index');
 $$('#ih button').forEach(b=>b.onclick=()=>{if(sortK===b.dataset.k)sortD*=-1;else{sortK=b.dataset.k;sortD=1}refresh(false)});
 refresh(true);
 const m=/^#proyek-(\d+)$/.exec(location.hash);
 if(m&&PROJECTS[+m[1]-1])showProject(+m[1]-1);
 addEventListener('hashchange',()=>{const h=/^#proyek-(\d+)$/.exec(location.hash);if(h&&PROJECTS[+h[1]-1]&&!dlg.open)showProject(+h[1]-1)});
 addEventListener('keydown',e=>{
  if(e.key!=='/'||e.metaKey||e.ctrlKey||e.altKey||dlg.open)return;
  const tag=((e.target||{}).tagName||'').toLowerCase();if(['input','textarea','select'].includes(tag))return;
  e.preventDefault();$('#q').focus();
 });
});

// ---------- Beranda: denah vs render ----------
const BA=[{b:'img/FOTO%20FIX/One%20Place%20Residence/5.png',a:'img/FOTO%20FIX/One%20Place%20Residence/3.png'},{b:'img/FOTO%20FIX/A%20L%20House/6.png',a:'img/FOTO%20FIX/A%20L%20House/4.png'}];
safe(()=>{
 const ba=$('#ba');if(!ba)return;
 const imgs=$$('img',ba),bf=$('.bf',ba),bar=$('.bar',ba),inp=$('input',ba),tabs=$$('.tabs button');
 const set=v=>{bf.style.clipPath=`inset(0 ${100-v}% 0 0)`;bar.style.left=v+'%'};
 inp.oninput=e=>set(e.target.value);
 tabs.forEach(b=>b.onclick=()=>{
  tabs.forEach(x=>x.setAttribute('aria-pressed',x===b));
  const p=BA[+b.dataset.i];if(!p)return;
  imgs[0].src=p.a;imgs[1].src=p.b;
  inp.value=50;set(50);
 });
});

// ---------- Tentang: prinsip ----------
const PR={
 id:[['Denah dulu, hiasan belakangan.','Ruang yang enak lahir dari denah yang jujur: alur jalan, bukaan, dan pembagian zona. Dekorasi cuma pemanis di akhir.'],
  ['Cahaya itu material.','Kami memperlakukan cahaya alami seperti bahan bangunan: dihitung arahnya, dibentuk bukaannya, dipakai untuk membangun suasana.'],
  ['Tropis itu peluang, bukan masalah.','Teritis lebar, ventilasi silang, dan taman dalam bikin rumah sejuk tanpa banyak energi tambahan.'],
  ['Satu bahasa, dari fasad sampai laci.','Material dan detail yang konsisten dari luar sampai dalam bikin sebuah ruang terasa utuh dan tenang.'],
  ['Anggaran itu bagian dari desain.','Kami merancang sesuai biaya yang kamu punya. Gambar yang indah tapi tidak bisa dibangun bukan desain yang baik.']],
 en:[['Plan first, decoration later.','Good spaces start with an honest plan: how you move, where the openings are, how zones are split. Decoration is just the finishing touch.'],
  ['Light is a material.','We treat daylight like a building material: we work out its direction, shape the openings, and use it to build atmosphere.'],
  ['The tropics are an opportunity, not a problem.','Deep eaves, cross ventilation, and inner gardens keep a house cool without much extra energy.'],
  ['One language, from facade to drawer.','Consistent materials and details from outside to in make a space feel whole and calm.'],
  ['Budget is part of the design.','We design to the money you actually have. A beautiful drawing that cannot be built is not good design.']]
};
let pri=0;
function renderPrinciples(){
 const ul=$('#pl');if(!ul)return;const L=PR[lang];ul.textContent='';
 L.forEach((p,i)=>{
  const li=document.createElement('li'),b=document.createElement('button'),n=document.createElement('i'),s=document.createElement('span');
  b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',String(i===pri));n.textContent=pad(i+1);s.textContent=p[0];b.append(n,s);
  const go=()=>{pri=i;renderPrinciples()};b.onclick=go;b.onmouseenter=()=>{if(matchMedia('(hover:hover)').matches&&pri!==i)go()};
  b.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();pri=(i+(e.key==='ArrowDown'?1:L.length-1))%L.length;renderPrinciples();const t=$$('#pl button')[pri];if(t)t.focus()}};
  li.appendChild(b);ul.appendChild(li);
 });
 $('#pdt').textContent=L[pri][0];$('#pdp').textContent=L[pri][1];
 if(window.drawArt)drawArt(pri);
}

// ---------- FAQ: satu terbuka, foto ikut berganti ----------
const FAQ_IMG=['img/FOTO%20FIX/Umalas%20Residential/1.png','img/FOTO%20FIX/Umalas%20Residential/7.png','img/FOTO%20FIX/A%20L%20House/6.png','img/FOTO%20FIX/Seseh%20Living/4.png','img/FOTO%20FIX/Berawa%20Living/1.png'];
safe(()=>{
 const ds=$$('.faq details');if(!ds.length)return;const im=$('#fimg');
 ds.forEach((d,i)=>d.addEventListener('toggle',()=>{
  if(!d.open)return;ds.forEach(o=>{if(o!==d)o.open=false});
  if(im){im.style.opacity=0;setTimeout(()=>{im.src=FAQ_IMG[i]||FAQ_IMG[0];im.style.opacity=1},220)}
 }));
});

// ---------- Kontak: simpan kontak, bagikan, status jam kerja ----------
safe(()=>{
 const vc=$('#vc');if(!vc)return;
 vc.onclick=()=>{
  const u=location.protocol.startsWith('http')?`URL:${location.origin}\n`:'';
  const v=`BEGIN:VCARD\nVERSION:3.0\nFN:TAMAKARA Architects\nORG:TAMAKARA Design & Construction\nTEL;TYPE=CELL:+62 857-7114-3871\nEMAIL:tamakara.architects@gmail.com\n${u}X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/tamakara.architects\nEND:VCARD\n`;
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([v],{type:'text/vcard'}));a.download='TAMAKARA.vcf';document.body.appendChild(a);a.click();a.remove();toast(D[lang].vcs);
 };
 $('#sh').onclick=async()=>{
  const url=location.href.split('#')[0];
  if(navigator.share){try{await navigator.share({title:'TAMAKARA Design & Construction',text:D[lang].shtxt,url});return}catch(e){if(e&&e.name==='AbortError')return}}
  const ok=await copyText(url);toast(ok?D[lang].copied:url);
 };
});
function renderOpen(){
 const el=$('#os');if(!el)return;
 const f=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Jakarta',weekday:'short',hour:'numeric',hourCycle:'h23'}).formatToParts(new Date());
 const g=t=>(f.find(x=>x.type===t)||{}).value,day=g('weekday'),h=(+g('hour'))%24,on=day!=='Sun'&&h>=8&&h<17;
 el.className='os '+(on?'on':'off');
 el.textContent=lang==='en'?(on?"We're open · closes at 5 pm WIB":'Closed for now · opens Mon–Sat at 8 am WIB'):(on?'Kami buka sekarang · tutup pukul 17.00 WIB':'Lagi tutup · buka Senin–Sabtu pukul 08.00 WIB');
}
setInterval(()=>safe(renderOpen),60000);

// ---------- Formulir -> WhatsApp (+ simpan draf) ----------
safe(()=>{
 const f=$('#form');if(!f)return;
 f.addEventListener('submit',e=>{
  e.preventDefault();
  const d=Object.fromEntries(new FormData(e.target));
  const t=lang==='en'
   ?`Hi TAMAKARA, I'm ${d.nama} (${d.wa}).\nRoom type: ${d.jenis}\nBudget: ${d.budget}\nNeeds: ${d.pesan||'-'}\nDate: ${d.tgl||'-'} (${d.waktu})\nMethod: ${d.metode}`
   :`Halo TAMAKARA, aku ${d.nama} (${d.wa}).\nJenis ruang: ${d.jenis}\nAnggaran: ${d.budget}\nKebutuhan: ${d.pesan||'-'}\nTanggal: ${d.tgl||'-'} (${d.waktu})\nMetode: ${d.metode}`;
  window.open(wa(t+(favs.length?`\n${lang==='en'?'Saved projects':'Proyek favorit'}: ${favTitles()}`:'')),'_blank');
  $('#fs').textContent=D[lang].msgS;
 });
 const k='tamakara-draft',names=['nama','wa','jenis','budget','tgl','waktu','metode','pesan'];
 const val=e=>e.tagName==='SELECT'?e.selectedIndex:e.value,F=n=>f.elements[n];
 f.elements.tgl.min=new Date().toISOString().slice(0,10);
 try{const d=JSON.parse(st.get(k)||'{}');names.forEach(n=>{if(d[n]!==undefined&&F(n)){if(F(n).tagName==='SELECT')F(n).selectedIndex=d[n];else F(n).value=d[n]}})}catch(e){}
 f.addEventListener('input',()=>{const d={};names.forEach(n=>{d[n]=val(F(n))});st.set(k,JSON.stringify(d))});
 f.addEventListener('submit',()=>st.set(k,'{}'));
});

// ---------- Animasi masuk & penghitung ----------
safe(()=>{
 if(!('IntersectionObserver' in window))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
 $$('.card,.tile,.svc-c,.first,.faq details,.ba,.cta-ph,.pd,.pl li,main .lbl,.mf,h2').forEach(e=>{e.classList.add('rv');io.observe(e)});
 const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;co.unobserve(e.target);
  const el=e.target,n=+el.dataset.n,t0=performance.now();
  const tick=t=>{const p=still?1:Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
 }),{threshold:.6});
 $$('[data-stat]').forEach(e=>{const v={projects:PROJECTS.length,areas:SITE.areas,countries:SITE.countries}[e.dataset.stat];if(v!=null){e.dataset.n=v;e.textContent=v}});
 $$('[data-n]').forEach(e=>co.observe(e));
});

applyLang(lang,true);
