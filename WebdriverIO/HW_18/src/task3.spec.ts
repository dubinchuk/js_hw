// Task 3
// Разработать метод для выбора элемента в дропдауне "клавиатурой":
//   selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string)
//   со следующими шагами:
//     - кликнуть на дропдаун
//     - дождаться появления элементов дропдауна на экране
//     - Найти сколько раз надо нажать "вниз"
//     - столько раз нажать стрелку ВНИЗ на клавиатуре, чтобы добраться до нужного элемента
//     - нажать кнопку "Enter" на клавиатуре

//     Рекоммендации:
//       - import { Key } from 'webdriverio'
//       - Сверху импорт "ключей", в них есть и ArrowDown и Enter
//       - browser.keys() для отправки "кликов" по клавиатуре

import { Key } from 'webdriverio';

async function selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string) {
  // await $(dropdownSelector).waitForDisplayed();
  await $(dropdownSelector).click();
  await $(optionsSelector).waitForDisplayed();
  const options = await $$(optionsSelector).map((option) => option.getText());
  const pressNumber = options.indexOf(value) + 1;
  if (pressNumber === 0) {
    throw new Error(`Option '${value}' does not exist`);
  } else {
    for (let i = 1; i < pressNumber; i++) {
      await browser.keys([Key.ArrowDown]);
    }
    await browser.keys([Key.Enter]);
  }
}

const dropdownPageUrl = 'https://the-internet.herokuapp.com/dropdown';

describe('Select option of dropdown', async () => {
  before(async () => {
    await browser.maximizeWindow();
  });
  it('option is selected using keyboard', async () => {
    await browser.url(dropdownPageUrl);
    await selectDropdownValueWithKeys('select#dropdown', 'select#dropdown option', 'Option 2');
  });
});
