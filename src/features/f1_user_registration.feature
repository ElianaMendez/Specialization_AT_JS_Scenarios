Feature: User Registration on Practice Software Testing
  As a new visitor
  I want to create an account on https://practicesoftwaretesting.com/
  So that I can log in and make purchases

  Scenario: User successfully signs up with valid details
    Given the user is on the Practice Software Testing home page
    When the user clicks on the "Sign in" button
    And clicks on the "Register your account" link
    And the user enters all required fields on customer registration modal
    And clicks on the "Register" button
    Then the user should be redirected to the login page
