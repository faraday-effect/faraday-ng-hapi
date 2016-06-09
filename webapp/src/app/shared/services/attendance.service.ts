import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Person } from '../models';
import { NesService } from '../services';
import { SectionsUrl, AttendanceUrl } from './constants';

@Injectable()
export class AttendanceService {

  classCode = "000000";

  arriveHandler: Function;
  departHandler: Function;

  constructor(
    private nesService: NesService,
    private http: Http) {
      this.nesService.subscribe('/attendence', msg => this.arriveHandler([msg.id]));
  }

  getStudents(id) {
    return this.http.get(SectionsUrl+`/${id}/students`)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleArrive(handler: Function) {
    this.arriveHandler = handler;
  }

  handleDepart(handler: Function) {
    this.departHandler = handler;
  }

  attend(id: number, classId: number) {
    let message = JSON.stringify({
      student_id: id,
      actual_class_id: classId,
      code: this.classCode,
    });
    console.log(message);
    this.http.post(AttendanceUrl, message)
        .toPromise()
        .then(response => response.json());
  }

  depart(id: number, classId: number) {
    this.departHandler([id]);
  }

  handleError(err) {
    console.log("AttendanceService", err);
  }

}
