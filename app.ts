import express from 'express';
import cors from 'cors';
import { commandRouter } from './routes';
import { DroneService } from "./services";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/command', commandRouter);

const droneService = new DroneService();

// launch server
app.listen(3001);

console.log('initialization of server finished');
