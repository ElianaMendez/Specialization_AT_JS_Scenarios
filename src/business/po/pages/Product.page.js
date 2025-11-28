import BasePage from "../../../core/base/base.page"

class ProductPage extends BasePage {
    get productName() { return $('h1[data-test="product-name"]') }
    get productPrice() { return $('span[aria-label="unit-price"]') }
    get productDescription() { return $('#description') }
    get btnAddtoCart() { return $('#btn-add-to-cart') }
    get productAddedAlert() { return $('//div[@role="alert"]') }
    get cartIcon() { return $('//*[@data-test="cart-quantity"]') }

    async waitForProductPageLoad() {
        try {
            await this.waitForPageLoad(this.btnAddtoCart, 'product', 60000);
        } catch {

        }
    }

    async clickAddToCartButton() {
        await this.click(this.btnAddtoCart);
    }

    async isDetailsOfProductVisible() {
        await Promise.all([
            this.waitForVisible(this.productName),
            this.waitForVisible(this.productPrice),
            this.waitForVisible(this.productDescription)
        ]);
    }

    async waitForAddedProductMessage() {
        await this.waitForVisible(this.productAddedAlert, 60000);
    }

    async getTextProductAddedAlert() {
        return await this.getText(this.productAddedAlert);
    }

    async waitForMessageDisappears() {
        await this.productAddedAlert.waitForExist({ reverse: true, timeout: 10000 });
    }

    async waitForCartIconAppears() {
        await this.waitForVisible(this.cartIcon);
    }

    async getItemCount() {
        return await this.getText(this.cartIcon);
    }
}

export default new ProductPage();