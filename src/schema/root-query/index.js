// Internal imports
const carSchema = require('../types/car')
const ownerSchema = require('../types/owner')
const serviceSchema = require('../types/service')

// Import Controllers
const carController = require('../../controller/Car');
const ownerController = require('../../controller/Owner');
const serviceController = require('../../controller/Services');

// External imports
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLList,
} = graphql

exports.rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {
            type: carSchema.carType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await carController.getSingleCar({args})
            }
        },
        cars: {
            type: new GraphQLList(carSchema.carType),
            async resolve(parent, args){
                return await carController.getCars()
            }
        },
        owner: {
            type: ownerSchema.ownerType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                console.log('hi')
                return await ownerController.getSingleOwner(args)
            }
        },
        owners: {
            type: ownerSchema.ownerType,
            async resolve(parent,args){
                return await ownerController.getOwner();
            }
        },
        service: {
            type: serviceSchema.serviceType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await serviceController.getSingleService(args)
            }
        }
    }
})