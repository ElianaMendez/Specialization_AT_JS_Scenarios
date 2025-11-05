class RegisterPage {
  get inputFirstName() { return $('#first_name'); }
  get inputLastName() { return $('#last_name'); }
  get inputDateofBirth() { return $('#dob'); }
  get inputStreet() { return $('input[id="street"]'); }
  get inputCity() { return $('input[id="city"]'); }
  get inputState() { return $('input[id="state"]'); }
  get inputCountry() { return $('#country'); }
  get inputPhone() { return $('#phone'); }
  get inputEmail() { return $('#email'); }
  get inputPassword() { return $('#password'); }
  get btnRegister() { return $('button[type="submit"]'); }

  async fillRegistrationForm({ firstName, lastName, dateOfBirth, street, email, password }) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputDateofBirth.setValue(dateOfBirth);
    await this.inputStreet.setValue(street);
    
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async submit() {
    await this.btnRegister.click();
  }
}

export default new RegisterPage();
