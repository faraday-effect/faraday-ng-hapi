'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class RelationshipType extends Model {
    static get tableName() { return 'relationship_type'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'relationship_type.id',
                    through: {
                        from: 'user_relationship.relationship_type',
                        to: 'user_relationship.user_id'
                    },
                    to: 'user.id'
                }
            },
            offering: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'relationship_type.id',
                    through: {
                        from: 'user_relationship.relationship_type_id',
                        to: 'user_relationship.offering_id'
                    },
                    to: 'offering.id'
                }
            },
            userRelationship: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/UserRelationship',
                join: {
                    from: 'relationship_type.id',
                    to: 'user_relationship.relationship_type_id'
                }
            }
        }
    }
}

module.exports = RelationshipType;
