'use strict';

const Model = require('objection').Model;
const db = require('../db');

class UserOffering extends Model {
    static get tableName() { return 'user_offering'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'user_offering.user_id',
                    to: 'user.id'
                }
            },
            offering: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'user_offering.offering_id',
                    to: 'offering.id'
                }
            },
            relationshipType: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/RelationshipType',
                join: {
                    from: 'user_offering.relationship_type_id',
                    to: 'relationship_type.id'
                }
            }
        }
    }

  static get idColumn() {
    return ['offering_id', 'relationship_type_id', 'user_id'];
  }

}

module.exports = UserSection;
