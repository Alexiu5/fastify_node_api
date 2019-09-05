"use-strict"
const gql = require('fastify-gql');
const helmet = require('fastify-helmet');
const jwt = require('fastify-jwt');
const cors = require('fastify-cors');

const fastify = require('./src/server');
const routes = require('./src/routes/routes');
const swagger = require('./src/config/swagger');

require('dotenv').config();

// Require GraphQL Schema
const schema = require('./src/schema')

// Define port via process enviroment
const port = process.env.PORT;

// Register helmet
fastify.register(helmet, {});

// Register cors
fastify.register(cors, { 
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PUT'],
})

// Register Fastify GraphQL
fastify.register(gql,{
    schema,
    graphiql: true
})

// Register fastify jwt 
fastify.register(jwt, {
    secret: 'alexsecretkey',
    decode: { complete: true },
})

// Register routes
routes.forEach((route) => {
    fastify.route(route);
})  

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

fastify.get('/', async function (req, reply) {
    const query = `{
        cars {
          _id
          title
          price
        }
      }`
    return reply.graphql(query)
})

// Defining servers
const startServer = async () => {
    try {
        await fastify.listen(port);
        fastify.swagger();
        fastify.log.info(`server is listening on ${fastify.server.address().port}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1)
    }
}

startServer();
