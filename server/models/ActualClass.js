'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class ActualClass extends Model {
    static get tableName() { return 'actual_class'; }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = ActualClass;
