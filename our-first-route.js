
const routes = async (fastify, options) => {
    const db = fastify.mongo.client.db("test");
    const collection = db.collection("tests");
    fastify.get('/', async (request, response) => {
        const result = await collection.find().toArray();
        console.log("collection", collection);
        response.send(result);
    })
}

module.exports = routes