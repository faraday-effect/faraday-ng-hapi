import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import {
  ClassService,
  Person,
  Section,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-attendance',
  templateUrl: 'attendance.component.html',
  styleUrls: ['attendance.component.css'],
  directives: [],
})
export class AttendanceComponent implements OnInit {

  students: Person[] = [];
  attending = {};
  classId: number;
  section_id: number;

  constructor(
    private http: Http,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.classService.getSections()
        .toPromise()
        .then(sections => this.section_id = 1)
        .then(() => this.classService.getStudents(this.section_id))
        .then(students => {
          this.students = students;
          this.students.sort(
            (a, b) => a.first_name.localeCompare(b.first_name)
          );
        });

    this.classService.handleArrive(ids => {
      for (let id of ids) {
        this.attending[id] = true;
      }
    });

    this.classService.handleDepart(ids => {
      for (let id of ids) {
        this.attending[id] = false;
      }
    });
  }

  getPresent() {
    return this.students.filter(s => this.attending[s.id]);
  }

  getAbsent() {
    return this.students.filter(s => ! this.attending[s.id]);
  }

  attend(id: number) {
    this.classService.attend(id, this.classId);
  }

  depart(id: number) {
    this.classService.depart(id, this.classId);
  }

  startClass() {
    let url = `http://localhost:3000/sections/${this.section_id}/today`;
    let msg = `{"section_id": ${this.section_id}}`;
    return this.http.post(url, msg)
               .toPromise()
               .then(response => response.json())
               .then(cl => this.classId = cl.id);
  }

}
