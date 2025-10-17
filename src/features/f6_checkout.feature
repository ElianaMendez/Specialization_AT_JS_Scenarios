Feature: Checkout on Practice Software Testing
    As a customer
    I want to complete purchase on https://practicesoftwaretesting.com/
    So that I can order items.

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
        Then user can see a Billing Address form with autocompleted fields
        When the user clicks on "Proceed to checkout"
        Then the user can see payment dropdown
        When user selects payment method "Cash on Delivery"
        And user clicks on confirm button
        Then user can see the message "Payment was successful"