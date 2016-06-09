'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Offering extends Model {
    static get tableName() { return 'offering'; }

    static get relationMappings() {
        return {
            sections: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'offering.id',
                    to: 'section.offering_id'
                }
            },
            course: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Course',
                join: {
                    from: 'offering.course_id',
                    to: 'course.id'
                }
            }
        }
    }
}

module.exports = Offering;
