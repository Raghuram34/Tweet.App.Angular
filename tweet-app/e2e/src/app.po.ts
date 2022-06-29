import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(path: any=""): Promise<unknown> {
    return browser.get(browser.baseUrl+ path);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root app-header .tweet-logo')).getText();
  }
}
