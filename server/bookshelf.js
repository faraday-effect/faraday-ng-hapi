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
        return this.hasMany(Department_Prefix);
    }
});

//Prefix
var Prefix = Bookshelf.Model.extend({
    tableName: 'prefix',
    department_prefix: function () {
        return this.hasMany(Department_Prefix);
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
        return this.hasMany(Offering);
    },
    prefix: function () {
        return this.belongsTo(Prefix);
    }
});

//Section
var Section = Bookshelf.Model.extend({
    tableName: 'section',
    course: function () {
        return this.belongsTo(Offering);
    },
    term: function () {
        return this.belongsTo(Term);
    },
    actual_class: function () {
        return this.hasMany(Actual_Class);
    },
    section_weekday: function () {
        return this.hasMany(Section_Weekday);
    },
    instructor: function () {
        return this.hasMany(Instructor);
    },
    teaching_assistant: function () {
        return this.hasMany(Teaching_Assistant);
    },
    student: function () {
        return this.hasMany(Student);
    }
});

//Offering
var Offering = Bookshelf.Model.extend({
    tableName: 'offering',
    course: function () {
        return this.belongsTo(Course);
    },
    term: function () {
        return this.belongsTo(Term)
    },
    planned_class: function () {
        return this.hasMany(Planned_Class);
    }
});

//Planned Class
var Planned_Class = Bookshelf.Model.extend({
    tableName: 'planned_class',
    offering: function () {
        return this.belongsTo(Offering);
    }
});

//Actual Class
var Actual_Class = Bookshelf.Model.extend({
    tableName: 'actual_class',
    section_id: function () {
        return this.belongsTo(Section);
    },
    attendance: function () {
        return this.hasMany(Attendance);
    }
});

//Term
var Term = Bookshelf.Model.extend({
    tableName: 'term',
    section: function () {
        return this.hasMany(Offering);
    },
    holiday: function () {
        return this.hasMany(Holiday);
    }
});

//Holiday
var Holiday = Bookshelf.Model.extend({
    tableName: 'holiday',
    term: function () {
        return this.belongsTo(Term);
    }
});

//Weekday
var Weekday = Bookshelf.Model.extend({
    tableName: 'weekday',
    offering_weekday: function () {
        return this.hasMany(Offering_Weekday);
    },
    section_weekday: function () {
        return this.belongsTo(Section_Weekday);
    }
});

//Offering_Weekday
var Offering_Weekday = Bookshelf.Model.extend({
    tableName: 'offering_weekday',
    weekday: function () {
        return this.belongsTo(Weekday);
    },
    offering: function () {
        return this.belongsTo(Offering);
    }
});

//Section_Weekday
var Section_Weekday = Bookshelf.Model.extend({
    tableName: 'section_weekday',
    weekday: function () {
        return this.belongsTo(Weekday);
    },
    offering: function () {
        return this.belongsTo(Section);
    }
});

//Person
var Person = Bookshelf.Model.extend({
    tableName: 'person',
    person_role: function () {
        return this.hasMany(Person_Role);
    },
    instructor: function () {
        return this.hasMany(Instructor);
    },
    teaching_assistant: function () {
        return this.hasMany(Teaching_Assistant);
    },
    student: function () {
        return this.hasMany(Student);
    }
});

//Instructor
var Instructor = Bookshelf.Model.extend({
    tableName: 'instructor',
    section: function () {
        return this.belongsTo(Section);
    },
    person: function () {
        return this.belongsTo(Person);
    }
});

//Teaching_Assistant
var Teaching_Assistant = Bookshelf.Model.extend({
    tableName: 'teaching_assistant',
    section: function () {
        return this.belongsTo(Section);
    },
    person: function () {
        return this.belongsTo(Person);
    }
});

//Student
var Student = Bookshelf.Model.extend({
    tableName: 'student',
    section: function () {
        return this.belongsTo(Section);
    },
    person: function () {
        return this.belongsTo(Person);
    },
    attendance: function () {
        return this.hasMany(Attendance);
    }
});

//Attendance
var Attendance = Bookshelf.Model.extend({
    tableName: 'attendance',
    student: function () {
        return this.belongsTo(Student);
    },
    actual_class: function () {
        return this.belongsTo(Actual_Class);
    }
});

//Role
var Role = Bookshelf.Model.extend({
    tableName: 'role',
    person_role: function () {
        return this.hasMany(Person_Role);
    }
});

//Person_Role
var Person_Role = Bookshelf.Model.extend({
    tableName: 'person_role',
    role: function () {
        return this.belongsTo(Role);
    },
    person: function () {
        return this.belongsTo(Person)
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

module.exports['Department_Prefixes'] = Bookshelf.Collection.extend({
    model: Department_Prefix
});

module.exports['Courses'] = Bookshelf.Collection.extend({
        model: Course
});

module.exports['Prefixes'] = Bookshelf.Collection.extend({
    model: Prefix
});

module.exports['Sections'] = Bookshelf.Collection.extend({
    model: Section
});

module.exports['Terms'] = Bookshelf.Collection.extend({
    model: Term
});
