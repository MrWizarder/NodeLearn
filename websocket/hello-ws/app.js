const WebSocket = require('ws');

const webSocketServer = WebSocket.Server;

const wss = new webSocketServer({
    port: 9001
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});




let ws = new WebSocket('ws://localhost:9001/test');

ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
});