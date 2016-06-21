import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { ClassService } from './class.service';

@Component({
  moduleId: module.id,
  selector: 'app-classes',
  templateUrl: 'classes.component.html',
  styleUrls: ['classes.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ClassService],
})
export class ClassesComponent implements OnInit {

  classes: Observable<any>;
  courses: Observable<any>;
  enrolled = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService) {}

  ngOnInit() {
    this.classes = this.classService.getClasses();
    this.courses = this.classService.getCourses();
    this.classes.subscribe(classes => {
      this.enrolled = {};
      for (let c of classes) {
        this.enrolled[c.id] = true;
      }
    });
  }

  attendClass(id: number) {
    console.log(`Attending ${id}!`);
    this.router.navigate([id, 'participant'], {relativeTo: this.route});
  }

  canAttend(id: number) {
    return id != 25;
  }

  canEnroll(id: number) {
    return !this.enrolled[id];
  }

  enroll(id: number) {
    console.log(`Enrolling in ${id}!`);
    this.classes.retry().delay(1000);
  }

  withdraw(id: number) {
    console.log(`Withdrawing from ${id}!`);
  }

}
