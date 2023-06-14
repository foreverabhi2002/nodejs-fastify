const routes = async (fastify, options) => {
  const db = fastify.mongo.client.db("test");
  const collection = db.collection("tests");
  fastify.get("/", async (request, response) => {
    console.log(request.query);
    const result = await collection.find().toArray();
    console.log("collection", collection);
    response.send(result);
  });

  // http://127.0.0.1:3000/animal/cat
  fastify.get("/animal/:data", async (request, response) => {
    const result = await collection.findOne({ animal: request.params.data });
    console.log("collection", collection);
    response.send(result);
  });

  // http://127.0.0.1:3000/animals?data=cat
  fastify.get("/animals", async (request, response) => {
    const result = await collection
      .find({ animal: request.query.data })
      .toArray();
    console.log("collection", collection);
    response.send(result);
  });

  fastify.route({
    method: "GET",
    url: "/test",
    handler: async (req, res) => {
      console.log("dataaaaaaaa");
      res.send("result");
    },
  });

  const animalBodyJsonSchema = {
    type: "object",
    required: ["animal"],
    properties: {
      animal: { type: "string" },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post("/addAnimal", { schema }, async (req, res) => {
    const result = await collection.insertOne({
      animal: "pig"
    });
    return result;
  });
};

module.exports = routes;
