import BasePage from "../../../core/base/base.page"

class ProductDetailsPage extends BasePage {
    get productName() { return $('h1[data-test="product-name"]') }
    get productPrice() { return $('span[aria-label="unit-price"]') }
    get productDescription() { return $('#description') }
    get btnAddtoCart() { return $('#btn-add-to-cart') }
    get alerProductAdded() { return $('//div[@role="alert"]') }
    get cartIcon() { return $('//*[@data-test="cart-quantity"]') }

    async waitForAddedProductMessage() {
        await this.alerProductAdded.waitForDisplayed({ timeout: 10000 });
    }

    async waitForCartIconAppears() {
        await this.cartIcon.waitForDisplayed({ timeout: 10000 });
    }

    async getItemCount() {
        return await this.cartIcon.getText();
    }

}

export default new ProductDetailsPage();