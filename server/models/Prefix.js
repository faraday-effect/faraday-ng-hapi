'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Prefix extends Model {
    static get tableName() { return 'prefix'; }

    static get relationMappings() {
        return {
            department: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Department',
                join: {
                    from: 'prefix.id',
                    through: {
                        from: 'department_prefix.prefix_id',
                        to: 'department_prefix.department_id'
                    },
                    to: 'department.id'
                }
            },
            course: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Course',
                join: {
                    from: 'prefix.id',
                    to: 'course.prefix_id'
                }
            }
        }
    }
}

module.exports = Prefix;
