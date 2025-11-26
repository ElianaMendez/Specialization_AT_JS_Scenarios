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
    get alertProfileUpdated() { return $('div[role="alert"].alert-success') }
    //'//div//*[contains(@class, "alert-success")]'

    async waitForProfilePageLoad() {
        await this.waitForPageLoad(this.btnUpdateProfile, 'profile');
    }

    async inputUpdatedName() {
        await this.setInputValue(this.inputFirstName, 'New name');
    }

    async updateProfileData() {
        await this.inputFirstName.setValue('Eliana');
        await this.btnProfile.click();
    }

    /*     async waitFieldsNonEmpty() {
            try {
                await this.inputFirstName.waitForDisplayed({
                    timeout: 8000
                });
                await browser.waitUntil(
                    async () => {
                        const value = await this.inputFirstName.getValue();
                        return value !== '';
                    },
                    {
                        timeout: 10000
                    }
                );
            } catch { }
        }
     */
    /*     async waitUpdateProfileClickable() {
            await this.btnUpdateProfile.waitForClickable({ timeout: 5000 });
        }
     */

    async clickUpdateProfileButton() {
        await this.click(this.btnUpdateProfile);
    }

    async waitUpdatedMessage() {
        await this.waitForVisible(this.alertProfileUpdated);
        //await this.alertProfileUpdated.waitForDisplayed({ timeout: 10000 });
    }

    async getUpdatedMessage() {
        await this.getText(this.alertProfileUpdated);
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
