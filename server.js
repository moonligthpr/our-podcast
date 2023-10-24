const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    // Handle WebSocket messages and signaling here
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
