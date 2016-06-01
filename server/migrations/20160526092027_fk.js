exports.up = function (knex, Promise) {

    return Promise.all([

        //Golden
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
            table.primary(['department_id', 'prefix_id']);
        }),

        //pink
        knex.schema.createTable('term', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
        }),

        knex.schema.createTable('holiday', function (table) {
            table.increments('id').primary();
            table.integer('term_id')
                .references('id')
                .inTable('term');
            table.string('title');
            table.date('start_date');
            table.date('stop_date');
        }),

        knex.schema.createTable('weekday', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTable('section_weekday', function (table) {
            table.increments('id').primary();
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('weekday_id')
                .references('id')
                .inTable('weekday');
            table.time('start_time').notNullable();
            table.time('stop_time').notNullable();
        }),

        knex.schema.createTable('offering_weekday', function (table) {
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
            table.integer('weekday_id')
                .references('id')
                .inTable('weekday');
            table.primary(['offering_id', 'weekday_id']);
        }),

        //Blue
        knex.schema.createTable('course', function (table) {
            table.increments('id').primary();
            table.string('number').notNullable();
            table.string('title');
            table.boolean('hidden').notNullable().defaultTo(false);
            table.integer('prefix_id')
                .references('id')
                .inTable('prefix');
            table.integer('department_id')
                .references('id')
                .inTable('department');
        }),

        knex.schema.createTable('offering', function (table) {
            table.increments('id').primary();
            table.integer('course_id')
                .references('id')
                .inTable('course');
            table.integer('term_id')
                .references('id')
                .inTable('term');
        }),

        knex.schema.createTable('section', function (table) {
            table.increments('id').primary();
            table.string('reg_number').notNullable();
            table.string('title');
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
        }),

        knex.schema.createTable('planned_class', function (table) {
            table.increments('id').primary();
            table.date('date').notNullable();
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
            table.text('reflection');
        }),

        knex.schema.createTable('actual_class', function (table) {
            table.increments('id').primary();
            table.integer('sequence');
            table.date('date').notNullable();
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.text('reflection');
        }),

        //orange
        knex.schema.createTable('person', function (table) {
            table.increments('id').primary();
            table.string('first_name');
            table.string('last_name');
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('office_phone');
            table.string('mobile_phone')
        }),

        knex.schema.createTable('role', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description');
        }),

        knex.schema.createTable('person_role', function (table) {
            table.integer('person_id')
                .references('id')
                .inTable('person');
            table.integer('role_id')
                .references('id')
                .inTable('role');
            table.primary(['person_id', 'role_id']);
        }),

        knex.schema.createTable('instructor', function (table) {
            table.increments('id').primary();
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('person_id')
                .references('id')
                .inTable('person');
        }),
        knex.schema.createTable('teaching_assistant', function (table) {
            table.increments('id').primary();
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('person_id')
                .references('id')
                .inTable('person');
        }),

        knex.schema.createTable('student', function (table) {
            table.increments('id').primary();
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('person_id')
                .references('id')
                .inTable('person');
        }),

        knex.schema.createTable('attendance', function (table) {
            table.increments('id').primary();
            table.integer('student_id')
                .references('id')
                .inTable('student');
            table.integer('actual_class_id')
                .references('id')
                .inTable('actual_class');
        })
    ])

};

exports.down = function (knex, Promise) {
    return Promise.all([
    //fk tables
        knex.schema.dropTable('department_prefix'),
        knex.schema.dropTable('offering_weekday'),
        knex.schema.dropTable('section_weekday'),
        knex.schema.dropTable('attendance'),
        knex.schema.dropTable('student'),
        knex.schema.dropTable('instructor'),
        knex.schema.dropTable('teaching_assistant'),
        knex.schema.dropTable('person_role'),
        knex.schema.dropTable('offering'),
        knex.schema.dropTable('actual_class'),
        knex.schema.dropTable('planned_class'),
        knex.schema.dropTable('section'),
        knex.schema.dropTable('course'),

    //tables without fk
        knex.schema.dropTable('department'),
        knex.schema.dropTable('prefix'),
        knex.schema.dropTable('term'),
        knex.schema.dropTable('role'),
        knex.schema.dropTable('weekday'),
        knex.schema.dropTable('holiday'),
        knex.schema.dropTable('person')
    ]);
};
