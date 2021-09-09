const {Type} = require('../models/App.models');
const ApiError = require('../errors/ApiError')


class TypeController {
    async create(req, res){
        const {name} = req.body;
        const type = await Type.create({name});
        return res.status(201).json(type);
    }
    async getAll(req, res){
        const types = await Type.findAll();
        return res.status(200).json(types);
    }
    async getOne(req, res){
        const {id} = req.params;
        const type = await Type.findByPk(id);
        if(!type){
            throw new ApiError('Type not found', 404);
        }
        return res.status(200).json(type);
    }
    async update(req, res){
        const {id} = req.params;
        const {name} = req.body;
        const type = await Type.findByPk(id);
        if(!type){
            throw new ApiError('Type not found', 404);
        }
        await type.update({name});
        return res.status(200).json(type);
    }
    async delete(req, res){
        const {id} = req.params;
        const type = await Type.findByPk(id);
        if(!type){
            throw new ApiError('Type not found', 404);
        }
        await type.destroy();
        return res.status(204).json();
    }
}

module.exports = new TypeController();