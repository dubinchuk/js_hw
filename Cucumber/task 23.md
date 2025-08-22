1. Создайте проект с WDIO + cucumber или склонируйте репозиторий с лекции
2. Создайте тест со своими данными для продукта и следующими шагами:

```
  Background:
    Given I open Sales Portal
    Then I should be on "Sign In" page
    When I enter "aqacourse@gmail.com" in "Email input" on "Sign In" page
    And I enter "password" in "Password input" on "Sign In" page
    And I click on "Login button" on "Sign In" page
    Then I should be on "Home" page
    And I should see "Logged User label" contains text "AQA " on "Home" page

  Scenario: Successfully created product
    When I click on "Products button" on "Home" page
    Then I should be on "Products List" page
    When I click on "Add New Product button" on "Products List" page
    Then I should be on "Add New Product" page
    When I enter "your name" in "Name input" on "Add New Product" page
    And I select "your manufacturer" in "Manufacturer dropdown" on "Add New Product" page
    And I enter "your price" in "Price input" on "Add New Product" page
    And I enter "your amount" in "Amount input" on "Add New Product" page
    And I enter "your notes" in "Notes input" on "Add New Product" page
    And I click on "Save New Product button" on "Add New Product" page
    Then I should be on "Products List" page
    And I should see notification contains text "Product was successfully created"
```
