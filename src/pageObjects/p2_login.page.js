class LoginPage {
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnLogin() { return $('input.btnSubmit'); }
  get btnRegisterAccount() { return $('[data-test="register-link"]'); }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submit() {
    await this.btnLogin.click();
  }

  async openCustomerRegistration() {
    await this.btnRegisterAccount.waitForClickable({ timeout: 5000 });
    await this.btnRegisterAccount.click();
  }
}

export default new LoginPage();
