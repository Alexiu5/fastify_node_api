const graphql = require('graphql');

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

// Define Object Types
const carType = new GraphQLObjectType({
    name: 'Car',
    fields: ()=> ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        brand: {type: GraphQLString},
        price: {type: GraphQLString},
        age: {type: GraphQLInt},
        owner_id: {type: GraphQLID},
        owner: {
            type: ownerType,
            async resolve(parent, args){
                return await ownerController.getSingleOwner({id: parent.owner._id})
            }
        },
        services: {
            type: serviceType,
            async resolve(parent, args){
                return await serviceController.getCarsService({id: parent._id})
            }
        }
    })
})

const ownerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        _id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        cars: {
            type: new GraphQLList(carType),
            async resolve(parent, args){
                return await ownerController.getOwnersCars({id: parent._id})
            }
        }
    })
})


const serviceType = new GraphQLObjectType({
    name: 'Service',
    fields: () => ({
        _id: {type: GraphQLID},
        car_id: {type: GraphQLID},
        name: {type: GraphQLString},
        date: {type: GraphQLString},
        car: {
            type: carType,
            async resolve(parent, args){
                return await carController.getSingleCar({id: parent.car_id})
            }
        }
    })
})


// Define root query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {},
        cars: {},
        owner: {},
        service: {}
    }
})

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addCar: {
            type: carType,
            args: {},
            async resolve(args){
                return ''
            }
        },
        editCar:{
            type: carType,
            args: {},
            async resolve(args){
                return ''
            }
        },
        deleteCar: {
            type: carType,
            args: {},
            async resolve(args){
                return ''
            }
        }
    }
})

// Export schema
module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutation: Mutations
})