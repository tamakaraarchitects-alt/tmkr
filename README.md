# TAMAKARA — website

Buka `index.html`. Lima halaman: Home, About, Karya, FAQs, Kontak (tombol **Menu** di kanan atas).
Seluruh web memakai **satu warna latar** (hitam hangat #14120F). Menu layar penuh bergaya meja gambar arsitek: kisi blueprint dengan sorotan mengikuti kursor, lima gambar teknis beranimasi (Elevasi, Denah, Aksonometri, Potongan, Situasi) yang berganti saat kursor menyentuh tiap menu, dan penunjuk koordinat. Menu hanya berisi nama halaman (tanpa nama proyek). Pindah halaman memakai tirai satu warna dengan nama halaman tujuan.

## Menambah proyek baru
1. Buka `tambah-proyek.html` di browser (klik dua kali). Isi data, pilih foto, klik **Unduh foto (.jpg)**.
2. Pindahkan foto yang terunduh ke folder `img/`.
3. Klik **Buat kode** → **Salin**, buka `js/projects.js`, tempel **tepat sebelum tanda `];`** di paling bawah. Simpan.
4. Upload ulang ke hosting. Selesai: galeri Karya, carousel Beranda ("Karya terbaru", 12 proyek terakhir), dan angka di About ikut berubah otomatis.

Pengaturan di bagian atas `js/projects.js`: `SITE.homeCount` (jumlah proyek di carousel Beranda), `SITE.areas` dan `SITE.countries` (angka di About).
Taruh proyek baru di paling bawah daftar agar nomor/tautan proyek lama tidak berubah.

## Lain-lain
- Warna aksen merah: `--r` di `css/site.css`. Warna latar & teks: blok `:root` paling atas di file yang sama (`--paper`, `--ink`, `--dark`).
- Foto latar scene di Beranda dipilih di skrip build (bukan otomatis); minta saya mengganti bila perlu.
- Nomor WhatsApp: `const WA` di `js/main.js` dan tautan `wa.me` di tiap HTML.
- Catatan: peta Kontak masih memakai kata kunci "FRASA KOPI", link TikTok masih ke tiktok.com.


## Mengganti foto (paling penting)
Semua foto proyek ada di `img/FOTO FIX/<nama proyek>/`. Daftar folder: `img/FOTO FIX/DAFTAR-FOLDER.txt`.
1. Buka folder proyek, lalu isi dengan `1.png`, `2.png`, `3.png` dst. (angka + `.png`, huruf kecil).
2. `1.png` = sampul (kartu Karya dan carousel Beranda). Nomor jangan lompat.
3. Jumlah foto tidak perlu ditulis di mana pun, web menghitung sendiri. Tambah foto = tambah nomor berikutnya.
4. Web membaca `.png` dulu; jika sebuah foto tidak ada `.png`-nya, otomatis dicoba `.jpg`. Foto contoh bawaan masih `.jpg`, jadi hapus file `.jpg` lama setelah `.png` baru terpasang.
5. Jika SEMUA foto sudah `.png`: di `js/projects.js` ubah `const EXT=['png','jpg']` menjadi `const EXT=['png']`. Ini mengurangi pesan "404" yang muncul di konsol browser (tidak berbahaya, hanya tanda web mencari foto yang tidak ada).
6. File PNG foto biasanya besar. Disarankan 1600-2000 px dan di bawah 1 MB per foto agar web cepat; pakai tinypng.com atau Squoosh untuk memperkecil.
7. Proyek baru: salin satu blok di `js/projects.js` (atau pakai `tambah-proyek.html`), isi `f` dengan nama folder baru, buat foldernya.
Foto bawaan diambil dari TAMAKARA-Portfolio_4.pdf (resolusi 400-1600 px, format .jpg). Untuk tampilan layar penuh yang tajam, ganti dengan foto asli beresolusi lebih tinggi (.png atau .jpg).

## Video

Ada dua tempat video bisa dipakai.

### 1. Video di proyek (muncul di galeri foto proyek)
1. Kompres video (HP biasanya 50–200 MB, targetkan 3–10 MB per klip, maksimal ±15 detik):
   `ffmpeg -i asli.mov -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart klip.mp4`
2. Buat gambar poster (tampil sebelum video jalan):
   `ffmpeg -i klip.mp4 -frames:v 1 klip.jpg`
3. Taruh `klip.mp4` dan `klip.jpg` di folder `video/` (buat foldernya jika belum ada).
4. Di `js/projects.js`, pada proyek yang dituju tambahkan baris `"v": ["klip"],` (tanpa .mp4). Halaman `tambah-proyek.html` juga bisa membuat baris ini otomatis.
5. Hasil: video muncul setelah foto di penampil proyek, dengan tombol play, dan kartu proyek di Karya mendapat lencana ▶ merah.

### 2. Video sebagai latar scene Beranda
Di `index.html`, di dalam `<div class="stage" id="stage">`, tambahkan di antara foto:
`<video muted loop playsinline preload="metadata" poster="video/klip.jpg" src="video/klip.mp4"></video>`
Urutan elemen di sini = urutan scene. Video hanya jalan saat scene aktif, dan berhenti jika pengunjung memilih "kurangi gerakan".

Tanpa ffmpeg: pakai HandBrake (gratis, preset "Fast 1080p30", format MP4, hapus audio).
Video panjang (lebih dari 20 detik) lebih baik di YouTube/Vimeo, lalu cantumkan tautannya di deskripsi.


## Daftar proyek saat ini
31 proyek, masing-masing tepat 10 foto di `img/FOTO FIX/<nama proyek>/1..10`. Foto saat ini SEMENTARA dan dipakai bersama antar proyek; deskripsi, kategori, dan lokasi di `js/projects.js` adalah isian sementara. Ganti sesuai data asli. Folder "DUMP FILE" dan "New Folder With Items" tidak dihitung sebagai proyek.
# tamakara
# tmkr
