import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductDetailsPage from '../pageObjects/p5_product_details.page';

When('clicks on the "Add to cart" button', async () => {
    await ProductDetailsPage.waitForProductDetailsPageLoad();
    await ProductDetailsPage.btnAddtoCart.click();
});

Then('the system should display a message Product added to shopping cart', async () => {
    await ProductDetailsPage.waitForAddedProductMessage();
    const productAlertMessage = await ProductDetailsPage.alerProductAdded.getText();
    await expect(productAlertMessage).toContain("Product added to shopping cart.");
});

Then('the cart icon should show an updated item count', async () => {
    await ProductDetailsPage.waitForCartIconAppears();
    const cartIconText = await ProductDetailsPage.getItemCount();
    await expect(cartIconText).toContain('1');
});


