import { SalesPortalPage } from '../salesPortal.page.js';

export class ProductsPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Products List "]';

  private readonly 'Add New Product button' = 'button.page-title-header';
  private readonly 'Table row selector' = (product: string) => `//tr[./td[text()="${product}"]]`;
  private readonly 'Price by table row' = (product: string) => `${this['Table row selector'](product)}/td[2]`;
  private readonly 'Manufacturer by table row' = (product: string) => `${this['Table row selector'](product)}/td[3]`;
  private readonly 'Actions by product name' = (product: string) => `${this['Table row selector'](product)}/td[5]`;
  private readonly 'Details button by product name' = (product: string) =>
    `${this['Actions by product name'](product)}//button[@title="Details"]`;
  private readonly 'Edit button by product name' = (product: string) =>
    `${this['Actions by product name'](product)}//button[@title="Edit"]`;
  private readonly 'Delete button by product name' = (product: string) =>
    `${this['Actions by product name'](product)}//button[@title="Delete"]`;

  async clickOnAddNewProduct() {
    await this.click(this['Add New Product button']);
  }

  async getDataByName(name: string) {
    const [price, manufacturer] = await Promise.all([
      this.getText(this['Price by table row'](name)),
      this.getText(this['Manufacturer by table row'](name))
    ]);
    return { name, price: +price.replace('$', ''), manufacturer };
  }

  async clickOnProductDetails(product: string) {
    await this.click(this['Details button by product name'](product));
  }

  async clickOnEditProduct(product: string) {
    await this.click(this['Edit button by product name'](product));
  }

  async clickOnDeleteProduct(product: string) {
    await this.click(this['Delete button by product name'](product));
  }
}
