'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            member_sections: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'member.user_id',
                        to: 'member.section_id'
                    },
                    to: 'section.id'
                },
            }
        }
    }

    fullName() {
        return this.firstName + ' ' + this.lastName
    }

    stripPassword() {
        delete this['password']
        return this;
    }
}

module.exports = User;
