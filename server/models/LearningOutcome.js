'use strict';

const db = require('../db');

class LearningOutcome extends db.Model {
    static get tableName() {
        return 'learning_outcome';
    }

    static get relationMappings() {
        return {
            knowledgeAreas: {
                relation: db.Model.BelongsToOneRelation,
                modelClass: __dirname + '/KnowledgeArea',
                join: {
                    from: 'learning_outcome.knowledge_area_id',
                    to: 'knowledge_area.id'
                }
            },
            offerings: {
                relation: db.Model.ManyToManyRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'learning_outcome.id',
                    through: {
                        from: 'offering_outcome.learning_outcome_id',
                        to: 'offering_outcome.offering_id',
                        extra: ['discussion']
                    },
                    to: 'offering.id'
                }
            }
        }
    }
}

module.exports = LearningOutcome;
