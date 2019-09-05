const carController = require('../controller/Car');
const ownerController = require('../controller/Owner');
const fastify = require('../server')
const routes = [
    {
        method: 'GET',
        url: '/api/cars',
        handler: carController.getCars
    },
    {
        method: 'GET',
        url: '/api/cars/:id',
        handler: carController.getSingleCar
    },
    {
        method: 'POST',
        url: '/api/cars',
        handler: carController.addNewCar,
    },
    {
        method: 'PUT',
        url: '/api/cars/:id',
        handler: carController.updateCar
    },
    {
        method: 'DELETE',
        url: '/api/cars/:id',
        handler: carController.deleteCar
    },
    {
        method: 'GET',
        url: '/api/owners',
        handler: ownerController.getOwner
    },
    {
        method: 'GET',
        url: '/api/owner/:id',
        handler: ownerController.getSingleOwner,
        
    },
];

module.exports = routes