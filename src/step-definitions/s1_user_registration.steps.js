import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageObjects/home.page.js';
import LoginPage from '../pageObjects/login.page.js';
import RegisterPage from '../pageObjects/register.page.js';

Given('the user is on the Practice Software Testing home page', async () => {
    await HomePage.openHomePage();
});

Given('the {string} button is visible on the header', async () => {
    const button = await signInLink();
    await expect(button).toBeDisplayed();
});

When('the user clicks on the {string} button', async () => {
    const button = await signInLink();
    await button.click();
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
        password: 'SecurePass123!',
    });
});

When('clicks on the "Register" button', async () => {
    await RegisterPage.submit();
});

Then('the user should be redirected to the login page', async () => {
    await expect(browser).toHaveUrlContaining('/auth/login');
});

Then('the login form should be visible', async () => {
    await LoginPage.existsLoginForm();
});
