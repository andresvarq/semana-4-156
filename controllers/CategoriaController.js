const models = require('../models');
const token = require('../services/token.js');
var bcrypt = require('bcryptjs');

exports.add = async(req, res, next) => {
    try {
        const reg = await models.Categoria.create(req.body);
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
        const reg = await models.Categoria.findAll();
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
        const reg0 = await models.Categoria.findOne({ where: { id: req.body.id } });
        if (pas != reg0.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const reg = await models.Categoria.update({ rol: req.body.rol, nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, num_documento: req.body.num_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password }, { where: { id: req.body.id } });
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};

exports.activate = async(req, res, next) => {
    try {
        console.log(req.body.id);
        const reg = await models.Categoria.update(
            { estado: 1 },
            { where: { id: req.body.id } }
        );
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};

exports.deactivate = async(req, res, next) => {
    try {
        console.log(req.body.id);
        const reg = await models.Categoria.update(
            { estado: 0 },
            { where: { id: req.body.id } }
        );
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};