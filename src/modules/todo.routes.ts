import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createTodoSchema } from './todo.schema';
import { createTodoHandler } from './todos.controller';

export function todoRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.post(
    '/',
    {
      schema: createTodoSchema,
    },
    createTodoHandler
  );

  done();
}
