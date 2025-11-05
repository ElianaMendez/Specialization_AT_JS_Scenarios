class HomePage {
    get signInLink() { return $('[data-test="nav-sign-in"]') }

    async openHomePage() {
        await browser.url('https://practicesoftwaretesting.com/');
    }

    async clickSingIn() {
        await this.signInLink.waitForClickable({ timeout: 5000 });
        await this.signInLink.click();
    }

}

export default new HomePage();

