import { Course } from './course.model';

export class Section {
  id: number;
  course: Course;
  term_id: number;
  reg_number: string;
  title: string;
}
