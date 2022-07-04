import { browser, by, element } from 'protractor';

export class LoginPage {
  loginToApp() {
    const emailInput = element(by.css('app-login input[type=email]'));
    const passwordInput = element(by.css('app-login input[type=password]'));
    const loginBtn = element(by.css('app-login button'))
    emailInput.clear();
    passwordInput.clear();

    // Add values
    emailInput.sendKeys('rahaneajinkya534@gmail.com');
    passwordInput.sendKeys('Raghuram123');
    loginBtn.click();
  }

  invalidLogin() {
    const emailInput = element(by.css('app-login input[type=email]'));
    const passwordInput = element(by.css('app-login input[type=password]'));
    const loginBtn = element(by.css('app-login button'))
    emailInput.clear();
    passwordInput.clear();

    // Add values
    emailInput.sendKeys('rahaneajinkya534@gmail.com');
    passwordInput.sendKeys('Raghuram1236');
    loginBtn.click();
  }

  async goToChangePasswordAction() {
    const ele = element(by.css('app-header a.profile'));
    expect(await ele.getText()).toEqual('Profile');

    //Click to open profile menu
    await ele.click();

    // Check whether the profile menu is available or not.
    expect(await element(by.css('app-header app-profile-menu')).isPresent()).toBe(true);
    const cpElement =  element(by.css('app-profile-menu button[aria-label=change-password]'));
    await cpElement.click();

    // Assert change-password login page
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'user/change-password');
    expect(await element(by.css('app-header app-profile-menu')).isPresent()).toBe(false);
  }
}
