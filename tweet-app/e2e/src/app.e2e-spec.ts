import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('TweetApp App', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  it('should display correct App Name', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('TweetApp');
  });

  it('should navigate to Signup Page', async () => {
    const ele = element(by.css('app-header a[aria-label=signup]'));
    expect(await ele.getText()).toEqual('Sign Up');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'user/signup');
  });

  it('should navigate to Forgot password page', async () => {
    await page.navigateTo();
    const ele = element(by.css('app-login a[aria-label=forgot-password]'));
    expect(await ele.getText()).toEqual('Forgot Password?');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'user/forgot-password');
  });

  it('should navigate to Login Page', async () => {
    const ele = element(by.css('app-header a[aria-label=login]'));
    expect(await ele.getText()).toEqual('Login');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'user/login');
  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
