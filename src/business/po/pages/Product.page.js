import BasePage from "../../../core/base/base.page";

class ProductPage extends BasePage {

    get productNameLabel() { return $('h1[data-test="product-name"]') }
    get productPriceLabel() { return $('span[aria-label="unit-price"]') }
    get productDescriptionText() { return $('#description') }

    get addToCartButton() { return $('#btn-add-to-cart') }
    get productAddedAlertMessage() { return $('//div[@role="alert"]') }
    get cartQuantityIcon() { return $('//*[@data-test="cart-quantity"]') }


    async waitForProductPageLoad() {
        await this.waitForPageLoad(this.addToCartButton, 'product', 60000);
    }

    async clickAddToCartButton() {
        await this.click(this.addToCartButton);
    }

    async waitForProductDetailsVisible() {
        await Promise.all([
            this.waitForVisible(this.productNameLabel),
            this.waitForVisible(this.productPriceLabel),
            this.waitForVisible(this.productDescriptionText)
        ]);
    }

    async waitForAddedToCartMessage() {
        await this.waitForVisible(this.productAddedAlertMessage, 60000);
    }

    async getAddedToCartAlertText() {
        return await this.getText(this.productAddedAlertMessage);
    }

    async waitForAlertMessageToDisappear() {
        await this.productAddedAlertMessage.waitForExist({ reverse: true, timeout: 10000 });
    }

    async waitForCartQuantityIconVisible() {
        await this.waitForVisible(this.cartQuantityIcon);
    }

    async getCartItemCount() {
        return await this.getText(this.cartQuantityIcon);
    }
}

export default new ProductPage();