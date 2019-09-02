const boom = require('@hapi/boom');

const fastify = require('../server');
exports.defineAuth = function(){
    fastify.addHook('onRequest', async(request, reply, done)=>{
        try {
            if(verifyUrlRequest(request)){
               return done();
            } 

            const token = request.headers.authorization;
            const result = await request.jwtVerify(token, handleToken); 
        } catch (error) {
           throw boom.boomify(error)
        }
        done();
    })
}


/**
 * This method valid the url that not need an token auth
 * @param {*} request 
 * @returns boolean
 */
function verifyUrlRequest(request){
    const {originalUrl, method} = request.req;
    if(originalUrl === '/login' && method === 'GET'){
        return true;
    }

    return false;
}


/**
 * This function handles the jwtVerify Callback for easiest management of data
 * @param {*} err 
 * @param {*} payload 
 */
function handleToken(err, payload){
    if(err){
        throw boom.boomify(err)
    }
    return payload;
}