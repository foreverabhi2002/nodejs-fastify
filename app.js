const fastify = require("fastify")({
  logger: true,
});


const dbConnector = require("./our-db-connector");
const firstRoute = require("./our-first-route");

fastify.register(dbConnector);
fastify.register(firstRoute);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
