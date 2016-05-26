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
    },
    department_prefix: function () {
        return this.hasMany(department_prefix);
    }
});

//Prefix
var Prefix = Bookshelf.Model.extend({
    tableName: 'prefix',
    department_prefix: function () {
        return this.hasMany(department_prefix);
    },
    course: function () {
        return this.hasMany(Course);
    }
});

//Department_prefix
var Department_Prefix = Bookshelf.Model.extend({
    tableName: 'department_prefix',
    department: function () {
        return this.belongsTo(Department);
    },
    prefix: function () {
        return this.belongsTo(Prefix)
    }
});

//Course
var Course = Bookshelf.Model.extend({
    tableName: 'course',
    department: function () {
        return this.belongsTo(Department);
    },
    sections: function () {
        return this.hasMany(Section);
    },
    prefix: function () {
        return this.belongsTo(Prefix);
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

module.exports['Prefix'] = Prefix;
module.exports['Term'] = Term;
module.exports['Course'] = Course;
module.exports['Department'] = Department;
module.exports['Department_Prefix'] = Department_Prefix;
module.exports['Section'] = Section;

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
