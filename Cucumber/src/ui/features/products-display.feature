Feature: [UI] [Products]

  Background:
    Given I open Sales Portal

  Scenario:
    When I create 2 products via API
    And I log in as Admin
    And I open 'Products List' page on 'Home' page
    Then I should see products in table on 'Products List' page
    When I open 'Product Details' modal page for product 1 on 'Products List' page
    Then I should see product 1 on 'Product Details' modal page
    Then I close 'Product Details' modal page
    When I open 'Product Details' modal page for product 2 on 'Products List' page
    Then I should see product 2 on 'Product Details' modal page
    Then I close 'Product Details' modal page
