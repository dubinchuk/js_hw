// Task 2.
// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
//  - проверить исчезновение спиннера с помощью waitFor* методов
//  - проверить действительно ли пользователь с логином AQA User вошел в систему
//  - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

//  Рекомендации по использованию:
//  - метод $$ поиска по всем элементам
//  - for .. of  для перебора коллекции элементов
//  - метод click() для клика по элементу в цикле
//  - Проверить background-color можно двумя способами:
//     1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
//     2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute

describe('Project page check', async () => {
  const url = 'https://anatoly-karpovich.github.io/aqa-course-project/#';
  const credentials = {
    email: 'aqacourse@gmail.com',
    password: 'password',
    username: 'AQA User',
  };

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(url);
    const loginFieldSel = await $('input#emailinput');
    const passwordFieldSel = await $('input#passwordinput');
    await loginFieldSel.setValue(credentials.email);
    await passwordFieldSel.setValue(credentials.password);
    const loginButtonSel = await $('button.btn.btn-primary.btn-lg');
    await loginButtonSel.click();
    const spinnerSel = await $('.spinner-border');
    await spinnerSel.waitForDisplayed({ reverse: true });
  });

  afterEach(async () => {
    await browser.deleteAllCookies();
    await browser.refresh();
  });

  it('logged in username is correct', async () => {
    const userNameSel = await $('a > strong');
    expect(await userNameSel.getText()).toBe(credentials.username);
  });

  it('background color of side menu button is not red', async () => {
    const redColor = 'rgba(220,53,69,1)';
    await browser.pause(1000);
    const sideMenuSel = await $$('ul.flex-column li a');
    for (const button of sideMenuSel) {
      await button.click();
      await browser.pause(1000);
      const buttonName = await button.getText();
      const color = await button.getCSSProperty('background-color');
      if (color.value === redColor) {
        throw new Error(`Color of '${buttonName}' button is Red`);
      }
    }
  });
});
