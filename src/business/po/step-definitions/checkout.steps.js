import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import ProductDetailsPage from '../pages/ProductDetails.page.js';
import Checkout from '../pages/Checkout.page.js';
import MyAccountPage from '../pages/MyAccount.page.js';
import BasePage from '../../../core/base/base.page.js';
import HomePage from '../pages/Home.page.js';

Given('User opens a new browser tab', async () => {
    await Checkout.openNewBrowserTab(); 
    /* const originalTab = await browser.getWindowHandle();
    await browser.newWindow('about:blank');
    const newTab = await browser.getWindowHandle();
    await browser.switchToWindow(originalTab);
    await browser.closeWindow();
    await browser.switchToWindow(newTab); */
});

Given('the user go to the home page', async () => {
    await MyAccountPage.goToTheHomePage();
});

Given('the user opens the cart to proceed the checkout', async () => {
    try {
        await HomePage.clickCartIcon();
        //await BasePage.click(ProductDetailsPage.cartIcon);
    } catch {
        await Checkout.open();
        //await browser.navigateTo("https://practicesoftwaretesting.com/checkout");
    }
    await Checkout.waitForCheckoutPageLoad();
});

Given('the user clicks on the Proceed to Checkout button', async () => {
    await Checkout.clickProceedToCheckout();
    //await Base.click(Checkout.btnProceedToCheckout);
});

Given('the user should see a message to proceed to checkout', async () => {
    await Checkout.waitForMessageToProceedToCheckout();
    //await BasePage.waitForVisible(Checkout.messagetoProceedToCheckout);
    const message = await Checkout.getTextMessageToProceedToCheckout();
    //const text = await BasePage.getText(Checkout.messagetoProceedToCheckout);
    await expect(message).toContain('You can proceed to checkout');
});

Given('the user clicks on the second Proceed to Checkout button', async () => {
    await Checkout.clickSecondProceedToCheckout();
    //await BasePage.click(Checkout.btnProceedToCheckout2);
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
    //await BasePage.waitForVisible(Checkout.paymentSuccessfulMessage);
    const text = await Checkout.getTextPaymentSuccessfulMessage();
    await expect(text).toContain(expectedMessage);
});
