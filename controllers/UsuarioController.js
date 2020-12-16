const config = require('../secret/config.js');
const db = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const token = require('../services/token');



exports.login = (req, res) => {
    db.Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send('User Not Found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                accessToken: null,
                reason: "Invalid Password!"
            });
        }
        res.status(200).send({
            auth: true,
            accessToken: await token.encode(),
            nombre: Usuario.nombre,
            email: Usuario.email
        });
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};

exports.update = async(res, req, next) => {
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if(user) {
            const user = await db.Usuario.update({name: req.body.name},
                {
                    where: {
                        email: req.body.email
                    },
                }
            );
            res.status(200).json(user)
        } else {
            res.status(404).send({
                message: 'user not found'
            });
        }
    } catch(error) {
        res.status(500).send({
            message: 'error'
        });
        next(error);
    }
}