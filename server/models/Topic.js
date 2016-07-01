'use strict';

const db = require('../db');

class Topic extends db.Model {
    static get tableName() {
        return 'topic';
    }

    static get relationMappings() {
        return {
            offering: {
                relation: db.Model.BelongsToOneRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'topic.offering_id',
                    to: 'offering.id'
                }
            }
        }
    }
}

module.exports = Topic;
