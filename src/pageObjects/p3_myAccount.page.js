class MyAccountPage {
    get headerUsername() { return $('header .user-name'); } // Adjust selector as needed

    async open() {
        await browser.url('https://practicesoftwaretesting.com/account');
    }
}

export default new MyAccountPage();
