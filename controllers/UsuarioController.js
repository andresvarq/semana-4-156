const models = require('../models');
const token = require('../services/token.js');
var bcrypt = require('bcryptjs');

exports.login = async(req, res, next) => {
    try {
        console.log(req.body.email)
        let user = await models.Usuario.findOne({ where: { email: req.body.email } });
        if (user) {
            let match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                console.log(user.rol);
                let tokenReturn = await token.encode(user.id, user.rol);
                res.status(200).json({ user, tokenReturn });
            } else {
                res.status(401).send({
                    message: 'Password Incorrecto'
                });
            }
        } else {
            res.status(404).send({
                message: 'No existe el usuario'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};

exports.add = async(req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const reg = await models.Usuario.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};

exports.list = async(req, res, next) => {
    try {
        let valor = req.query.valor;
        const reg = await models.Usuario.findAll();
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};

exports.update = async(req, res, next) => {
    try {
        let pas = req.body.password;
        const reg0 = await models.Usuario.findOne({ where: { id: req.body.id } });
        if (pas != reg0.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const reg = await models.Usuario.update({ rol: req.body.rol, nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, num_documento: req.body.num_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password }, { where: { id: req.body.id } });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};