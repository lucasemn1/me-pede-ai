if (!process.env.NODE_ENV) {
  const dotenv = require("dotenv");
  const path = require("path");
  dotenv.config({ path: path.resolve(__dirname, ".env") });
}

const databaseConfig = {
  test: {
    type: "mysql",
    // host: process.env.HOST,
    // port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/app/entity/**/*.ts"],
    migrations: ["src/database/migration/**/*.ts"],
    subscribers: ["src/app/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/app/entity",
      migrationsDir: "src/database/migration",
      subscribersDir: "src/app/subscriber",
    },
  },

  development: {
    type: "mysql",
    // host: process.env.HOST,
    // port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/app/entity/**/*.ts"],
    migrations: ["src/database/migration/**/*.ts"],
    subscribers: ["src/app/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/app/entity",
      migrationsDir: "src/database/migration",
      subscribersDir: "src/app/subscriber",
    },
  },

  production: {
    type: "mysql",
    // host: process.env.HOST,
    // port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["build/app/entity/**/*.js"],
    migrations: ["build/database/migration/**/*.js"],
    subscribers: ["build/app/subscriber/**/*.js"],
    cli: {
      entitiesDir: "build/app/entity",
      migrationsDir: "build/database/migration",
      subscribersDir: "build/app/subscriber",
    },
  },
};

module.exports = databaseConfig[process.env.NODE_ENV];
