export class FaradayPage {
  navigateTo() {
    return browser.get('/');
  }

  getToolbar() {
    return $('nav').getText();
  }

  getTitle() {
    return $('.brand-logo').getText();
  }
}
