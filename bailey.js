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

const menuImage = fs.readFileSync(imagePath);

// Custom Message
export const mess = {
    wait: '☕ *One Moment, Please*',
    error: '⚠ *Gagal Saat Melakukan Proses*',
    default: '📑 *Perintah Tidak Dikenali*',
    admin: '⚠ *Perintah Ini Hanya Bisa Digunakan Oleh Admin*',
    group: '⚠ *Perintah Ini Hanya Bisa Digunakan Di Dalam Grup*',
};

export default async (sock, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.remoteJid;

    if (!body.startsWith(prefix)) return;

    // Parse command
    const command = body.slice(prefix.length).trim().split(' ')[0]?.toLowerCase() || '';

    const baileyreply = (teks) => sock.sendMessage(sender, { text: teks }, { quoted: msg });
    const isAdmin = admin.includes(sender);
    const isGroup = sender.endsWith('@g.us');

    // If-else chain
    if (command === 'admin') {
        if (!isAdmin) return baileyreply(mess.admin);
        baileyreply('🎁 *Kamu Adalah Admin*');
    } else if (command === 'group') {
        if (!isGroup) return baileyreply(mess.group);
        baileyreply("🎁 *Kamu Sedang Berada Di Dalam Grup*");
    } else if (command === 'gambar') {
        await sock.sendMessage(sender, {
            image: menuImage,
            caption: `*Bailey Bot*\n\nKirim gambar contoh.`,
            mentions: [sender]
        }, { quoted: msg });
    } else {
        baileyreply(mess.default);
    }
};