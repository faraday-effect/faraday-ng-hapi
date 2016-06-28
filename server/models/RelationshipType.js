'use strict';

const Model = require('objection').Model;
const db = require('../db');

class RelationshipType extends Model {
    static get tableName() { return 'relationship_type'; }

    static get relationMappings() {
        return {
            section: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/UserSection',
                join: {
                    from: 'relationship_type.id',
                    to: 'user_section.relationship_type_id'
                }
            },
            // offering: {
            //     relation: Model.HasManyRelation,
            //     modelClass: __dirname + '/UserOffering',
            //     join: {
            //         from: 'relationship_type.id',
            //         to: 'user_offering.relationship_type_id'
            //     }
            // }
        }
    }
}

module.exports = RelationshipType;
