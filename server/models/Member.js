'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Member extends Model {
    static get tableName() { return 'member'; }

    static get relationMappings() {
        return {
            role: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/role',
                join: {
                    from: [
                        'member.section_id',
                        'section.user_id'
                    ],
                    through: {
                        from: [
                            'member_role.section_id',
                            'member_role.user_id'
                        ],
                        to: 'member_role.role_id'
                    },
                    to: 'role.id'
                }
            },
            section: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'member.section_id',
                    to: 'section.id'
                }
            },
            user: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'member.user_id',
                    to: 'user.id'
                }
            }
        }
    }
}

module.exports = Member;
