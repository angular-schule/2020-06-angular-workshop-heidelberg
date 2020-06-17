import { browser, $ } from 'protractor';

describe('dpunkt.verlag', () => {

  beforeAll(() => browser.waitForAngularEnabled(false));

  it('should just call it Angular', () => {
    browser.get('https://dpunkt.de/book_details.php?masterid=12400');
    const heading = $('h1');
    expect(heading.getText()).toEqual('Angular');
    expect(heading.getText()).not.toEqual('AngularJS');
  });

  afterAll(() => browser.waitForAngularEnabled(true));
});
