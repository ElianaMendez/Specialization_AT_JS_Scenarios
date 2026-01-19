import { ChainablePromiseElement } from 'webdriverio';
import BasePage from "../../../core/base/base.page";

class ProfilePage extends BasePage {

    get firstNameInput(): ChainablePromiseElement { return $('#first_name'); }
    get lastNameInput(): ChainablePromiseElement { return $('#last_name'); }
    get phoneInput(): ChainablePromiseElement { return $('#phone'); }
    get emailInput(): ChainablePromiseElement { return $('#email'); }
    get streetInput(): ChainablePromiseElement { return $('#street'); }
    get postalCodeInput(): ChainablePromiseElement { return $('#postal_code'); }
    get cityInput(): ChainablePromiseElement { return $('#city'); }
    get stateInput(): ChainablePromiseElement { return $('#state'); }
    get countryInput(): ChainablePromiseElement { return $('#country'); }
    get updateProfileButton(): ChainablePromiseElement { return $('button[type="submit"]'); }
    get profileUpdatedAlert(): ChainablePromiseElement { return $('//div//*[contains(@class, "alert-success")]'); }


    async waitForProfilePageLoad(): Promise<void> {
        await this.waitForPageLoad(this.updateProfileButton, 'profile');
    }

    async updateFirstName(): Promise<void> {
        await this.waitFieldsNotEmpty(this.firstNameInput);
        await this.setInputValue(this.firstNameInput, 'New name');
    }

    async clickUpdateProfileButton(): Promise<void> {
        await this.click(this.updateProfileButton);
    }

    async waitUpdatedMessage(): Promise<void> {
        await this.waitForVisible(this.profileUpdatedAlert, 30000);
    }

    async getUpdatedMessage(): Promise<string> {
        return await this.getText(this.profileUpdatedAlert);
    }

    async clickEmailField(): Promise<void> {
        await this.click(this.emailInput);
    }

    async isEmailNonEditableField(): Promise<boolean> {
        const emailField = await this.emailInput;
        const isReadonly = await emailField.getAttribute('readonly');
        const isDisabled = await emailField.getAttribute('disabled');

        return isReadonly !== null || isDisabled !== null;
    }
}

export default new ProfilePage();
