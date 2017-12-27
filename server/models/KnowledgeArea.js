'use strict';

const db = require('../db');

class KnowledgeArea extends db.Model {
    static get tableName() {
        return 'knowledge_area';
    }

    static get relationMappings() {
        return {
            learningOutcome: {
                relation: db.Model.HasManyRelation,
                modelClass: __dirname + '/LearningOutcome',
                join: {
                    from: 'knowledge_area.id',
                    to: 'learning_outcome.knowledge_area_id'
                }
            }
        }
    }
}

module.exports = KnowledgeArea;
