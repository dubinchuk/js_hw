import { SIDE_MENU_MODULES, VIEW_DETAILS_MODULES } from '../../data/types/salesPortal.types.js';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products/products.page.js';

export class HomeService {
  constructor(
    private homePage = new HomePage(),
    private productsPage = new ProductsPage()
  ) {}

  async openViewDetails(moduleName: VIEW_DETAILS_MODULES) {
    await this.homePage.clickOnViewDetailsButton(moduleName);
    await this.homePage.waitForSpinnerToHide();
  }

  async openSideMenu(moduleName: SIDE_MENU_MODULES) {
    await this.homePage.clickOnSideMenuButton(moduleName);
    await this.homePage.waitForSpinnerToHide();
  }

  async openProductsPage() {
    await this.openSideMenu(SIDE_MENU_MODULES.PRODUCTS);
    await this.productsPage.waitForOpened();
  }
}
