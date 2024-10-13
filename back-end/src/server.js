const WebSocket = require('ws');
const dotenv = require('dotenv');

dotenv.config();

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on("connection", (ws) => {
    ws.on('error', console.error);

    ws.send('ENVIADAA PELO SERVIDOR!')

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
    });

    console.log("cliente connected");
});
