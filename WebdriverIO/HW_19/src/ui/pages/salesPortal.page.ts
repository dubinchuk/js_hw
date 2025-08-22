import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = '.spinner-border';
  abstract readonly uniqueElement: string;
  protected readonly toastMessage = '.toast-body';
  protected readonly closeButton = '.d-flex .btn-close';

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }

  async getToastMessage() {
    const text = await this.getText(this.toastMessage);
    return text;
  }

  async closeToastMessage() {
    await this.click(this.closeButton);
    await this.waitForElement(this.toastMessage, 10000, true);
  }
}
