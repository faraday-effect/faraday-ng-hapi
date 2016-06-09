'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Course extends Model {
    static get tableName() { return 'course'; }

    static get relationMappings() {
        return {
            offering: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'course.id',
                    to: 'offering.course_id'
                }
            }
        }
    }
}

module.exports = Section;
