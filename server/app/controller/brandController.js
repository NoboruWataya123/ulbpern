const {Brand} = require('../models/App.models');
const ApiError = require('../errors/ApiError')

class BrandController {
    async create(req, res){
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.status(201).json(brand);
    }
    async getAll(req, res){
        const brands = await Brand.findAll();
        return res.status(200).json(brands);
    }
    async getOne(req, res){
        const {id} = req.params;
        const brand = await Brand.findByPk(id);
        if(!brand) throw new ApiError('Brand not found', 404);
        return res.status(200).json(brand);
    }
    async update(req, res){
        const {id} = req.params;
        const {name} = req.body;
        const brand = await Brand.findByPk(id);
        if(!brand) throw new ApiError('Brand not found', 404);
        await brand.update({name});
        return res.status(200).json(brand);
    }
    async delete(req, res){
        const {id} = req.params;
        const brand = await Brand.findByPk(id);
        if(!brand) throw new ApiError('Brand not found', 404);
        await brand.destroy();
        return res.status(204).json();
    }
}

module.exports = new BrandController();