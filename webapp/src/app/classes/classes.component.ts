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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService) {}

  ngOnInit() {
    this.classes = this.classService.getClasses();
    this.courses = this.classService.getCourses();
  }

  attendClass(id: number) {
    console.log("Attending!", id);
    this.router.navigate([id, 'participant'], {relativeTo: this.route});
  }

}
