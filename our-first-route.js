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
    required: ["animal", "working"],
    properties: {
      animal: { type: "string" },
      working: { type: "string" },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post("/", { schema }, async (req, res) => {
    const result = await collection.insertOne({
      animal: req.body.animal,
      working: req.body.working,
    });
    return result;
  });

  fastify.put("/animal/:id", async (req, res) => {
    const id = req.params.id;
    const result = await collection.updateOne(
      {
        _id: new fastify.mongo.ObjectId(id),
      },
      { $set: req.body }
    );
    res.send({ result });
  });

  fastify.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await collection.deleteOne({
      _id: new fastify.mongo.ObjectId(id),
    });
    console.log("collection", collection);
    res.send({ result });
  });
};

module.exports = routes;
