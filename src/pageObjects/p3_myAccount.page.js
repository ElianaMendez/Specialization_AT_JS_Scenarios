class MyAccountPage {
    get headerMenu() { return $('#menu'); }

    async getUserNamefromMenu() {
        await this.headerMenu.waitForDisplayed({ timeout: 5000 });
        return await this.headerMenu.getText();
    }

    async openAccountPage() {
        await browser.url('account');
    }
}

export default new MyAccountPage();
