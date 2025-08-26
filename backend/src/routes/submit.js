const contactService = require('../services/contactService');

module.exports = async function (fastify, opts) {
  fastify.post('/submit', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1, maxLength: 100 },
          email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
          message: { type: 'string', minLength: 1, maxLength: 1000 }
        },
        required: ['name', 'email', 'message'],
        additionalProperties: false
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            id: { type: 'integer' }
          },
          required: ['success']
        }
      }
    }
  }, async (request, reply) => {
    const { name, email, message } = request.body;
    try {
      const id = await contactService.saveContact({ name, email, message });
      return { success: true, id };
    } catch (err) {
      fastify.log.error(err);
      reply.code(500);
      return { success: false };
    }
  });

  // Útil para verificar lo guardado (no obligatorio en producción)
  fastify.get('/contacts', async (request, reply) => {
    try {
      const items = await contactService.listContacts();
      return items;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500);
      return { error: 'db_error' };
    }
  });
};
