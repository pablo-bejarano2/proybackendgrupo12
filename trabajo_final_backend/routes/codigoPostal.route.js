const express = require('express');
const router = express.Router();
const { buscarPorCP } = require('../controllers/codigosPostales.controlller');

router.get('/:cp', buscarPorCP);

module.exports = router;
