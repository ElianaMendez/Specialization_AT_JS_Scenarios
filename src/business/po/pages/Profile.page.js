import { fi } from "@faker-js/faker"
import BasePage from "../../../core/base/base.page"

class ProfilePage extends BasePage {

    get inputFirstName() { return $('#first_name') }
    get inputLastName() { return $('#last_name') }
    get inputPhone() { return $('#phone') }
    get inputEmail() { return $('#email') }
    get inputStreet() { return $('#street') }
    get inputPostalCode() { return $('#postal_code') }
    get inputCity() { return $('#city') }
    get inputState() { return $('#state') }
    get inputCountry() { return $('#country') }
    get btnUpdateProfile() { return $('button[type="submit"]') }
    get alertProfileUpdated() { return $('//div//*[contains(@class, "alert-success")]') }


    async waitForProfilePageLoad() {
        await this.waitForPageLoad(this.btnUpdateProfile, 'profile');
    }

    async inputUpdatedName() {
        await this.waitFieldsNotEmpty(this.inputFirstName);
        await this.setInputValue(this.inputFirstName, 'New name');
    }

    async clickUpdateProfileButton() {
        await this.click(this.btnUpdateProfile);
    }

    async waitUpdatedMessage() {
        await this.waitForVisible(this.alertProfileUpdated, 30000);
    }

    async getUpdatedMessage() {
        return await this.getText(this.alertProfileUpdated);
    }

    async clickEmailField() {
        await this.click(this.inputEmail);
    }

    async isEmailNonEditableField() {
        const emailField = await this.inputEmail;
        const isReadonly = await emailField.getAttribute('readonly');
        const isDisabled = await emailField.getAttribute('disabled');

        return isReadonly !== null || isDisabled !== null;
    }
}

export default new ProfilePage();
