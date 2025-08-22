import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { COUNTRIES, CUSTOMERS_COLUMN_NAME, ICustomersTable } from '../../../data/types/customers.types.js';

export class CustomersListService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  constructor(protected page: Page) {
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  private columnKeyMap: Record<CUSTOMERS_COLUMN_NAME, keyof ICustomersTable> = {
    [CUSTOMERS_COLUMN_NAME.EMAIL]: 'email',
    [CUSTOMERS_COLUMN_NAME.NAME]: 'name',
    [CUSTOMERS_COLUMN_NAME.COUNTRY]: 'country',
    [CUSTOMERS_COLUMN_NAME.CREATED_ON]: 'createdOn',
  };

  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  private async repeatSortAction(action: () => Promise<void>, clickCount: number = 1) {
    for (let i = 0; i < clickCount; i++) {
      await action();
      await this.customersPage.waitForSpinnerToHide();
    }
  }

  private async clickToSortColumn(column: CUSTOMERS_COLUMN_NAME, direction: 'asc' | 'desc') {
    let clickCount: 1 | 2;
    direction === 'asc' ? (clickCount = 1) : (clickCount = 2);
    await this.repeatSortAction(() => this.customersPage.clickOnColumnHeaderToSort(column), clickCount);
  }

  private async getAllCustomersUI() {
    const data = await this.customersPage.getCustomersColumns();
    const customers: ICustomersTable[] = [];
    for (let i = 0; i < data[0].length; i++) {
      const countryStr = data[2][i];
      const countryEnum = countryStr as COUNTRIES;
      customers.push({ email: data[0][i], name: data[1][i], country: countryEnum, createdOn: data[3][i] });
    }
    return customers;
  }

  private async sortCustomersArray(column: keyof ICustomersTable, direction: 'asc' | 'desc') {
    const customers = await this.getAllCustomersUI();
    customers.sort((a, b) => {
      const compareString = (valueA: string, valueB: string) =>
        direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

      const compareDates = (dateA: string, dateB: string) =>
        direction === 'asc'
          ? new Date(dateA).getTime() - new Date(dateB).getTime()
          : new Date(dateB).getTime() - new Date(dateA).getTime();

      if (column === 'createdOn') {
        return compareDates(a.createdOn, b.createdOn);
      }

      const primaryComparison = compareString(a[column], b[column]);
      return primaryComparison !== 0 ? primaryComparison : compareDates(a.createdOn, b.createdOn);
    });
    return customers;
  }

  async sortCustomersAndVerify(column: CUSTOMERS_COLUMN_NAME, direction: 'asc' | 'desc') {
    const key = this.columnKeyMap[column];
    const expectedData = await this.sortCustomersArray(key, direction);
    await this.clickToSortColumn(column, direction);

    const actualData = await this.getAllCustomersUI();
    expect(actualData).toEqual(expectedData);
  }
}
