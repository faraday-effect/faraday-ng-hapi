'use strict';

const Model = require('objection').Model;
const db = require('../db');

class Role extends Model {
    static get tableName() { return 'role'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'role.id',
                    through: {
                        from: 'user_role.role_id',
                        to: 'user_role.user_id'
                    },
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = Role;
