const boom = require('@hapi/boom');
const Car = require('../models/car');

exports.getCars = async (req, reply) => {
    try {
        const cars = await Car.find();
        return cars;
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.getSingleCar = async (req, reply) => {
    try {
        const {id} = req.params
        const car = await Car.findById(id);
        return car;
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.addNewCar = async (req, reply) => {
    try {
        const car = new Car({...req.body});
        return car.save();
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.updateCar = async (req, reply) => {
    try {
        const {id} = req.params;
        const car = req.body;
        const {...updatedCar} = car;
        const update = await Car.findByIdAndUpdate(id, updatedCar, {new: true});
        return update;
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.deleteCar = async (req, reply) => {
    try {
        const {id} = req.params;
        const car = await Car.findByIdAndDelete(id);
        return car;
    } catch (error) {
        throw boom.boomify(error);
    }
}