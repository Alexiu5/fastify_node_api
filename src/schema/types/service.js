const graphql = require('graphql');
const carSchema = require('./car')

const {
    GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

exports.serviceType = new GraphQLObjectType({
    name: 'Service',
    fields: () => ({
        _id: {type: GraphQLID},
        car_id: {type: GraphQLID},
        name: {type: GraphQLString},
        date: {type: GraphQLString},
        car: {
            type: carSchema.carType,
            async resolve(parent, args){
                return await carController.getSingleCar({id: parent.car_id})
            }
        }
    })
})
