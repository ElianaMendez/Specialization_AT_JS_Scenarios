import BasePage from "../../../core/base/base.page";

class MyAccountPage extends BasePage {
    static PATH = '/account';

    get btnProfile() { return $('a[routerlink="profile"]') }
    get iconHomePage() { return $('a[class="nav-link active"]') }
    get navbarBrand() { return $('a[class="navbar-brand"]') }
    get navMenu() { return $('[data-test="nav-menu"]') }

    async open() {
        await super.open(MyAccountPage.PATH);
    }

    async getUserNamefromMenu() {
        const maxAttempts = 3;

        for (let i = 0; i < maxAttempts; i++) {
            let name = await this.navMenu.getText();
            if (name) return name;

            name = await this.navMenu.getHTML(false);
            if (name) return name;

            await browser.pause(500); // Wait before retry
        }

        return ""; // Return empty if all attempts fail
    }

    async goToTheHomePage() {
        try {
            await this.iconHomePage.waitForClickable({ timeout: 10000 });
            await this.click(this.iconHomePage);
        } catch {
            await this.click(this.navbarBrand);
        }
    }

    async goToProfile() {
        await this.click(this.btnProfile);
    }
}

export default new MyAccountPage();