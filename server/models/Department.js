'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Department extends Model {
    static get tableName() { return 'department'; }

    static get relationMappings() {
        return {
            prefix: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Prefix',
                join: {
                    from: 'department.id',
                    through: {
                        from: 'department_prefix.prefix_id',
                        to: 'department_prefix.department_id'
                    },
                    to: 'prefix.id'
                }
            },
            course: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Course',
                join: {
                    from: 'department.id',
                    to: 'course.department_id'
                }
            }
        }
    }
}

module.exports = Department;
