import { nanoid } from 'nanoid';
import { CreateTodoBody } from './todo.schema';
import { Todo, TodoModel } from './todos.model';

const shortId = `todo_${nanoid()}`;

export function createTodo(input: CreateTodoBody): Promise<Todo> {
  return TodoModel.create({
    shortId,
    ...input,
  });
}
