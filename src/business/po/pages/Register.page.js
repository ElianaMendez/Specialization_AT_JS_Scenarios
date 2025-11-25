import BasePage from "../../../core/base/base.page";

class RegisterPage extends BasePage {
  get inputFirstName() { return $('#first_name'); }
  get inputLastName() { return $('#last_name'); }
  get inputDateofBirth() { return $('#dob'); }
  get inputStreet() { return $('input[id="street"]'); }
  get inputPostalCode() { return $('#postal_code') }
  get inputCity() { return $('input[id="city"]'); }
  get inputState() { return $('input[id="state"]'); }
  get selectCountry() { return $('#country'); }
  get inputPhone() { return $('#phone'); }
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnRegister() { return $('//button[@class="btnSubmit mb-3"]'); }

  async fillRegistrationForm({
    firstName, lastName, dateOfBirth, street, postalCode, city, state,
    country, phone, email, password
  }) {
    await this.setInputValue(this.inputFirstName, firstName);
    await this.setInputValue(this.inputLastName, lastName);
    await this.setInputValue(this.inputDateofBirth, dateOfBirth);
    await this.setInputValue(this.inputStreet, street);
    await this.setInputValue(this.inputPostalCode, postalCode);
    await this.setInputValue(this.inputCity, city);
    await this.setInputValue(this.inputState, state);

    // Dropdown Country 
    await this.selectCountry.waitForDisplayed();
    await this.selectCountry.selectByVisibleText(country);

    await this.setInputValue(this.inputPhone, phone);
    await this.setInputValue(this.inputEmail, email);
    await this.setInputValue(this.inputPassword, password);
  }

  async submit() {
    await this.btnRegister.waitForClickable({ timeout: 5000 });
    await this.click(this.btnRegister);

  }
}

export default new RegisterPage();
