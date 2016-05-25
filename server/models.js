var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'faraday',
        password: 'pass',
        database: 'faraday',
        charset: 'utf8'
    }
});
var Bookshelf = require('bookshelf')(knex);

//Department
var Department = Bookshelf.Model.extend({
    tableName: 'department',
    course: function () {
        return this.hasMany(Course);
    }
});

//Course
var Course = Bookshelf.Model.extend({
    tableName: 'course',
    department: function () {
        return this.belongsTo(Department);
    },
    section: function () {
        return this.hasMany(Section);
    }
});

//Section
var Section = Bookshelf.Model.extend({
    tableName: 'section',
    course: function () {
        return this.belongsTo(Course);
    },
    term: function () {
        return this.belongsTo(Term);
    }
});

//Term
var Term = Bookshelf.Model.extend({
    tableName: 'term',
    section: function () {
        return this.hasMany(Section);
    }
});

module.exports['Course'] = Course;
module.exports['Department'] = Department;
module.exports['Section'] = Section;
module.exports['Term'] = Term;

module.exports['Departments'] = Bookshelf.Collection.extend({
    model: Department
});

module.exports['Courses'] = Bookshelf.Collection.extend({
        model: Course
});

module.exports['Sections'] = Bookshelf.Collection.extend({
    model: Section
});

module.exports['Terms'] = Bookshelf.Collection.extend({
    model: Term
});
