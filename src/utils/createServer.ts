import fastify from 'fastify';
import { todoRoutes } from '../modules/todo.routes';
import swagger from '@fastify/swagger';
import { version } from '../../package.json';

export async function createServer() {
  const app = fastify();
  app.register(todoRoutes, { prefix: '/api/todos' });
  app.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      tags: [{ name: 'todo' }],
      info: {
        title: 'Todo',
        description: 'A simple todo app',
        version,
      },
    },
    staticCSP: true,
    exposeRoute: true,
  });

  return app;
}
