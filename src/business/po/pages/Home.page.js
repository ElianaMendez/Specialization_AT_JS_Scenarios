import BasePage from "../../../core/base/base.page";

class HomePage extends BasePage {
    static PATH = '';

    get signInLink() { return $('[data-test="nav-sign-in"]') }
    get homeProduct() { return $('img.card-img-top') }


    async open() {
        await super.open(HomePage.PATH);
    }

    async waitForHomePageLoad() {
        await this.waitForPageLoad(this.homeProduct, '');
    }

    async clickSignInLink() {
        await this.click(this.signInLink);
    }

    async isSignInLinkVisible() {
        return this.waitForVisible(this.signInLink);
    }

    async clickHomeProduct() {
        await this.click(this.homeProduct);
    }

}

export default new HomePage();

