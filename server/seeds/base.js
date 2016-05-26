exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('department').del(),
        knex('prefix').del(),
        knex('department_prefix').del(),
        knex('course').del(),
        knex('term').del(),
        knex('section').del(),

        // Inserts seed entries
        knex('department').insert({id: 1, name: 'Computer Science'}),
        knex('department').insert({id: 2, name: 'Mathematics'}),
        knex('department').insert({id: 3, name: 'Biblical Studies, Christian Education, & Philosophy'}),

        knex('prefix').insert({id: 1, name: 'COS'}),
        knex('prefix').insert({id: 2, name: 'MAT'}),
        knex('prefix').insert({id: 3, name: 'BIB'}),
        knex('prefix').insert({id: 4, name: 'REL'}),
        knex('prefix').insert({id: 5, name: 'PHI'}),

        knex('term').insert({id: 1, name: 'Fall 2016', start_date: "2016-09-01", end_date: "2016-12-01"}),
        knex('term').insert({id: 2, name: 'Fall 2017', start_date: "2017-09-01", end_date: "2017-12-01"}),
        knex('term').insert({id: 3, name: 'Spring 2016', start_date: "2016-01-01", end_date: "2016-05-01"}),
        knex('term').insert({id: 4, name: 'Spring 2017', start_date: "2016-01-01", end_date: "2016-05-01"}),

        knex('department_prefix').insert({prefix_id: 1, department_id: 1}),
        knex('department_prefix').insert({prefix_id: 2, department_id: 2}),
        knex('department_prefix').insert({prefix_id: 3, department_id: 3}),
        knex('department_prefix').insert({prefix_id: 4, department_id: 3}),
        knex('department_prefix').insert({prefix_id: 5, department_id: 3}),

        knex('course').insert({
            id: 1,
            prefix_id: 1,
            department_id: 1,
            number: "121",
            title: "Foundations of Computer Science",
            "active": false
        }),
        knex('course').insert({
            id: 2,
            prefix_id: 1,
            department_id: 1,
            number: "243",
            title: "Multi-Tier Web Applications",
            "active": false
        }),
        knex('course').insert({
            id: 3,
            prefix_id: 2,
            department_id: 2,
            number: "210",
            title: "Statistics",
            "active": true
        }),
        knex('course').insert({
            id: 4,
            prefix_id: 3,
            department_id: 3,
            number: "110",
            title: "Biblical Literature I",
            "active": true
        }),
        knex('course').insert({
            id: 5,
            prefix_id: 3,
            department_id: 3,
            number: "210",
            title: "Biblical Literature II",
            "active": true
        }),
        knex('course').insert({
            id: 6,
            prefix_id: 4,
            department_id: 3,
            number: "313",
            title: "Historic Christian Belief",
            "active": false
        }),
        knex('course').insert({
            id: 7,
            prefix_id: 5,
            department_id: 3,
            number: "413",
            title: "Contemporary Christian Belief",
            "active": false
        }),

        knex('section').insert({id: 1, course_id: 1, term_id: 1, reg_number: "123456", title: "Class 1"}),
        knex('section').insert({id: 2, course_id: 2, term_id: 1, reg_number: "234567", title: "Class 1"}),
        knex('section').insert({id: 3, course_id: 3, term_id: 1, reg_number: "345678", title: "Class 1"}),
        knex('section').insert({id: 4, course_id: 4, term_id: 1, reg_number: "456789", title: "Class 1"}),
        knex('section').insert({id: 5, course_id: 5, term_id: 1, reg_number: "987654", title: "Class 1"}),
        knex('section').insert({id: 6, course_id: 6, term_id: 1, reg_number: "876543", title: "Class 1"}),
        knex('section').insert({id: 7, course_id: 7, term_id: 1, reg_number: "765432", title: "Class 1"}),
        knex('section').insert({id: 8, course_id: 4, term_id: 1, reg_number: "654321", title: "Class 2"}),
        knex('section').insert({id: 9, course_id: 5, term_id: 1, reg_number: "098765", title: "Class 2"}),
        knex('section').insert({id: 10, course_id: 2, term_id: 1, reg_number: "012345", title: "Class 2"}),
        knex('section').insert({id: 11, course_id: 6, term_id: 2, reg_number: "123987", title: "Class 1"}),
        knex('section').insert({id: 12, course_id: 6, term_id: 2, reg_number: "987123", title: "Class 2"})
    );
};
