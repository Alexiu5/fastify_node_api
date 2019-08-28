"use-strict"
const fastify = require('./src/server');
const routes = require('./src/routes/routes');
const swagger = require('./src/config/swagger');

require('dotenv').config();
const port = process.env.PORT;


// Register routes
routes.forEach((route) => {
    fastify.route(route);
})    

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

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