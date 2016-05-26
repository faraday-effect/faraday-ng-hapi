import { FaradayPage } from './app.po';

describe('faraday App', function() {
  let page: FaradayPage;

  beforeEach(() => {
    page = new FaradayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('faraday works!');
  });
});
