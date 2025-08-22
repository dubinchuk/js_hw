import { ElementOrSelector } from '../../data/types/selector.types.js';
import { logAction } from '../../utils/report/decorator.js';

const TIMEOUT_5_SECS = 5000;

function isSelectorString(elementOrSelector: ElementOrSelector): elementOrSelector is string {
  return typeof elementOrSelector === 'string';
}

export abstract class BasePage {
  protected async findElement(locator: ElementOrSelector) {
    return isSelectorString(locator) ? await $(locator) : locator;
  }

  protected async waitForElement(locator: ElementOrSelector, timeout = TIMEOUT_5_SECS, reverse = false) {
    const element = await this.findElement(locator);
    await element.waitForDisplayed({ timeout, reverse });
    return element;
  }

  @logAction('Click on element with selector {selector}')
  protected async click(locator: ElementOrSelector, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.click();
  }

  @logAction('Set {text} into element with selector {selector}')
  protected async setValue(locator: ElementOrSelector, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
  }

  protected async getText(locator: string, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    return await element.getText();
  }

  @logAction('Select dropdown value from {selector}')
  protected async selectDropdownValue(
    dropdownLocator: ElementOrSelector,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ) {
    const element = await this.waitForElement(dropdownLocator, timeout);
    await element.selectByVisibleText(value);
  }

  @logAction('Open URL {selector}')
  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }

  async waitForEnabled(locator: ElementOrSelector, timeout = TIMEOUT_5_SECS, reverse = false) {
    const element = await this.findElement(locator);
    await element.waitForEnabled({ timeout, reverse });
    return element;
  }
}
