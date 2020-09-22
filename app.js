const express = require('express');
const webSockets = require('ws');
const http = require('http');
const url = require('url');
const app = express();

// routes
const defaultRoute = require('./routes/Index');

// setup routes
app.use('/test', defaultRoute);

// websocket compatible http server
const server = http.createServer(app);

// drone state socket server
const stateWSS = new webSockets.Server({ noServer: true });
// video socket server
const videoWSS = new webSockets.Server({ noServer: true });
// command socket server
const commandWSS = new webSockets.Server({ noServer: true });

// server connection listeners
stateWSS.on('connection', (socket) => {
    console.log('state connection established');
    socket.on('message', message => {
        //send message out to all clients
        stateWSS.clients.forEach(c => {
            c.send(message);
        });
    });
});
videoWSS.on('connection', (socket) => {
    console.log('video connection established');
    socket.on('message', message => {
        //send message out to all clients
        videoWSS.clients.forEach(c => {
            c.send(`There are ${videoWSS.clients.size} clients connected. Message sent was '${message}'`);
        });
    });
});
commandWSS.on('connection', (socket) => {
    console.log('state connection established');
    socket.on('message', message => {
        //send message out to all clients
        commandWSS.clients.forEach(c => {
            c.send(message);
        });
    });
});

server.on('upgrade', (request, socket, head) => {
    console.log('upgrade fired');
    const pathname = url.parse(request.url).pathname;
    if (pathname === '/state') {
        stateWSS.handleUpgrade(request, socket, head, ws => {
            stateWSS.emit('connection', ws, request);
        });
    } else if (pathname === '/stream') {
        videoWSS.handleUpgrade(request, socket, head, ws => {
            videoWSS.emit('connection', ws, request);
        });
    } else if (pathname === '/command') {
        commandWSS.handleUpgrade(request, socket, head, ws => {
            commandWSS.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

// launch server
server.listen(3001);