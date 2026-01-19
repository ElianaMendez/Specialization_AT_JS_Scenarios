import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import HomePage from '../pages/Home.page';
import LoginPage from '../pages/Login.page';
import RegisterPage from '../pages/Register.page';
import DataGenerator from 'test/data/DataGenerator';

Given('the user is on the Practice Software Testing home page', async () => {
    await HomePage.open();
});

Given('the Sign in button is visible on the header', async () => {
    await HomePage.isSignInLinkVisible();
    await expect(HomePage.signInLink).toBeDisplayed();
});

When('the user clicks on the Sign in button', async () => {
    await HomePage.clickSignInLink();
});

When('clicks on the Register your account link', async () => {
    await LoginPage.clickRegisterAccountButton();
});

When('fills in all required fields in the registration form with valid data', async () => {
    const userData = DataGenerator.generateUniqueUserData();
    await RegisterPage.fillRegistrationForm(userData);
});

When('clicks on the Register button', async () => {
    await RegisterPage.clickRegisterButton();
    await LoginPage.waitForLoginPageLoad();
});

Then('the user should be redirected to the login page', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('auth/login'));
});

Then('the login form should be visible', async () => {
    await LoginPage.isLoginFormVisible();
    await expect(LoginPage.loginTitle).toBeDisplayed();
});