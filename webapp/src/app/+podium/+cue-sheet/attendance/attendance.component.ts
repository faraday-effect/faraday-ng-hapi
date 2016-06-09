import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  AttendanceService,
  SectionService,
  Person,
  Section,
} from 'app/shared';

@Component({
  moduleId: module.id,
  selector: 'app-attendance',
  templateUrl: 'attendance.component.html',
  styleUrls: ['attendance.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_LIST_DIRECTIVES,
  ],
})
export class AttendanceComponent implements OnInit {

  students: Person[] = [];
  attending = {};
  classId: number;
  section_id: number;

  constructor(
    private http: Http,
    private sectionService: SectionService,
    private attendanceService: AttendanceService) {
  }

  ngOnInit() {
    this.sectionService.getSections()
        .toPromise()
        .then(sections => this.section_id = sections.sort()[4].id)
        .then(() => this.attendanceService.getStudents(this.section_id))
        .then(students => {
          this.students = students
          this.students.sort(
            (a, b) => a.first_name.localeCompare(b.first_name)
          );
        });

    this.attendanceService.handleArrive(ids => {
      for (let id of ids) {
        this.attending[id] = true;
      }
    });

    this.attendanceService.handleDepart(ids => {
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
    this.attendanceService.attend(id, this.classId);
  }

  depart(id: number) {
    this.attendanceService.depart(id, this.classId);
  }

  startClass() {
    let url = `http://localhost:3000/sections/${this.section_id}/today`;
    let msg = `{"section_id": ${this.section_id}}`;
    return this.http.post(url, msg)
               .toPromise()
               .then(response => response.json())
               .then(cl => this.classId = cl.id)
               .then(() => console.log("classId:", this.classId));
  }

}
