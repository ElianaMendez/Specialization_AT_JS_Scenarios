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
    //  'div[role="alert"].alert-success'

    async waitForProfilePageLoad() {
        await this.waitForPageLoad(this.btnUpdateProfile, 'profile');
    }

    async inputUpdatedName() {
        await this.waitFieldsNotEmpty(this.inputFirstName);
        await this.setInputValue(this.inputFirstName, 'New name');
    }

    async updateProfileData() {
        await this.inputFirstName.setValue('Eliana');
        await this.btnProfile.click();
    }

    async clickUpdateProfileButton() {
        await this.click(this.btnUpdateProfile);
    }

    async waitUpdatedMessage() {
        await this.waitForVisible(this.alertProfileUpdated, 30000);
        //await this.alertProfileUpdated.waitForDisplayed({ timeout: 10000 });
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
        const isEnabled = await emailField.getAttribute('disabled');
        const isDisabled = !isEnabled;

        const isNonEditable = isReadonly !== null || isDisabled !== null;
        return isNonEditable;
    }
}

export default new ProfilePage();
