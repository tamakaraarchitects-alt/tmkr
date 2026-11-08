/* =====================================================================
   DATA PROYEK TAMAKARA — satu-satunya file yang perlu diubah untuk proyek.

   FOTO: taruh di  img/FOTO FIX/<nama folder>/  dengan nama 1.png, 2.png, 3.png ...
   - "f" = nama folder proyek (persis sama, termasuk huruf besar/kecil & spasi).
   - 1.png = foto sampul (tampil di kartu & carousel). Urutkan tanpa lompat nomor.
   - Jumlah foto TIDAK perlu ditulis: web menghitung sendiri sampai nomor terakhir.
   - Format .png huruf kecil (.jpg tetap terbaca sebagai cadangan; kalau ada dua-duanya, .png dipakai). Ukuran disarankan 1600-2000 px, di bawah 400 KB.

   Menambah proyek: salin satu blok { ... } di paling bawah (sebelum tanda "];"),
   beri tanda koma, ganti isinya, lalu buat foldernya di img/FOTO FIX/.
   Isi: id (unik, huruf kecil tanpa spasi), f (nama folder), t (judul), loc (lokasi),
   c (residensial | hospitality | komersial), s (AI | A | I | M),
   k (warna cadangan sebelum foto muncul, boleh dibiarkan),
   v (opsional, daftar nama video di folder video/, tanpa .mp4),
   d (deskripsi: [Indonesia, English]).
   Proyek baru ditaruh paling bawah agar tautan #proyek-N lama tidak berubah.
   SITE: homeCount = jumlah proyek di carousel Beranda; areas/countries = angka di halaman About.
   ===================================================================== */
const SITE={homeCount:12,areas:8,countries:2};
const EXT=['png','jpg'];  /* urutan dicoba: .png dulu, kalau tidak ada baru .jpg */
const pic=(p,n,e)=>'img/FOTO%20FIX/'+encodeURIComponent(p.f)+'/'+n+'.'+(e||EXT[0]);
const cover=p=>pic(p,1);
const imgs=p=>p.im||[cover(p)];
/* hitung foto proyek (1.png, 2.png, ... sampai tidak ada), hasilnya disimpan di p.im */
const probe=(p,n)=>new Promise(r=>{let k=0;const t=()=>{if(k>=EXT.length)return r(null);const u=pic(p,n,EXT[k++]),im=new Image();im.onload=()=>r(u);im.onerror=t;im.src=u};t()});
function gallery(p){
 if(p._g)return p._g;
 return p._g=new Promise(res=>{
  const ok=[];let n=1;
  const batch=()=>{
   const jobs=[];for(let i=0;i<8;i++)jobs.push(probe(p,n+i));
   Promise.all(jobs).then(rs=>{let stop=false;rs.forEach(v=>{if(!stop&&v)ok.push(v);else stop=true});
    if(stop||n>80){p.im=ok.length?ok:[cover(p)];res(p.im)}else{n+=8;batch()}});
  };batch();
 });
}
/* cadangan: bila sebuah foto .png tidak ada, otomatis dicoba .jpg (berlaku di seluruh web) */
addEventListener('error',e=>{const t=e.target;
 if(t&&t.tagName==='IMG'&&/\.png(\?.*)?$/i.test(t.src)&&!t.dataset.fb){t.dataset.fb='1';e.stopImmediatePropagation();t.src=t.src.replace(/\.png(\?.*)?$/i,'.jpg')}
},true);
const PROJECTS=[
 {
  "id": "alhouse",
  "f": "A L House",
  "t": "A L House",
  "loc": "Cimahi, Jawa Barat",
  "c": "residensial",
  "s": "AI",
  "k": "#938463",
  "d": [
   "Berada di sebuah desa yang tenang di Cimahi, Jawa Barat, rumah modern minimalis ini memadukan garis bersih dan ruang terbuka menjadi tempat peristirahatan yang merayakan kesederhanaan dan alam. Dipercayakan oleh seorang teman untuk merancang rumah baru keluarganya, dengan permintaan denah berbentuk huruf “L” dan ruang terbuka di belakang yang kelak dapat menjadi kolam renang, garasi, atau ruang berkumpul keluarga.",
   "Nestled in a serene village in Cimahi, West Java, this modern minimalist home blends sleek lines and open spaces into a peaceful retreat that celebrates simplicity and nature. Entrusted by a friend to design their family’s new house, with the owner’s wish for an “L”-shaped floor plan and an open space at the back that can later become a pool, a garage or a space for family gatherings."
  ]
 },
 {
  "id": "arna",
  "f": "Arna Granite",
  "t": "Arna Granite",
  "loc": "",
  "c": "komersial",
  "s": "AI",
  "k": "#857666",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "bestari",
  "f": "Bestari Mas",
  "t": "Bestari Mas",
  "loc": "Bandung",
  "c": "residensial",
  "s": "AI",
  "k": "#616a61",
  "d": [
   "Bestari Mas, “A Tranquil Expression of Modern Living”, adalah kawasan hunian skala besar yang dirancang untuk menghadirkan ketenangan dan kenyamanan dalam lingkungan yang tertata. Lokasinya dekat area komersial, destinasi wisata, dan institusi pendidikan, sehingga terasa tenang namun tetap terhubung dengan aktivitas harian kota. Hunian pertama di Bandung yang dipimpin sebagai Project Lead: 184 unit dengan 7 tipe rumah, mencakup pemodelan 3D, visualisasi, hingga gambar kerja detail. Arahannya “understated modernism” dengan palet material yang terkendali agar tidak berlebihan; interiornya memakai skema warna modern yang hidup dalam konsep tata ruang yang berkelanjutan.",
   "Bestari Mas, “A Tranquil Expression of Modern Living”, is a large-scale residential community designed to offer calm and comfort within a well-structured environment. It sits close to commercial areas, tourism destinations and educational institutions, giving a peaceful living experience while staying connected to the city’s daily activities. The first residential development in Bandung led as Project Lead: 184 units across 7 house types, covering 3D modelling, high-fidelity visualisation and detailed construction drawings. The brief was “understated modernism” with a refined material palette to avoid visual excess; interiors use vibrant, modern colour schemes within a sustainable layout concept."
  ]
 },
 {
  "id": "brawa",
  "f": "Brawa Living",
  "t": "Brawa Living",
  "loc": "Berawa, Bali",
  "c": "hospitality",
  "s": "AI",
  "k": "#6f7a68",
  "d": [
   "Dirancang sebagai guest house, dengan lingkup gambar detail 2D bangunan. Tiga lantai dengan rooftop yang berfungsi sebagai area kolam renang bagi seluruh pengguna bangunan. Arsitektur dan interiornya bergaya modern minimalis agar ruang gerak lebih lega tanpa meninggalkan estetika yang sederhana.",
   "Designed as a guest house, with a scope of 2D detail drawings of the building. Three floors, with a rooftop that functions as a swimming area for all building users. The architecture and interior follow a modern minimalist style that gives more room to move around while keeping the aesthetic of simplicity."
  ]
 },
 {
  "id": "brunei",
  "f": "Brunei",
  "t": "Brunei",
  "loc": "Brunei",
  "c": "hospitality",
  "s": "A",
  "k": "#708b8c",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "dral",
  "f": "Dral Mintohardjo",
  "t": "Dral Mintohardjo",
  "loc": "",
  "c": "komersial",
  "s": "AI",
  "k": "#9a7f5a",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "erafone",
  "f": "Erafone",
  "t": "Erafone",
  "loc": "",
  "c": "komersial",
  "s": "I",
  "k": "#a17d68",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "frontone",
  "f": "Front One Tomang",
  "t": "Front One Tomang",
  "loc": "Tomang, Jakarta",
  "c": "hospitality",
  "s": "AI",
  "k": "#99999b",
  "d": [
   "Dirancang dengan pendekatan hemat biaya dan berorientasi bisnis. Tantangannya: menghadirkan tampilan yang memikat tanpa mengorbankan kenyamanan operasional. Setiap elemen dikurasi untuk mengutamakan pengalaman pengguna, membuktikan bahwa bangunan yang ringkas tetap bisa memberi kenyamanan fungsional berkualitas lewat optimasi ruang yang cerdas.",
   "Designed with a budget-conscious, business-oriented approach. The challenge was to deliver a visually captivating look without compromising operational comfort. Every element was curated to prioritise user experience, showing that a compact footprint can still offer high-quality, functional comfort through smart spatial optimisation."
  ]
 },
 {
  "id": "giia",
  "f": "Hotel Giia",
  "t": "Hotel Giia",
  "loc": "Pasar Baru, Jakarta",
  "c": "hospitality",
  "s": "AI",
  "k": "#556175",
  "d": [
   "Hotel dengan konsep modern kontemporer yang memadukan fasad geometris, material bernuansa hangat, serta pencahayaan yang elegan. Desain dirancang untuk menciptakan tampilan bangunan yang representatif, fungsional, dan nyaman bagi pengunjung.",
   "A hotel in a modern contemporary concept that combines a geometric facade, warm-toned materials and elegant lighting. The design aims for a representative, functional building that is comfortable for visitors."
  ]
 },
 {
  "id": "serea",
  "f": "Hotel Serea",
  "t": "Hotel Serea",
  "loc": "",
  "c": "hospitality",
  "s": "AI",
  "k": "#dddbd9",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "im3",
  "f": "IM3 Experience",
  "t": "IM3 Experience",
  "loc": "",
  "c": "komersial",
  "s": "I",
  "k": "#718a96",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "kappa",
  "f": "Kappa Zanzibar",
  "t": "Kappa Zanzibar",
  "loc": "Pwani Mchangani, Tanzania",
  "c": "hospitality",
  "s": "M",
  "k": "#575843",
  "d": [
   "Kappa Zanzibar adalah tonggak penting: proyek pertama di luar Indonesia, di Pwani Mchangani, Tanzania. Resor ini mencakup vila, hotel, restoran, dan lainnya, dirancang selaras dengan lanskap alami dengan mengikuti kontur lahan, bukan meratakannya. Bangunan hunian diletakkan di area tengah-atas untuk memaksimalkan pemandangan alam sekitar dan terutama laut, sedangkan restoran berada di titik terendah dengan suasana beach club, lengkap dengan infinity pool yang menyatu dengan garis pantai.",
   "Kappa Zanzibar is a significant milestone: the first venture outside Indonesia, in Pwani Mchangani, Tanzania. The resort encompasses villas, hotels, restaurants and more, designed to harmonise with the natural landscape by following the existing contours rather than flattening the terrain. Residential buildings sit in the top-middle area to maximise views of the surrounding nature and above all the sea, while the restaurant at the lowest point creates a beach-club atmosphere, complete with an infinity pool that blends into the shoreline."
  ]
 },
 {
  "id": "benoa",
  "f": "Kos Benoa",
  "t": "Kos Benoa",
  "loc": "Benoa, Bali",
  "c": "hospitality",
  "s": "AI",
  "k": "#8b7f75",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "mangkokku",
  "f": "Mangkokku Sarinah",
  "t": "Mangkokku Sarinah",
  "loc": "Sarinah, Jakarta",
  "c": "komersial",
  "s": "I",
  "k": "#7e614b",
  "d": [
   "Mangkokku, didirikan oleh Chef Arnold yang ternama, sedang melakukan rebranding ke identitas yang lebih segar dan hidup, beralih dari nuansa kayu tradisional ke skema merah-putih yang berani. Gerai Mangkokku Sarinah yang sudah berdiri perlu direnovasi agar selaras dengan identitas baru. Konsepnya memadukan unsur tradisional Nusantara dengan estetika merah-putih yang baru sehingga kedua gaya menyatu harmonis.",
   "Mangkokku, founded by the renowned Chef Arnold, is rebranding to a fresher, more vibrant identity, moving from traditional wood tones to a bold red-and-white scheme. The existing Mangkokku Sarinah outlet needed renovation to align with the new branding. The concept blends Nusantara traditional elements with the new red-and-white aesthetic so both styles integrate harmoniously."
  ]
 },
 {
  "id": "metagoa",
  "f": "Meta Goa",
  "t": "Meta Goa",
  "loc": "",
  "c": "hospitality",
  "s": "AI",
  "k": "#a4927e",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "mra",
  "f": "Mr A House",
  "t": "Mr A House",
  "loc": "",
  "c": "residensial",
  "s": "I",
  "k": "#8c7159",
  "d": [
   "Proyek yang menyeimbangkan bentuk fisik dengan kesejahteraan emosional, budaya, dan spiritual penggunanya, merawat tubuh sekaligus pengalaman batin.",
   "A project that balances physical form with the emotional, cultural and spiritual well-being of its user, nurturing both the body and the inner experience."
  ]
 },
 {
  "id": "mrd",
  "f": "Mr D House",
  "t": "Mr D House",
  "loc": "",
  "c": "residensial",
  "s": "AI",
  "k": "#8b8d89",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "mrf",
  "f": "Mr F Apartement",
  "t": "Mr F Apartement",
  "loc": "",
  "c": "residensial",
  "s": "I",
  "k": "#917b61",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "mrk",
  "f": "Mr K House",
  "t": "Mr K House",
  "loc": "",
  "c": "residensial",
  "s": "AI",
  "k": "#8e9191",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "lampung",
  "f": "Perumahan Lampung",
  "t": "Perumahan Lampung",
  "loc": "Lampung",
  "c": "residensial",
  "s": "AI",
  "k": "#787e7a",
  "d": [
   "Renovasi hunian menyeluruh di Lampung, dikawal sepanjang siklus proyek: menerjemahkan visi klien menjadi konsep arsitektur yang fungsional, hingga turut membantu menyelesaikan dokumen konstruksi agar setiap detail tetap selaras dengan desain awal, dari gambar pertama sampai pembangunan di lokasi. Desainnya berakar pada filosofi warm minimalism dengan palet nuansa krem yang menghadirkan kenyamanan berkelas dan kesan ruang yang lebih luas dan lega. Di luar, kesederhanaan hadir lewat panel Wood Plastic Composite (WPC) dan finishing cat wash hijau bertekstur yang menyatu dengan lingkungan dan identitas kawasan perumahannya.",
   "A comprehensive residential renovation in Lampung, led through the whole project lifecycle: translating high-level client visions into nuanced, functional architectural concepts, then supporting the finalisation of the construction documentation so that every detail stays consistent with the original design, from the first blueprint to the final on-site build. The design follows a warm minimalist philosophy with a refined beige-toned palette that creates sophisticated cosiness and a more expansive, airy interior. Outside, simplicity comes through Wood Plastic Composite (WPC) cladding and textured green wash-paint finishes that harmonise with the surroundings and the identity of the wider housing development."
  ]
 },
 {
  "id": "rimba",
  "f": "Rimba Padel",
  "t": "Rimba Padel",
  "loc": "",
  "c": "komersial",
  "s": "AI",
  "k": "#868b7d",
  "d": [
   "Permeable Pavilion: ruang arsitektur yang hidup, merespons, dan beradaptasi dengan lingkungan tropis sekaligus mewujudkan semangat dinamis padel. Desain ini menyatukan dua sistem, pergerakan dan iklim, dalam satu ekspresi arsitektur.",
   "Permeable Pavilion: an architectural space that lives, responds and adapts to the tropical environment while embodying the dynamic spirit of padel. The design merges two systems, movement and climate, into one architectural expression."
  ]
 },
 {
  "id": "hasantoto",
  "f": "RS Hasan Toto",
  "t": "RS Hasan Toto",
  "loc": "",
  "c": "komersial",
  "s": "AI",
  "k": "#a8aaa7",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "permata",
  "f": "RS Permata Keluarga",
  "t": "RS Permata Keluarga",
  "loc": "Jababeka, Bekasi",
  "c": "komersial",
  "s": "AI",
  "k": "#889091",
  "d": [
   "Ditunjuk sebagai Lead Architect untuk pengembangan fasilitas kesehatan skala besar di Permata Keluarga Hospital, Bekasi, Jawa Barat. Lingkup pekerjaan mencakup perencanaan unit medis kritis: Instalasi Gawat Darurat (IGD), ruang radiologi, kamar operasi, dan menara rawat inap bertingkat. Bertanggung jawab atas seluruh siklus desain, dari denah skematik dan pemodelan 3D hingga visualisasi arsitektur berkualitas tinggi, ditugaskan langsung oleh Direktur Konstruksi. Hasilnya memadukan standar operasional rumah sakit yang ketat dengan estetika interior kelas atas.",
   "Appointed as Lead Architect for a large-scale healthcare expansion at Permata Keluarga Hospital in Bekasi, West Java. The scope covered the planning of critical medical units: the Emergency Department (ER), the radiology suite, the operating theatres and a multi-storey inpatient tower. Responsible for the full design lifecycle, from schematic floor plans and 3D modelling to high-fidelity architectural visualisation, tasked directly by the Construction Director. The result balances rigorous healthcare operational standards with a high-end interior aesthetic."
  ]
 },
 {
  "id": "soeharso",
  "f": "RS Soeharso",
  "t": "RS Soeharso",
  "loc": "",
  "c": "komersial",
  "s": "AI",
  "k": "#a17f56",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "ruangsehat",
  "f": "Ruang Sehat",
  "t": "Ruang Sehat",
  "loc": "",
  "c": "komersial",
  "s": "I",
  "k": "#a17d52",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "mrsk",
  "f": "Rumah Mrs K",
  "t": "Rumah Mrs K",
  "loc": "",
  "c": "residensial",
  "s": "AI",
  "k": "#5f685c",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "seseh",
  "f": "Seseh Living",
  "t": "Seseh Living",
  "loc": "Seseh, Bali",
  "c": "hospitality",
  "s": "AI",
  "k": "#637570",
  "d": [
   "Berada di antara lanskap hijau Seseh, Bali, Seseh Living menawarkan kenyamanan dan ketenangan. Terinspirasi keanggunan arsitektur Skandinavia, interiornya dikurasi untuk menghadirkan ketenangan: garis bersih dan cahaya alami berpadu dengan material lokal, dari kayu daur ulang hingga tekstur batu setempat, untuk suasana yang hangat dan santai.",
   "Set among the lush landscapes of Seseh, Bali, Seseh Living offers a haven of comfort and serenity. Inspired by the timeless elegance of Scandinavian architecture, the interiors evoke calm and tranquillity: clean lines and natural light combine with locally sourced materials, from reclaimed wood to the earthy textures of indigenous stone, for a cosy, laid-back atmosphere."
  ]
 },
 {
  "id": "tomoro",
  "f": "Tomoro Balikpapan",
  "t": "Tomoro Balikpapan",
  "loc": "Balikpapan",
  "c": "komersial",
  "s": "I",
  "k": "#8e8480",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "trueblue",
  "f": "Trueblue",
  "t": "Trueblue",
  "loc": "",
  "c": "komersial",
  "s": "AI",
  "k": "#8b9084",
  "d": [
   "Deskripsi proyek akan diisi. Foto yang tampil saat ini masih sementara.",
   "Project description to be added. The photos shown are temporary."
  ]
 },
 {
  "id": "umalas",
  "f": "Umalas Residential",
  "t": "Umalas Residential",
  "loc": "Umalas, Bali",
  "c": "hospitality",
  "s": "AI",
  "k": "#515c53",
  "d": [
   "Umalas Residential Development adalah proyek pertama yang sepenuhnya dipercayakan, di kawasan Umalas, Bali yang tenang. Kompleks hunian bertipe vila dengan empat tipe ruang ini bertujuan menciptakan lingkungan yang selaras dengan alam sambil mengutamakan privasi, menghubungkan penghuni dengan sesama dan sekitarnya tanpa mengurangi ruang pribadi di rumah masing-masing. Setiap tipe punya fasad dan interior sendiri; hanya tipe satu kamar yang tidak dirancang sebagai vila privat. Interiornya minimalis dan didominasi warna putih, bahkan klien meminta kusen pintu dan jendela dicat putih, dengan furnitur kayu hangat sebagai kontras halus.",
   "Umalas Residential Development is the first project fully entrusted to the designer, in the serene area of Umalas, Bali. A villa-type residential complex with four distinct room types, it aims to create a neighbourhood in harmony with nature while prioritising privacy, connecting residents with one another and their surroundings while keeping personal space at home. Each unit has its own facade and interior; only the one-bedroom type is not designed as a private villa. The interiors are minimalist and predominantly white (the client even asked for white door and window frames), with warm wooden furniture as a subtle contrast."
  ]
 },
 {
  "id": "workshop",
  "f": "Workshop Bekasi",
  "t": "Workshop Bekasi",
  "loc": "Bekasi",
  "c": "komersial",
  "s": "I",
  "k": "#5c6874",
  "d": [
   "Pengembangan interior showroom dan workshop PT Rimba Insantek Mandiri, dikelola dari konsultasi awal dengan klien hingga desain final. Konsep Modern Industrial memadukan finishing yang bersih dan mengilap dengan elemen industrial mentah, menjadi latar yang canggih dan memperkuat identitas fungsional sistem perpipaan yang dipamerkan.",
   "Interior development of the showroom and workshop of PT Rimba Insantek Mandiri, managed from initial client consultation to design finalisation. A Modern Industrial concept merges sterile, polished finishes with raw industrial elements, creating a sophisticated backdrop that reinforces the functional identity of the piping systems on display."
  ]
 }
];



