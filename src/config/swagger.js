exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: "Fastify API",
            description: "Node rest api with Mongo db",
            version: "1.0.0"
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "find more info here"
        },
        host: "localhost",
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
}