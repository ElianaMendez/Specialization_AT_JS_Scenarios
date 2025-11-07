Feature: Checkout on Practice Software Testing
    As a customer
    I want to complete a purchase on https://practicesoftwaretesting.com/
    So that I can successfully order items using different payment methods

    Scenario Outline: User completes checkout with <paymentMethod> payment
        Given the user has added a product to the cart
        When the user opens the cart and proceeds to checkout
        And the user fills in the billing details
        And selects "<paymentMethod>" as the payment method
        And provides the required information for "<paymentMethod>"
        And confirms the purchase
        Then the system should display the message "Payment was successful"

        Examples:
            | paymentMethod     |
            | Bank Transfer     |
            | Cash on Delivery  |
            | Credit Card       |
            | Buy Now Pay Later |
            | Gift Card         |