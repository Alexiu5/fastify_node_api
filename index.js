"use-strict"
const fastify = require('fastify')({logger: true});
require('dotenv').config();


fastify.get('/', (request, reply)=>{
    reply.send({hello: 'Welcome to fastify server'})
})

fastify.listen(process.env.PORT, (err)=>{
    if(err){
        fastify.log.error(err);
        process.exit(1)
    }

    console.log(`server is listening on ${fastify.server.address().port}`);
})