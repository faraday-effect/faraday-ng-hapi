const User = require('../models/User')

exports.seed = function(knex, Promise) {
  return Promise.join(

    // Inserts seed entries
    User
      .query()
      .insertWithRelated([{
            first_name: 'Abram',
            last_name: 'Stamper',
            email: 'abram_stamper@taylor.edu',
            password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
            office_phone: null,
            mobile_phone: '7654804409',

            role: {
              title: 'Student',
              description: 'I am a student'
            }
      }, {
            first_name: 'Tom',
            last_name: 'Nurkkala',
            email: 'tom_nurkkala@taylor.edu',
            password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
            office_phone: '7659981234',
            mobile_phone: '7659985131'
      }, {
            first_name: 'Keith',
            last_name: 'Bauson',
            email: 'keith_bauson@taylor.edu',
            password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
            office_phone: null,
            mobile_phone: '7654574371'
      }, {
            first_name: 'Ken',
            last_name: 'Kiers',
            email: 'ken_kiers@taylor.edu',
            password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
            office_phone: '7659984321',
            mobile_phone: '7652514154'
      }, {
            first_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
            office_phone: null,
            mobile_phone: null
      }, {
            first_name: 'test',
            last_name: 'test',
            email: 'test@example.com',
            password: '$2a$10$LZcZ8PDh1ow7bcXBkRqIf.i9uWlpBAXyO.wZOr.fKczvxL624TzXe',
            office_phone: null,
            mobile_phone: null
      }]).then((users) => {
        console.log('users seeded');
      })
  );
};
