import { When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import Homepage from '../pageObjects/p0_home.page';
import ProductDetailsPage from '../pageObjects/p5_product_details.page'


When('the user clicks on a product title or image', async () => {
    await Homepage.waitForHomePageLoad();
    await Homepage.homeProduct.click();
});

Then('the system should display the product details page', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('/product/'));
});

Then('the page should show the product name, price, and description', async () => {
    await expect(ProductDetailsPage.productName).toBeDisplayed();
    await expect(ProductDetailsPage.productPrice).toBeDisplayed();
    await expect(ProductDetailsPage.productDescription).toBeDisplayed();
});

