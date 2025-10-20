const { Client, LocalAuth, MessageMedia, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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

client.on('message', async(msg) => {
    const chat = await msg.getChat();
    const sender = msg.from;
    const text = msg.body.toLowerCase();

    console.log(chat);

    /*
    if(text === '-hola') {
        msg.reply('¡Hola! Soy tu bot 🤖');
    }
    */
    
});

client.initialize();
