import { PRODUCT_TOAST_STATUSES } from '../../data/types/toastMessages.types.js';
import { logStep } from '../../utils/report/decorator.js';
import { HomePage } from '../pages/home.page.js';

export class SalesPortalService {
  constructor(private homePage = new HomePage()) {}

  @logStep('Validate notification')
  async validateNotification(expectedMessage: PRODUCT_TOAST_STATUSES) {
    const actualMessage = await this.homePage.getToastMessage();
    expect(actualMessage).toBe(expectedMessage);
  }

  async validateNotificationAndClose(expectedMessage: PRODUCT_TOAST_STATUSES) {
    const actualMessage = await this.homePage.getToastMessage();
    expect(actualMessage).toBe(expectedMessage);
    await this.homePage.closeToastMessage();
  }
}
