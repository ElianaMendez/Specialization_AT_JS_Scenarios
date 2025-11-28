import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import Checkout from '../pages/Checkout.page.js';
import MyAccountPage from '../pages/MyAccount.page.js';
import HomePage from '../pages/Home.page.js';


Given('the user go to the home page', async () => {
    await MyAccountPage.goToTheHomePage();
});

Given('the user opens the cart to proceed the checkout', async () => {
    try {
        await HomePage.clickCartIcon();
    } catch {
        await Checkout.open();
    }
    await Checkout.waitForCheckoutPageLoad();
});

Given('the user clicks on the Proceed to Checkout button', async () => {
    await Checkout.clickProceedToCheckout();
});

Given('the user should see a message to proceed to checkout', async () => {
    await Checkout.waitForMessageToProceedToCheckout();
    const message = await Checkout.getTextMessageToProceedToCheckout();
    await expect(message).toContain('You can proceed to checkout');
});

Given('the user clicks on the second Proceed to Checkout button', async () => {
    await Checkout.clickSecondProceedToCheckout();
});

Given('the user fills the Billing address', async () => {
    await Checkout.fillBillingAddress();
});

Given('the user clicks on the third Proceed to Checkout button', async () => {
    await Checkout.clickThirdProceedToCheckout();
});

When('selects {string} as the payment method', async (paymentMethod) => {
    await Checkout.selectPaymentMethod(paymentMethod);
});

When('provides the required information for {string}', async (paymentMethod) => {
    await Checkout.providePaymentInformation(paymentMethod);
});

When('confirms the purchase', async () => {
    await Checkout.clickToConfirmThePurchase();
});

Then('the system should display the message {string}', async (expectedMessage) => {
    await Checkout.waitForPaymentSuccessfulMessage();
    const text = await Checkout.getTextPaymentSuccessfulMessage();
    await expect(text).toContain(expectedMessage);
});
