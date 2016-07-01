'use strict';

const Model = require('objection').Model;
const db = require('../db');

class Attendance extends Model {
    static get tableName() { return 'attendance'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'attendance.user_id',
                    to: 'user.id'
                }
            },
            actualClass: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'attendance.actual_class_id',
                    to: 'actual_class.id'
                }
            }
        }
    }
}

module.exports = Attendance;
