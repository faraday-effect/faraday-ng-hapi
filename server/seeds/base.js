"use strict";

exports.seed = function (knex, Promise) {
    var key_by_id = {};

    function insert_and_grab_id(table, properties, key) {
        return knex(table).returning('id').insert(properties).then((ids) => key_by_id[key] = ids[0]);
    }

    return Promise.join(
        // Deletes ALL existing entries
        knex('section').del(),
        knex('department_prefix').del(),
        knex('course').del(),
        knex('department').del(),
        knex('prefix').del(),
        knex('term').del(),
        () => console.log("delete_promise complete")

    ).then(() => Promise.join(
        //Inserts seed entries
        insert_and_grab_id('department', {name: 'Computer Science'}, 'd1'),
        insert_and_grab_id('department', {name: 'Mathematics'}, 'd2'),
        insert_and_grab_id('department', {name: 'Biblical Studies, Christian Education, & Philosophy'}, 'd3'),

        insert_and_grab_id('prefix', {name: 'COS'}, 'p1'),
        insert_and_grab_id('prefix', {name: 'MAT'}, 'p2'),
        insert_and_grab_id('prefix', {name: 'BIB'}, 'p3'),
        insert_and_grab_id('prefix', {name: 'REL'}, 'p4'),
        insert_and_grab_id('prefix', {name: 'PHI'}, 'p5'),

        insert_and_grab_id('term', {
            name: 'Fall 2016',
            start_date: "2016-09-01",
            end_date: "2016-12-01"
        }, 't1'),

        insert_and_grab_id('term', {
            name: 'Fall 2017',
            start_date: "2017-09-01",
            end_date: "2017-12-01"
        }, 't2'),

        insert_and_grab_id('term', {
            name: 'Spring 2016',
            start_date: "2016-01-01",
            end_date: "2016-05-01"
        }, 't3'),

        insert_and_grab_id('term', {
            name: 'Spring 2017',
            start_date: "2016-01-01",
            end_date: "2016-05-01"
        }, 't4'),
        () => console.log("department_promise complete")

    )).then(() => Promise.join(
        knex('department_prefix').insert({prefix_id: key_by_id['p1'], department_id: key_by_id['d1']}),
        knex('department_prefix').insert({prefix_id: key_by_id['p2'], department_id: key_by_id['d1']}),
        knex('department_prefix').insert({prefix_id: key_by_id['p3'], department_id: key_by_id['d3']}),
        knex('department_prefix').insert({prefix_id: key_by_id['p4'], department_id: key_by_id['d3']}),
        knex('department_prefix').insert({prefix_id: key_by_id['p5'], department_id: key_by_id['d3']}),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p1'],
            department_id: key_by_id['d1'],
            number: "121",
            title: "Foundations of Computer Science",
            "active": false
        }, 'c1'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p1'],
            department_id: key_by_id['d1'],
            number: "243",
            title: "Multi-Tier Web Applications",
            "active": false
        }, 'c2'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p2'],
            department_id: key_by_id['d2'],
            number: "210",
            title: "Statistics",
            "active": true
        }, 'c3'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p3'],
            department_id: key_by_id['d3'],
            number: "110",
            title: "Biblical Literature I",
            "active": true
        }, 'c4'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p3'],
            department_id: key_by_id['d3'],
            number: "210",
            title: "Biblical Literature II",
            "active": true
        }, 'c5'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p4'],
            department_id: key_by_id['d3'],
            number: "313",
            title: "Historic Christian Belief",
            "active": false
        }, 'c6'),

        insert_and_grab_id('course', {
            prefix_id: key_by_id['p5'],
            department_id: key_by_id['d3'],
            number: "413",
            title: "Contemporary Christian Belief",
            "active": false
        }, 'c7'),
        () => console.log("course_promise complete")

    )).then(() => Promise.join(
        knex('section').insert({
            course_id: key_by_id['c1'],
            term_id: key_by_id['t1'],
            reg_number: "123456",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c2'],
            term_id: key_by_id['t1'],
            reg_number: "234567",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c3'],
            term_id: key_by_id['t1'],
            reg_number: "345678",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c4'],
            term_id: key_by_id['t1'],
            reg_number: "456789",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c5'],
            term_id: key_by_id['t1'],
            reg_number: "987654",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c6'],
            term_id: key_by_id['t1'],
            reg_number: "876543",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c7'],
            term_id: key_by_id['t1'],
            reg_number: "765432",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c4'],
            term_id: key_by_id['t1'],
            reg_number: "654321",
            title: "Class 2"
        }),
        knex('section').insert({
            course_id: key_by_id['c5'],
            term_id: key_by_id['t1'],
            reg_number: "098765",
            title: "Class 2"
        }),
        knex('section').insert({
            course_id: key_by_id['c2'],
            term_id: key_by_id['t1'],
            reg_number: "012345",
            title: "Class 2"
        }),
        knex('section').insert({
            course_id: key_by_id['c6'],
            term_id: key_by_id['t2'],
            reg_number: "123987",
            title: "Class 1"
        }),
        knex('section').insert({
            course_id: key_by_id['c6'],
            term_id: key_by_id['t2'],
            reg_number: "987123",
            title: "Class 2"
        }),
        () => console.log("section_promise complete")
    ));
};
