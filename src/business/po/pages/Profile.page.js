import BasePage from "../../../core/base/base.page"

class ProfilePage extends BasePage {

    get firstNameInput() { return $('#first_name') }
    get lastNameInput() { return $('#last_name') }
    get phoneInput() { return $('#phone') }
    get emailInput() { return $('#email') }
    get streetInput() { return $('#street') }
    get postalCodeInput() { return $('#postal_code') }
    get cityInput() { return $('#city') }
    get stateInput() { return $('#state') }
    get countryInput() { return $('#country') }
    get updateProfileButton() { return $('button[type="submit"]') }
    get profileUpdatedAlert() { return $('//div//*[contains(@class, "alert-success")]') }


    async waitForProfilePageLoad() {
        await this.waitForPageLoad(this.updateProfileButton, 'profile');
    }

    async updateFirstName() {
        await this.waitFieldsNotEmpty(this.firstNameInput);
        await this.setInputValue(this.firstNameInput, 'New name');
    }

    async clickUpdateProfileButton() {
        await this.click(this.updateProfileButton);
    }

    async waitUpdatedMessage() {
        await this.waitForVisible(this.profileUpdatedAlert, 30000);
    }

    async getUpdatedMessage() {
        return await this.getText(this.profileUpdatedAlert);
    }

    async clickEmailField() {
        await this.click(this.emailInput);
    }

    async isEmailNonEditableField() {
        const emailField = await this.emailInput;
        const isReadonly = await emailField.getAttribute('readonly');
        const isDisabled = await emailField.getAttribute('disabled');

        return isReadonly !== null || isDisabled !== null;
    }
}

export default new ProfilePage();
