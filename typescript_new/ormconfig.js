if (!process.env.NODE_ENV) {
  const dotenv = require("dotenv");
  const path = require("path");
  dotenv.config({ path: path.resolve(__dirname, ".env") });
}

const databaseConfig = {
  test: {
    type: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TESTS_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["app/models/**/*.ts"],
    migrations: ["database/migration/**/*.ts"],
    subscribers: ["app/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "app/models",
      migrationsDir: "database/migration",
      subscribersDir: "app/subscriber",
    },
  },

  development: {
    type: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["app/models/**/*.ts"],
    migrations: ["database/migration/**/*.ts"],
    subscribers: ["app/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "app/models",
      migrationsDir: "database/migration",
      subscribersDir: "app/subscriber",
    },
  },

  production: {
    type: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["build/app/models/**/*.js"],
    migrations: ["build/database/migration/**/*.js"],
    subscribers: ["build/app/subscriber/**/*.js"],
    cli: {
      entitiesDir: "build/app/models",
      migrationsDir: "build/database/migration",
      subscribersDir: "build/app/subscriber",
    },
  },
};

module.exports = databaseConfig[process.env.NODE_ENV];
