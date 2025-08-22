Feature: [UI] [Login]
   
   Background:
     Given I open Sales Portal
     Then I should be on 'Sign In' page
     When I enter 'aqacourse@gmail.com' in 'Email input' on 'Sign In' page
     And I enter 'password' in 'Password input' on 'Sign In' page
     And I click on 'Login button' on 'Sign In' page
     Then I should be on 'Home' page
     And I should see 'Logged User label' contains text 'Admin' on 'Home' page

   Scenario: Successfully created product
     When I click on 'Products button' on 'Home' page
     Then I should be on 'Products List' page
     When I click on 'Add New Product button' on 'Products List' page
     Then I should be on 'Add New Product' page
     When I enter 'Test35453' in 'Name input' on 'Add New Product' page
     And I select 'Xiaomi' in 'Manufacturer dropdown' on 'Add New Product' page
     And I enter '385' in 'Price input' on 'Add New Product' page
     And I enter '23' in 'Amount input' on 'Add New Product' page
     And I enter 'Test notes' in 'Notes input' on 'Add New Product' page
     And I click on 'Save New Product button' on 'Add New Product' page
     Then I should be on 'Products List' page
     And I should see notification contains text 'Product was successfully created'

