exports.up = function (knex, Promise) {

    return Promise.all([

        //orange - user
        knex.schema.createTableIfNotExists('user', function (table) {
            table.increments('id').primary();
            table.string('first_name');
            table.string('last_name');
            table.string('campus_id');
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

        knex.schema.createTableIfNotExists('relationship_type', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
        }),

        knex.schema.createTableIfNotExists('user_section', function (table) {
            table.integer('section_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('section');
            table.integer('relationship_type_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('relationship_type');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
            table.primary(['relationship_type_id', 'section_id', 'user_id']);
        }),

        knex.schema.createTableIfNotExists('user_offering', function (table) {
            table.integer('offering_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('offering');
            table.integer('relationship_type_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('relationship_type');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
            table.primary(['relationship_type_id', 'offering_id', 'user_id']);
        }),

        knex.schema.createTableIfNotExists('user_role', function (table) {
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
            table.integer('role_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('role');
            table.primary(['user_id', 'role_id']);
        }),

        //Golden - departments
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
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('department');
            table.integer('prefix_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('prefix');
            table.primary(['department_id', 'prefix_id']);
        }),

        knex.schema.createTableIfNotExists('department_member', function (table) {
            table.integer('department_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('department');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
            table.primary(['department_id', 'user_id']);
        }),

        knex.schema.createTableIfNotExists('department_chair', function (table) {
            table.integer('department_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('department');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
            table.primary(['department_id', 'user_id']);
        }),

        //Blue - Catalog
        knex.schema.createTableIfNotExists('course', function (table) {
            table.increments('id').primary();
            table.string('number').notNullable();
            table.string('title');
            table.boolean('hidden').notNullable().defaultTo(false);
            table.integer('prefix_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('prefix');
            table.integer('department_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('department');
        }),

        knex.schema.createTableIfNotExists('offering', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.integer('course_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('course');
        }),

        knex.schema.createTableIfNotExists('sequence', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.integer('offering_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('offering');
        }),

        //pink - scheduling
        knex.schema.createTableIfNotExists('term', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
        }),

        knex.schema.createTableIfNotExists('holiday', function (table) {
            table.increments('id').primary();
            table.integer('term_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('term');
            table.string('title');
            table.date('start_date');
            table.date('stop_date');
        }),

        knex.schema.createTableIfNotExists('section', function (table) {
            table.increments('id').primary();
            table.string('reg_number');
            table.string('title');
            table.integer('credit_hours');
            table.integer('term_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('term');
            table.integer('course_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('course');
            table.integer('sequence_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('sequence');
        }),

        knex.schema.createTableIfNotExists('section_schedule', function (table) {
            table.increments('id').primary();
            table.string('weekday');
            table.time('start_time').notNullable();
            table.time('stop_time').notNullable();
            table.integer('section_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('section');
        }),



        //red - syllabus
        knex.schema.createTableIfNotExists('planned_class', function (table) {
            table.increments('id').primary();
            table.date('date').notNullable();
            table.integer('offering_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('offering');
        }),

        knex.schema.createTableIfNotExists('topic', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.integer('offering_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('offering');
        }),


        knex.schema.createTableIfNotExists('activity', function (table) {
            table.increments('id').primary();
            table.integer('sequence').notNullable();
            table.text('description');
            table.boolean('in_class').notNullable().defaultTo(false);
            table.integer('duration').notNullable().defaultTo(0);
            table.json('details');
            table.integer('topic_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('topic');
        }),

        knex.schema.createTableIfNotExists('planned_activity', function (table) {
            table.integer('class_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('planned_class');
            table.integer('activity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('activity');
            table.date('scheduled_on');
            table.primary(['class_id', 'activity_id']);
        }),

        knex.schema.createTableIfNotExists('deliverable', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.text('description');
            table.integer('activity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('activity');
        }),

        knex.schema.createTableIfNotExists('criterion', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.text('description');
        }),

        knex.schema.createTableIfNotExists('specification', function (table) {
            table.integer('deliverable_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('deliverable');
            table.integer('criterion_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('criterion');
        }),

        //green - outcomes
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
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('knowledge_area');
        }),

        knex.schema.createTableIfNotExists('offering_outcome', function (table) {
            table.increments('id').primary();
            table.text('discussion');
            table.integer('learning_outcome_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('learning_outcome');
            table.integer('offering_id')
                .unsigned()
                .notNullable()
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

        //purple - execution
        knex.schema.createTableIfNotExists('actual_class', function (table) {
            table.increments('id').primary();
            table.dateTime('start_time').notNullable();
            table.dateTime('stop_time')
            table.text('reflection');
            table.integer('sequence_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('sequence');
        }),

        knex.schema.createTableIfNotExists('actual_activity', function (table) {
            table.increments('id').primary();
            table.dateTime('start_time');
            table.dateTime('stop_time');
            table.boolean('complete').defaultTo(false);
            table.text('reflection');
            table.integer('actual_class_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('actual_class');
            table.integer('activity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('activity');
        }),

        knex.schema.createTableIfNotExists('attendance', function (table) {
            table.increments('id').primary();
            table.dateTime('signed_in').notNullable();
            table.dateTime('signed_out');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
            table.integer('actual_class_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('actual_class');
        }),

        knex.schema.createTableIfNotExists('submission', function (table) {
            table.increments('id').primary();
            table.json('details');
            table.text('discussion');
            table.dateTime('submitted_at').notNullable();
            table.integer('actual_activity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('actual_activity');
        }),

        knex.schema.createTableIfNotExists('team', function (table) {
            table.integer('submission_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('submission');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
        }),

        knex.schema.createTableIfNotExists('attachment', function (table) {
            table.increments('id').primary();
            table.string('path').notNullable();
            table.integer('submission_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('submission');
        }),

        //Teal - assessment
        knex.schema.createTableIfNotExists('assessment', function (table) {
            table.increments('id').primary();
            table.text('discussion');
            table.dateTime('assessed_at').notNullable();
            table.integer('submission_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('submission');
            table.integer('assessed_by')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user');
        }),

        knex.schema.createTableIfNotExists('comment', function (table) {
            table.increments('id').primary();
            table.text('details');
        }),

        knex.schema.createTableIfNotExists('evaluation', function (table) {
            table.integer('criterion_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('criterion');
            table.integer('assessment_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('assessment');
            table.boolean('passed').notNullable().defaultTo('false');
            table.primary(['criterion_id', 'assessment_id']);
        }),

        knex.schema.createTableIfNotExists('evaluation_comment', function (table) {
            table.integer('evaluation_criterion_id').unsigned().notNullable();
            table.integer('evaluation_assessment_id').unsigned().notNullable();
            table.integer('comment_id').unsigned().notNullable();
            table.primary(['comment_id', 'evaluation_assessment_id', 'evaluation_criterion_id']);
            table.foreign('comment_id').references('comment.id');
            table.foreign(['evaluation_criterion_id', 'evaluation_assessment_id']).references(['criterion_id', 'assessment_id']).on('evaluation');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        //fk tables
        knex.schema.dropTableIfExists('department_prefix'),
        knex.schema.dropTableIfExists('section_schedule'),
        knex.schema.dropTableIfExists('team'),
        knex.schema.dropTableIfExists('attendance'),
        knex.schema.dropTableIfExists('user_role'),
        knex.schema.dropTableIfExists('user_section'),
        knex.schema.dropTableIfExists('user_offering'),
        knex.schema.dropTableIfExists('user_section'),
        knex.schema.dropTableIfExists('user_permission'),
        knex.schema.dropTableIfExists('evaluation_comment'),
        knex.schema.dropTableIfExists('evaluation'),
        knex.schema.dropTableIfExists('specification'),
        knex.schema.dropTableIfExists('deliverable'),
        knex.schema.dropTableIfExists('attachment'),
        knex.schema.dropTableIfExists('assessment'),
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
        knex.schema.dropTableIfExists('sequence'),
        knex.schema.dropTableIfExists('offering'),
        knex.schema.dropTableIfExists('course'),

        //tables without fk
        knex.schema.dropTableIfExists('relationship_type'),
        knex.schema.dropTableIfExists('criterion'),
        knex.schema.dropTableIfExists('comment'),
        knex.schema.dropTableIfExists('department'),
        knex.schema.dropTableIfExists('prefix'),
        knex.schema.dropTableIfExists('knowledge_area'),
        knex.schema.dropTableIfExists('term'),
        knex.schema.dropTableIfExists('role'),
        knex.schema.dropTableIfExists('permission'),
        knex.schema.dropTableIfExists('holiday'),
        knex.schema.dropTableIfExists('user')
    ]);
};



