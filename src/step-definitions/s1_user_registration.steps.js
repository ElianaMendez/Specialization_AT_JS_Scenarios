import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import HomePage from '../pageObjects/p0_home.page.js';
import LoginPage from '../pageObjects/p2_login.page.js';
import RegisterPage from '../pageObjects/p1_register.page.js';

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
    await RegisterPage.fillRegistrationForm({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1985-02-01',
        street: 'calle 30',
        postalCode: '12005',
        city: 'Fantastica',
        state: 'Bolivar',
        country: 'Colombia',
        phone: '123456789',
        email: `john${Date.now()}@example.com`,
        password: 'Elia015*.',
    });
});

When('clicks on the {string} button', async (buttonText) => {
    await RegisterPage.submit();
    await browser.pause(2000);
});

Then('the user should be redirected to the login page', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('/auth/login'));
});

Then('the login form should be visible', async () => {
    await expect(LoginPage.loginTitle).toBeDisplayed();
});
