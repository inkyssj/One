const { Client, LocalAuth, MessageMedia, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Usamos LocalAuth para guardar sesión y no escanear QR cada vez
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

client.on('message', async(m) => {
    const chat = await m.getChat();
    console.log(m);
});

client.initialize();
