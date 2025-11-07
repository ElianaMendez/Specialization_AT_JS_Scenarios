class MyAccountPage {

    async getUserNamefromMenu() {
        const menu = await $('[data-test="nav-menu"]');
        await menu.waitForDisplayed();
        const text = await menu.getText();
        return text;
    }

    async openAccountPage() {
        await browser.url('account');
    }
}

export default new MyAccountPage();
