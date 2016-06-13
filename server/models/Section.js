'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Section extends Model {
    static get tableName() { return 'section'; }

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'section.id',
                    through: {
                        modelClass: __dirname + '/Member',
                        from: 'member.section_id',
                        to: 'member.user_id'
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
            actualClasses: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'section.id',
                    to: 'actual_class.section_id'
                }
            },
            members: {
                relation: Model.OneToManyRelation,
                modelClass: __dirname + '/Member',
                join: {
                    from: 'section.id',
                    to: 'member.section_id',
                }
            },
            currentClass: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/ActualClass',
                join: {
                    from: 'section.id',
                    through: {
                        from: 'current_class.section_id',
                        to: 'current_class.actual_class_id'
                    },
                    to: 'actual_class.id'
                }
            }
        }
    }
}

module.exports = Section;
