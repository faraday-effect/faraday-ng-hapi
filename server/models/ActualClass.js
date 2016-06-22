'use strict';

const Model = require('objection').Model;
const db = require('../db');

class ActualClass extends Model {
    static get tableName() { return 'actual_class'; }

    static get relationMappings() {
        return {
            sequence: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Sequence',
                join: {
                    from: 'actual_class.sequence_id',
                    to: 'sequence.id'
                }
            }
        }
    }
}

module.exports = ActualClass;
