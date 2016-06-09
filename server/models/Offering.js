'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Offering extends Model {
    static get tableName() { return 'offering'; }

    static get relationMappings() {
        return {
            section: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'offering.id',
                    to: 'section.offering_id'
                }
            },
            course: {
                relation: Model.OneToManyRelation,
                modelClass: ___dirname + '/Course',
                join: {
                    from: 'offering._course_id',
                    to: 'course.id'
                }
            }
        }
    }
}

module.exports = Offering;
