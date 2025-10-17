Feature: Manage User Profile on Practice Software Testing
    As a logged-in user
    I want to update my account details on https://practicesoftwaretesting.com/
    So that my personal information remains accurate

    Scenario: User updates profile information successfully
        Given the user is logged in and on the account page
        When the user selects "Profile" option on the left menu
        And the user updates the phone number
        And clicks on the "Update Profile" button
        Then the system should display the message "Your profile is successfully updated!"
        And the updated details should be visible in the profile

    Scenario: User cannot update Email address
        Given the user is logged in and on the account page
        When the user selects "Profile" option on the left menu
        And the user types a new Email address
        And clicks on the "Update Profile" button
        Then the Email address is read only field
        And Email address remains the same without changes