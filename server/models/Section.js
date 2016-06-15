'use strict';

const Model = require('objection').Model;
const db = require('./../db')

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
                        from: 'user_relationship.section_id',
                        to: 'user_relationship.user_id'
                    },
                    to: 'user.id'
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
            term: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Term',
                join: {
                    from: 'section.term_id',
                    to: 'term.id'
                }
            },
            course: {
                relation: Model.OneToOneRelation,
                modelClass: __dirname + '/Course',
                join: {
                    from: 'section.course_id',
                    to: 'course.id'
                }
            }
        }
    }
}

module.exports = Section;
