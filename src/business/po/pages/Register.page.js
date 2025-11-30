import BasePage from "../../../core/base/base.page";

class RegisterPage extends BasePage {
  get firstNameInput() { return $('#first_name'); }
  get lastNameInput() { return $('#last_name'); }
  get dateofBirthInput() { return $('#dob'); }
  get streetInput() { return $('input[id="street"]'); }
  get postalCodeInput() { return $('#postal_code') }
  get cityInput() { return $('input[id="city"]'); }
  get stateInput() { return $('input[id="state"]'); }
  get countryDropdown() { return $('#country'); }
  get phoneInput() { return $('#phone'); }
  get emailInput() { return $('#email'); }
  get passwordInput() { return $('#password'); }
  get registerButton() { return $('//button[@class="btnSubmit mb-3"]'); }

  async fillRegistrationForm({
    firstName, lastName, dateOfBirth, street, postalCode, city, state,
    country, phone, email, password
  }) {
    await this.setInputValue(this.firstNameInput, firstName);
    await this.setInputValue(this.lastNameInput, lastName);
    await this.setInputValue(this.dateofBirthInput, dateOfBirth);
    await this.setInputValue(this.streetInput, street);
    await this.setInputValue(this.postalCodeInput, postalCode);
    await this.setInputValue(this.cityInput, city);
    await this.setInputValue(this.stateInput, state);

    await this.countryDropdown.waitForDisplayed();
    await this.countryDropdown.selectByVisibleText(country);

    await this.setInputValue(this.phoneInput, phone);
    await this.setInputValue(this.emailInput, email);
    await this.setInputValue(this.passwordInput, password);
  }

  async clickRegisterButton() {
    await this.registerButton.waitForClickable({ timeout: 5000 });
    await this.click(this.registerButton);
  }
}

export default new RegisterPage();
