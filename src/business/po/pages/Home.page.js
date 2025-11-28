import BasePage from "../../../core/base/base.page";

class HomePage extends BasePage {
    static PATH = '';

    get signInLink() { return $('[data-test="nav-sign-in"]') }
    get homeProducts() { return $$('img.card-img-top') }
    get homeImage() { return $('img.img-fluid') }
    get cartIcon() { return $('//*[@data-test="cart-quantity"]') }


    async open() {
        await super.open(HomePage.PATH);
    }

    async waitForHomePageLoad() {
        await this.waitForPageLoad(this.homeImage, '');
    }

    async clickSignInLink() {
        await this.click(this.signInLink);
    }

    async isSignInLinkVisible() {
        return this.waitForVisible(this.signInLink);
    }

    async clickHomeProduct() {
        await this.waitUntilHomeProdutsAppears();

        const product = (await $$('img.card-img-top'))[0];
        await product.scrollIntoView();
        await this.click(product);
    }

    async clickCartIcon() {
        await this.click(this.cartIcon);
    }

}

export default new HomePage();

