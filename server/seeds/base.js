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


        knex('holiday').del(),
        knex('planned_class').del(),
        knex('actual_class').del(),
        knex('section').del(),
        knex('offering').del(),
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
        insert_and_grab_id('offering', {course_id: key_by_id['c1'], term_id: key_by_id['term1']}, 'offering1'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c2'],
            term_id: key_by_id['term1']
        }, 'offering2'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c3'],
            term_id: key_by_id['term1']
        }, 'offering3'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c4'],
            term_id: key_by_id['term1']
        }, 'offering3'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c5'],
            term_id: key_by_id['term1']
        }, 'offering4'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c6'],
            term_id: key_by_id['term1']
        }, 'offering5'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c7'],
            term_id: key_by_id['term1']
        }, 'offering6'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c4'],
            term_id: key_by_id['term1']
        }, 'offering7'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c5'],
            term_id: key_by_id['term1']
        }, 'offering8'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c2'],
            term_id: key_by_id['term2']
        }, 'offering9'),

        insert_and_grab_id('offering', {
            course_id: key_by_id['c6'],
            term_id: key_by_id['term2']
        }, 'offering10'),
        () => console.log("offering_promise complete")
    )).then(() => Promise.join(
        insert_and_grab_id('section', {
            reg_number: "123456",
            title: "Class 1",
            offering_id: key_by_id['offering1']
        }, 'section1'),
        insert_and_grab_id('section', {
            reg_number: "234567",
            title: "Class 1",
            offering_id: key_by_id['offering2']
        }, 'section2'),
        insert_and_grab_id('section', {
            reg_number: "345678",
            title: "Class 1",
            offering_id: key_by_id['offering3']
        }, 'section3'),
        insert_and_grab_id('section', {
            reg_number: "456789",
            title: "Class 1",
            offering_id: key_by_id['offering4']
        }, 'section4'),
        insert_and_grab_id('section', {
            reg_number: "987654",
            title: "Class 1",
            offering_id: key_by_id['offering5']
        }, 'section5'),
        insert_and_grab_id('section', {
            reg_number: "876543",
            title: "Class 1",
            offering_id: key_by_id['offering6']
        }, 'section6'),
        insert_and_grab_id('section', {
            reg_number: "765432",
            title: "Class 1",
            offering_id: key_by_id['offering7']
        }, 'section7'),
        insert_and_grab_id('section', {
            reg_number: "654321",
            title: "Class 2",
            offering_id: key_by_id['offering8']
        }, 'section8'),
        insert_and_grab_id('section', {
            reg_number: "098765",
            title: "Class 2",
            offering_id: key_by_id['offering9']
        }, 'section9'),
        insert_and_grab_id('section', {
            reg_number: "012345",
            title: "Class 2",
            offering_id: key_by_id['offering10']
        }, 'section10'),
        () => console.log("section_promise complete")
    )).then(() => Promise.join(
        knex('section_weekday').insert({
            section_id: key_by_id['section1'],
            weekday_id: key_by_id['w2'],
            start_time: '11:00:00',
            stop_time: '11:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section1'],
            weekday_id: key_by_id['w4'],
            start_time: '11:00:00',
            stop_time: '11:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section1'],
            weekday_id: key_by_id['w6'],
            start_time: '11:00:00',
            stop_time: '11:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section2'],
            weekday_id: key_by_id['w2'],
            start_time: '13:00:00',
            stop_time: '13:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section2'],
            weekday_id: key_by_id['w3'],
            start_time: '13:00:00',
            stop_time: '13:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section1'],
            weekday_id: key_by_id['w4'],
            start_time: '11:00:00',
            stop_time: '11:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section1'],
            weekday_id: key_by_id['w5'],
            start_time: '11:00:00',
            stop_time: '11:50:00'
        }),
        knex('section_weekday').insert({
            section_id: key_by_id['section1'],
            weekday_id: key_by_id['w6'],
            start_time: '11:00:00',
            stop_time: '11:50:00'
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering1'],
            weekday_id: key_by_id['w2']
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering1'],
            weekday_id: key_by_id['w4']
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering2'],
            weekday_id: key_by_id['w2']
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering2'],
            weekday_id: key_by_id['w3']
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering2'],
            weekday_id: key_by_id['w4']
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering2'],
            weekday_id: key_by_id['w5']
        }),
        knex('offering_weekday').insert({
            offering_id: key_by_id['offering2'],
            weekday_id: key_by_id['w6']
        }),
        () => console.log("offering_weekday, section_weekday complete")
    )).then(() => Promise.join(
        insert_and_grab_id('planned_class', {
            date: "2016-09-01",
            offering_id: key_by_id['offering1'],
            reflection: 'I am reflecting on this wonderful day.'
        }, 'planned_class1'),

        insert_and_grab_id('planned_class', {
            date: "2016-09-03",
            offering_id: key_by_id['offering1'],
            reflection: 'I am reflecting on this wonderful day.'
        }, 'planned_class1'),

        insert_and_grab_id('actual_class', {
            date: "2016-09-01",
            sequence: 1,
            section_id: key_by_id['section1'],
            reflection: 'I am reflecting on this wonderful day.'
        }, 'planned_class1'),

        () => console.log("planned class, actual class complete")
    )).then(() => Promise.join(
        insert_and_grab_id('student', {
            section_id: key_by_id['section1'],
            person_id: key_by_id['person1']
        }, 'student1'),
        insert_and_grab_id('student', {
            section_id: key_by_id['section2'],
            person_id: key_by_id['person1']
        }, 'student2'),
        insert_and_grab_id('student', {
            section_id: key_by_id['section6'],
            person_id: key_by_id['person1']
        }, 'student3'),
        insert_and_grab_id('student', {
            section_id: key_by_id['section7'],
            person_id: key_by_id['person1']
        }, 'student4'),
        knex('student').insert({
            section_id: key_by_id['section3'],
            person_id: key_by_id['person3']
        }),
        knex('student').insert({
            section_id: key_by_id['section4'],
            person_id: key_by_id['person3']
        }),
        knex('student').insert({
            section_id: key_by_id['section2'],
            person_id: key_by_id['person1']
        }),
        knex('teaching_assistant').insert({
            section_id: key_by_id['section9'],
            person_id: key_by_id['person3']
        }),
        knex('instructor').insert({
            section_id: key_by_id['section1'],
            person_id: key_by_id['person2']
        }),
        knex('instructor').insert({
            section_id: key_by_id['section2'],
            person_id: key_by_id['person2']
        }),
        knex('instructor').insert({
            section_id: key_by_id['section3'],
            person_id: key_by_id['person4']
        }),
        knex('instructor').insert({
            section_id: key_by_id['section4'],
            person_id: key_by_id['person4']
        }),
        knex('person_role').insert({
            person_id: key_by_id['person1'],
            role_id: key_by_id['role2']
        }),
        knex('person_role').insert({
            person_id: key_by_id['person2'],
            role_id: key_by_id['role3']
        }),
        knex('person_role').insert({
            person_id: key_by_id['person1'],
            role_id: key_by_id['role3']
        }),
        knex('person_role').insert({
            person_id: key_by_id['person4'],
            role_id: key_by_id['role1']
        }),
        () => console.log("student, teaching_assistant, person_role, instructor complete")
    )).then(() => Promise.join(
        knex('holiday').insert({
            term_id: key_by_id['term1'],
            title: 'Fall Break',
            start_date: '2016-10-09',
            stop_date: '2016-10-14'
        }),
        knex('holiday').insert({
            term_id: key_by_id['term2'],
            title: 'Spring Break',
            start_date: '2016-03-01',
            stop_date: '2016-03-07'
        }),
        knex('attendance').insert({
            student_id: key_by_id['student1'],
            actual_class_id: key_by_id['actual_class1']
        }),
        () => console.log("Holidays, attendance complete")
    ));
};
