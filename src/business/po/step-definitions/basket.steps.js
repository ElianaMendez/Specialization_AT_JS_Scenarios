import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductDetailsPage from '../pages/ProductDetails.page';

When('clicks on the "Add to cart" button', async () => {
    await ProductDetailsPage.waitForProductDetailsPageLoad();
    await ProductDetailsPage.clickAddToCartButton();
});

Then('the system should display a message Product added to shopping cart', async () => {
    await ProductDetailsPage.waitForAddedProductMessage();
    const productAlertMessage = await ProductDetailsPage.getTextProductAddedAlert();
    await expect(productAlertMessage).toContain("Product added to shopping cart.");
    await ProductDetailsPage.waitForMessageDisappears();
});

Then('the cart icon should show an updated item count', async () => {
    await ProductDetailsPage.waitForCartIconAppears();
    const cartIconText = await ProductDetailsPage.getItemCount();
    await expect(cartIconText).toContain('1');
});


