import { LoginPage } from './login.po';
import { expectToMatch, getBody, login } from './utils';

describe('login page', () => {
  let page: LoginPage, loginUrl;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
    loginUrl = browser.getCurrentUrl();
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

  it('should have first and last name and logout button in toolbar when logged in', () => {
    let bar = page.getToolbar();
    expectToMatch(bar, /first last/);
    expectToMatch(bar, /Log Out/);
  });

  it('should log out when logout button clicked', () => {
    let logoutButton = page.getLogoutButton();
    logoutButton.click();
    let bar = page.getToolbar();
    expectToMatch(bar, /Log In/);
  });
});
