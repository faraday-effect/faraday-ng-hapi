'use strict';

const Model = require('objection').Model;
const db = require('../db');

class UserSection extends Model {
    static get tableName() { return 'user_section'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'user_section.user_id',
                    to: 'user.id'
                }
            },
            section: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'user_section.section_id',
                    to: 'section.id'
                }
            },
            relationshipType: {
                relation: Model.HasOneRelation,
                modelClass: __dirname + '/RelationshipType',
                join: {
                    from: 'user_section.relationship_type_id',
                    to: 'relationship_type.id'
                }
            }
        }
    }

    static get idColumn() {
        return ['section_id', 'relationship_type_id', 'user_id'];
    }
}

module.exports = UserSection;
