const router = require('express').Router();
const model = require('../../models');
const userController = require('../../controllers/UserController.js');
var bcrypt = require('bcryptjs');
var auth = require('../../middlewares/auth')


router.get('/', async(req, res) => {
    const user = await model.user.findAll();
    res.status(200).json(user);
});

router.post('/register', async(req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await model.user.create(req.body);
    res.status(200).json(user);
});

// router.get('/', userController.list);
// router.post('register', userController.register);
router.post('/signin', userController.login);
router.put('/update', userController.update);

module.exports = router;