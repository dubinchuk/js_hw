import { BasePage } from './base.page.js';

export class SalesPortalPage extends BasePage {
  readonly spinner = '.spinner-border';
  readonly secondarySpinner = '.spinner-border.text-secondary';
  readonly 'Notification label' = '.toast-body';
  readonly uniqueElement: string | undefined;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement!);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 20000, true);
  }
}
