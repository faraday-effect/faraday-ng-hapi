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
                    from: 'offering.course_id',
                    to: 'course.id'
                }
            },
            prefix: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/Prefix',
                join: {
                    from: 'course.prefix_id',
                    to: 'prefix.id'
                }
            },
            department: {
                relation: Model.OneToManyRelation,
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
