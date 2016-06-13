'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Section extends Model {
    static get tableName() { return 'section'; }

    static get relationMappings() {
        return {
            students: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Person',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'student.section_id',
                        to: 'student.person_id'
                    },
                    to: 'person.id'
                }
            },
            instructors: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Person',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'instructors.section_id',
                        to: 'instructors.person_id'
                    },
                    to: 'person.id'
                }
            },
            teaching_assistant: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Person',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'teaching_assistant.section_id',
                        to: 'teaching_assistant.person_id'
                    },
                    to: 'person.id'
                }
            },
            offering: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Offering',
                join: {
                    from: 'section.offering_id',
                    to: 'offering.id'
                }
            },
            actualClasses: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'section.id',
                    to: 'actual_class.section_id'
                }
            }
        }
    }
}

module.exports = Section;
