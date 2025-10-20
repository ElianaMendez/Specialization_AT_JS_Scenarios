Feature: Checkout on Practice Software Testing
    As a customer
    I want to complete purchase on https://practicesoftwaretesting.com/
    So that I can order items.

    Scenario: User completes checkout with Cash on Delivery payment
        Given the user has added a product to the cart
        When the user opens the cart and proceeds to checkout
        And the user fills in the billing details
        And selects "Cash on Delivery" as payment method
        And confirms the purchase
        Then the system should display the message "Payment was successful"