const carController = require('../controller/Car');

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
        handler: carController.addNewCar
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
    }
];

module.exports = routes