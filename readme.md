# Bailey WhatsApp Bot

[![GitHub stars](https://img.shields.io/github/stars/Lenwyy?label=Support%20Original%20Repo&style=for-the-badge)](https://github.com/Lenwyy) [![YouTube Subscribe](https://img.shields.io/badge/Subscribe%20to%20Lenwy-red?logo=youtube&style=for-the-badge)](https://www.youtube.com/@lenwy)

## Deskripsi
Bailey adalah bot WhatsApp sederhana dan minimalis yang dibangun menggunakan library **Baileys** (@whiskeysockets/baileys). Bot ini dirancang untuk menangani pesan masuk, verifikasi admin, dan pengiriman gambar dasar. **Kode ini merupakan inherit dan modifikasi minimal dari proyek asli milik [Lenwy](https://github.com/Lenwyy), creator konten WhatsApp bot terkenal di YouTube.**

Versi ini menghilangkan fitur kompleks seperti AI, scraping (TikTok/Instagram), dan game, agar lebih ringan dan mudah di-customize. Cocok untuk pemula yang ingin belajar atau deploy bot sederhana.

**⚠️ PENTING: Ini bukan proyek independen! Silakan kunjungi dan dukung creator asli:**
- **Repo GitHub Lenwy**: [https://github.com/Lenwyy](https://github.com/Lenwyy) – Beri **⭐ Star** dan **Follow** untuk update terbaru!
- **YouTube Channel Lenwy**: [https://www.youtube.com/@lenwy](https://www.youtube.com/@lenwy) – **Subscribe** dan nyalakan bell 🔔 untuk tutorial bot WhatsApp lengkap, seperti "Cara Membuat Bot WhatsApp Dari Awal Dengan JavaScript Dan Baileys"!

Dukungan komunitas sangat penting—jangan lupa beri apresiasi ke Lenwy agar konten berkualitas terus bermunculan! 🚀

## Cerita Pembuatan Bailey
Halo! Saya **Kardus Developer**, seorang programmer dan content creator yang suka eksplorasi kode open-source sambil bikin konten belajar coding di platform seperti YouTube dan blog. Pada dasarnya, Bailey tidak mengupdate docs-nya secara rutin—saya lebih fokus ke pengembangan inti dan eksperimen pribadi. Saya belajar cara membuat bot WhatsApp ini lewat pencarian di Google dan YouTube, di mana saya nemu banyak tutorial bagus.

Pada saat ini (November 2025), Lenwy sedang menjelaskan cara kerja WhatsApp bot-nya di channel YouTube-nya, yang bikin saya excited banget. Saya langsung mempelajari kodenya dari repo GitHub-nya, lalu memutuskan untuk membuat versi paling sederhana: basic structure dari Bailey itu sendiri. Lenwy adalah referensi utama saya—saya ambil esensi koneksi socket, handler pesan, dan auth state-nya, tapi potong semua yang berlebihan biar lebih mudah dipahami pemula seperti saya dulu.

Tujuannya? Biar ada versi "starter kit" yang gak overwhelming, tapi tetep powerful. Kalo kamu suka cerita ini, follow saya di [X/Twitter @KardusDev](https://x.com/kardusdev) atau subscribe channel YouTube saya untuk konten coding santai! Mari belajar bareng—dan jangan lupa dukung Lenwy ya! 💡

## Fitur
- **Log Pesan Masuk**: Tampilkan pesan di terminal dengan warna random.
- **Command Admin**: Cek apakah user adalah admin (`!admin`).
- **Kirim Gambar**: Kirim gambar contoh dari local file (`!gambar`).
- **Prefix Custom**: Gunakan `!` untuk command.
- **ES Modules**: Modern Node.js setup dengan `import/export`.
- **Pairing Code**: Mudah login tanpa QR code.

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
  - `!admin`: Hanya admin yang bisa akses (cek nomor di `admin` array di `bailey.js`).
  - `!gambar`: Kirim gambar contoh dengan caption.
- **Customisasi**: Edit `bailey.js` untuk tambah command baru. Contoh: Tambah `case "halo": { baileyreply("Halo!"); }`.

## Troubleshooting
- **Error "Bad MAC"**: Hapus folder `./BaileySesi` dan pair ulang.
- **Koneksi Putus**: Bot auto-reconnect.
- **Versi Baileys**: Update dengan `npm update @whiskeysockets/baileys`.

## Lisensi
MIT License – Bebas gunakan, tapi **selalu credit Lenwy** sebagai sumber asli. Jangan lupa dukung repo dan channel-nya!

---

**Terima kasih telah menggunakan Bailey! Sekarang, pergi yuk ke [GitHub Lenwy](https://github.com/Lenwyy) beri star/follow, dan [subscribe YouTube-nya](https://www.youtube.com/@lenwy) untuk belajar lebih banyak. Mari bangun komunitas bot WhatsApp yang keren! 💚**