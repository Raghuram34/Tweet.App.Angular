import { browser, by, element, logging, protractor, until } from 'protractor';
import { AppPage } from './app.po';
import { LoginPage } from './login.po';

describe('TweetApp App Login Flow', () => {
  let page: AppPage;
  let loginPage: LoginPage;
  const EC = protractor.ExpectedConditions;


  beforeAll(() => {
    page = new AppPage();
    loginPage = new LoginPage();
  });

  it('should display correct App Name', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('TweetApp');
  });

  it('should not login to the app with invalid credentials', async () => {
    loginPage.invalidLogin();
    await browser.driver.wait(until.elementLocated(by.css('app-toast-message div.toast-message')));
    
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+"user/login");
    await checkError(true);
  })

  it('should login to the app with valid credentials', async () => {
    loginPage.loginToApp();
    await browser.driver.wait(until.elementLocated(by.css('app-header a[aria-label=home]')));
    
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+"home");
    await checkError();
  })

  it('should navigate to My Tweets Page', async () => {
    const ele = element(by.css('app-header a[aria-label=my-tweets]'));
    expect(await ele.getText()).toEqual('My Tweets');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'home/my-tweets');
  });

  it('should navigate to All users Page', async () => {
    const ele = element(by.css('app-header a[aria-label=all-users]'));
    expect(await ele.getText()).toEqual('All Users');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'users/all');
  });

  it('should navigate to Change password page', async () => {
    await loginPage.goToChangePasswordAction();
  });

  it('should navigate to Home Page', async () => {
    const ele = element(by.css('app-header a[aria-label=home]'));
    expect(await ele.getText()).toEqual('Home');
    await ele.click();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'home');

    // The home page should contain 
  });

  async function checkError(flag = false) {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    if(!flag) {
      expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry));
    }
    else {
      expect(logs.length).toBeGreaterThanOrEqual(1);
      expect(logs[0].level).toEqual(logging.Level.SEVERE);
    }
  }
});
