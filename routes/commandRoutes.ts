import express from 'express';
import {
    movementCommands,
    setCommands,
    readCommands
} from'../config';
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Tello server online');
});

router.get('/commandList', async (req, res) => {
    // send the command list to the user
    return res.json({
        controlCommands: movementCommands,
        setCommands,
        readCommands
    });
});

export const commandRouter = router
