import { BASE_URL } from '../../config/environment.js';
import { SideMenuModules, ViewDetailsModules } from '../../data/types/salesPortal.types.js';
import { logStep } from '../../utils/report/decorator.js';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products/products.page.js';

export class HomeService {
  constructor(
    private homePage = new HomePage(),
    private productsPage = new ProductsPage()
  ) {}

  async openViewDetails(moduleName: ViewDetailsModules) {
    await this.homePage.clickOnViewDetailsButton(moduleName);
    await this.homePage.waitForSpinnerToHide();
  }

  async openSideMenu(moduleName: SideMenuModules) {
    await this.homePage.clickOnSideMenuButton(moduleName);
    await this.homePage.waitForSpinnerToHide();
  }

  @logStep('Open Products Page')
  async openProductsPage() {
    await this.openSideMenu('Products');
    await this.productsPage.waitForOpened();
  }

  @logStep('Open Sales Portal')
  async openSalesPortal() {
    await this.homePage.openPage(BASE_URL);
    await this.homePage.waitForOpened();
  }
}
