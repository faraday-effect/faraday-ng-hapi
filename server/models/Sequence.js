'use strict';

const Model = require('objection').Model;
const db = require('../db');

class Sequence extends Model {
    static get tableName() { return 'sequence'; }

    static get relationMappings() {
        return {
            offering: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'sequence.offering_id',
                    to: 'offering.id'
                }
            },
            section: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'sequence.id',
                    to: 'section.sequence_id'
                }
            },
            actualClass: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'sequence.id',
                    to: 'actual_class.sequence_id'
                }
            }
        }
    }
}

module.exports = Sequence;
