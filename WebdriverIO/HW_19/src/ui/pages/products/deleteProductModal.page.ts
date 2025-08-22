import { ModalPage } from '../modal.page.js';

export class DeleteProductModalPage extends ModalPage {
  readonly uniqueElement = '//h5[contains(text(),"Delete Product")]';

  async clickOnDeleteProductButton() {
    await this.clickOnSubmitButton();
  }

  async clickOnCancelDeleteProductButton() {
    await this.clickOnCancelButton();
  }

  async clickOnCloseDeleteProductButton() {
    await this.clickOnCloseButton();
  }
}
