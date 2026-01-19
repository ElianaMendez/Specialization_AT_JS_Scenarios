import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../pages/Login.page';
import MyAccountPage from '../pages/MyAccount.page';
import DataGenerator from 'test/data/DataGenerator';


Given('the user is on the login page of the Practice Software Testing site', async () => {
    await LoginPage.open();
});

Given('a newly registered user exists with unique valid credentials', async function () {
    const generatedData = DataGenerator.generateUniqueUserData();
    //POST API
    const response = await LoginPage.registerNewUser(generatedData);
    await expect(response.status).toEqual(201);
    this.userData = generatedData;
});

When('the user enters a valid email address and password', async function () {
    await LoginPage.login(this.userData.email, this.userData.password);
});

When('clicks on the Login button', async () => {
    await LoginPage.clickLoginButton();
});

Then('the user should be redirected to the My account page', async () => {
    await MyAccountPage.waitForAccountPageLoad();
});

Then("the user's name should be displayed in the header", async function () {
    const expectedName = `${this.userData.firstName} ${this.userData.lastName}`;
    const userNameElementText = await MyAccountPage.getUserNameFromMenu();
    await expect(userNameElementText).toContain(expectedName);
});

//Invalid Logig
When('the user enters an invalid email address or password', async () => {
    const invalidData = DataGenerator.generateInvalidDataToTest();
    await LoginPage.login(invalidData.email, invalidData.password);
});

Then('the system should display an error message Invalid email or password', async () => {
    await LoginPage.isErrorMessageVisible();
    const errorMessage = await LoginPage.getErrorMessage();
    await expect(errorMessage).toContain('Invalid email or password');
});