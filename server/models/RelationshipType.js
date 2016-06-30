'use strict';

const Model = require('objection').Model;
const db = require('../db');

class RelationshipType extends Model {
    static get tableName() { return 'relationship_type'; }

    static get relationMappings() {
        return {
            section: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'relationship_type.id',
                    through: {
                        from: 'user_section.relationship_type_id',
                        to: 'user_section.section_id'
                    },
                    to: 'section.id'
                }
            },
            offering: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'relationship_type.id',
                    through: {
                        from: 'user_section.relationship_type_id',
                        to: 'user_section.offering_id'
                    },
                    to: 'offering.id'
                }
            },
            userRelationship: {
                relation: Model.BelongsToOneRelation,
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
