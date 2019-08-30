// External imports
const graphql = require('graphql');
const {
    GraphQLSchema,
} = graphql


// Import Controllers
const carController = require('../controller/Car');
const ownerController = require('../controller/Owner');
const serviceController = require('../controller/Services');



// Define root query
const RootQuery = require('./root-query')

const Mutations = require('./mutations')

// Export schema
module.exports = new GraphQLSchema({
    query: RootQuery.rootQuery, 
    mutation: Mutations.mutations
})