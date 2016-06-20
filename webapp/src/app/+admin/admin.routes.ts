import { RouterConfig } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CourseComponent } from './+course';
import { CoursesComponent } from './+courses';
import { SectionComponent } from './+section';
import { SectionsComponent } from './+sections';
import { DepartmentComponent } from './+department';
import { DepartmentsComponent } from './+departments';
import { PrefixComponent } from './+prefix';
import { PrefixesComponent } from './+prefixes';
import { TermComponent } from './+term';
import { TermsComponent } from './+terms';
import { RegisterComponent } from './+register';

export const AdminRoutes: RouterConfig = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'courses' },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:id', component: CourseComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'sections/:id', component: SectionComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'departments/:id', component: DepartmentComponent },
      { path: 'prefixes', component: PrefixesComponent },
      { path: 'prefixes/:id', component: PrefixComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'terms/:id', component: TermComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
