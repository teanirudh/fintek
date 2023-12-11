/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: join(baseUrl, "/data/dev.sqlite3"),
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: join(baseUrl, "/data/prod.sqlite3"),
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
