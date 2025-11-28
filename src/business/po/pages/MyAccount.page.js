import BasePage from "../../../core/base/base.page";

class MyAccountPage extends BasePage {
  
    get btnProfile() { return $('a[routerlink="profile"]') }
    get iconHomePage() { return $('a[class="nav-link active"]') }
    get navbarBrand() { return $('a[class="navbar-brand"]') }
    get navMenu() { return $('[data-test="nav-menu"]') }

    async waitForAccountPageLoad() {
        await this.waitForPageLoad(this.navMenu, 'account');
    }

    async getUserNamefromMenu() {
        const maxAttempts = 3;

        for (let i = 0; i < maxAttempts; i++) {
            let name = await this.navMenu.getText();
            if (name) return name;

            name = await this.navMenu.getHTML(false);
            if (name) return name;

            await browser.pause(500);
        }

        return "";
    }

    async goToTheHomePage() {
        try {
            await this.click(this.iconHomePage);
        } catch {
            await this.click(this.navbarBrand);
        }
    }

    async goToProfilePage() {
        await this.click(this.btnProfile);
    }
}

export default new MyAccountPage();