import BasePage from "../../../core/base/base.page";

class MyAccountPage extends BasePage {

    get buttonProfile() { return $('a[routerlink="profile"]') }
    get iconHomePage() { return $('a[class="nav-link active"]') }
    get homeLink() { return $('a[class="navbar-brand"]') }
    get userMenu() { return $('[data-test="nav-menu"]') }

    async waitForAccountPageLoad() {
        await this.waitForPageLoad(this.userMenu, 'account');
    }

    async getUserNamefromMenu() {
        const maxAttempts = 3;

        for (let i = 0; i < maxAttempts; i++) {
            let name = await this.userMenu.getText();
            if (name) return name;

            name = await this.userMenu.getHTML(false);
            if (name) return name;

            await browser.pause(500);
        }

        return "";
    }

    async goToTheHomePage() {
        try {
            await this.click(this.iconHomePage);
        } catch {
            await this.click(this.homeLink);
        }
    }

    async goToProfilePage() {
        await this.click(this.buttonProfile);
    }
}

export default new MyAccountPage();