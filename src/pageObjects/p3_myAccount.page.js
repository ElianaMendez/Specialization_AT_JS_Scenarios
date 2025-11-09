// MyAccountPage.js
class MyAccountPage {
    get btnProfile() { return $('a[routerlink="profile"]') }

    async openProfilePage() {
        await this.btnProfile.waitForClickable({ timeout: 10000 });
        await this.btnProfile.click();
    }

    async waitForAccountPageLoad() {
        // Wait for the DOM to be fully loaded
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 10000,
                timeoutMsg: 'La página My Account no terminó de cargar a tiempo'
            }
        );

        // Wait for the user menu item to be visible
        const userMenu = await $('[data-test="nav-menu"]');
        await userMenu.waitForDisplayed({
            timeout: 8000,
            timeoutMsg: 'El menú de usuario no apareció a tiempo en la página My Account'
        });
    }

    async getUserNamefromMenu() {
        return await $('[data-test="nav-menu"]').getText();
    }
}

export default new MyAccountPage();

