const express = require('express');
const {
    controlCommands,
    setCommands,
    readCommands
} = require('../config/commands');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Tello server online');
});

router.get('/commandList', async (req, res) => {
    // send the command list to the user
    return res.json({
        controlCommands,
        setCommands,
        readCommands
    });
});

module.exports = router;
