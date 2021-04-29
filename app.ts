import express from 'express';
import ws from 'ws';
const throttle = require('lodash/throttle');
const http = require('http');
const url = require('url');
const {
    streamSocket,
    commandSocket,
    stateSocket
} = require('./config/connection');
const defaultRoute = require('./controllers');
const app = express();

// middlewares
app.use(express.json());
// controllers
app.use('/', defaultRoute);

// websocket compatible http server
const server = http.createServer(app);

// drone state socket server
const stateWSS = new WebSocket.Server({ noServer: true });
// video socket server
const videoWSS = new WebSocket.Server({ noServer: true });
// command socket server
const commandWSS = new WebSocket.Server({ noServer: true });

// launch server
server.listen(3001);
