Feature: Manage User Profile on Practice Software Testing
    As a logged-in user
    I want to update my account details on https://practicesoftwaretesting.com/
    So that my personal information remains accurate

    Background:
        Given the user is logged in and on the "Profile" section
        And the only non-editable field is "Email address"

    Scenario: User updates profile information successfully
        Given the user updates a field that is different from "Email address"
        When the user clicks on the "Update Profile" button
        Then the system should display the message "Your profile is successfully updated!"
        And the updated details should be visible in the profile

    Scenario: User cannot update Email address
        Given the user attempts to update the "Email address" field
        When the user tries to enter a new email address
        Then the "Email address" field should be read-only
        And the email address should remain the same without changes