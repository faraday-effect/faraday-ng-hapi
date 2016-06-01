"use strict";

exports.seed = function (knex, Promise) {
    var key_by_id = {};

    function insert_and_grab_id(table, properties, key) {
        return knex(table).returning('id').insert(properties).then((ids) => key_by_id[key] = ids[0]);
    }

    return Promise.join(
        // Deletes ALL existing entries
        knex('department_prefix').del(),
        knex('attendance').del(),
        knex('teaching_assistant').del(),
        knex('student').del(),
        knex('instructor').del(),
        knex('offering_weekday').del(),
        knex('section_weekday').del(),
        knex('person_role').del(),
        knex('offering').del(),

        knex('holiday').del(),
        knex('planned_class').del(),
        knex('actual_class').del(),
        knex('section').del(),
        knex('course').del(),
        knex('department').del(),
        knex('prefix').del(),
        knex('term').del(),
        knex('role').del(),
        knex('person').del(),
        knex('weekday').del(),
        () => console.log("delete_promise complete")

    ).then(() => Promise.join(
        //Inserts seed entries
        insert_and_grab_id('department', {name: 'Computer Science'}, 'department1'),
        insert_and_grab_id('department', {name: 'Mathematics'}, 'department2'),
        insert_and_grab_id('department', {name: 'Biblical Studies, Christian Education, & Philosophy'}, 'department3'),

        insert_and_grab_id('prefix', {name: 'COS'}, 'prefix1'),
        insert_and_grab_id('prefix', {name: 'MAT'}, 'prefix2'),
        insert_and_grab_id('prefix', {name: 'BIB'}, 'prefix3'),
        insert_and_grab_id('prefix', {name: 'REL'}, 'prefix4'),
        insert_and_grab_id('prefix', {name: 'PHI'}, 'prefix5'),

        insert_and_grab_id('weekday', {name: 'Sunday'}, 'w1'),
        insert_and_grab_id('weekday', {name: 'Monday'}, 'w2'),
        insert_and_grab_id('weekday', {name: 'Tuesday'}, 'w3'),
        insert_and_grab_id('weekday', {name: 'Wednesday'}, 'w4'),
        insert_and_grab_id('weekday', {name: 'Thursday'}, 'w5'),
        insert_and_grab_id('weekday', {name: 'Friday'}, 'w6'),
        insert_and_grab_id('weekday', {name: 'Saturday'}, 'w7'),

        insert_and_grab_id('person', {
            first_name: 'Abram',
            last_name: 'Stamper',
            email: 'abram_stamper@taylor.edu',
            password: 'pass',
            office_phone: null,
            mobile_phone: '765-480-4409'
        }, 'person1'),
        insert_and_grab_id('person', {
            first_name: 'Tom',
            last_name: 'Nurkkala',
            email: 'tom_nurkkala@taylor.edu',
            password: 'pass',
            office_phone: null,
            mobile_phone: '765-998-4131'
        }, 'person2'),
        insert_and_grab_id('person', {
            first_name: 'Keith',
            last_name: 'Bauson',
            email: 'keith_bauson@taylor.edu',
            password: 'pass',
            office_phone: null,
            mobile_phone: '765-457-4371'
        }, 'person3'),
        insert_and_grab_id('person', {
            first_name: 'Ken',
            last_name: 'Kiers',
            email: 'ken_kiers@taylor.edu',
            password: 'pass',
            office_phone: null,
            mobile_phone: '765-251-4154'
        }, 'person4'),

        insert_and_grab_id('role', {
            title: 'Superuser',
            description: "I am superman!"
        }, 'role1'),
        insert_and_grab_id('role', {
            title: 'Student',
            description: "I am learning!"
        }, 'role2'),
        insert_and_grab_id('role', {
            title: 'Instructor',
            description: "I am teaching!"
        }, 'role3'),
        insert_and_grab_id('role', {
            title: 'Teacher\'s Assistant',
            description: "I am learning to teach!"
        }, 'role4'),
        insert_and_grab_id('role', {
            title: 'Department Chair',
            description: "I am large and in charge."
        }, 'role5'),

        insert_and_grab_id('term', {
            name: 'Fall 2016',
            start_date: "2016-09-01",
            end_date: "2016-12-01"
        }, 'term1'),

        insert_and_grab_id('term', {
            name: 'Fall 2017',
            start_date: "2017-09-01",
            end_date: "2017-12-01"
        }, 'term2'),

        insert_and_grab_id('term', {
            name: 'Spring 2016',
            start_date: "2016-01-01",
            end_date: "2016-05-01"
        }, 'term3'),

        insert_and_grab_id('term', {
            name: 'Spring 2017',
            start_date: "2016-01-01",
            end_date: "2016-05-01"
        }, 'term4'),
        () => console.log("department_promise complete")

    )).then(() => Promise.join(
        knex('department_prefix').insert({prefix_id: key_by_id['prefix1'], department_id: key_by_id['department1']}),
        knex('department_prefix').insert({prefix_id: key_by_id['prefix2'], department_id: key_by_id['department1']}),
        knex('department_prefix').insert({prefix_id: key_by_id['prefix3'], department_id: key_by_id['department3']}),
        knex('department_prefix').insert({prefix_id: key_by_id['prefix4'], department_id: key_by_id['department3']}),
        knex('department_prefix').insert({prefix_id: key_by_id['prefix5'], department_id: key_by_id['department3']}),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix1'],
            department_id: key_by_id['department1'],
            number: "121",
            title: "Foundations of Computer Science",
            "hidden": false
        }, 'c1'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix1'],
            department_id: key_by_id['department1'],
            number: "243",
            title: "Multi-Tier Web Applications",
            "hidden": false
        }, 'c2'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix2'],
            department_id: key_by_id['department2'],
            number: "210",
            title: "Statistics",
            "hidden": true
        }, 'c3'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix3'],
            department_id: key_by_id['department3'],
            number: "110",
            title: "Biblical Literature I",
            "hidden": true
        }, 'c4'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix3'],
            department_id: key_by_id['department3'],
            number: "210",
            title: "Biblical Literature II",
            "hidden": true
        }, 'c5'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix4'],
            department_id: key_by_id['department3'],
            number: "313",
            title: "Historic Christian Belief",
            "hidden": false
        }, 'c6'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['prefix5'],
            department_id: key_by_id['department3'],
            number: "413",
            title: "Contemporary Christian Belief",
            "hidden": false
        }, 'c7'),
        () => console.log("course_promise complete")

    )).then(() => Promise.join(
        knex('section').insert({
            course_id: key_by_id['c1'],
            term_id: key_by_id['term1'],
            reg_number: "123456",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c2'],
            term_id: key_by_id['term1'],
            reg_number: "234567",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c3'],
            term_id: key_by_id['term1'],
            reg_number: "345678",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c4'],
            term_id: key_by_id['term1'],
            reg_number: "456789",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c5'],
            term_id: key_by_id['term1'],
            reg_number: "987654",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c6'],
            term_id: key_by_id['term1'],
            reg_number: "876543",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c7'],
            term_id: key_by_id['term1'],
            reg_number: "765432",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c4'],
            term_id: key_by_id['term1'],
            reg_number: "654321",
            title: "Class 2"
        }),
        knex('section').insert({
            course_id: key_by_id['c5'],
            term_id: key_by_id['term1'],
            reg_number: "098765",
            title: "Class 2"
        }),
        knex('section').insert({
            course_id: key_by_id['c2'],
            term_id: key_by_id['term1'],
            reg_number: "012345",
            title: "Class 2"
        }),
        knex('section').insert({
            course_id: key_by_id['c6'],
            term_id: key_by_id['term2'],
            reg_number: "123987",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c6'],
            term_id: key_by_id['term2'],
            reg_number: "987123",
            title: "Class 2"
        }),
        () => console.log("section_promise complete")
    ));
};
