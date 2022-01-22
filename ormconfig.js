// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'ec2-3-225-41-234.compute-1.amazonaws.com',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'kaaqkmqweugugw',
  password: process.env.DB_PASSWORD || 'cf2b9801dac2b8d505464fcbbf0a1bc88b5b7c67bc28ec60c0d73387e05cf36e',
  database: process.env.DB_NAME || 'd99329qpfrralq',
  logging: false,
  entities: [join(__dirname, 'build/database/models/**/*.js')],
  migrations: [join(__dirname, 'build/database/migrations/**/*.js')],
  subscribers: [join(__dirname, 'build/database/subscriber/**/*.js')],
  cli: {
    entitiesDir: 'src/database/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscriber',
  },
  extra: {
    max: 25,
    connectionTimeoutMillis: 1000,
    ssl: { rejectUnauthorized: false },
  },
};
