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
            }
        }
    }
}

module.exports = RelationshipType;
