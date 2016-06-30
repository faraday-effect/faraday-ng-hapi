"use strict";

const User = require('../models/User');
const RelationshipType = require('../models/RelationshipType');
const Section = require('../models/Section');

exports.seed = function (knex, Promise) {

    const dataModel = {};

    return Promise.join(
        //tables with fk
        knex('attendance').del(),
        knex('actual_class').del(),
        knex('department_prefix').del(),
        knex('section_schedule').del(),
        knex('user_role').del(),
        knex('user_section').del(),
        knex('user_offering').del(),
        knex('section').del(),
        knex('sequence').del(),
        knex('specification').del(),
        knex('criterion').del(),
        knex('deliverable').del(),
        knex('activity').del(),
        knex('topic').del(),
        knex('offering').del(),
        knex('course').del(),

        //tables without fk
        knex('department').del(),
        knex('prefix').del(),
        knex('role').del(),
        knex('term').del(),
        knex('relationship_type').del(),
        knex('user').del(),
        () => console.log("delete_promise complete")
    ).then(() => {
        return RelationshipType
            .query()
            .insert([
                {
                    title: 'student',
                    description: 'I am learning'
                }, {
                    title: 'teacher\'s assistant',
                    description: 'I am grading'
                }, {
                    title: 'instructor',
                    description: 'I am teaching'
                }
            ]).then((relationshipType) => {
                console.log('RelationshipType seeded');
                dataModel['RelationshipType'] = relationshipType;
            })
            .then(() => {

                return User
                    .query()
                    .insertWithRelated([
                        {
                            first_name: 'Tom',
                            last_name: 'Nurkkala',
                            email: 'tom_nurkkala@taylor.edu',
                            campus_id: '006699751',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: '7659981234',
                            mobile_phone: '7659985131',
                            role: {
                                '#id': 'faculty',
                                title: 'Faculty',
                                description: 'I work in the teaching side of things'
                            },
                            section:
                            {
                                relationship_type_id: dataModel['RelationshipType'][2].id,
                                course: { '#ref': 'foundations CS course' },
                                title: 'Foundations of CS Section Title',
                                reg_number: '012345',
                                credit_hours: '4',
                                term: {
                                    '#id': 'term',
                                    name: 'Spring 2017',
                                    start_date: '2017-01-01',
                                    end_date: '2017-05-15'
                                },
                                sequence: {
                                    title: 'this is the sequence title for foundations CS',
                                    offering: {
                                        title: 'Foundations of CS Offering Title',
                                        course: {
                                            '#id': 'foundations CS course',
                                            number: '121',
                                            title: 'Foundations of Computer Science',
                                            prefix: {
                                                name: 'COS',
                                                department: {
                                                    name: 'Computer Science and Engineering',
                                                    '#id': 'cos'
                                                }
                                            },
                                            department: {
                                                '#ref': 'cos'
                                            }
                                        },
                                    },
                                },

                                sectionSchedule: [
                                    {
                                        weekday: 'Monday',
                                        start_time: '1:00:00',
                                        stop_time: '1:50:00'
                                    },
                                    {
                                        weekday: 'Wednesday',
                                        start_time: '1:00:00',
                                        stop_time: '1:50:00'
                                    },
                                    {
                                        weekday: 'Thursday',
                                        start_time: '2:00:00',
                                        stop_time: '3:50:00'
                                    },
                                    {
                                        weekday: 'Friday',
                                        start_time: '1:00:00',
                                        stop_time: '1:50:00'
                                    }
                                ]
                            },
                        },
                        {
                            first_name: 'Andrew',
                            last_name: 'Draper',
                            email: 'andrew@example.com',
                            campus_id: '006859745',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: '7659981234',
                            mobile_phone: null,
                            role: {
                                '#ref': 'faculty'
                            },
                            offering:
                            {
                                relationship_type_id: dataModel['RelationshipType'][2].id,
                                title: 'Spring Historic',
                                course: {
                                    '#id': 'spring historic course',
                                    number: '313',
                                    title: 'Historic Christiain Belief',
                                    prefix: {
                                        name: 'REL',
                                        department: {
                                            name: 'Biblical Studies, Christian Education, & Philosophy',
                                            '#id': 'rel'
                                        }
                                    },
                                    department: {
                                        '#ref': 'rel'
                                    },
                                },
                                sequence: [{
                                    title: 'Historic spring I sequence',
                                    section: [{
                                        term: {
                                            '#ref': 'term'
                                        },
                                        title: 'Historic Section I Title',
                                        reg_number: '654321',
                                        credit_hours: '3',
                                        course: { '#ref': 'spring historic course' },
                                        sectionSchedule: [
                                            {
                                                weekday: 'Monday',
                                                start_time: '9:00:00',
                                                stop_time: '9:50:00'
                                            },
                                            {
                                                weekday: 'Wednesday',
                                                start_time: '9:00:00',
                                                stop_time: '9:50:00'
                                            },
                                            {
                                                weekday: 'Friday',
                                                start_time: '9:00:00',
                                                stop_time: '9:50:00'
                                            },
                                        ]
                                    },
                                        {
                                            term: {
                                                '#ref': 'term'
                                            },
                                            title: 'Historic Section II Title',
                                            reg_number: '123654',
                                            credit_hours: '3',
                                            course: { '#ref': 'spring historic course' },
                                            sectionSchedule: [
                                                {
                                                    weekday: 'Monday',
                                                    start_time: '11:00:00',
                                                    stop_time: '11:50:00'
                                                },
                                                {
                                                    weekday: 'Wednesday',
                                                    start_time: '11:00:00',
                                                    stop_time: '11:50:00'
                                                },
                                                {
                                                    weekday: 'Friday',
                                                    start_time: '11:00:00',
                                                    stop_time: '11:50:00'
                                                }
                                            ]
                                        }
                                    ]
                                }
                                ]
                            }
                        },
                        {
                            first_name: 'Abram',
                            last_name: 'Stamper',
                            email: 'abram_stamper@taylor.edu',
                            campus_id: '006699885',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: null,
                            mobile_phone: '7654804409',
                            role: {
                                '#id': 'student',
                                title: 'Student',
                                description: 'I am a student'
                            }
                        },
                        {
                            first_name: 'Keith',
                            last_name: 'Bauson',
                            email: 'keith_bauson@taylor.edu',
                            campus_id: '006696325',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: null,
                            mobile_phone: '7654574371',
                            role: {
                                '#ref': 'student'
                            }
                        },
                        {
                            first_name: 'Ken',
                            last_name: 'Kiers',
                            email: 'ken_kiers@taylor.edu',
                            campus_id: '006755123',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: '7659984321',
                            mobile_phone: '7652514154',
                            role: {
                                '#ref': 'faculty'
                            }
                        },
                        {
                            first_name: 'test',
                            last_name: 'test',
                            email: 'test@test.com',
                            campus_id: '006697891',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: null,
                            mobile_phone: null,
                            role: {
                                '#ref': 'student'
                            }
                        },
                        {
                            first_name: 'Junk',
                            last_name: 'Tester',
                            email: 'junk@test.com',
                            campus_id: '006697891',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: null,
                            mobile_phone: null,
                            role: {
                                '#ref': 'student'
                            }
                        },
                        {
                            first_name: 'Test',
                            last_name: 'Example',
                            email: 'test@example.com',
                            campus_id: '006694321',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: null,
                            mobile_phone: null,
                            role: {
                                '#ref': 'student'
                            }
                        },
                        {
                            first_name: 'Super',
                            last_name: 'User',
                            email: 'test_sup@example.com',
                            campus_id: '006694550',
                            //hash of 'pass'
                            password: '$2a$10$75WOPbDaP1aUl5zrddUULeV9LMd2CZ61l4r7gBBUhV9lgqoJmCAbO',
                            office_phone: null,
                            mobile_phone: null,
                            role: {
                                title: 'Admin',
                                description: 'I have controls for everything!'
                            }
                        }
                    ]).then((users) => {
                        console.log('users and roles seeded');
                        dataModel['Users'] = users;
                    }).then(() => {
                        Section
                            .query()
                            .findById(dataModel['Users'][0].section.id)
                            .then((section) => {
                                    return section
                                        .$relatedQuery('user')
                                        .relate({
                                            id: dataModel['Users'][2].id,
                                            relationship_type_id: dataModel['RelationshipType'][0].id
                                        });
                            }).then((response) => {
                                console.log(response);
                            })
                            .catch((err) => {
                                console.log("<<<<<<<<<<>>>>>>>> ", err);
                            });
                });
            }).catch(err => console.error("ERROR", err));
    });

};
