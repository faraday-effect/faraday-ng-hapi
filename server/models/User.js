'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            role: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Role',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_role.user_id',
                        to: 'user_role.role_id'
                    },
                    to: 'role.id'
                }
            },
            relationshipType: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/RelationshipType',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.relationship_type_id'
                    },
                    to: 'relationship_type.id'
                }
            },
            offering: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: { 
                    from: 'user.id',
                    through: {
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.offering_id'
                    },
                    to: 'offering.id'
                }
            },
            section: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_relationship.user_id',
                        to: 'user_relationship.section_id'
                    },
                    to: 'section.id'
                }
            },
            userRelationship: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/UserRelationship',
                join: {
                    from: 'user.id',
                    to: 'user_relationship.user_id'
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
