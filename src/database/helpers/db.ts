import { getConnection, QueryRunner } from 'typeorm';

export const getQueryRunner = async (): Promise<QueryRunner> => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  return queryRunner;
};
