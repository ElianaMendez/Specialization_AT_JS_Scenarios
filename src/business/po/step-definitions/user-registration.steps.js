import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import HomePage from '../pages/Home.page.js';
import LoginPage from '../pages/Login.page.js';
import RegisterPage from '../pages/Register.page.js';
import DataGenerator from '../../../test/data/DataGenerator.js';

Given('the user is on the Practice Software Testing home page', async () => {
    await HomePage.open();
});

Given('the Sign in button is visible on the header', async () => {
    const el = await HomePage.isSignInLinkVisible();
    await expect(el).toBe(true);
});

When('the user clicks on the Sign in button', async () => {
    await HomePage.clickSignInLink();
});

When('clicks on the Register your account link', async () => {
    await LoginPage.clickRegisterAccountButton();
});

When('fills in all required fields in the registration form with valid data', async () => {
    const userData = await DataGenerator.generateUniqueUserData();
    await RegisterPage.fillRegistrationForm(userData);
});

When('clicks on the Register button', async () => {
    await RegisterPage.submit();
    await LoginPage.waitForLoginPageLoad();
});

Then('the user should be redirected to the login page', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('auth/login'));
});

Then('the login form should be visible', async () => {
    const element = await LoginPage.isLoginFormVisible();
    await expect(element).toBe(true);
});
