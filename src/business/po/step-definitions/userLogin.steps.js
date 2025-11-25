import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import LoginPage from '../pages/Login.page.js';
import MyAccountPage from '../pages/MyAccount.page.js';
import DataGenerator from '../../../test/data/DataGenerator.js';
import BasePage from '../../../core/base/base.page.js';

Given('the user is on the login page of the Practice Software Testing site', async () => {
    await LoginPage.open();
});

Given('a newly registered user exists with unique valid credentials', async function () {
    const generatedData = await DataGenerator.generateUniqueUserData();
    //POST API
    const response = await LoginPage.registerNewUser(generatedData);
    await expect(response.status).toEqual(201);
    this.userData = generatedData;
});

When('the user enters a valid email address and password', async function () {
    await LoginPage.login(this.userData.email, this.userData.password);
});

When('clicks on the "Login" button', async () => {
    await BasePage.click(LoginPage.btnLogin);
});

Then('the user should be redirected to the "My account" page', async () => {
    await BasePage.waitForPageLoad(MyAccountPage.navMenu);
    await expect(browser).toHaveUrl(expect.stringContaining('/account'));
});

Then("the user's name should be displayed in the header", async function () {
    const expectedName = this.userData.firstName + ' ' + this.userData.lastName;
    const userNameElementText = await MyAccountPage.getUserNamefromMenu();
    await expect(userNameElementText).toContain(expectedName);
});

//Invalid Logig
When('the user enters an invalid email address or password', async () => {
    const invalidData = await DataGenerator.generateInvalidDataToTest();
    await LoginPage.login(invalidData.email, invalidData.password);
});

Then('the system should display an error message "Invalid email or password"', async () => {
    await BasePage.waitForVisible(LoginPage.alertErrorInvalidData);
    await expect(LoginPage.alertErrorInvalidData).toHaveText('Invalid email or password');
});
