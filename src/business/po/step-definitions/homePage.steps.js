import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pages/Home.page.js';
import ProductDetailsPage from '../pages/ProductDetails.page'


When('the user clicks on a product title or image', async () => {
    await HomePage.waitForHomePageLoad();
    await HomePage.clickHomeProduct();
});

Then('the system should display the product details page', async () => {
    await ProductDetailsPage.waitForProductDetailsPageLoad();
});

Then('the page should show the product name, price, and description', async () => {
    await ProductDetailsPage.isDetailsOfProductVisible();
});

