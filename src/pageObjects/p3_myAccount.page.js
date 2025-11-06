class MyAccountPage {
    get headerMenu() { return $('//a[contains(text(), "John Doe")]'); }

    async getUserNamefromMenu() {
        await this.headerMenu.waitForDisplayed({ timeout: 6000 });
        return await this.headerMenu.getText();
    }

    async openAccountPage() {
        await browser.url('account');
    }
}

export default new MyAccountPage();
