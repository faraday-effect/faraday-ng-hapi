import { CoursesPage } from './courses.po';
import { expectToMatch, getBody, login, logout } from './utils';

describe('courses page', () => {
  let page: CoursesPage;

  beforeAll(login);
  afterAll(logout);
  
  beforeEach(() => {
    page = new CoursesPage();
    page.navigateTo();
  });

  it('should show headers for my courses and all courses', () => {
    let body = getBody();
    expectToMatch(body, /My Courses/);
    expectToMatch(body, /All Courses/);
  });

  it('should have attend, teach, and enroll buttons', () => {
    let attendButton = element(by.linkText('ATTEND'));
    let teachButton = element(by.linkText('TEACH'));
    let enrollButton = element(by.linkText('ENROLL'));
    expect(attendButton).toBeTruthy();
    expect(teachButton).toBeTruthy();
    expect(enrollButton).toBeTruthy();
  });
});
