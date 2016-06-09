'use strict';

const Model = require('objection').Model;
const db = require('./../db')

class Person extends Model {
    static get tableName() { return 'person'; }
}

module.exports = Person;
