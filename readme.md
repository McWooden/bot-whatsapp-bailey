# Bailey WhatsApp Bot

[![GitHub stars](https://img.shields.io/github/stars/Lenwyy?label=Support%20Original%20Repo&style=for-the-badge)](https://github.com/Lenwyy) [![YouTube Subscribe](https://img.shields.io/badge/Subscribe%20to%20Lenwy-red?logo=youtube&style=for-the-badge)](https://www.youtube.com/@lenwy)

## Deskripsi
Bailey adalah bot WhatsApp **paling sederhana dan minimalis** yang dibangun menggunakan library **Baileys** (@whiskeysockets/baileys). Bot ini dirancang untuk menangani pesan masuk, verifikasi admin, dan pengiriman gambar dasar—dengan total kode di bawah 100 baris efektif. **Kode ini merupakan inherit dan modifikasi minimal dari proyek asli milik [Lenwy](https://github.com/Lenwyy), creator konten WhatsApp bot terkenal di YouTube.**

Versi ini menghilangkan **semua** fitur kompleks seperti AI, scraping (TikTok/Instagram), dan game, agar jadi **starter kit ultimate** yang ringan, efisien, dan mudah di-customize. Fokus utama ada di `bailey.js`—handler pesan yang diringkas jadi <40 baris, pakai if-else sederhana tanpa overhead. Cocok banget untuk pemula yang ingin belajar dasar bot WA tanpa ribet.

**⚠️ PENTING: Ini bukan proyek independen! Silakan kunjungi dan dukung creator asli:**
- **Repo GitHub Lenwy**: [https://github.com/Lenwyy](https://github.com/Lenwyy) – Beri **⭐ Star** dan **Follow** untuk update terbaru!
- **YouTube Channel Lenwy**: [https://www.youtube.com/@lenwy](https://www.youtube.com/@lenwy) – **Subscribe** dan nyalakan bell 🔔 untuk tutorial bot WhatsApp lengkap, seperti "Cara Membuat Bot WhatsApp Dari Awal Dengan JavaScript Dan Baileys"!

Dukungan komunitas sangat penting—jangan lupa beri apresiasi ke Lenwy agar konten berkualitas terus bermunculan! 🚀

## Cerita Pembuatan Bailey
Halo! Saya **Kardus Developer**, seorang programmer dan content creator yang suka eksplorasi kode open-source sambil bikin konten belajar coding di platform seperti YouTube dan blog. Pada dasarnya, Bailey tidak mengupdate docs-nya secara rutin—saya lebih fokus ke pengembangan inti dan eksperimen pribadi. Saya belajar cara membuat bot WhatsApp ini lewat pencarian di Google dan YouTube, di mana saya nemu banyak tutorial bagus.

Pada saat ini (November 2025), Lenwy sedang menjelaskan cara kerja WhatsApp bot-nya di channel YouTube-nya. Saya langsung mempelajari kodenya dari repo GitHub-nya, lalu memutuskan untuk membuat versi paling sederhana: basic structure dari Bailey itu sendiri. Lenwy adalah referensi utama saya—saya ambil esensi koneksi socket, handler pesan, dan auth state-nya, tapi potong semua yang berlebihan biar lebih mudah dipahami pemula seperti saya dulu.

Kini, setelah iterasi terbaru, Bailey udah disederhanakan ke level **paling rendah**: `bailey.js` jadi core handler super minimal (load aset sekali, parsing command efisien, if-else ringkas). Tujuannya? Biar ada versi "starter kit" yang gak overwhelming, tapi tetep powerful dan siap deploy. Kalo kamu suka cerita ini, follow saya di [Instagram @kardusdeveloper](https://www.instagram.com/kardusdeveloper) atau subscribe channel YouTube saya untuk konten coding santai! Mari belajar bareng—dan jangan lupa dukung Lenwy ya! 💡

## Fitur
- **Log Pesan Masuk**: Tampilkan pesan di terminal dengan warna random (efisien, satu console.log aja).
- **Command Admin**: Cek apakah user adalah admin (`/admin`).
- **Kirim Gambar**: Kirim gambar contoh dari local file (`/gambar`)—aset loaded sekali di `bailey.js`.
- **Prefix Custom**: Gunakan `/` untuk command (mudah ganti).
- **ES Modules**: Modern Node.js setup dengan `import/export`.
- **Pairing Code**: Mudah login tanpa QR code, dengan reconnect delay otomatis.
- **Highlight: bailey.js Minimal**: Handler pesan utama diringkas <40 baris—parsing command satu line, if-else sederhana, tanpa variabel tak terpakai. Ideal buat extend command baru!

## Persyaratan
- Node.js ≥ 14 (disarankan v18+).
- Akun WhatsApp (untuk pairing).

## Instalasi
1. **Clone atau Download Repo Ini**:
   ```
   git clone <your-repo-url>
   cd bailey
   ```

2. **Install Dependencies**:
   ```
   npm init -y
   npm install @whiskeysockets/baileys pino chalk
   ```
   - Tambahkan `"type": "module"` di `package.json` untuk ES modules.

3. **Setup Gambar**:
   - Buat folder `./database/image/` dan taruh file `KucingLucu.jpeg` (atau ganti path di `bailey.js`).

4. **Jalankan Bot**:
   ```
   node index.js
   ```
   - Masukkan nomor HP (mulai dengan 62) untuk pairing code.
   - Buka WhatsApp > Linked Devices > Link a Device > Masukkan code.

## Penggunaan
- **Kirim Pesan ke Bot**: Bot akan log pesan di terminal.
- **Command**:
  - `/admin`: Hanya admin yang bisa akses (cek nomor di `admin` array di `bailey.js`).
  - `/gambar`: Kirim gambar contoh dengan caption.
- **Customisasi**: Edit `bailey.js` untuk tambah command baru. Contoh (pakai if-else ringkas): 
  ```javascript
  } else if (command === 'halo') {
      baileyreply('Halo! Selamat datang di Bailey.');
  ```
  Gampang banget—tambah `else if` aja tanpa switch rumit!

## Troubleshooting
- **Error "Bad MAC"**: Hapus folder `./BaileySesi` dan pair ulang.
- **Koneksi Putus**: Bot auto-reconnect dengan delay 5 detik.
- **Versi Baileys**: Update dengan `npm update @whiskeysockets/baileys`.

## Lisensi
MIT License – Bebas gunakan, tapi **selalu credit Lenwy** sebagai sumber asli. Jangan lupa dukung repo dan channel-nya!

---

**Terima kasih telah menggunakan Bailey! Sekarang, pergi yuk ke [GitHub Lenwy](https://github.com/Lenwyy) beri star/follow, dan [subscribe YouTube-nya](https://www.youtube.com/@lenwy) untuk belajar lebih banyak. Mari bangun komunitas bot WhatsApp yang keren! 💚**