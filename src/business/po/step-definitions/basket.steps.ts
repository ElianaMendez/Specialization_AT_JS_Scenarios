import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductPage from '../pages/Product.page';


When('clicks on the Add to cart button', async () => {
    await ProductPage.waitForProductPageLoad();
    await ProductPage.clickAddToCartButton();
});

Then('the system should display a message Product added to shopping cart', async () => {
    let productAlertMessage = '';

    await browser.waitUntil(async () => {
        productAlertMessage = (await ProductPage.getAddedToCartAlertText()).trim();
        console.log('Alert text during wait:', productAlertMessage);

        return productAlertMessage.includes('Producto añadido al carrito.') ||
               productAlertMessage.includes('toasts.product-added-to-cart') ||
               productAlertMessage.includes('Product added to shopping cart');
    }, {
        timeout: 10000,
        interval: 500,
        timeoutMsg: 'Expected success message was not displayed'
    });

    expect(
        productAlertMessage.includes('Producto añadido al carrito.') ||
        productAlertMessage.includes('toasts.product-added-to-cart') ||
        productAlertMessage.includes('Product added to shopping cart')
    ).toBe(true);

    await ProductPage.waitForAlertMessageToDisappear();
});

Then('the cart icon should show an updated item count', async () => {
    await ProductPage.waitForCartQuantityIconVisible();
    const cartIconText = await ProductPage.getCartItemCount();
    await expect(cartIconText).toContain('1');
});