import { ModalPage } from '../modal.page.js';

export class ProductDetailsModalPage extends ModalPage {
  readonly uniqueElement = '//h5[contains(text(),"Details")]';

  private readonly 'Value by property name' = (name: string) => `//h6[contains(.,"${name}")]/following::p[1]`;
  private readonly 'Name value' = `${this['Value by property name']('Name:')}`;
  private readonly 'Amount value' = `${this['Value by property name']('Amount:')}`;
  private readonly 'Price value' = `${this['Value by property name']('Price:')}`;
  private readonly 'Manufacturer value' = `${this['Value by property name']('Manufacturer:')}`;
  private readonly 'Created On value' = `${this['Value by property name']('Created On:')}`;
  private readonly 'Notes value' = `${this['Value by property name']('Notes:')}`;

  async getCreatedProduct() {
    const [name, amount, price, manufacturer, createdOn, notes] = await Promise.all([
      this.getText(this['Name value']),
      this.getText(this['Amount value']),
      this.getText(this['Price value']),
      this.getText(this['Manufacturer value']),
      this.getText(this['Created On value']),
      this.getText(this['Notes value']),
    ]);

    return { name, amount: +amount, price: +price, manufacturer, createdOn, notes };
  }

  async clickOnEditProductButton() {
    await this.clickOnSubmitButton();
  }

  async clickOnCancelProductDetailsButton() {
    await this.clickOnCancelButton();
  }

  async clickOnCloseProductDetailsButton() {
    await this.clickOnCloseButton();
  }
}
