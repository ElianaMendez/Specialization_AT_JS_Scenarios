import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import MyAccountPage from '../pageObjects/p3_myAccount.page.js';
import ProfilePage from '../pageObjects/p4_profile.page.js'

Given('the user is on the "Profile" section', async () => {
    await MyAccountPage.waitForAccountPageLoad();
    await MyAccountPage.openProfilePage();
    await ProfilePage.waitForProfilePageLoad();
    await expect(browser).toHaveUrl(expect.stringContaining('/account/profile'));
});

Given('the user updates a field that is different from "Email address"', async () => {
    await ProfilePage.waitFieldsNonEmpty();
    await ProfilePage.inputFirstName.setValue('New name');
});

When('the user clicks on the Update Profile button', async () => {
    await ProfilePage.waitUpdateProfileClickable();
    await ProfilePage.btnUpdateProfile.click();
    //await browser.debug();
});

Then('the system should display the message "Your profile is successfully updated!"', async () => {
    await ProfilePage.waitUpdatedMessage();
    const updateMessage = await ProfilePage.alertProfileUpdated.getText();
    await expect(updateMessage).toContain('Your profile is successfully updated!');
});


/* When('the only non-editable field is "Email address"', async () => {
    const profilePage = new ProfilePage();

    // Check that the Email field is readonly/disabled
    const emailField = await profilePage.inputEmail;
    const isReadonly = await emailField.getAttribute('readonly');
    const isDisabled = await emailField.getAttribute('disabled');

    const isNonEditable = isReadonly !== null || isDisabled !== null;
    expect(isNonEditable).toBe(true);

    // Check that the other fields ARE editable
    const editableFields = [
        profilePage.inputFirstName,
        profilePage.inputLastName,
        profilePage.inputPhone,
        profilePage.inputEmail,
        profilePage.inputStreet,
        profilePage.inputPostalCode,
        profilePage.inputCity,
        profilePage.inputState,
        profilePage.inputCountry
    ]

    for (const field of editableFields) {
        const readonly = await field.getAttribute('readonly');
        const disable = await field.getAttribute('disable');
        expect(readonly).toBeNull();
        expect(disable).toBeNull();
    }

    console.log(`Verificado: "${fieldName}" es el único campo no editable`);
}); */


