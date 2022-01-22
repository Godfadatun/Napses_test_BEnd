import { completeToDoSchema, createToDoSchema, getToDoSchema } from '../authSchema/toDoSchema';
import { theResponse } from '../utils/interface';
import { ResourceNotFoundError } from '../utils/errors';
import { getQueryRunner } from '../database/helpers/db';
import { Todo } from '../database/models/ToDo';
import logger from '../utils/logger';
import { completeToDoDTO, createToDoDTO } from '../dto/toDoDTO';

export const createTodo = async (data: createToDoDTO): Promise<theResponse> => {
  const validation = createToDoSchema.validate(data);
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    const aToDo = await queryRunner.manager.save(Todo, {
      title: String(data.text),
      description: data.description,
      created_at: new Date(),
    });

    return {
      success: true,
      message: 'ToDo added successfully',
      data: aToDo,
    };
  } catch (e) {
    await queryRunner.rollbackTransaction();
    return {
      success: false,
      message: 'Creating ToDo failed, kindly try again',
    };
  } finally {
    await queryRunner.release();
  }
};

export const completeTodo = async (id: number): Promise<theResponse> => {
  const validation = completeToDoSchema.validate({ id });
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    const aToDo = await queryRunner.manager.findOne(Todo, { id });
    if (!aToDo)
      return {
        success: false,
        message: 'ToDo not found, kindly try again',
      };
    if (!aToDo.status) await queryRunner.manager.update(Todo, { id }, { status: true, updated_at: new Date() });
    else await queryRunner.manager.update(Todo, { id }, { status: false, updated_at: new Date() });

    return {
      success: true,
      message: `ToDo ${!aToDo.status ? 'completed successfully' : 'back to in progress'}`,
    };
  } catch (e) {
    await queryRunner.rollbackTransaction();
    return {
      success: false,
      message: 'Creating ToDo failed, kindly try again',
    };
  } finally {
    await queryRunner.release();
  }
};

export const getTodo = async (completed: 'completed' | 'in_progress' | 'all'): Promise<theResponse> => {
  const validation = getToDoSchema.validate({ completed });
  if (validation.error) return ResourceNotFoundError(validation.error);

  const queryRunner = await getQueryRunner();
  try {
    let myToDos;
    if (completed === 'all') myToDos = await queryRunner.manager.find(Todo);
    if (completed !== 'all')
      myToDos = await queryRunner.manager.find(Todo, {
        where: {
          ...(completed === 'completed' && { status: true }),
          ...(completed === 'in_progress' && { status: false }),
        },
        order: { id: 'DESC' },
      });
    if (!myToDos)
      return {
        success: false,
        message: `No ToDo's Created`,
      };

    return {
      success: true,
      message: `ToDo's gotten successfully`,
      data: myToDos,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: `Getting ToDo's failed, kindly try again`,
    };
  } finally {
    await queryRunner.release();
  }
};
