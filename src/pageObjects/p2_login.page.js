class LoginPage {
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnLogin() { return $('button[type="submit"]'); }
  get errorAlert() { return $('.alert-danger'); }

  async openCustomerRegistration() {
    await browser.url('https://practicesoftwaretesting.com/auth/register');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submit() {
    await this.btnLogin.click();
  }
}

export default new LoginPage();
