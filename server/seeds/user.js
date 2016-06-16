const User = require('../models/User')
const Offering = require('../models/Offering')
const RelationshipType = require('../models/RelationshipType')
//const jsonfile = require('jsonfile');

exports.seed = function (knex, Promise) {

      dataModel = {};

      return Promise.join(

            knex('department_prefix').del(),
            knex('user_role').del(),
            knex('user_relationship').del(),
            knex('section').del(),
            knex('offering').del(),
            knex('course').del(),

            //tables without fk
            knex('department').del(),
            knex('prefix').del(),
            knex('role').del(),
            knex('relationship_type').del(),
            knex('user').del(),
            () => console.log("delete_promise complete")

      ).then(() => Promise.join(

            // Inserts seed entries
            User
                  .query()
                  .insertWithRelated([{
                        first_name: 'Abram',
                        last_name: 'Stamper',
                        email: 'abram_stamper@taylor.edu',
                        campus_id: '006699885',
                        password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
                        office_phone: null,
                        mobile_phone: '7654804409',

                        role: {
                              '#id': 'student',
                              title: 'Student',
                              description: 'I am a student'
                        }
                  },
                        {
                              first_name: 'Tom',
                              last_name: 'Nurkkala',
                              email: 'tom_nurkkala@taylor.edu',
                              campus_id: '006699751',
                              password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
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
                              password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
                              office_phone: null,
                              mobile_phone: '7654574371',
                              role: {
                                    '#ref': 'student'
                              },
                        },
                        {
                              first_name: 'Ken',
                              last_name: 'Kiers',
                              email: 'ken_kiers@taylor.edu',
                              campus_id: '006755123',
                              password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
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
                              password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
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
                              password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
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
                              password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
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
                  .insertWithRelated([
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
                                                '#id': 'cos',
                                          }
                                    },
                                    department: {
                                          '#ref': 'cos'
                                    },
                                    section: {
                                          title: 'Foudnations of CS Section Title',
                                          reg_number: '012345',
                                          credit_hours: '3',
                                          '#id': 'section_CS',
                                          term: {
                                                '#id': 'term',
                                                name: 'Spring 2017',
                                                start_date: '2017-01-01',
                                                end_date: '2017-05-15'
                                          },
                                    }
                              },
                              section: {
                                    '#ref': 'section_CS'
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
                                          '#ref' : 'rel'
                                    },
                                    section: {
                                          term: {
                                                '#ref': 'term'
                                          },
                                          title: 'Historic Section Title',
                                          reg_number: '654321',
                                          credit_hours: '3',
                                          '#id': 'section_HS'
                                    },
                              },
                              section: {
                                    '#ref': 'section_HS'
                              }

                        }
                  ]).then((offering) => {
                        dataModel['offering'] = offering;
                  })

            )).then(() => Promise.join(
                  //jsonfile.writeFileSync('./seed.json', dataModel, {spaces: 4})
                  User 
                        .query()
                        .where('id', dataModel['Users'][0].id)
                        .first()
                        .then((user) => {
                              return user
                              .$relatedQuery('section')
                              .relate({
                                    'section_id': dataModel['offering'][0].section.id,
                                    'relationship_type_id': dataModel['RelationshipType'][0].id
                              });
                        }).then(() => { })
            )
      );
};
