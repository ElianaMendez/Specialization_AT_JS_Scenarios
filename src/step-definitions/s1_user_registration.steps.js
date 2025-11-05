import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageObjects/home.page.js';
import SignInPage from '../pageObjects/signin.page.js';
import RegisterPage from '../pageObjects/register.page.js';

Given('the user is on the Practice Software Testing home page', async () => {
  await HomePage.open();
});

Given('the {string} button is visible on the header', async (buttonText) => {
  const button = await $(`header a=${buttonText}`);
  await expect(button).toBeDisplayed();
});

When('the user clicks on the {string} button', async (buttonText) => {
  const button = await $(`header a=${buttonText}`);
  await button.click();
});

When('clicks on the "Register your account" link', async () => {
  await SignInPage.openRegistration();
});

When('fills in all required fields in the registration form with valid data', async () => {
  await RegisterPage.fillRegistrationForm({
    firstName: 'John',
    lastName: 'Doe',
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
  await expect(SignInPage.loginForm).toBeDisplayed();
});
