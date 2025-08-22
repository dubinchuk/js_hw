// Task 1.

// Разработать тест со следующими шагами:

//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Loading
//   - Дождаться появления каждой ссылки на странице (их 2)
//   - кликнуть по ссылке Example 1: Element on page that is hidden
//   - дождаться появления кнопки start
//   - кликнуть по кнопке start
//   - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)

//  Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text)
//  у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
//   - Использовать browser.waitUntil с комбинацией проверок (элемент виден и текст верный)
//   - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента

async function waitForElementWithText(selector: string, text: string, timeout: number) {
  const element = await $(selector);
  await browser.waitUntil(
    async () => {
      return (await element.isDisplayed()) && (await element.getText()) === text;
    },
    {
      timeout,
      interval: 1000,
      timeoutMsg: `Selector '${selector}' with text '${text}' was not found after ${timeout}ms`,
    }
  );
}

describe('Dynamic Loading', () => {
  const url = 'https://the-internet.herokuapp.com/';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
  });

  it('should load element with text', async () => {
    const dynamicLoadingSel = await $('//a[text()="Dynamic Loading"]');
    await dynamicLoadingSel.click();
    const linksSel = await $$('#content a');
    for (const link of linksSel) {
      await link.waitForDisplayed();
    }
    await linksSel[1].click();

    const buttonSel = await $('#start button');
    await buttonSel.waitForDisplayed();
    await buttonSel.click();

    const messageSel = '#finish h4';
    const message = 'Hello World!';
    await waitForElementWithText(messageSel, message, 15000);
  });
});
