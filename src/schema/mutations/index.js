// Internal imports
const carSchema = require('../types/car')
const ownerSchema = require('../types/owner')
const serviceSchema = require('../types/service')

// External imports
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLNonNull
} = graphql

exports.mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addCar: {
            type: carSchema.carType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: GraphQLString},
                age: {type: GraphQLInt},
                imageUrl: {type: new GraphQLNonNull(GraphQLString)},
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
                imageUrl: {type: new GraphQLNonNull(GraphQLString)},
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