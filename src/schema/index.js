// External imports
const graphql = require('graphql');

// Local imports
const ownerSchema = require('./owner');
const carSchema = require('./car');
const serviceSchema = require('./service');

const {
    GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql


// Import Controllers
const carController = require('../controller/Car');
const ownerController = require('../controller/Owner');
const serviceController = require('../controller/Services');



// Define root query

const RootQuery = new GraphQLObjectType({
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
                return await ownerController.getSingleOwner(args)
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

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addCar: {
            type: carSchema.carType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: GraphQLString},
                age: {type: GraphQLInt},
                owner_id: {type: GraphQLID}
            },
            async resolve(args){
                const response = await carController.addNewCar(args)
                return response;
            }
        },
        editCar:{
            type: carSchema.carType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                owner_id: {type: GraphQLID}
            },
            async resolve(args){
                const response = await carController.updateCar(args)
                return response;
            }
        },
        deleteCar: {
            type: carSchema.carType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(args){
                const response = await carController.deleteCar(args)
                return response;
            }
        }
    }
})

// Export schema
module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutation: Mutations
})