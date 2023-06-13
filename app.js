const fastify = require('fastify')({
    logger: true
})

const fastifyMongodb = require("@fastify/mongodb");
// const dbConnector = require('./our-db-connector')
const firstRoute = require("./our-first-route");

// fastify.register(dbConnector)

fastify.register(require("@fastify/mongodb"), {
  url: "mongodb+srv://foreverabhi2002:abhi2002@cluster0.7tnrkxt.mongodb.net/?retryWrites=true&w=majority",
});

fastify.get("/test", (request, response) => {
  const db = fastify.mongo.client.db("test");
  const collection = db.collection("tests");

  const result = collection.find().toArray();
  console.log("collection", collection);
  response.send(result);
});
    
    
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