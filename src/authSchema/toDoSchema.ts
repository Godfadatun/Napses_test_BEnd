/* eslint-disable max-classes-per-file */
import joi from 'joi';

export const createToDoSchema = joi.object().keys({
  text: joi.string().required(),
  description: joi.string().max(500).required(),
});

export const getToDoSchema = joi.object().keys({
  completed: joi.string().valid('completed', 'in_progress', 'all').required(),
});

export const completeToDoSchema = joi.object().keys({
  id: joi.number().required(),
});
