import { FaradayPage } from './app.po';

describe('faraday App', function() {
  let page: FaradayPage;

  beforeEach(() => {
    page = new FaradayPage();
    page.navigateToRoot();
  });

  it('should display welcome', () => {
    expect(page.getTitle()).toEqual('Welcome to Faraday');
  });

  it('should show login', () => {
    let body = page.getBody();
    expect(body).toEqual(jasmine.stringMatching(/Login/));
    expect(body).toEqual(jasmine.stringMatching(/Email/));
    expect(body).toEqual(jasmine.stringMatching(/Password/));
  });

  it('should have link to log in', () => {
    expect(page.getToolbar()).toEqual(jasmine.stringMatching(/Log In/));
  });
});
