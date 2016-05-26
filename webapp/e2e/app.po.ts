export class FaradayPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('faraday-app h1')).getText();
  }
}
