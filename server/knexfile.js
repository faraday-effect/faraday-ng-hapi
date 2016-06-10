// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: {
            database: 'faraday',
            user: 'faraday',
            password: 'pass'
        },
        seeds: {
            directory: './seeds/'
        },
        debug: true,
        pool: {
            min: 0,
            max: 1
        }
    },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
