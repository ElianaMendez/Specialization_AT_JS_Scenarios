import { Given, When, Then, BeforeAll } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../pageObjects/p2_login.page.js';
import RegisterPage from '../pageObjects/p1_register.page.js';
import MyAccountPage from '../pageObjects/p3_myAccount.page.js';

Given('the user is on the login page of the Practice Software Testing site', async () => {
    await LoginPage.openLoginPage();
});

When('the user enters a valid email address and password', async () => {
    const generatedData = await RegisterPage.generateUniqueUserData();
    let response = await LoginPage.registerNewUser(generatedData);    
    await LoginPage.login(generatedData.email, generatedData.password);
});

When('clicks on the "Login" button', async () => {
    await LoginPage.submitLogin();    
});

Then('the user should be redirected to the "My account" page', async () => {
    await MyAccountPage.openAccountPage();
    await expect(browser).toHaveUrl(expect.stringContaining('/account'));
});

Then("the user's name should be displayed in the header", async () => {
    await expect(MyAccountPage.getUserNamefromMenu()).toHaveText(' John Doe ');
});