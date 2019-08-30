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


exports.ownerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        _id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        cars: {
            type: new GraphQLList(carSchema.carType),
            async resolve(parent, args){
                return await ownerController.getOwnersCars({id: parent._id})
            }
        }
    })
})

