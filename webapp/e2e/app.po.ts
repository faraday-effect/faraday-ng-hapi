export class FaradayPage {
  navigateToRoot() {
    return browser.get('/');
  }

  getToolbar() {
    return $('nav').getText();
  }

  getTitle() {
    return $('.brand-logo').getText();
  }

  getBody() {
    return $('body').getText();
  }
}
