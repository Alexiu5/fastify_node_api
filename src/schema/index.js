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
    fields: ()=> ({})
})

const ownerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({})
})


const serviceType = new GraphQLObjectType({
    name: 'Service',
    fields: () => ({})
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