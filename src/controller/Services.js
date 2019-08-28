const boom = require('@hapi/boom')

// Require models
const Service = require('../models/Service');
const Car = require('../models/Car')


exports.getSingleService = async req =>{
    try {
        const id = req.params === undefined ? req.id : req.params.id;
        const service = await Service.findById(id);
        return service;
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.getCarsService = async req => {
    try {
        const id = req.params === undefined ? req.id : req.params.id;
        const services = await Service.find({car_id: id})
        return services;
    } catch (error) {
        throw boom.boomify(error);
    }
}