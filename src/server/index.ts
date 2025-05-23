import Fastify from "fastify";
import api from "./api.js";

import controllers from "./controllers/index.js";

const fastify = Fastify({ logger: true });

fastify.get("/healthcheck", async (request, reply) => {
  return { status: "ok" };
});

fastify.register(api, { handlers: controllers });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
