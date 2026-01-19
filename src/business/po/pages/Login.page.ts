import axios, { AxiosResponse } from 'axios';
import BasePage from '../../../core/base/base.page';
import type { ChainablePromiseElement } from 'webdriverio';

// 1. Define an interface for the registration data
interface UserRegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  password: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

class LoginPage extends BasePage {

  static PATH = 'auth/login';

  get loginTitle(): ChainablePromiseElement { return $('app-login h3'); }
  get emailInput(): ChainablePromiseElement { return $('#email'); }
  get passwordInput(): ChainablePromiseElement { return $('#password'); }
  get loginButton(): ChainablePromiseElement { return $('input.btnSubmit'); }
  get registerAccountButton(): ChainablePromiseElement { return $('[data-test="register-link"]'); }
  get invalidDataAlert(): ChainablePromiseElement { return $('div.help-block'); }

  async open(): Promise<void> {
    await super.open(LoginPage.PATH);
  }

  async login(email: string, password: string): Promise<void> {
    await this.setInputValue(this.emailInput, email);
    await this.setInputValue(this.passwordInput, password);
  }

  async clickRegisterAccountButton(): Promise<void> {
    await this.click(this.registerAccountButton);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async waitForLoginPageLoad(): Promise<void> {
    await this.waitForPageLoad(this.loginButton, 'login');
  }

  async isLoginFormVisible(): Promise<void> {
    return await this.waitForVisible(this.loginTitle);
  }

  async isErrorMessageVisible(): Promise<void> {
    return await this.waitForVisible(this.invalidDataAlert);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.invalidDataAlert);
  }

  /**
     * Registers a new user via API call using Axios.
     */
  async registerNewUser(userData: UserRegistrationData): Promise<AxiosResponse> {
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
    } catch (error: any) {
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }
}

export default new LoginPage();