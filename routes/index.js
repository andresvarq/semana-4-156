const router = require('express').Router();
const articuloRouter = require('./articulo');
const usuarioRouter = require('./usuario.js');
const categoriaRouter = require('./categoria.js');


router.use('/articulo', articuloRouter);
router.use('/usuario', usuarioRouter);
router.use('/categoria', categoriaRouter);

module.exports = router;