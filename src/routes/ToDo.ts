import { RequestHandler } from 'express';
import { completeTodo, createTodo, getTodo } from '../controllers/toDo';
import logger from '../utils/logger';

export const createTodoRoute: RequestHandler = async (req, res) => {
  try {
    const { text, description } = req.body;

    const response = await createTodo({ text, description });
    const responseCode = response.success === true ? 200 : 400;
    return res.status(responseCode).json(response);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch Data' });
  }
};

export const getTodoRoute: RequestHandler = async (req, res) => {
  try {
    const { completed } = req.query as { completed: 'completed' | 'in_progress' | 'all' };
    const response = await getTodo(completed);
    const responseCode = response.success === true ? 200 : 400;
    return res.status(responseCode).json(response);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch Data.' });
  }
};

export const completeTodoRoute: RequestHandler = async (req, res) => {
  try {
    console.log({ id: req.params.id });

    const response = await completeTodo(Number(req.params.id));
    const responseCode = response.success === true ? 200 : 400;
    return res.status(responseCode).json(response);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch Data.' });
  }
};
