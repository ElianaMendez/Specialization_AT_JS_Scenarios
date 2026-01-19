import BasePage from "../../../core/base/base.page";
import type { ChainablePromiseElement } from 'webdriverio';

class MyAccountPage extends BasePage {

    get profileButton(): ChainablePromiseElement { return $('a[routerlink="profile"]'); }
    get homeIconLink(): ChainablePromiseElement { return $('a[class="nav-link active"]'); }
    get homeBrandLink(): ChainablePromiseElement { return $('a[class="navbar-brand"]'); }
    get userMenuButton(): ChainablePromiseElement { return $('[data-test="nav-menu"]'); }

    async waitForAccountPageLoad(): Promise<void> {
        await this.waitForPageLoad(this.userMenuButton, 'account');
    }

    async getUserNameFromMenu(): Promise<string> {
        const maxAttempts = 3;

        for (let i = 0; i < maxAttempts; i++) {
            let name = await this.userMenuButton.getText();
            if (name && name.trim()) return name.trim();

            name = await this.userMenuButton.getHTML({ includeSelectorTag: false });
            if (name && name.trim()) return name.trim();

            await browser.pause(500);
        }
        return "";
    }

    async goToHomePage(): Promise<void> {
        try {
            await this.click(this.homeIconLink);
        } catch {
            await this.click(this.homeBrandLink);
        }
    }

    async goToProfilePage(): Promise<void> {
        await this.click(this.profileButton);
    }
}

export default new MyAccountPage();