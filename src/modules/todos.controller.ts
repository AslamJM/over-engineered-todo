import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../utils/logger';
import { CreateTodoBody } from './todo.schema';
import { createTodo } from './todos.service';

export async function createTodoHandler(
  request: FastifyRequest<{
    Body: CreateTodoBody;
  }>,
  reply: FastifyReply
) {
  try {
    const input = request.body;
    const todo = await createTodo(input);
    return reply.code(201).send(todo);
  } catch (error) {
    logger.error(error, 'createTodoHandler: Error creating todo');
    return reply.code(400).send({ message: 'Error creating todo' });
  }
}
