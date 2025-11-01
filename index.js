/*  
  Made By Lenwy (Original Base)
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ilenwy
  Youtube : @Lenwy
  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Modified By Kardus Developer (Bailey Version)
  Base : Inspired by Lenwy
  WhatsApp : wa.me/6287745457767
  YouTube : @kardusdeveloper
*/

import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } from "baileys";
import pino from "pino";
import chalk from "chalk";
import fs from 'fs';  // Untuk hapus folder session (safety)

import bot from "./bailey.js";

// Metode Pairing
const usePairingCode = true;

// Fungsi untuk menanyakan input user di terminal
async function question(prompt) {
  process.stdout.write(prompt);
  return new Promise((resolve) => {
    const onData = (data) => {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      resolve(data.toString().trim());
    };
    process.stdin.once('data', onData);
    process.stdin.resume();
  });
}

// Fungsi cleanup session (hapus folder kalo corrupt)
function cleanupSession() {
  try {
    if (fs.existsSync('./session')) {
      fs.rmSync('./session', { recursive: true, force: true });
      console.log(chalk.yellow('🧹 Session corrupt terhapus. Restart pairing...'));
    }
  } catch (err) {
    console.error('Gagal hapus session:', err);
  }
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');

  // Versi Terbaru
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`Bailey Using WA v${version.join('.')} ${isLatest ? "(latest)" : ""}\n`);

  // Inisialisasi Socket untuk Koneksi WhatsApp
  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '120.0.0'],
    version,
    syncFullHistory: false,
    generateHighQualityLinkPreview: false,
  });
  
  // Handle Pairing sederhana (seperti awal: request sekali, tanpa loop)
  if (usePairingCode && !sock.authState.creds.registered) {
    try {
      const phoneNumber = await question('Masukan Nomor Yang Diawali Dengan 62 :\n');
      const code = await sock.requestPairingCode(phoneNumber.trim());
      console.log(`🎁 Pairing Code : ${code}\n(Masukkan code ini di WA App sekarang!)`);
      // Catatan: Kalo code salah/expired, hapus folder ./session manual & restart bot
    } catch (err) {
      console.error('Failed to get pairing code:', err);
    }
  }

  // Menyimpan Sesi Login
  sock.ev.on("creds.update", saveCreds);

  // Informasi Koneksi (tambah cek error untuk auto-cleanup)
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const errorMsg = lastDisconnect?.error?.message || '';
      // Cek kalo error auth-related (misal Bad MAC, stream-error, atau pairing fail)
      if (errorMsg.includes('Bad MAC') || errorMsg.includes('stream') || errorMsg.includes('auth')) {
        console.log(chalk.red(`❌ Auth gagal (Error: ${errorMsg.slice(0, 50)}...). Cleanup session & retry...`));
        cleanupSession();
        setTimeout(connectToWhatsApp, 3000);
        return;
      }
      console.log(chalk.red("❌  Koneksi Terputus, Mencoba Menyambung Ulang..."));
      setTimeout(connectToWhatsApp, 3000);
    } else if (connection === "open") {
      console.log(chalk.green("✔  Bot Berhasil Terhubung Ke WhatsApp"));
    }
  });

  // Respon Pesan Masuk
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.remoteJid;
    const pushname = msg.pushName || "Bailey";

    // Log Pesan Masuk
    const colors = ["red", "green", "yellow", "magenta", "cyan", "white", "blue"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    console.log(
      chalk.green.bold("[ WhatsApp ]"),
      chalk[color](`${pushname} : ${body}`)
    );

    bot(sock, m);
  });
}

// Jalankan Koneksi WhatsApp
connectToWhatsApp();