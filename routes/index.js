const routerx = require('express-promise-router');
const articuloRouter = require('./api/articulo.js');
const usuarioRouter = require('./api/usuario.js');
const categoriaRouter = require('./api/categoria.js');



const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/usuario', usuarioRouter);
router.use('/categoria',categoriaRouter);

module.exports = router;