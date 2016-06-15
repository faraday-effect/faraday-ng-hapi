'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            user_relationship: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/User_Relationship',
                join: {
                    from: 'user.id',
                    to: 'user_relationship.id'
                },
            },
            role: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Role',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_role.user_id',
                        to: 'user_role.role_id'
                    },
                    to: 'member.user_id'
                }
            },
            offering: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: { 
                    from: 'user.id',
                    through: {
                        modelClass: __dirname + '/User_Relationship',
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.offering_id'
                    },
                    to: 'offering.id'
                }
            },
            section: {
                relation: Model.ManyToManyRelation,
                modelClass: ___dirname + '/Section',
                join: {
                    from: 'user.id',
                    through: {
                        modelClass: __dirname + '/User_Relationship',
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.section_id'
                    },
                    to: 'section.id'
                }
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
