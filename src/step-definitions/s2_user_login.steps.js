import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import HomePage from '../pageObjects/p0_home.page.js';
import LoginPage from '../pageObjects/p2_login.page.js';
import RegisterPage from '../pageObjects/p1_register.page.js';

Given('the user is on the login page of the Practice Software Testing site', async () => {
    await LoginPage.openLoginPage();
});

When('the user enters a valid email address and password', async () => {
    await RegisterPage.inputEmail().setValue('john123@example.com');
    await RegisterPage.inputPassword().setValue('John015*.');
});

When('clicks on the "Login" button', async () => {
    await LoginPage.submitLogin();
});

Then('the user should be redirected to the "My account" page', async () => {
    await MyAccountPage.openAccountPage();
});

Then("the user's name should be displayed in the header", async () => {
    await expect(MyAccountPage.getUserNamefromMenu()).toHaveText(' John Doe ');
});