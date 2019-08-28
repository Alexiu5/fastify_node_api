"use-strict"
const fastify = require('fastify')({logger: true});
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
const swagger = require('./src/config/swagger');

require('dotenv').config();
const port = process.env.PORT;

mongoose.connect('mongodb://localhost/mycargarage', {useNewUrlParser: true})
    .then(()=> console.log('Mongodb connected....'))
    .catch(err => console.error(err));

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