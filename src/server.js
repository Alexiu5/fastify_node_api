const fastify = require('fastify')({logger: true});

// Require external modules
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/mycargarage', {useNewUrlParser: true})
    .then(()=> console.log('Mongodb connected....'))
    .catch(err => console.error(err));


module.exports = fastify