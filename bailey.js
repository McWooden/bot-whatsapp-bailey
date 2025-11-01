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

import fs from 'fs';

export const admin = ['6287745457767@s.whatsapp.net'];
export const prefix = '/';
export const imagePath = './database/image/KucingLucu.jpeg';

// Load image dengan error handling (fallback kalo file gak ada)
let menuImage;
try {
    if (fs.existsSync(imagePath)) {
        menuImage = fs.readFileSync(imagePath);
    } else {
        console.warn('Gambar tidak ditemukan, fallback ke text di /gambar');
        menuImage = null;  // Flag untuk fallback
    }
} catch (err) {
    console.error('Error load gambar:', err.message);
    menuImage = null;
}

// Custom Message
export const mess = {
    wait: '`One Moment, Please ☕`',
    error: '`⚠ Gagal Saat Melakukan Proses`',
    default: '`Perintah Tidak Dikenali`',
    admin: '`⚠ Perintah Ini Hanya Bisa Digunakan Oleh Admin`',
    group: '`⚠ Perintah Ini Hanya Bisa Digunakan Di Dalam Grup`',
};

const bot = async (sock, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.remoteJid;
    console.log(sender + ': ' + body);

    if (!body.startsWith(prefix)) return;

    // Parse command
    const command = body.slice(prefix.length).trim().split(' ')[0]?.toLowerCase() || '';
    // Parse args/content untuk salin (seluruh body minus prefix/command)
    const content = body.slice(prefix.length + command.length).trim();

    const reply = (teks) => sock.sendMessage(sender, { text: teks }, { quoted: msg });
    const isAdmin = admin.includes(sender);
    const isGroup = sender.endsWith('@g.us');

    // If-else chain
    if (command === 'admin') {
        if (!isAdmin) return reply(mess.admin);
        reply('`Kamu Adalah Admin`');
    } else if (command === 'group') {
        if (!isGroup) return reply(mess.group);
        reply("`Kamu Sedang Berada Di Dalam Grup`");
    } else if (command === 'gambar') {
        if (menuImage) {
            await sock.sendMessage(sender, {
                image: menuImage,
                caption: `*Bailey Bot*\n\nKirim gambar contoh.`,
                mentions: [sender]
            }, { quoted: msg });
        } else {
            reply('`Gambar tidak tersedia, cek path!`');
        }
    } else if (command === 'tombol') { 
        // Format buttons baru untuk Baileys v6
        await sock.sendMessage(sender, {
            text: 'Pilih tombol di bawah ini!',
            footer: 'Bailey Bot',
            buttons: [
                {
                    buttonId: `${prefix}halo`,
                    buttonText: {
                        displayText: 'Halo!'
                    },
                    type: 1
                },
                {
                    buttonId: `${prefix}bye`,
                    buttonText: {
                        displayText: 'Bye!'
                    },
                    type: 1
                }
            ],
            headerType: 1  // Opsional: untuk layout header kosong
        }, { quoted: msg });
    } else if (command === 'salin') {
        if (!content) return reply('Gak ada pesan untuk disalin!');
        await sock.sendMessage(sender, {
            text: `*Salinan Pesanmu:*\n\n${content}\n\nSalin selesai! (oleh Bailey Bot)`,
        }, { quoted: msg });  // Hapus footer (gabung ke text), quoted untuk konteks
    } else {
        reply(mess.default);
    }
};

export default bot;