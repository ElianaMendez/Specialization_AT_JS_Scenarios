import type { ChainablePromiseElement } from 'webdriverio';
import BasePage from "../../../core/base/base.page";

class ProductPage extends BasePage {

    //get productNameLabel() { return $('h1[data-test="product-name"]') }
    get productNameLabel(): ChainablePromiseElement { return $('h1[data-test="product-name"]'); }
    get productPriceLabel(): ChainablePromiseElement { return $('span[aria-label="unit-price"]'); }
    get productDescriptionText(): ChainablePromiseElement { return $('#description'); }
    get addToCartButton(): ChainablePromiseElement { return $('#btn-add-to-cart'); }
    get productAddedAlertMessage(): ChainablePromiseElement { return $('//div[@role="alert"]'); }
    get cartQuantityIcon(): ChainablePromiseElement { return $('//*[@data-test="cart-quantity"]') }

    async waitForProductPageLoad(): Promise<void> {
        await this.waitForPageLoad(this.addToCartButton, 'product', 60000);
    }

    async clickAddToCartButton(): Promise<void> {
        await this.click(this.addToCartButton);
    }

    async waitForProductDetailsVisible(): Promise<void> {
        await Promise.all([
            this.waitForVisible(this.productNameLabel),
            this.waitForVisible(this.productPriceLabel),
            this.waitForVisible(this.productDescriptionText)
        ]);
    }

    async waitForAddedToCartMessage(): Promise<void> {
        await this.waitForVisible(this.productAddedAlertMessage, 60000);
    }

    async getAddedToCartAlertText(): Promise<string> {
        return await this.getText(this.productAddedAlertMessage);
    }

    async waitForAlertMessageToDisappear(): Promise<void> {
        await (await this.productAddedAlertMessage).waitForExist({
            reverse: true,
            timeout: 10000,
            timeoutMsg: 'The "Added to Cart" alert did not disappear'
        });
    }

    async waitForCartQuantityIconVisible(): Promise<void> {
        await this.waitForVisible(this.cartQuantityIcon);
    }

    async getCartItemCount(): Promise<string> {
        return await this.getText(this.cartQuantityIcon);
    }
}

export default new ProductPage();
