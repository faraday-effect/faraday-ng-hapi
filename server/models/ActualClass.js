'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class ActualClass extends Model {
    static get tableName() { return 'actual_class'; }

    static get relationMappings() {
        return {
            currentClass: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'actual_class.id',
                    through: {
                        from: 'current_class.actual_class_id',
                        to: 'current_class.section_id'
                    },
                    to: 'section.id'
                }
            },
            section: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'actual_class.section_id',
                    to: 'section.id'
                }
            }
        }
    }
}

module.exports = ActualClass;
