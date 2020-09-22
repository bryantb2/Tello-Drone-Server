const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
   res.send('Tello server online');
});

module.exports = router;