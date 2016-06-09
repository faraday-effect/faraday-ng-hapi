'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Department_Prefix extends Model {
    static get tableName() { return 'department_prefix'; }

    static get relationMappings() {
        return {
            prefix: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Prefix',
                join: {
                    from: 'department_prefix.prefix_id',
                    to: 'prefix.id'
                }
            },
            department: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Department',
                join: {
                    from: 'department_prefix.department_id',
                    to: 'department.id'
                }
            }
        }
    }
}

module.exports = Course;
