import { SalesPortalPage } from './salesPortal.page.js';

export abstract class ModalPage extends SalesPortalPage {
  private readonly 'Submit button' = '.modal.show button.mr-10';
  private readonly 'Cancel button' = '.modal.show button.btn-secondary';
  private readonly 'Close button' = '.modal.show button.btn-close';

  protected async clickOnSubmitButton() {
    await this.click(this['Submit button']);
  }

  protected async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  protected async clickOnCloseButton() {
    await this.click(this['Close button']);
  }
}
