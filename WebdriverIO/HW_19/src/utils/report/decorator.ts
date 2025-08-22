import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { SignInPage } from '../../ui/pages/signIn.page.js';
import { maskSensitiveData } from './allureUtils.js';

export function logStep(stepName: string): MethodDecorator {
  return function (_target: unknown, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor?.value;
    descriptor.value = async function (...args: unknown[]) {
      allure.startStep(stepName);
      try {
        const result = await originalMethod.apply(this, args);
        allure.endStep();
        return result;
      } catch (error) {
        allure.endStep(Status.FAILED);
        throw error;
      }
    };
    return descriptor;
  };
}

export function logAction(stepName: string): MethodDecorator {
  return function (_target: unknown, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      const signInPage = new SignInPage();
      const selector = args[0];
      let value = args[1];
      if (typeof value === 'string' && selector === signInPage['Password input']) {
        value = maskSensitiveData(value);
      }
      const newStepName = stepName.replace('{selector}', `"${selector}"`).replace('{text}', `"${value}"`);
      allure.startStep(newStepName);
      try {
        const result = await originalMethod.apply(this, args);
        allure.endStep();
        return result;
      } catch (error) {
        allure.endStep(Status.FAILED);
        throw error;
      }
    };
    return descriptor;
  };
}
