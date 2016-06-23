'use strict';

import { init_test, expect, server, db } from './support';
const lab = exports.lab = init_test();

const User = require('../models/User');
const Section = require('../models/Section');
const RelationshipType = require('../models/RelationshipType');
const UserRelationship = require('../models/UserRelationship');

lab.experiment('/Schedule endpoint', () => {

    var section = null;
    var studentRelationship = null;
    var user = null;

    lab.beforeEach(done => {

        return Promise.all([
            db.knex.raw('TRUNCATE public.relationship_type CASCADE'),
            db.knex.raw('TRUNCATE public.term CASCADE'),
            db.knex.raw('TRUNCATE public.sequence CASCADE'),
            db.knex.raw('TRUNCATE public.user CASCADE')
        ])
            .then(results => {
                return Promise.all([
                    User
                        .query()
                        .insert({
                            id: 1,
                            first_name: "Sammy",
                            last_name: "Morris",
                            email: 'sam@example.com',
                            mobile_phone: '0123456789',
                            office_phone: '0123456789',
                            password: 'pass'
                        }),
                    RelationshipType
                        .query()
                        .insert({
                            title: 'student',
                            description: 'I am learning'
                        }),
                    Section
                        .query()
                        .insertWithRelated({
                            title: 'Section xyz',
                            reg_number: '123456',
                            credit_hours: 3,
                            sequence: {
                                id: 1,
                                title: 'seq xyz',
                                offering: {
                                    course: {
                                        '#id': 'this_course',
                                        title: 'Course Title',
                                        number: '123',
                                        prefix: {
                                            name: 'COS'
                                        },
                                        department: {
                                            name: 'CSE Department'
                                        }
                                    }
                                }
                            },
                            course: {
                                '#ref': 'this_course'
                            },
                            term: {
                                name: 'Fall 2016',
                                start_date: '2016-09-01',
                                end_date: '2016-12-15'
                            },
                            sectionSchedule: [{
                                weekday: 'Monday',
                                start_time: '3:00 PM',
                                stop_time: '3:50 PM'
                            },
                                {
                                    weekday: 'Friday',
                                    start_time: '4:00 PM',
                                    stop_time: '4:50 PM'
                                }]
                        }),
                ])
            }).then(results => {
                user = results[0];
                studentRelationship = results[1];
                section = results[2];
            })
            .then(() => {
                return User
                    .query()
                    .where('id', user.id)
                    .first()
                    .then(user => {
                        return user
                            .$relatedQuery('section')
                            .relate({
                                id: section.id,
                                relationship_type_id: studentRelationship.id
                            });
                    })
                    .catch(err => {
                        console.log("ERROR", err);
                    });

            });
    });

    // No need to invoke done();  According to documentation,
    // you can return a promise instead.

    lab.test('List all terms successfully', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/terms`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.be.instanceOf(Array);
                expect(response).to.have.length(1);
                expect(response[0].id).to.equal(section.term.id);
                expect(response[0].name).to.equal(section.term.name);
                expect(response[0].start_date.substring(0, 10)).to.equal(section.term.start_date);
                expect(response[0].end_date.substring(0, 10)).to.equal(section.term.end_date);
                done();
            });
    });

    lab.test('Get a single term', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/terms/${section.term.id}`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.equal(section.term.id);
                expect(response.name).to.equal(section.term.name);
                expect(response.start_date.substring(0, 10)).to.equal(section.term.start_date);
                expect(response.end_date.substring(0, 10)).to.equal(section.term.end_date);
                done();
            });
    });

    lab.test('Error out when a term_id does not exist when retreiving a single term', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/terms/1000000000`
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Term ID 1000000000 was not found!');
                done();
            });
    });

    lab.test('Create a new term successfully', (done) => {
        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/terms`,
                payload: {
                    name: 'new term',
                    start_date: '2020-01-01',
                    end_date: '2020-05-15',
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.name).to.equal('new term');
                expect(response.start_date.substring(0, 10)).to.equal('2020-01-01');
                expect(response.end_date.substring(0, 10)).to.equal('2020-05-15');
                done();
            });
    });

    lab.test('Updates a term successfully', (done) => {
        server.inject(
            {
                method: 'PUT',
                credentials: user,
                url: `/terms/${section.term.id}`,
                payload: {
                    name: 'edited term',
                    start_date: '2020-01-01',
                    end_date: '2020-05-15',
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.id).to.equal(section.term.id);
                expect(response.name).to.equal('edited term');
                expect(response.start_date.substring(0, 10)).to.equal('2020-01-01');
                expect(response.end_date.substring(0, 10)).to.equal('2020-05-15');
                done();
            });
    });

    lab.test('List all sections successfully', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/sections`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response).to.be.instanceOf(Array);
                expect(response).to.have.length(1);
                expect(response[0].id).to.equal(section.id);
                expect(response[0].title).to.equal(section.title);
                expect(response[0].reg_number).to.equal(section.reg_number);
                expect(response[0].credit_hours).to.equal(section.credit_hours);
                expect(response[0].sequence.offering.course.id).to.equal(section.course.id);
                expect(response[0].sequence.offering.course.prefix.id).to.equal(section.course.prefix_id);
                expect(response[0].sequence.offering.course.department.id).to.equal(section.course.department_id);
                expect(response[0].sectionSchedule).to.be.instanceOf(Array);
                expect(response[0].sectionSchedule).to.have.length(2);
                expect(response[0].sectionSchedule[0].weekday).to.equal(section.sectionSchedule[0].weekday);
                expect(response[0].userRelationship[0].relationshipType.title).to.equal(studentRelationship.title);
                done();
            });
    });

    lab.test('Get a single section', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: `/sections/${section.id}`
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.equal(section.id);
                expect(response.title).to.equal(section.title);
                expect(response.reg_number).to.equal(section.reg_number);
                expect(response.credit_hours).to.equal(section.credit_hours);
                expect(response.sequence.offering.course.id).to.equal(section.course.id);
                expect(response.sequence.offering.course.prefix.id).to.equal(section.course.prefix_id);
                expect(response.sequence.offering.course.department.id).to.equal(section.course.department_id);
                expect(response.sectionSchedule).to.be.instanceOf(Array);
                expect(response.sectionSchedule).to.have.length(2);
                expect(response.sectionSchedule[0].weekday).to.equal(section.sectionSchedule[0].weekday);
                expect(response.userRelationship[0].relationshipType.title).to.equal(studentRelationship.title);
                done();
            });
    });

    lab.test('Error out when a section_id does not exist when retreiving a single section', (done) => {
        server.inject(
            {
                method: 'GET',
                credentials: user,
                url: '/sections/1000000000'
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Section ID 1000000000 was not found!');
                done();
            });
    });

    lab.test('Create a new section successfully', (done) => {
        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections`,
                payload: {
                    title: 'new section',
                    reg_number: '012345',
                    credit_hours: 1,
                    term_id: section.term.id,
                    course_id: section.course.id,
                    sequence_id: section.sequence.id
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.title).to.equal('new section');
                expect(response.reg_number).to.equal('012345');
                expect(response.credit_hours).to.equal(1);
                expect(response.term_id).to.equal(section.term.id);
                expect(response.course_id).to.equal(section.course.id);
                expect(response.sequence_id).to.equal(section.sequence_id);
                done();
            });
    });

    lab.test('Updates a section successfully', (done) => {
        server.inject(
            {
                method: 'PUT',
                credentials: user,
                url: `/sections/${section.id}`,
                payload: {
                    title: 'edited section',
                    reg_number: '98765',
                    credit_hours: 1,
                    term_id: section.term.id,
                    course_id: section.course.id,
                    sequence_id: section.sequence.id
                }
            },
            (res) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(res.payload);
                expect(response.id).to.exist();
                expect(response.id).to.equal(section.id);
                expect(response.title).to.equal('edited section');
                expect(response.reg_number).to.equal('98765');
                expect(response.credit_hours).to.equal(1);
                expect(response.term_id).to.equal(section.term.id);
                expect(response.course_id).to.equal(section.course.id);
                expect(response.sequence_id).to.equal(section.sequence_id);
                done();
            });
    });

    lab.test('Errors out when a students attempts to self enroll in a section twice', (done) => {
        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: `/sections/${section.id}/enroll`
            },
            (res) => {
                expect(res.statusCode).to.equal(400);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Bad Request');
                expect(response.message).to.equal(`You are already enrolled in section ID ${section.id}`);
                done();
            });
    });

    lab.test('Successfully allows a user to self assign to a section as a student', (done) => {
        UserRelationship
            .query()
            .delete()
            .where('user_id', user.id)
            .andWhere('section_id', section.id)
            .andWhere('relationship_type_id', studentRelationship.id)
            .then((numDeleted) => {
                server.inject(
                    {
                        method: 'POST',
                        credentials: user,
                        url: `/sections/${section.id}/enroll`
                    },
                    (res) => {
                        expect(res.statusCode).to.equal(200);
                        const response = JSON.parse(res.payload);
                        expect(response.id).to.exist();
                        expect(response.id).to.equal(section.id);
                        expect(response.user_id).to.equal(user.id);
                        expect(response.relationship_type_id).to.equal(studentRelationship.id);
                        done();
                    });
            });
    });

    lab.test('Error out when a section_id does not exist when attempting to self enroll in a section', (done) => {
        server.inject(
            {
                method: 'POST',
                credentials: user,
                url: '/sections/1000000000/enroll'
            },
            (res) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(res.payload);
                expect(response.error).to.equal('Not Found');
                expect(response.message).to.equal('Section ID 1000000000 was not found!');
                done();
            });
    });

});
