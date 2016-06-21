'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Offering extends Model {
    static get tableName() { return 'offering'; }

    static get relationMappings() {
        return {
            sequence: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Sequence',
                join: {
                    from: 'offering.id',
                    to: 'sequence.offering_id'
                }
            },
            course: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Course',
                join: {
                    from: 'offering.course_id',
                    to: 'course.id'
                }
            },
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'offering.id',
                    through: {
                        from: 'user_relationship.offering_id',
                        to: 'user_relationship.user_id'
                    },
                    to: 'user.id'
                }
            },
            actualClass: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'offering.id',
                    to: 'actual_class.offering_id'
                }
            }
        }
    }
}

module.exports = Offering;
