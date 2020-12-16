const models = require('../models');

exports.add = async(req, res, next) => {
    try {
        const registro = await models.Categoria.create(req.body);
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).send({
            message: "Ocurrió un error"
        });
        next(error);
    }
};

exports.list = async(req, res, next) => {
    try {
        const lista = await models.Categoria.findAll();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).send({
            message: "Ocurrió un error"
        });
        next(error);
    }
};

exports.update = async(req, res, next) => {
    try {
        const reg = await models.Categoria.update(
            { nombre: req.body.nombre, descripcion: req.body.descripcion },
            { where: { id: req.body._id } }
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
        const reg = await models.Categoria.update(
            { estado: 1 },
            { where: { id: req.body._id } }
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
        const reg = await models.Categoria.update(
            { estado: 0 },
            { where: { id: req.body._id } }
        );
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
};