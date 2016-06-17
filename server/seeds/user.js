"use strict";

const User = require('../models/User');
const Offering = require('../models/Offering');
const RelationshipType = require('../models/RelationshipType');

exports.seed = function (knex, Promise) {

    const dataModel = {};

    return Promise.join(
        //tables with fk
        knex('department_prefix').del(),
        knex('section_schedule').del(),
        knex('user_role').del(),
        knex('user_relationship').del(),
        knex('section').del(),
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

        return Promise.join(
            User
                .query()
                .insertWithRelated([
                    {
                        first_name: 'Abram',
                        last_name: 'Stamper',
                        email: 'abram_stamper@taylor.edu',
                        campus_id: '006699885',
                        password: 'password',
                        office_phone: null,
                        mobile_phone: '7654804409',
                        role: {
                            '#id': 'student',
                            title: 'Student',
                            description: 'I am a student'
                        },
                    },
                    {
                        first_name: 'Tom',
                        last_name: 'Nurkkala',
                        email: 'tom_nurkkala@taylor.edu',
                        campus_id: '006699751',
                        password: 'password',
                        office_phone: '7659981234',
                        mobile_phone: '7659985131',
                        role: {
                            '#id': 'faculty',
                            title: 'Faculty',
                            description: 'I work in the teaching side of things'
                        }
                    },
                    {
                        first_name: 'Keith',
                        last_name: 'Bauson',
                        email: 'keith_bauson@taylor.edu',
                        campus_id: '006696325',
                        password: 'pass',
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
                        password: 'pass',
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
                        password: 'pass',
                        office_phone: null,
                        mobile_phone: null,
                        role: {
                            '#ref': 'student'
                        }
                    },
                    {
                        first_name: 'test',
                        last_name: 'test',
                        email: 'test@example.com',
                        campus_id: '006694321',
                        password: 'pass',
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
                        password: 'pass',
                        office_phone: null,
                        mobile_phone: null,
                        role: {
                            title: 'Admin',
                            description: 'I have controls for everything!'
                        }
                    }]).then((users) => {
                        console.log('users and roles seeded');
                        dataModel['Users'] = users;
                    }),

            RelationshipType
                .query()
                .insert([
                    {
                        title: 'Student',
                        description: 'I am learning'
                    }, {
                        title: 'Teacher\'s Assistant',
                        description: 'I am grading'
                    }, {
                        title: 'Teacher',
                        description: 'I am teaching'
                    }
                ]).then((relationshipType) => {
                    console.log('RelationshipType seeded');
                    dataModel['RelationshipType'] = relationshipType;
                }),

            Offering
                .query()
                .insertWithRelated([
                    {
                        title: 'Spring Foundations of CS',
                        course: {
                            number: '121',
                            title: 'Foundations of Computer Science',
                            prefix: {
                                name: 'COS',
                                department: {
                                    name: 'Computer Science & Engineering',
                                    '#id': 'cos'
                                }
                            },
                            department: {
                                '#ref': 'cos'
                            },
                            section: {
                                title: 'Foundations of CS Section Title',
                                reg_number: '012345',
                                credit_hours: '4',
                                '#id': 'section-foundations-cs',
                                term: {
                                    '#id': 'term',
                                    name: 'Spring 2017',
                                    start_date: '2017-01-01',
                                    end_date: '2017-05-15'
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
                            }
                        },
                        section: {
                            '#ref': 'section-foundations-cs'
                        }
                    },
                    {
                        title: 'Spring Historic',
                        course: {
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
                            section: [
                                {
                                    term: {
                                        '#ref': 'term'
                                    },
                                    title: 'Historic Section I Title',
                                    reg_number: '654321',
                                    credit_hours: '3',
                                    '#id': 'section_HS1',
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
                                    '#id': 'section_HS2',
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
                                        },
                                    ]
                                }
                            ]
                        },
                        section: [
                            {
                                '#ref': 'section_HS1'
                            },
                            {
                                '#ref': 'section_HS2'
                            }
                        ]

                    }
                ]).then((offering) => {
                    dataModel['offering'] = offering;
                }),

            () => console.log('offering, course, section, section_schedule seeded')
        )
    }).then(() => {
        const user_id = dataModel['Users'][0].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][0].section.id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });
    }).then(() => {
        const user_id = dataModel['Users'][2].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][0].section.id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });
    }).then(() => {
        const user_id = dataModel['Users'][4].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][0].section.id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });
    }).then(() => {
        const user_id = dataModel['Users'][5].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][0].section.id,
                        relationship_type_id: dataModel['RelationshipType'][1].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });

    }).then(() => {
        const user_id = dataModel['Users'][1].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][0].section.id,
                        relationship_type_id: dataModel['RelationshipType'][2].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });

    }).then(() => {
        const user_id = dataModel['Users'][0].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][1].section[0].id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });
    }).then(() => {
        const user_id = dataModel['Users'][0].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][1].section[1].id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });

    }).then(() => {
        const user_id = dataModel['Users'][2].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][1].section[0].id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });


    }).then(() => {
        const user_id = dataModel['Users'][2].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('section')
                    .relate({
                        id: dataModel['offering'][1].section[1].id,
                        relationship_type_id: dataModel['RelationshipType'][0].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });
    }).then(() => {
        const user_id = dataModel['Users'][3].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('offering')
                    .relate({
                        id: dataModel['offering'][1].id,
                        relationship_type_id: dataModel['RelationshipType'][2].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });

    }).then(() => {
        const user_id = dataModel['Users'][5].id;

        return User
            .query()
            .where('id', user_id)
            .first()
            .then(user => {
                return user
                    .$relatedQuery('offering')
                    .relate({
                        id: dataModel['offering'][1].id,
                        relationship_type_id: dataModel['RelationshipType'][1].id
                    });
            })
            .catch(err => {
                console.log("ERR", err);
            });

    }).catch(err => console.error("ERROR", err));
};
