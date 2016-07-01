'use strict';

const Model = require('objection').Model;
const db = require('../db');

class SectionSchedule extends Model {
    static get tableName() {
        return 'section_schedule';
    }

    static get relationMappings() {
        return {
            section: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Section',
                join: {
                    from: 'section_schedule.section_id',
                    to: 'section.id'
                }
            }
        }
    }
}

module.exports = SectionSchedule;
