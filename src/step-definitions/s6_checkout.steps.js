import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import ProductDetailsPage from '../pageObjects/p5_product_details.page.js';
import Checkout from '../pageObjects/p6_checkout.page.js';
import MyAccountPage from '../pageObjects/p3_myAccount.page.js';

Given('User opens a new browser tab', async () => {
    const originalTab = await browser.getWindowHandle();
    await browser.newWindow('about:blank');
    const newTab = await browser.getWindowHandle();
    await browser.switchToWindow(originalTab);
    await browser.closeWindow();
    await browser.switchToWindow(newTab);
});

Given('the user go to the home page', async () => {
    await MyAccountPage.goToTheHomePage();
});

Given('the user opens the cart to proceed the checkout', async () => {
    try {
        await ProductDetailsPage.cartIcon.waitForClickable();
        await ProductDetailsPage.cartIcon.click();
    } catch {
        await browser.navigateTo("https://practicesoftwaretesting.com/checkout");
    }
    await Checkout.waitForCheckoutPageLoad();
});

Given('the user clicks on the Proceed to Checkout button', async () => {
    await Checkout.btnProceedToCheckout.click();
});

Given('the user should see a message to proceed to checkout', async () => {
    await Checkout.waitForMessageToProceedToCheckout();
    await expect(Checkout.messagetoProceedToCheckout).toBeDisplayed();
    const text = await Checkout.messagetoProceedToCheckout.getText();
    await expect(text).toContain('You can proceed to checkout');
});

Given('the user clicks on the second Proceed to Checkout button', async () => {
    await Checkout.btnProceedToCheckout2.click();
});

Given('the user fills the Billing address', async () => {
    await Checkout.fillBillingAddress();
});

Given('the user clicks on the third Proceed to Checkout button', async () => {
    await Checkout.btnProceedToCheckout3.click();
});


When('selects {string} as the payment method', async (paymentMethod) => {
    await Checkout.selectPaymentMethod(paymentMethod);
});

When('provides the required information for {string}', async (paymentMethod) => {
    await Checkout.providePaymentInformation(paymentMethod);
});

When('confirms the purchase', async () => {
    await Checkout.confirmPurchase();
});

Then('the system should display the message {string}', async (expectedMessage) => {
    await expect(Checkout.paymentSuccessfulMessage).toBeDisplayed();
    const text = await Checkout.paymentSuccessfulMessage.getText();
    await expect(text).toContain(expectedMessage);
});
