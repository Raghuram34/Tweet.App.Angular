import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('TweetApp App Login Flow', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  it('should display correct App Name', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('TweetApp');
  });

  it('should navigato to Home Page', async () => {
    const ele = element(by.css('app-header a[aria-label=home]'));
    expect(await ele.getText()).toEqual('Home');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'home');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
