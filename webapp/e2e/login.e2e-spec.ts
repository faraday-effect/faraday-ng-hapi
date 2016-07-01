import { LoginPage } from './login.po';
import { expectToMatch, getBody, login, logout } from './utils';

describe('login page', () => {
  let page: LoginPage;
  let loginUrl = 'http://localhost:3000/login';

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should have title and fields', () => {
    let body = getBody();
    expectToMatch(body, /Login/);
    expectToMatch(body, /Email/);
    expectToMatch(body, /Password/);
  });

  it('should redirect after login', () => {
    login();
    expect(browser.getCurrentUrl()).not.toEqual(loginUrl);
  });

  /*
  it('should have first and last name and logout button in toolbar when logged in', () => {
    let bar = page.getToolbar();
    expectToMatch(bar, /Test Example/);
    expectToMatch(bar, /Log Out/);
  });

  it('should log out when logout button clicked', () => {
    logout();
    // let bar = page.getToolbar();
    expect(browser.getCurrentUrl()).toEqual(loginUrl);
  });
  */
});
