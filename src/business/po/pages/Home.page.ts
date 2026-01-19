import BasePage from "../../../core/base/base.page.js";
import type { ChainablePromiseElement, ChainablePromiseArray } from 'webdriverio';

class HomePage extends BasePage {
    static PATH = '';

    get signInLink(): ChainablePromiseElement { return $('[data-test="nav-sign-in"]'); }
    get homeProducts(): ChainablePromiseArray { return $$('img.card-img-top'); }
    get homeImage(): ChainablePromiseElement { return $('img.img-fluid'); }
    get cartIcon(): ChainablePromiseElement { return $('//*[@data-test="cart-quantity"]'); }


    async open(): Promise<void> {
        await super.open(HomePage.PATH);
    }

    async waitForHomePageLoad(): Promise<void> {
        await this.waitForPageLoad(this.homeImage, '');
    }

    async clickSignInLink(): Promise<void> {
        await this.click(this.signInLink);
    }

    async isSignInLinkVisible(): Promise<void> {
        return this.waitForVisible(this.signInLink);
    }

    async clickHomeProduct(): Promise<void> {
        await this.waitUntilHomeProductsAppears();

        const products = await this.homeProducts;
        const firstProduct = products[0];

        if (firstProduct) {
            await firstProduct.scrollIntoView();
            await this.click(firstProduct);
        } else {
            throw new Error('Home Page: No products found to click after waiting.');
        }
    }

    async clickCartIcon(): Promise<void> {
        await this.click(this.cartIcon);
    }

}

export default new HomePage();
