import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../pageobjects/login.page.js';
import MyAccountPage from '../pageobjects/myAccount.page.js';

//
// -----------  COMMON GIVEN STEP  -----------
//
Given('the user is on the login page of the Practice Software Testing site', async () => {
  await LoginPage.open();
});

//
// -----------  SUCCESSFUL LOGIN STEPS  -----------
//
When('the user enters a valid email address and password', async () => {
  await LoginPage.login('john@example.com', 'SecurePass123!'); // ✅ replace with test credentials
});

When('clicks on the {string} button', async (buttonText) => {
  const button = await $(`button=${buttonText}`);
  await button.click();
});

Then('the user should be redirected to the {string} page', async (expectedPage) => {
  if (expectedPage === 'My account') {
    await expect(browser).toHaveUrlContaining('/account');
  } else if (expectedPage === 'Login') {
    await expect(browser).toHaveUrlContaining('/auth/login');
  }
});

Then("the user's name should be displayed in the header", async () => {
  await expect(MyAccountPage.headerUsername).toBeDisplayed();
});

//
// -----------  INVALID LOGIN STEPS  -----------
//
When('the user enters an invalid email address or password', async () => {
  await LoginPage.login('invalid@example.com', 'wrongpassword');
});

Then('the system should display an error message {string}', async (errorMsg) => {
  await expect(LoginPage.errorAlert).toBeDisplayed();
  await expect(LoginPage.errorAlert).toHaveTextContaining(errorMsg);
});
