class LoginPage {
  get loginTitle() { return $('//h3[text()="Login"]') }
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnLogin() { return $('input.btnSubmit'); }
  get btnRegisterAccount() { return $('[data-test="register-link"]'); }

  async openLoginPage(){
    await browser.url('auth/login');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submitLogin() {
    await this.btnLogin.click();
  }

  async openCustomerRegistration() {
    await this.btnRegisterAccount.waitForClickable({ timeout: 5000 });
    await this.btnRegisterAccount.click();
  }
}

export default new LoginPage();
