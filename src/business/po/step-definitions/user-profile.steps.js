import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import MyAccountPage from '../pages/MyAccount.page.js';
import ProfilePage from '../pages/Profile.page.js';

Given('the user is on the Profile section', async () => {
    await MyAccountPage.waitForAccountPageLoad();
    await MyAccountPage.goToProfilePage();
    await ProfilePage.waitForProfilePageLoad();
});

Given('the user updates a field that is different from Email address', async () => {
    await ProfilePage.updateFirstName();
});

When('the user clicks on the Update Profile button', async () => {
    await ProfilePage.clickUpdateProfileButton();
});

Then('the system should display the message Your profile is successfully updated', async () => {
    await ProfilePage.waitUpdatedMessage();
    const updatedMessage = await ProfilePage.getUpdatedMessage();
    await expect(updatedMessage).toContain('Your profile is successfully updated!');
});

// User can not edit the "Email address" field
Given('the user clicks to Email address field', async () => {
    await ProfilePage.waitForProfilePageLoad();
    await ProfilePage.clickEmailField();
});


Then('the Email address is non-editable field', async () => {
    const isNonEditable = await ProfilePage.isEmailNonEditableField();
    expect(isNonEditable).toBe(true);
});


