const faker = require('faker');
const boom = require('@hapi/boom');

const fastify = require('../server')

// Fake data
const cars = [
	{
		name: 'Tesla',
		models: ['S', 'E', 'X', 'Y']
	},
	{
		name: 'Mercedes',
		models: ['GLA', 'GLC', 'GLE', 'GLS']
	},
	{
		name: 'BMW',
		models: ['X4', 'Z3', 'M2', 'S7']
	},
	{
		name: 'Audi',
		models: ['A1', 'A3', 'A4', 'A5']
	},
	{
		name: 'Ford',
		models: ['Fiesta', 'Focus', 'Fusion', 'Mustang']
	}
]

const imageUrls = {
    S: 'https://www.tesla.com/sites/tesla/files/curatedmedia/model-s%402x.jpg',
    E: 'https://www.teslarati.com/wp-content/uploads/2018/09/White-Model3-Tesla-Range-e1537776348543.jpg',
    X: 'https://www.tesla.com/sites/default/files/images/model-x/section-hero-background.jpg?20180607',
    Y: 'https://www.tesla.com/sites/tesla/files/curatedmedia/model-y_R1%402.jpg',
    GLA: 'https://www.mercedes-benz.com.co/passengercars/mercedes-benz-cars/models/gla/gla-suv/explore/vehicle-highlights/_jcr_content/highlightcontainer/image.MQ6.0.20180115103444.jpeg',
    GLC: 'https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/vehicles/passenger-cars/glc-class/the-new-glc-the-success-model/00-Mercedes-Benz-2019-GLC-300-4MATIC-X253-Facelift-designo-selenite-grey-magno-2560x1440.jpg',
    GLE: 'https://inm-baobab-prod-eu-west-1.s3.amazonaws.com/public/inm/media/image/iol/2018/09/12/17022082/IOLmot12aug18_GLE_b.jpg',
    GLS: 'https://www.mercedes-benz.com/en/vehicles/passenger-cars/gls/gls/_jcr_content/root/slider_0/sliderchilditems/slideritem/image/MQ6-0-image-20190417160601/01-mercedes-benz-gls-2019-x167-suv-3400x1440.jpeg',
    X4: 'https://www.diariomotor.com/imagenes/picscache/1920x1600c/bmw_x4_2018_16-1_1920x1600c.jpg',
    Z3: 'https://i.ytimg.com/vi/x-YhYyLYbvs/maxresdefault.jpg',
    M2: 'https://www.actualidadmotor.com/wp-content/uploads/2015/10/bmw-m2-2016-16-e1444812551839.jpg',
    S7: 'https://www.diariomotor.com/imagenes/picscache/1920x1600c/bmw-serie-7-todos-los-detalles-p90333104_highres_1920x1600c.jpg',
    A1: 'https://www.diariomotor.com/imagenes/2018/06/audi-a1-motores-sin-diesel-02.jpg',
    A3: 'https://cdn.motor1.com/images/mgl/qO86y/s1/audi-a3-2017.jpg',
    A4: 'https://www.diariomotor.com/imagenes/picscache/1920x1600c/audi-a4-2020-7_1920x1600c.jpg',
    A5: 'https://1.bp.blogspot.com/-mHXAQPsQemw/XMLQq46cMQI/AAAAAAAAfKs/HC7ROO-uYxs8UhezKwQ7KcKRAKRU64e1QCLcBGAs/s1600/Audi%2BA5%2BSportback%2B%25283%2529.jpg',
    Fiesta: 'https://img.automexico.com/2019/02/12/WAgvsYYI/fiesta19-3dd8.jpg',
    Focus: 'https://www.diariomotor.com/imagenes/picscache/1440x655c/ford-focus-st-2019-5_1440x655c.jpg',
    Fusion: 'https://img.motoryracing.com/noticias/portada/25000/25800-n.jpg',
    Mustang: 'https://noticias.coches.com/wp-content/uploads/2019/01/ford-mustang-shelby-gt500-2019-60.jpg'
}

const serviceGarages = ['A++ Auto Services', "Gary's Garage", 'Super Service', 'iGarage', 'Best Service']

// Get data models
const  Car = require('../models/Car');
const  Owner = require('../models/Owner');
const  Serivce = require('../models/Service');

const generateOwnerData = ()=>{
    let ownerData = [];
    let i = 0;

    while(i < 50){
        const firstName = faker.fake('{{name.firstName}}');
        const lastName = faker.fake('{{name.lastName}}');
        const email = faker.fake(`${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`);

        const owner = {
            firstName,
            lastName,
            email
        }

        ownerData.push(owner);
        i++;
    }

    return ownerData;
}

const generateCarData = ownersIds=>{
    let carData = [];
    let i = 0;
    while(i < 1000){
        const owner_id = faker.random.arrayElement(ownersIds);
        const carObject = faker.random.arrayElement(cars);
        const title = faker.random.arrayElement(carObject.models);
        const price = faker.random.number({min: 5000, max: 30000});
        const age = faker.random.number({min: 2, max: 10});
        const imageUrl = imageUrls[carObject.models];
        const car = {
            owner_id,
            brand: carObject.name,
            title,
            price,
            imageUrl,
            age
        }

        carData.push(car);
        i++
    }
    return carData;
}

const generateServiceData = carsIds => {
    let serviceData = [];
    let i = 0;

    while(i < 5000){
        const car_id = faker.random.arrayElement(carsIds);
        const name = faker.random.arrayElement(serviceGarages);
        const date = faker.fake('{{date.past}}')
   
        const service = {
            car_id,
            name,
            date
        }

        serviceData.push(service);
        i++;
    }

    return serviceData;
}

fastify.ready().then( 
    async ()=> {
        try {
            const owners = await Owner.insertMany(generateOwnerData());
            const ownersIds = owners.map(x => x._id);

            const cars = await Car.insertMany(generateCarData(ownersIds));
            const carsIds = cars.map(x => x._id);

            const services = await Serivce.insertMany(generateServiceData(carsIds));

            console.log(`
                - ${owners.length} owners added.
                - ${cars.length} cars added.
                - ${services.length} services added.
            `)
            
        } catch (error) {
            throw boom.boomify(error);
        }
        process.exit();
    }, err => {
       console.log(`An error in seed.js`, err)
       process.exit();
    })