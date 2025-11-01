// bailey.js
// Import Module
import fs from 'fs';

// Custom Prefix
export const admin = ['6283189202482@s.whatsapp.net']; // Sesuaikan Nomor Admin

export const prefix = '!';

export const image = './database/image/KucingLucu.jpeg';

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
    const pushname = msg.pushName || "Bailey";
    const args = body.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();
    const q = args.join(" ");

    if (!body.startsWith(prefix)) return;

    const baileyreply = (teks) => sock.sendMessage(sender, { text: teks }, { quoted: msg });
    const isGroup = sender.endsWith('@g.us');
    const isAdmin = admin.includes(sender);
    const menuImage = fs.readFileSync(image);

    switch (command) {

        // Admin (case admin)
        case "admin": {
            if (!isAdmin) return baileyreply(mess.admin);
            baileyreply("🎁 *Kamu Adalah Admin*");
        }
        break;

        // Kirim Gambar (case mengirim gambar)
        case "gambar": {
            await sock.sendMessage(sender,
                {
                    image: menuImage,
                    caption: `*Bailey Bot*\n\nKirim gambar contoh.`,
                    mentions: [sender]
                },
                { quoted: msg }
            );
        }
        break;

        // Default
        default: { baileyreply(mess.default); }
    }
};