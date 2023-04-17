const ORMConfig = {
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(ORMConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      synchronize: true,
    });

    break;
  case 'test':
    Object.assign(ORMConfig, {
      type: 'sqlite',
      database: 'testDb.sqlite',
      entities: ['**/*.entity.ts'],
      synchronize: true,
      migrationsRun: true,
    });

    break;
  case 'production':
    Object.assign(ORMConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });

  default:
    throw new Error('No database configuration found for NODE_ENV');
}

module.exports = ORMConfig;
