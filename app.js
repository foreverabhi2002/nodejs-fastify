const fastify = require('fastify')({
    logger: true
})

// const dbConnector = require('./our-db-connector')
const firstRoute = require('./our-first-route')

// fastify.get('/', (request, response) => {
//     response.send({ hello: 'world' })
// })

// fastify.register(dbConnector)



fastify.register(require('@fastify/mongodb'), {
  url: 'mongodb+srv://foreverabhi2002:abhi2002@cluster0.7tnrkxt.mongodb.net/?retryWrites=true&w=majority/test'
})
    
    
// dbConnector();
fastify.register(firstRoute)

const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()