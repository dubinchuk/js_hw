import { ElementOrSelector } from '../../data/types/selector.types.js';

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

  protected async click(locator: ElementOrSelector, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.click();
  }

  protected async setValue(locator: ElementOrSelector, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
  }

  protected async getText(locator: ElementOrSelector, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    return await element.getText();
  }

  protected async selectDropdownValue(
    dropdownLocator: ElementOrSelector,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ) {
    const element = await this.waitForElement(dropdownLocator, timeout);
    await element.selectByVisibleText(value);
  }

  async openPage(url: string) {
    await browser.url(url);
  }
}
