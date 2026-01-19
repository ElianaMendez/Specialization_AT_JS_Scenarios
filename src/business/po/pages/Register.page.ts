import { ChainablePromiseElement } from 'webdriverio';
import BasePage from "../../../core/base/base.page";

interface RegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  password: string;
}

class RegisterPage extends BasePage {
  get firstNameInput(): ChainablePromiseElement { return $('#first_name'); }
  get lastNameInput(): ChainablePromiseElement { return $('#last_name'); }
  get dateofBirthInput(): ChainablePromiseElement { return $('#dob'); }
  get streetInput(): ChainablePromiseElement { return $('input[id="street"]'); }
  get postalCodeInput(): ChainablePromiseElement { return $('#postal_code'); }
  get cityInput(): ChainablePromiseElement { return $('input[id="city"]'); }
  get stateInput(): ChainablePromiseElement { return $('input[id="state"]'); }
  get countryDropdown(): ChainablePromiseElement { return $('#country'); }
  get phoneInput(): ChainablePromiseElement { return $('#phone'); }
  get emailInput(): ChainablePromiseElement { return $('#email'); }
  get passwordInput(): ChainablePromiseElement { return $('#password'); }
  get registerButton(): ChainablePromiseElement { return $('//button[@class="btnSubmit mb-3"]'); }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.setInputValue(this.firstNameInput, data.firstName);
    await this.setInputValue(this.lastNameInput, data.lastName);
    await this.setInputValue(this.dateofBirthInput, data.dateOfBirth);
    await this.setInputValue(this.streetInput, data.street);
    await this.setInputValue(this.postalCodeInput, data.postalCode);
    await this.setInputValue(this.cityInput, data.city);
    await this.setInputValue(this.stateInput, data.state);

    await this.countryDropdown.waitForDisplayed();
    await this.countryDropdown.selectByVisibleText(data.country);

    await this.setInputValue(this.phoneInput, data.phone);
    await this.setInputValue(this.emailInput, data.email);
    await this.setInputValue(this.passwordInput, data.password);
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.waitForClickable({ timeout: 5000 });
    await this.click(this.registerButton);
  }
}

export default new RegisterPage();
