const express = require('express');
const WebSocket = require('ws');
const throttle = require('lodash/throttle');
const http = require('http');
const url = require('url');
const app = express();

// drone web sockets
const {
    controlCommands,
    setCommands,
    readCommands
} = require('./config/Commands');
const {
    streamSocket,
    commandSocket,
    stateSocket
} = require('./config/Connection');

// routes and routing middleware
const defaultRoute = require('./routes/Index');
app.use('/test', defaultRoute);

// websocket compatible http server
const server = http.createServer(app);

// drone state socket server
const stateWSS = new WebSocket.Server({ noServer: true });
// video socket server
const videoWSS = new WebSocket.Server({ noServer: true });
// command socket server
const commandWSS = new WebSocket.Server({ noServer: true });

// server connection listeners
stateWSS.on('connection', socket => {
    console.log('state connection established');
    /*socket.on('message', message => {
        // send out
        stateWSS.clients.forEach(c => {
            c.send(message);
        });
    });*/
    // setup message event listener for drone state
    stateSocket.addEventListener('message', (message) => {
        // send data from drone to clients
        stateWSS.clients.forEach(client => {
            client.send(message);
        });
    });
});
videoWSS.on('connection', socket => {
    console.log('video connection established');
    /*
    socket.on('message', message => {
        setInterval(() => {
            //send message out to all clients
            videoWSS.clients.forEach(c => {
                c.send(`There are ${videoWSS.clients.size} clients connected. Message sent was '${message}'`);
            });
        });
    });*/
    streamSocket.addEventListener('message', stream => {
        // send stream data to all clients
        videoWSS.clients.forEach(client => {
           client.send(stream);
        });
    });
});
commandWSS.on('connection', socket => {
    console.log('command connection established');
    socket.on('message', message => {
        // send message to drone's UDP socket
        commandSocket.send(message);
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