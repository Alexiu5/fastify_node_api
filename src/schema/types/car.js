const ownerSchema = require('./owner');
const serviceSchema = require('./service')
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


exports.carType = new GraphQLObjectType({
    name: 'Car',
    fields: ()=> ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        brand: {type: GraphQLString},
        price: {type: GraphQLString},
        age: {type: GraphQLInt},
        owner_id: {type: GraphQLID},
        owner: {
            type: ownerSchema.ownerType,
            async resolve(parent, args){
                return await ownerController.getSingleOwner({id: parent.owner_id})
            }
        },
        services: {
            type: serviceSchema.serviceType,
            async resolve(parent, args){
                return await serviceController.getCarsService({id: parent._id})
            }
        }
    })
})