import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import HomePage from '../pageObjects/p0_home.page.js';
import LoginPage from '../pageObjects/p2_login.page.js';
import RegisterPage from '../pageObjects/p1_register.page.js';
import DataGenerator from '../utils/DataGenerator.js';

Given('the user is on the Practice Software Testing home page', async () => {
    await HomePage.openHomePage();
});

Given('the {string} button is visible on the header', async (buttonText) => {
    const button = await HomePage.signInLink;
    await expect(button).toBeDisplayed();
});

When('the user clicks on the {string} button', async (buttonText) => {
    await HomePage.clickSingIn();
});

When('clicks on the "Register your account" link', async () => {
    await LoginPage.openCustomerRegistration();
});

When('fills in all required fields in the registration form with valid data', async () => {
    const userData = await DataGenerator.generateUniqueUserData();
    await RegisterPage.fillRegistrationForm(userData);
});

When('clicks on the "Register" button', async () => {
    await RegisterPage.submit();
    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            return url.includes('auth/login');
        },
        {
            timeout: 10000,
            timeoutMsg: 'Expected redirect to login page after registration'
        }
    );

});

Then('the user should be redirected to the login page', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('auth/login'));
});

Then('the login form should be visible', async () => {
    await expect(LoginPage.loginTitle).toBeDisplayed();
});
