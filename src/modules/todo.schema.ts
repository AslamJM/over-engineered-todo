import { Static, Type } from '@sinclair/typebox';

const todo = Type.Object({
  _id: Type.String(),
  title: Type.String(),
  shortId: Type.String(),
  completed: Type.Boolean(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const createTodoSchema = {
  tags: ['todo'],
  description: 'Creates a todo resource',
  body: Type.Object({
    title: Type.String({
      default: 'a default title',
    }),
  }),
  response: {
    201: todo,
  },
};

export type CreateTodoBody = Static<typeof createTodoSchema.body>;
