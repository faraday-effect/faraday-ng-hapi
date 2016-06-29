'use strict';

const Model = require('objection').Model;
const db = require('../db');

class Section extends Model {
    static get tableName() { return 'section'; }

    static get relationMappings() {
        return {
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'section.id',
                    through: {
                        // modelClass: 'UserSection',
                        from: 'user_section.section_id',
                        to: 'user_section.user_id'
                    },
                    to: 'user.id'
                }
            },
            sequence: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Sequence',
                join: {
                    from: 'section.sequence_id',
                    to: 'sequence.id'
                }
            },
            term: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Term',
                join: {
                    from: 'section.term_id',
                    to: 'term.id'
                }
            },
            course: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Course',
                join: {
                    from: 'section.course_id',
                    to: 'course.id'
                }
            },
            sectionSchedule: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/SectionSchedule',
                join: {
                    from: 'section.id',
                    to: 'section_schedule.section_id'
                }
            },
            relationshipType: {
                relation: Model.ManyToManyRelation, 
                modelClass: __dirname + '/RelationshipType',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'user_section.section_id',
                        to: 'user_section.relationship_type_id',
                        extra: ['user_id']
                    },
                    to: 'relationship_type.id'
                }
            }
        }
    }
}

module.exports = Section;
