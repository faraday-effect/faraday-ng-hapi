export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getEmail() {
    return $('#email');
  }

  getPassword() {
    return $('#password');
  }

  getLoginButton() {
    return element(by.linkText('LOGIN'));
  }

  getLogoutButton() {
    return element(by.linkText('Log Out'));
  }

  getToolbar() {
    return $('nav').getText();
  }
}
