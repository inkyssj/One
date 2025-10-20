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

client.on('message', async msg => {
    const chat = await msg.getChat();
    const sender = msg.from;
    const text = msg.body.toLowerCase();

    console.log(`Mensaje de ${sender}: ${text}`);

    // Respuesta simple
    if(text === '-hola') {
        msg.reply('¡Hola! Soy tu bot 🤖');
    }

    // Enviar imagen
    if(text === '-imagen') {
        const media = MessageMedia.fromFilePath('./imagen.png'); // Pon tu imagen en la carpeta
        client.sendMessage(sender, media);
    }

    // Botones interactivos
    if(text === '-menu') {
        const buttons = new Buttons('Elige una opción:', [
            { body: 'Opción 1' },
            { body: 'Opción 2' },
            { body: 'Opción 3' }
        ], 'Menú Bot', 'Seleccione');
        client.sendMessage(sender, buttons);
    }

    // Responder a botones
    if(chat.isGroup) return; // Evitamos conflictos en grupos
    if(text === 'opción 1') msg.reply('Elegiste Opción 1 ✅');
    if(text === 'opción 2') msg.reply('Elegiste Opción 2 ✅');
    if(text === 'opción 3') msg.reply('Elegiste Opción 3 ✅');
});

client.initialize();
