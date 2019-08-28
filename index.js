"use-strict"
const fastify = require('fastify')({logger: true});
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');

require('dotenv').config();
const port = process.env.PORT;

mongoose.connect('mongodb://localhost/mycargarage', {useNewUrlParser: true})
    .then(()=> console.log('Mongodb connected....'))
    .catch(err => console.error(err));

    
// fastify.get('/', async (request, reply)=>{
//     reply.send({hello: 'Welcome to fastify server'})
// })

routes.forEach((route,index) => {
    fastify.route(route);
})    


const startServer = async () => {
    try {
        await fastify.listen(port);
        fastify.log.info(`server is listening on ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error);
        process.exit(1)
    }
}

startServer();