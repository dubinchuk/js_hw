import { test } from '@playwright/test';
import { SignInService } from '../../services/signIn.service';
import { HomeService } from '../../services/home.service';
import { CustomersListService } from '../../services/customers/customers.service';
import { AddCustomerService } from '../../services/customers/addNewCustomer.service';
import { CUSTOMERS_COLUMN_NAME } from '../../../data/types/customers.types';

test.describe('[UI] [Customers] Table Sorting', async function () {
  let signInService: SignInService;
  let homeService: HomeService;
  let customersService: CustomersListService;
  let addNewCustomerService: AddCustomerService;

  test.beforeEach(async function ({ page }) {
    signInService = new SignInService(page);
    homeService = new HomeService(page);
    customersService = new CustomersListService(page);
    addNewCustomerService = new AddCustomerService(page);
    await signInService.openSalesPortal();
    await signInService.loginAsAdmin();
    await homeService.openCustomersPage();
  });

  const columns = Object.values(CUSTOMERS_COLUMN_NAME);
  const directions = ['asc', 'desc'];
  for (const column of columns) {
    for (const direction of directions) {
      test(`Sort by '${column}' ${direction}`, async function () {
        await customersService.sortCustomersAndVerify(column, direction as 'asc' | 'desc');
      });
    }
  }
});
