import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/Home.page.js';
import ProductPage from '../pages/Product.page.js'


When('the user clicks on a product title or image', async () => {
    await HomePage.waitForHomePageLoad();
    await HomePage.clickHomeProduct();
});

Then('the system should display the product details page', async () => {
    await ProductPage.waitForProductPageLoad();
});

Then('the page should show the product name, price, and description', async () => {
    await ProductPage.waitForProductDetailsVisible();
});