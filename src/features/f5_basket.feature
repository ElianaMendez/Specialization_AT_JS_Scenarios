Feature: Cart Management on Practice Software Testing
  As a customer
  I want to add products to my Cart on https://practicesoftwaretesting.com/
  So that I can review and purchase them later

  Scenario: User adds a product to the Cart
    Given the user is logged in and on the account page
    And the user selects "Home" link on the header
    When the user clicks on the first product title or image    
    And the user clicks on the "Add to Cart" button
    Then the user see a message "Product Added to Shopping Cart"
    And the cart icon should show an updated item count

Scenario: User proceeds to confirm checkout a product added into the cart and perform payment to the selected product
    Given the user is logged in 
    And the user has added a product into the cart    
    When the user clicks on the cart icon 
    Then the user can see a product listed with its quantity price and total
    When the user clicks on "Proceed to checkout"
    And the user enter username and password 
    And user clicks on login button
    Then the user can see a message "Hello {$name} {$lastname}, you are already logged in. You can proceed to checkout."
    When the user clicks on "Proceed to checkout"
    Then user can see a Billing Address form with fields autocompleted
    When the user clicks on "Proceed to checkout"
    Then the user can see payment dropdown
    When user selects payment method "Cash on Delivery"
    And user clicks on confirm button
    Then user can see the message "Payment was successful"