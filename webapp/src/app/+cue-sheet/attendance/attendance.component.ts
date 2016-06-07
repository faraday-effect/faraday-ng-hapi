import { Component, OnInit } from '@angular/core';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import {
  AttendanceService,
  Person,
} from '../../shared';

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

  constructor(
    private attendanceService: AttendanceService) {
  }

  ngOnInit() {
    let sectionId = 41;
    this.attendanceService.getStudents(sectionId).then(
      students => {
        this.students = students
        this.students.sort(
          (a, b) => a.first_name.localeCompare(b.first_name)
        );
      }
    );

    this.attendanceService.handleArrive(
      ids => {
        for (let id of ids) {
          this.attending[id] = true;
        }
      }
    );

    this.attendanceService.handleDepart(
      ids => {
        for (let id of ids) {
          this.attending[id] = false;
        }
      }
    );
  }

  getPresent() {
    return this.students.filter(s => this.attending[s.id]);
  }

  getAbsent() {
    return this.students.filter(s => ! this.attending[s.id]);
  }

  attend(id: number) {
    this.attendanceService.attend(id);
  }

  depart(id: number) {
    this.attendanceService.depart(id);
  }

}
