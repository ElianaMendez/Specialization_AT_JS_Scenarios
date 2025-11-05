class HomePage {
    get signin() { return $("//a[text()='Contact']") }

    async openLoginPage() {
        await browser.url('https://practicesoftwaretesting.com/auth/login');
    }

}

export default new HomePage();

