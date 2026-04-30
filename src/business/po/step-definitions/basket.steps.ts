import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductPage from '../pages/Product.page';


When('clicks on the Add to cart button', async () => {
    await ProductPage.waitForProductPageLoad();
    await ProductPage.clickAddToCartButton();
});

Then('the system should display a message Product added to shopping cart', async () => {
    
    await ProductPage.waitForAddedToCartMessage();

    await browser.waitUntil(async () => {
        const text = await ProductPage.getAddedToCartAlertText();
        return text.includes("Producto añadido al carrito.") ||
               text.includes("toasts.product-added-to-cart");
    }, {
        timeout: 5000,
        timeoutMsg: 'Expected success message was not displayed'
    });

    const productAlertMessage = await ProductPage.getAddedToCartAlertText();
    console.log('Alert text:', productAlertMessage);

    const isValid = productAlertMessage.includes("Producto añadido al carrito.")
                   // productAlertMessage.includes("toasts.product-added-to-cart");
    expect(isValid).toBe(true);

    await ProductPage.waitForAlertMessageToDisappear();
});

Then('the cart icon should show an updated item count', async () => {
    await ProductPage.waitForCartQuantityIconVisible();
    const cartIconText = await ProductPage.getCartItemCount();
    await expect(cartIconText).toContain('1');
});