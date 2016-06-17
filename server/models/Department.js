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
            },
            departmentMember: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'department.id',
                    through: {
                        from: 'department_member.department_id',
                        to: 'department_member.user_id'
                    },
                    to: 'user.id'
                }
            },
            departmentChair: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'department.id',
                    through: {
                        from: 'department_chair.department_id',
                        to: 'department_chair.user_id'
                    },
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = Department;
