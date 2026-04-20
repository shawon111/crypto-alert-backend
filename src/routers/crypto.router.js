const express = require('express');
const { getCryptoData } = require('../controllers/crypto.controller');
const router = express.Router()

router.get('/', getCryptoData)

module.exports = router;