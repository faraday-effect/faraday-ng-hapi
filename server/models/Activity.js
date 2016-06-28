'use strict';

const db = require('../db');

class Activity extends db.Model {
    static get tableName() {
        return 'activity';
    }

    static get relationMappings() {
        return {
            topic: {
                relation: db.Model.BelongsToOneRelation,
                modelClass: __dirname + '/Topic',
                join: {
                    from: 'activity.topic_id',
                    to: 'topic.id'
                }
            }
        }
    }
}

module.exports = Activity;
