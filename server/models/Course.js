'use strict';

const Model = require('objection').Model;
const db = require('../db');

class Course extends Model {
    static get tableName() { return 'course'; }

    static get relationMappings() {
        return {
            offering: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'course.id',
                    to: 'offering.course_id'
                }
            },
            section: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'course.id',
                    to: 'section.course_id'
                }
            },
            prefix: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Prefix',
                join: {
                    from: 'course.prefix_id',
                    to: 'prefix.id'
                }
            },
            department: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Department',
                join: {
                    from: 'course.department_id',
                    to: 'department.id'
                }
            }
        }
    }
}

module.exports = Course;
