/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
// eslint-disable-next-line max-classes-per-file

export const BadRequestError = (error: string) => {
  console.log(error);
  return {
    error,
    success: false,
    data: null,
  };
};

export const ResourceNotFoundError = (errors: { message: any }) => {
  console.log(errors);
  return {
    error: errors.message,
    success: false,
    data: null,
  };
};
