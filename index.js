const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea este QR con tu WhatsApp');
});

client.on('ready', () => {
    console.log('✅ Bot listo!');
});

const saveMedia = (media) => {
    const folder = path.join(__dirname, 'downloads');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const extension = media.mimetype.split('/')[1] || 'bin';
    const filename = path.join(folder, `file_${Date.now()}.${extension}`);

    fs.writeFileSync(filename, media.data, { encoding: 'base64' });
    console.log('Archivo guardado:', filename);
};

client.on('message', async(msg) => {
    const chat = await msg.getChat();
    console.log(chat)

    if (msg.hasMedia) {
        if (msg.isViewOnce) {
            console.log('¡Archivo de vista única detectado! Descargando...');
            try {
                const media = await msg.downloadMedia();
                saveMedia(media);
            } catch(err) {
                console.error('Error al descargar media:', err);
            }
        }
    }
});

client.initialize();
