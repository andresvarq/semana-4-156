const models = require('../models');
const token = require('../services/token.js');
var bcrypt = require('bcryptjs');

exports.add = async(req, res, next) => {
    try {
        const reg = await models.Articulo.create(req.body);
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
        const reg = await models.Articulo.findAll();
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
        console.log(req.body);
        const reg = await models.Articulo.update(
            { categoriaId: req.body.categoria, codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion },
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

exports.activate = async(req, res, next) => {
    try {
        console.log(req.body.id);
        const reg = await models.Articulo.update(
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
        const reg = await models.Articulo.update(
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