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
                return await ownerController.getSingleOwner({id: parent.owner_id})
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
        car: {
            type: carType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await carController.getSingleCar({args})
            }
        },
        cars: {
            type: new GraphQLList(carType),
            async resolve(parent, args){
                return await carController.getCars()
            }
        },
        owner: {
            type: ownerType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await ownerController.getSingleOwner(args)
            }
        },
        service: {
            type: serviceType,
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
            type: carType,
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
            type: carType,
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
            type: carType,
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