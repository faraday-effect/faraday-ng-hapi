'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Department extends Model {
    static get tableName() { return 'department'; }

    static get relationMappings() {
        return {
            prefixes: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Department_Prefix',
                join: {
                    from: 'department.id',
                    through: {
                        from: 'department_prefix.prefix_id',
                        to: 'department_prefix.department_id'
                    },
                    to: 'prefix.id'
                }
            },
            courses: {
                relation: Model.OneToManyRelation,
                modelClass: ___dirname + '/Course',
                join: {
                    from: 'department.id',
                    to: 'course.department_id'
                }
            }
        }
    }
}

module.exports = Section;
