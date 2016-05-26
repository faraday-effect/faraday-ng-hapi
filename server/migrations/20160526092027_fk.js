exports.up = function (knex, Promise) {

    return Promise.all([

        knex.schema.createTable('prefix', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTable('department', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTable('department_prefix', function (table) {
            table.integer('department_id')
                .references('id')
                .inTable('department');
            table.integer('prefix_id')
                .references('id')
                .inTable('prefix');
        }),

        knex.schema.createTable('course', function (table) {
            table.increments('id').primary();
            table.string('number').notNullable();
            table.string('title');
            table.boolean('active').notNullable().defaultTo(false);
            table.integer('prefix_id')
                .references('id')
                .inTable('prefix');
            table.integer('department_id')
                .references('id')
                .inTable('department');
        }),

        knex.schema.createTable('term', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
        }),

        knex.schema.createTable('section', function (table) {
            table.increments('id').primary();
            table.string('reg_number').notNullable();
            table.string('title');
            table.integer('course_id')
                .references('id')
                .inTable('course');
            table.integer('term_id')
                .references('id')
                .inTable('term');
        })
    ])

};

exports.down = function (knex, Promise) {

};
