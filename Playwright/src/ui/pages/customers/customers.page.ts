import { CUSTOMERS_COLUMN_NAME } from '../../../data/types/customers.types';
import { SalesPortalPage } from '../salesPortal.page';

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  private readonly 'Add New Customer button' = this.findElement('button.page-title-header');
  private readonly 'Edit button by table row' = (customer: string) =>
    this.findElement(`${this['Table row selector'](customer)}//button[@title="Edit"]`);
  private readonly 'Column sort button by name' = (name: CUSTOMERS_COLUMN_NAME) =>
    this.findElement(`//div[.="${name}"]`);

  private readonly 'Email column data' = '//tr/td[1]';
  private readonly 'Name column data' = '//tr/td[2]';
  private readonly 'Country column data' = '//tr/td[3]';
  private readonly 'Created On column data' = '//tr/td[4]';

  private async getColumnData(columnName: CUSTOMERS_COLUMN_NAME) {
    const locator = this.page.locator(this[`${columnName} column data`]);
    const elements = await locator.all();
    return Promise.all(elements.map((element) => element.innerText()));
  }

  async getCustomersColumns() {
    const storage: string[][] = [];
    const columns = Object.values(CUSTOMERS_COLUMN_NAME);

    for (const column of columns) {
      storage.push(await this.getColumnData(column));
    }
    return storage;
  }

  async clickOnColumnHeaderToSort(name: CUSTOMERS_COLUMN_NAME) {
    await this.click(this['Column sort button by name'](name));
  }

  async clickOnAddNewCustomer() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this['Edit button by table row'](customerName));
  }
}
