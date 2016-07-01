import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import {
  ClassService,
  Person,
  Section,
} from 'app/shared';
import { CourseService } from '../../../course.service';

@Component({
  moduleId: module.id,
  selector: 'app-attendance',
  templateUrl: 'attendance.component.html',
  styleUrls: ['attendance.component.css'],
  directives: [],
  providers: [CourseService],
})
export class AttendanceComponent implements OnInit {

  students: Person[] = [];
  attending = {};
  classId: number;
  section_id: number;

  constructor(
    private courseService: CourseService,
    private http: Http,
    private route: ActivatedRoute,
    private classService: ClassService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.section_id = +params['id'];
      this.classService.getStudents(this.section_id).subscribe(students => {
        students.sort(
          (a, b) => a.first_name.localeCompare(b.first_name)
        );
        this.students = students;
        this.classService.subscribeToAttendance(this.section_id);
      });
    });

    this.classService.handleAttend(obj => {
      if (this.attending[obj.user_id] == undefined && obj.present) {
        this.attending[obj.user_id] = 'present';
      } else if (this.attending[obj.user_id] == 'present' && ! obj.present) {
        this.attending[obj.user_id] = 'left';
      }
    });
  }

  getAbsent() {
    return this.students.filter(s => this.attending[s.id] === undefined);
  }

  getPresent() {
    return this.students.filter(s => this.attending[s.id] === 'present');
  }

  getLeft() {
    return this.students.filter(s => this.attending[s.id] === 'left');
  }

  attend(id: number) {
    this.classService.attend(id, this.section_id, '000000');
  }

  leave(id: number) {
    this.classService.leave(id, this.section_id);
  }

  startClass() {
    let url = `http://localhost:3000/sections/${this.section_id}/classes`;
    return this.http.post(url, '').subscribe();
  }

  stopClass() {
    let url = `http://localhost:3000/sections/${this.section_id}/classes`;
    return this.http.delete(url).subscribe();
  }

}
