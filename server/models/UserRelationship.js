'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class UserRelationship extends Model {
    static get tableName() { return 'user_relationship'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'user_relationship.user_id',
                    to: 'user.id'
                }
            },
            offering: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'user_relationship.offering_id',
                    to: 'offering.id'
                }
            },
            relationshipType: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/RelationshipType',
                join: {
                    from: 'user_relationship.relationship_type_id',
                    to: 'relationship_type.id'
                }
            }
        }
    }
}

module.exports = UserRelationship;
