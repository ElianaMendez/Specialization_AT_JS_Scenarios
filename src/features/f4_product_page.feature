Feature: Product Details on Practice Software Testing
    As a customer
    I want to view detailed product information on https://practicesoftwaretesting.com/
    So that I can make informed purchase decisions

    Scenario: User views details of a selected product
        Given the user is logged in
        And user is on "My account" page
        And the user selects "Home" link on the header
        When the user clicks on the first product title or image
        Then the product details page should open
        And it should display product name, price, and description
