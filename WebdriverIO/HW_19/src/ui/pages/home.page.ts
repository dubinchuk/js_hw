import { SIDE_MENU_MODULES, VIEW_DETAILS_MODULES } from '../../data/types/salesPortal.types.js';
import { SalesPortalPage } from './salesPortal.page.js';

export class HomePage extends SalesPortalPage {
  readonly uniqueElement = '//span[contains(@class,"fs-4")][contains(text(),"Sales Portal")]';
  private readonly 'View Orders button' = '#orders-from-home';
  private readonly 'View Products button' = '#products-from-home';
  private readonly 'View Customers button' = '#customers-from-home';
  private readonly 'Side menu by name' = (name: SIDE_MENU_MODULES) => `//a[text()[normalize-space()='${name}']]`;
  private readonly 'Side menu Home button' = this['Side menu by name'](SIDE_MENU_MODULES.HOME);
  private readonly 'Side menu Orders button' = this['Side menu by name'](SIDE_MENU_MODULES.ORDERS);
  private readonly 'Side menu Products button' = this['Side menu by name'](SIDE_MENU_MODULES.PRODUCTS);
  private readonly 'Side menu Customers button' = this['Side menu by name'](SIDE_MENU_MODULES.CUSTOMERS);

  async clickOnViewDetailsButton(moduleName: VIEW_DETAILS_MODULES) {
    await this.click(this[`View ${moduleName} button`]);
  }

  async clickOnSideMenuButton(moduleName: SIDE_MENU_MODULES) {
    await this.click(this[`Side menu ${moduleName} button`]);
  }
}
