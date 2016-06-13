'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Role extends Model {
    static get tableName() { return 'role'; }

    static get relationMappings() {
        return {
            member: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/member',
                join: {
                    from: 'role.id',
                    through: {
                        from: 'member_role.role_id',
                        to: [
                            'member_role.section_id',
                            'member_role.user_id'
                        ]
                    },
                    to: [
                        'member.section_id',
                        'section.user_id'
                    ],
                }
            }
        }
    }
}

module.exports = Role;
