Feature: User Login on Practice Software Testing
  As a registered user
  I want to log in on https://practicesoftwaretesting.com/
  So that I can access my account

  Scenario: User logs in successfully with valid credentials
    Given the user is on the login page of the Practice Software Testing site
    When the user enters a valid email and password
    And clicks on the "Login" button
    Then the user should be redirected to the account page
    And see their username displayed in the header

  Scenario: User enters invalid credentials
    Given the user is on the login page of the Practice Software Testing site
    When the user enters an invalid email and password
    And clicks on the "Login" button
    Then the user should see a message of error "Invalid email or password"    