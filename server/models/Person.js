'use strict';

const Model = require('objection').Model;

class Person extends Model {
    static get tableName() { return 'person'; }
}

module.exports = Person;
