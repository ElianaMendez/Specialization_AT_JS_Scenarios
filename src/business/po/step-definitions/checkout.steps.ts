import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import CheckoutPage from '../pages/Checkout.page';
import MyAccountPage from '../pages/MyAccount.page';
import HomePage from '../pages/Home.page';

type PaymentMethod = 'Transferencia bancaria' | 'Contra reembolso' | 'Tarjeta de crédito' | 'Compra ahora, paga después' | 'Tarjeta de regalo';

Given('the user go to the home page', async () => {
    await MyAccountPage.goToHomePage();
});

Given('the user opens the cart to proceed the checkout', async () => {
    try {
        await HomePage.clickCartIcon();
    } catch {
        await CheckoutPage.open();
    }
    await CheckoutPage.waitForCheckoutPageLoad();
});

Given('the user clicks on the Proceed to Checkout button', async () => {
    await CheckoutPage.clickProceedToCheckout();
});

Given('the user should see a message to proceed to checkout', async () => {
    await CheckoutPage.waitForMessageToProceedToCheckout();
    const message = await CheckoutPage.getTextMessageToProceedToCheckout();
    await expect(message).toContain('You can proceed to checkout');
});

Given('the user clicks on the second Proceed to Checkout button', async () => {
    await CheckoutPage.clickSecondProceedToCheckout();
});

Given('the user fills the Billing address', async () => {
    await CheckoutPage.fillBillingAddress();
});

Given('the user clicks on the third Proceed to Checkout button', async () => {
    await CheckoutPage.clickThirdProceedToCheckout();
});

When('selects {string} as the payment method', async (paymentMethod: string) => {
    await CheckoutPage.selectPaymentMethod(paymentMethod as PaymentMethod);
});

When('provides the required information for {string}', async (paymentMethod: string) => {
    await CheckoutPage.providePaymentInformation(paymentMethod as PaymentMethod);
});

When('confirms the purchase', async () => {
    await CheckoutPage.clickToConfirmThePurchase();
});

Then('the system should display the message {string}', async (expectedMessage: string) => {
    await CheckoutPage.waitForPaymentSuccessfulMessage();
    const text = await CheckoutPage.getTextPaymentSuccessfulMessage();
    await expect(text).toContain(expectedMessage);
});