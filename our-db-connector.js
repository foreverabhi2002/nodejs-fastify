const fastifyPlugin = require("fastify-plugin").default;

async function dbConnector(fastify, options) {
  fastify.register(require("@fastify/mongodb"), {
    url: "mongodb+srv://foreverabhi2002:abhi2002@cluster0.7tnrkxt.mongodb.net/?retryWrites=true&w=majority",
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector);
