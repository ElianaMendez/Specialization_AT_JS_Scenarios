import { When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import HomePage from '../pages/Home.page.js';
import ProductDetailsPage from '../pages/ProductDetails.page'
import BasePage from '../../../core/base/base.page';


When('the user clicks on a product title or image', async () => {
    await BasePage.waitForPageLoad(Homepage.homeProduct);
    await BasePage.click(Homepage.homeProduct)
});

Then('the system should display the product details page', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('/product/'));
});

Then('the page should show the product name, price, and description', async () => {
    await expect(ProductDetailsPage.productName).toBeDisplayed();
    await expect(ProductDetailsPage.productPrice).toBeDisplayed();
    await expect(ProductDetailsPage.productDescription).toBeDisplayed();
});

