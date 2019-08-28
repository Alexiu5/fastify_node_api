const boom = require('@hapi/boom');

// Get Data Models
const Owner = require('../models/Owner');
const Car = require('../models/Car');

exports.getOwner = async ()=>{
    try {
        const owners = await Owner.find();
        return owners;
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.getSingleOwner = async (req)=>{
    try {
        const id = req.params === undefined ? req.id : req.params.id;
        const owner = await Owner.findById(id);
        return owner;
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.getOwnersCars = async (req) => {
    try {
        const id = req.params === undefined ? req.id : req.params.id;
        const cars = await Car.find({owner_id : id})
        return cars;
    } catch (error) {
        throw boom.boomify(error)
    }
}