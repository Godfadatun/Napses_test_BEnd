// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'ec2-3-225-41-234.compute-1.amazonaws.com',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'whqhehaijnonmw',
  password: process.env.DB_PASSWORD || 'deabbc9af6de13de77a1c21f487065f9b86fc9ddc563591fb3b71de570201f32',
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
    // ssl: { rejectUnauthorized: false },
  },
};
