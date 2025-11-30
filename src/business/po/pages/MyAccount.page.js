import BasePage from "../../../core/base/base.page";

class MyAccountPage extends BasePage {

    get profileButton() { return $('a[routerlink="profile"]') }
    get homeIconLink() { return $('a[class="nav-link active"]') }
    get homeBrandLink() { return $('a[class="navbar-brand"]') }
    get userMenuButton() { return $('[data-test="nav-menu"]') }

    async waitForAccountPageLoad() {
        await this.waitForPageLoad(this.userMenuButton, 'account');
    }

    async getUserNameFromMenu() {
        const maxAttempts = 3;

        for (let i = 0; i < maxAttempts; i++) {
            let name = await this.userMenuButton.getText();
            if (name && name.trim()) return name.trim();

            name = await this.userMenuButton.getHTML(false);
            if (name && name.trim()) return name.trim();

            await browser.pause(500);
        }
        return "";
    }

    async goToHomePage() {
        try {
            await this.click(this.homeIconLink);
        } catch {
            await this.click(this.homeBrandLink);
        }
    }

    async goToProfilePage() {
        await this.click(this.profileButton);
    }
}

export default new MyAccountPage();