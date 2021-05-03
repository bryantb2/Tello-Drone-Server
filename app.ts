import express from 'express';
import { commandRouter } from './routes'
import { SocketService } from "./services";
import cors from 'cors'
require('dotenv').config('./bruh.json')
const app = express();

console.log('Variable is: ', process.env.TEST)

// middlewares
app.use(cors())
app.use(express.json());
app.use('/command', commandRouter);

const socketService = new SocketService();

// launch server
app.listen(3001);

console.log('initialization of server finished')
