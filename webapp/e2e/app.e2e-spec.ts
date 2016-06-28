import { FaradayPage } from './app.po';
import { expectToMatch } from './utils';

describe('faraday App', function() {
  let page: FaradayPage;

  beforeEach(() => {
    page = new FaradayPage();
    page.navigateTo();
  });

  it('should have toolbar with welcome and log in', () => {
    let bar = page.getToolbar();
    expectToMatch(bar, /Welcome to Faraday/);
    expectToMatch(bar, /Log In/);
  });

  it('should redirect to login', () => {
    expectToMatch(browser.getCurrentUrl(), /\/login$/);
  });
});
