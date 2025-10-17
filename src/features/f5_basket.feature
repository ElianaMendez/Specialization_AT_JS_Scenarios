Feature: Cart Management on Practice Software Testing
  As a customer
  I want to add products to my Cart on https://practicesoftwaretesting.com/
  So that I can review and purchase them later

  Scenario: User adds a product to the Cart
    Given the user is logged in
    And user is on "My account" page
    And the user selects "Home" link on the header
    When the user clicks on the first product title or image
    And the user clicks on the "Add to Cart" button
    Then the user can see a message "Product Added to Shopping Cart"
    And the cart icon should shows an updated item count
