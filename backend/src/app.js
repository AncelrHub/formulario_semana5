const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const formbody = require('@fastify/formbody');

async function start() {
  await fastify.register(cors, { origin: true, methods: ['POST', 'GET', 'OPTIONS'] });
  await fastify.register(formbody);

  // Salud
  fastify.get('/health', async () => ({ status: 'ok' }));

  // Rutas
  fastify.register(require('./routes/submit'), { prefix: '/' });

  const port = process.env.PORT || 3000;
  const host = '0.0.0.0';
  try {
    await fastify.listen({ port, host });
    fastify.log.info(`Servidor en ${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
