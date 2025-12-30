import axios from 'axios';
import BasePage from '../../../core/base/base.page.js';

class LoginPage extends BasePage {

  static PATH = 'auth/login';

  get loginTitle() { return $('app-login h3') }
  get emailInput() { return $('#email') }
  get passwordInput() { return $('#password') }
  get loginButton() { return $('input.btnSubmit') }
  get registerAccountButton() { return $('[data-test="register-link"]') }
  get invalidDataAlert() { return $('div.help-block') }

  async open() {
    await super.open(LoginPage.PATH);
  }

  async login(email, password) {
    await this.setInputValue(this.emailInput, email);
    await this.setInputValue(this.passwordInput, password);
  }

  async clickRegisterAccountButton() {
    await this.click(this.registerAccountButton);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async waitForLoginPageLoad() {
    await this.waitForPageLoad(this.loginButton, 'login');
  }

  async isLoginFormVisible() {
    return await this.waitForVisible(this.loginTitle);
  }

  async isErrorMessageVisible() {
    return await this.waitForVisible(this.invalidDataAlert);
  }

  async getErrorMessage() {
    return await this.getText(this.invalidDataAlert);
  }

  async registerNewUser(userData) {
    const url = `https://api.practicesoftwaretesting.com/users/register`;

    const postData = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      dob: userData.dateOfBirth,
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      address: {
        street: userData.street,
        city: userData.city,
        state: userData.state,
        country: 'CO',
        postal_code: userData.postalCode
      }
    };

    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const response = await axios.post(url, postData, config);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
}

export default new LoginPage();