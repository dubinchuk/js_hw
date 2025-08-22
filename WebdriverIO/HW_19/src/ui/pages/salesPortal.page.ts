import { logStep } from '../../utils/report/decorator.js';
import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  private readonly spinner = '.spinner-border';
  abstract readonly uniqueElement: string;
  private readonly 'Toast message' = '.toast-body';
  private readonly 'Close toast button' = '.d-flex .btn-close';

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }

  async getToastMessage() {
    const text = await this.getText(this['Toast message']);
    return text;
  }

  @logStep('Close toast message')
  async closeToastMessage() {
    await this.click(this['Close toast button']);
    await this.waitForElement(this['Toast message'], 10000, true);
  }
}
