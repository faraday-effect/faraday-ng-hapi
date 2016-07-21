import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

const COURSES = [
  {
    id: 1,
    prefix: "COS",
    number: "120",
    title: "Introduction to Computational Problem Solving",
    teacher: "Art White",
    schedule: [["10:00 - 10:50", "MWF"], ["09:00 - 09:50", "R"]],
    start_time: "10:00 AM",
    stop_time: "10:50 AM",
    role: "teacher",
  },
  {
    id: 25,
    prefix: "COS",
    number: "121",
    title: "Foundations of Computer Science",
    teacher: "Stefan Brandle",
    schedule: [["13:00 - 13:50", "MWF"]],
    role: "student",
  },
  {
    id: 9,
    prefix: "SYS",
    number: "101",
    title: "Introduction to Systems",
    teacher: "Bill Bauson",
    schedule: [["14:00 - 17:50", "TR"]],
    role: "teacher",
  },
  {
    id: 10,
    prefix: "SYS",
    number: "101",
    title: "Introduction to Systems",
    teacher: "Bill Bauson",
    schedule: [["14:00 - 17:50", "TR"]],
    role: "teacher",
  },
  {
    id: 2,
    prefix: "PHY",
    number: "211",
    title: "University Physics I",
    teacher: "Bob Davis",
    schedule: [["14:00 - 17:50", "TR"]],
    role: "student",
  },
];

const ALL_COURSES = [
  {
    id: 1,
    prefix: "PHY",
    number: "211",
    title: "University Physics I",
    sections: [
      { id: 1, schedule: [["14:00 - 17:50", "TR"], ["12:00 - 12:50", "MWF"]], credits: 1, teacher: "Bob Davis" },
      { id: 2, schedule: [["14:00 - 17:50", "TR"]], credits: 2, teacher: "Bob Davis" },
      { id: 3, schedule: [["14:00 - 17:50", "TR"]], credits: 3, teacher: "Bob Davis" },
    ],
  },
  {
    id: 2,
    prefix: "PHY",
    number: "212",
    title: "University Physics II",
    sections: [
      { id: 4, schedule: [["14:00 - 17:50", "TR"]], credits: 4, teacher: "Bob Davis" },
      { id: 5, schedule: [["14:00 - 17:50", "TR"]], credits: 5, teacher: "Bob Davis" },
      { id: 6, schedule: [["14:00 - 17:50", "TR"]], credits: 5, teacher: "Bob Davis" },
    ],
  },
  {
    id: 3,
    prefix: "CHM",
    number: "211",
    title: "University Chemistry I",
    sections: [
      { id: 7, schedule: [["14:00 - 17:50", "TR"]], credits: 1, teacher: "Dr. Kroll" },
      { id: 8, schedule: [["14:00 - 17:50", "TR"]], credits: 2, teacher: "Dr. Kroll" },
      { id: 9, schedule: [["14:00 - 17:50", "TR"]], credits: 3, teacher: "Dr. Kroll" },
    ],
  },
  {
    id: 4,
    prefix: "COS",
    number: "120",
    title: "Introduction to Computational Problem Solving",
    sections: [
      { id: 10, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 11, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 12, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 13, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 15, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 16, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 17, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 18, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 19, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 20, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 21, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 22, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 23, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 24, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
      { id: 25, schedule: [["09:00 - 09:50", "MWF"]], credits: 4, teacher: "Art White" },
    ],
  },
];

@Injectable()
export class CourseService {

  num: number;

  constructor(private http: Http) {}

  getCourses() {
    let sectionsUrl = 'http://localhost:3000/sections';
    let coursesUrl  = 'http://localhost:3000/courses';
    let sections = {}, courses = {};
    return this.http.get(sectionsUrl)
        .map(res => {
          for (let sec of res.json()) {
            sections[sec.id] = sec;
          }
        })
        .flatMap(() => this.http.get(coursesUrl))
        .map(res => {
          for (let cour of res.json()) {
            courses[cour.id] = cour;
          }
        })
        .map(() => {
          // console.log(courses);
          // console.log(sections);
          let result = [];
          for (let id in sections) {
            let sched_table = {};
            for (let day of sections[id].sectionSchedule) {
              let wd;
              switch (day.weekday) {
                case 'Monday':    wd = 'M'; break;
                case 'Tuesday':   wd = 'T'; break;
                case 'Wednesday': wd = 'W'; break;
                case 'Thursday':  wd = 'R'; break;
                case 'Friday':    wd = 'F'; break;
                case 'Saturday':  wd = 'S'; break;
                case 'Sunday':    wd = 'U'; break;
              }
              let time = `${day.start_time.slice(0, 5)} - ${day.stop_time.slice(0, 5)}`;
              if (sched_table[time] === undefined) sched_table[time] = '';
              sched_table[time] += wd;
            }
            let sched = Object.keys(sched_table).map(k => [k, sched_table[k]]);
            let course_id = sections[id].course_id;
            result.push({
              id: id,
              prefix: courses[course_id].prefix.name,
              number: courses[course_id].number,
              title: courses[course_id].title,
              teacher: 'Dr. TODO',
              schedule: sched,
              role: sections[id].relationshipType.title,
            });
          }
          console.log(result);
          return result;
        });
  // { id: 1, prefix: "COS", number: "120", title: "Solving", teacher: "Art White", start_time: "10:00 AM", stop_time: "10:50 AM", days: "MWF", role: "teacher", },
    // let obj = {id:1, prefix: "", number: this.num, title: "", teacher: "", start_time: "", stop_time: "", days: "", role: "student"};
    // return Observable.of(CLASSES.concat([obj]));
    // return Observable.of(COURSES);
  }

  getAllCourses() {
    return Observable.of(ALL_COURSES);
  }

}
