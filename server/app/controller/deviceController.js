const {Device, DeviceInfo} = require('../models/App.models');
const ApiError = require('../errors/ApiError')
const uuid = require('uuid');
const path = require('path');

class DeviceController {
    async create(req, res){
    try {
        const {name, price, brandId, typeId, info} = req.body;
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))
        const device = await Device.create({name, price, brandId, typeId, img: fileName});

        if(info) {
            info = JSON.parse(info)
            info.forEach((item) => {
                DeviceInfo.create({
                    title: item.title,
                    description: item.description,
                    deviceId: device.id
                })
            })
        }

        return res.status(201).json(device);
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
}
    async getAll(req, res){
        try {
            let {brandId, typeId, limit, page} = req.query;

            page = page || 1
            limit = limit || 10
            let offset = (page * limit) - limit
            let devices;
            if(brandId && typeId){
                devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset});
            }
            if(brandId && !typeId){
                devices = await Device.findAndCountAll({where:{brandId}, limit, offset});
            }
            if(!brandId && typeId){
                devices = await Device.findAndCountAll({where:{typeId}, limit, offset});
            }
            if(!brandId && !typeId){
                devices = await Device.findAndCountAll({limit, offset});
            }
            return res.status(200).json(devices);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    async getOne(req, res){
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {id},
                include: [{
                    model: DeviceInfo,
                    as: 'info'
                }]
            });
            return res.status(200).json(device);
        }
        catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    async update(req, res){
        try {
            const {id} = req.params;
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))
            const device = await Device.update({name, price, brandId, typeId, img: fileName}, {where: {id}});
            if(info) {
                info = JSON.parse(info)
                info.forEach((item) => {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: id
                    })
                })
            }
            return res.status(200).json(device);
        }
        catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    async delete(req, res){
        try {
            const {id} = req.params;
            const device = await Device.destroy({where: {id}});
            return res.status(200).json(device);
        }
        catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new DeviceController();