exports.up = function (knex, Promise) {

    return Promise.all([

        //Golden
        knex.schema.createTableIfNotExists('prefix', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTableIfNotExists('department', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTableIfNotExists('department_prefix', function (table) {
            table.integer('department_id')
                .references('id')
                .inTable('department');
            table.integer('prefix_id')
                .references('id')
                .inTable('prefix');
            table.primary(['department_id', 'prefix_id']);
        }),

        //pink
        knex.schema.createTableIfNotExists('term', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
        }),

        knex.schema.createTableIfNotExists('holiday', function (table) {
            table.increments('id').primary();
            table.integer('term_id')
                .references('id')
                .inTable('term');
            table.string('title');
            table.date('start_date');
            table.date('stop_date');
        }),

        knex.schema.createTableIfNotExists('weekday', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTableIfNotExists('section_weekday', function (table) {
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('weekday_id')
                .references('id')
                .inTable('weekday');
            table.time('start_time').notNullable();
            table.time('stop_time').notNullable();
            table.primary(['section_id', 'weekday_id']);
        }),

        knex.schema.createTableIfNotExists('offering_weekday', function (table) {
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
            table.integer('weekday_id')
                .references('id')
                .inTable('weekday');
            table.primary(['offering_id', 'weekday_id']);
        }),

        //Blue
        knex.schema.createTableIfNotExists('course', function (table) {
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

        knex.schema.createTableIfNotExists('offering', function (table) {
            table.increments('id').primary();
            table.integer('course_id')
                .references('id')
                .inTable('course');
            table.integer('term_id')
                .references('id')
                .inTable('term');
        }),

        knex.schema.createTableIfNotExists('section', function (table) {
            table.increments('id').primary();
            table.string('reg_number').notNullable();
            table.string('title');
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
        }),

        //red
        knex.schema.createTableIfNotExists('planned_class', function (table) {
            table.increments('id').primary();
            table.date('date').notNullable();
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
        }),

        knex.schema.createTableIfNotExists('topic', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
        }),


        knex.schema.createTableIfNotExists('activity', function (table) {
            table.increments('id').primary();
            table.integer('sequence').notNullable();
            table.text('description');
            table.boolean('in_class').notNullable();
            table.integer('duration').notNullable();
            table.json('details');
            table.integer('topic_id')
                .references('id')
                .inTable('topic');
        }),

        knex.schema.createTableIfNotExists('planned_activity', function (table) {
            table.integer('class_id')
                .references('id')
                .inTable('planned_class');
            table.integer('activity_id')
                .references('id')
                .inTable('activity');
            table.primary(['class_id', 'activity_id']);
        }),

        //green
        knex.schema.createTableIfNotExists('knowledge_area', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
        }),

        knex.schema.createTableIfNotExists('learning_outcome', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.integer('knowledge_area_id')
                .references('id')
                .inTable('knowledge_area');
        }),

         knex.schema.createTableIfNotExists('offering_outcome', function (table) {
            table.increments('id').primary();
            table.text('discussion');
            table.integer('learning_outcome_id')
                .references('id')
                .inTable('learning_outcome');
            table.integer('offering_id')
                .references('id')
                .inTable('offering');
        }),

        knex.schema.createTableIfNotExists('intended_outcome', function (table) {
            table.integer('offering_outcome_id')
                .references('id')
                .inTable('offering_outcome');
            table.integer('activity_id')
                .references('id')
                .inTable('activity');
            table.text('discussion');
            table.primary(['offering_outcome_id', 'activity_id']);
        }),

        //purple
        knex.schema.createTableIfNotExists('actual_class', function (table) {
            table.increments('id').primary();
            table.dateTime('start_time').notNullable();
            table.dateTime('stop_time')
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.text('reflection');
        }),

        knex.schema.createTableIfNotExists('current_class', function (table) {
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('actual_class_id')
                .references('id')
                .inTable('actual_class');
            table.primary(['section_id', 'actual_class_id']);
        }),

        knex.schema.createTableIfNotExists('actual_activity', function (table) {
            table.increments('id').primary();
            table.dateTime('start_time');
            table.dateTime('stop_time');
            table.boolean('complete').defaultTo(false);
            table.integer('actual_class_id')
                .references('id')
                .inTable('actual_class');
            table.integer('activity_id')
                .references('id')
                .inTable('activity');
            table.text('reflection');
        }),

        knex.schema.createTableIfNotExists('attendance', function (table) {
            table.increments('id').primary();
            table.dateTime('signed_in').notNullable();
            table.dateTime('signed_out');
            table.integer('student_id')
                .references('id')
                .inTable('user');
            table.integer('actual_class_id')
                .references('id')
                .inTable('actual_class');
        }),

        //Teal
        knex.schema.createTableIfNotExists('submission', function (table) {
            table.increments('id').primary();
            table.json('details');
            table.text('discussion');
            table.integer('submitted_by')
                .references('id')
                .inTable('user');
            table.integer('actual_activity_id')
                .references('id')
                .inTable('actual_activity');
        }),

        knex.schema.createTableIfNotExists('attachment', function (table) {
            table.increments('id').primary();
            table.string('path').notNullable();
            table.integer('submission_id')
                .references('id')
                .inTable('submission');
        }),

        //orange
        knex.schema.createTableIfNotExists('user', function (table) {
            table.increments('id').primary();
            table.string('first_name');
            table.string('last_name');
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('office_phone');
            table.string('mobile_phone')
        }),

        knex.schema.createTableIfNotExists('role', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
        }),

        knex.schema.createTableIfNotExists('permission', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
        }),

        knex.schema.createTableIfNotExists('member', function (table) {
            table.integer('section_id')
                .references('id')
                .inTable('section');
            table.integer('user_id')
                .references('id')
                .inTable('user');
            table.primary(['user_id', 'section_id']);
        }),

        knex.schema.createTableIfNotExists('user_permission', function (table) {
            table.integer('user_id')
                .references('id')
                .inTable('user');
            table.integer('role_id')
                .references('id')
                .inTable('role');
            table.primary(['user_id', 'role_id']);
        }),

        knex.schema.createTableIfNotExists('member_role', function (table) {
            table.integer('role_id')
                .references('id')
                .inTable('role');
            table.integer('member_section_id')
                .references('section_id')
                .inTable('member');
            table.integer('member_user_id')
                .references('user_id')
                .inTable('member');
            table.primary(['role_id', 'member_section_id', 'member_user_id']);
        }),
    ])

};

exports.down = function (knex, Promise) {
    return Promise.all([
        //fk tables
        knex.schema.dropTableIfExists('department_prefix'),
        knex.schema.dropTableIfExists('offering_weekday'),
        knex.schema.dropTableIfExists('section_weekday'),
        knex.schema.dropTableIfExists('attendance'),
        knex.schema.dropTableIfExists('current_class'),
        knex.schema.dropTableIfExists('member_role'),
        knex.schema.dropTableIfExists('member'),
        knex.schema.dropTableIfExists('user_permission'),
        knex.schema.dropTableIfExists('attachment'),
        knex.schema.dropTableIfExists('submission'),
        knex.schema.dropTableIfExists('actual_class'),
        knex.schema.dropTableIfExists('actual_activity'),
        knex.schema.dropTableIfExists('activity'),
        knex.schema.dropTableIfExists('intended_outcome'),
        knex.schema.dropTableIfExists('offering_outcome'),
        knex.schema.dropTableIfExists('learning_outcome'),
        knex.schema.dropTableIfExists('planned_class'),
        knex.schema.dropTableIfExists('topic'),
        knex.schema.dropTableIfExists('section'),
        knex.schema.dropTableIfExists('offering'),
        knex.schema.dropTableIfExists('course'),

        //tables without fk
        knex.schema.dropTableIfExists('department'),
        knex.schema.dropTableIfExists('prefix'),
        knex.schema.dropTableIfExists('knowledge_area'),
        knex.schema.dropTableIfExists('term'),
        knex.schema.dropTableIfExists('role'),
        knex.schema.dropTableIfExists('permission'),
        knex.schema.dropTableIfExists('weekday'),
        knex.schema.dropTableIfExists('holiday'),
        knex.schema.dropTableIfExists('user')
    ]);
};
