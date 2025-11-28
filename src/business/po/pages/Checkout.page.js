import BasePage from "../../../core/base/base.page"

class CheckoutPage extends BasePage {
    static PATH = '/checkout';

    // Selectors grouped by section
    get proceedToCheckoutButton() { return $('button[class="btn btn-success"]') }
    get proceedStepTwoButton() { return $('button[data-test="proceed-2"]') }
    get proceedStepThreeButton() { return $('button[data-test="proceed-3"]') }
    get finishPurchaseButton() { return $('button[data-test="finish"]') }

    get messageToProceedToCheckout() { return $('p.ng-star-inserted') }
    get paymentSuccessfulMessage() { return $('div[data-test="payment-success-message"]') }

    // Billing Address Fields
    get inputStreet() { return $('#street') }
    get inputCity() { return $('#city') }
    get inputState() { return $('#state') }
    get inputCountry() { return $('#country') }
    get inputPostalCode() { return $('#postal_code') }

    // Payment Fields
    get paymentMethodField() { return $('#payment-method') }

    // Bank Transfer Fields
    get inputBankName() { return $('#bank_name') }
    get inputAccountName() { return $('#account_name') }
    get inputAccountNumber() { return $('#account_number') }

    // Credit Card Fields
    get inputCreditCardNumber() { return $('#credit_card_number') }
    get inputExpirationDate() { return $('#expiration_date') }
    get inputCvv() { return $('#cvv') }
    get inputCardHolderName() { return $('#card_holder_name') }

    // Buy Now Pay Later Fields
    get selectMonthlyInstallments() { return $('#monthly_installments') }

    // Gift Card Fields
    get inputGiftCardNumber() { return $('#gift_card_number') }
    get inputValidationCode() { return $('#validation_code') }

    async open() {
        await super.open(CheckoutPage.PATH);
    }

    async fillBillingAddress(addressData = null) {
        const defaultAddress = {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001'
        };

        const address = addressData || defaultAddress;

        const fieldsToFill = [
            { element: this.inputStreet, value: address.street },
            { element: this.inputCity, value: address.city },
            { element: this.inputState, value: address.state },
            { element: this.inputCountry, value: address.country },
            { element: this.inputPostalCode, value: address.postalCode },
        ];

        for (const field of fieldsToFill) {
            if (field.value) {
                await this.setInputValue(field.element, field.value);
            }
        }
    }

    async selectPaymentMethod(paymentMethod) {
        await this.paymentMethodField.waitForDisplayed();
        await this.paymentMethodField.selectByVisibleText(paymentMethod);
    }

    async providePaymentInformation(paymentMethod, paymentData = null) {
        const defaultPaymentData = {
            'Bank Transfer': {
                bankName: 'Banco XYZ',
                accountName: 'Mi cuenta',
                accountNumber: '125478963566961'
            },
            'Credit Card': {
                cardNumber: '4690-8765-2345-8976',
                expirationDate: '07/2032',
                cvv: '254',
                cardHolder: 'ElianaM'
            },
            'Buy Now Pay Later': {
                installments: '3 Monthly Installments'
            },
            'Gift Card': {
                giftCardNumber: '32145448633245',
                validationCode: '1232'
            }
        };

        const data = paymentData || defaultPaymentData[paymentMethod] || {};

        const paymentHandlers = {
            'Bank Transfer': async () => {
                await this.setInputValue(this.inputBankName, data.bankName || 'Banco XYZ');
                await this.setInputValue(this.inputAccountName, data.accountName || 'Mi cuenta');
                await this.setInputValue(this.inputAccountNumber, data.accountNumber || '125478963566961');
            },
            'Credit Card': async () => {
                await this.setInputValue(this.inputCreditCardNumber, data.cardNumber || '4690-8765-2345-8976');
                await this.setInputValue(this.inputExpirationDate, data.expirationDate || '07/2032');
                await this.setInputValue(this.inputCvv, data.cvv || '254');
                await this.setInputValue(this.inputCardHolderName, data.cardHolder || 'ElianaM');
            },
            'Buy Now Pay Later': async () => {
                await this.selectMonthlyInstallments.selectByVisibleText(
                    data.installments || '3 Monthly Installments'
                );
            },
            'Gift Card': async () => {
                await this.setInputValue(this.inputGiftCardNumber, data.giftCardNumber || '32145448633245');
                await this.setInputValue(this.inputValidationCode, data.validationCode || '1232');
            },
            'Cash on Delivery': async () => {
                // No input required
            }
        };

        const handler = paymentHandlers[paymentMethod];
        if (!handler) {
            throw new Error(`Unsupported payment method: ${paymentMethod}`);
        }

        await handler();
    }

    async waitForCheckoutPageLoad() {
        await this.waitForPageLoad(this.proceedToCheckoutButton, 'checkout');
    }

    async clickProceedToCheckout() {
        await this.click(this.proceedToCheckoutButton);
    }

    async clickSecondProceedToCheckout() {
        await this.click(this.proceedStepTwoButton);
    }

    async clickThirdProceedToCheckout() {
        await this.click(this.proceedStepThreeButton);
    }

    async waitForMessageToProceedToCheckout() {
        await this.waitForVisible(this.messageToProceedToCheckout);
    }

    async getTextMessageToProceedToCheckout() {
        return await this.getText(this.messageToProceedToCheckout);
    }

    async clickToConfirmThePurchase() {
        await this.click(this.finishPurchaseButton);
    }

    async waitForPaymentSuccessfulMessage() {
        await this.waitForVisible(this.paymentSuccessfulMessage);
    }

    async getTextPaymentSuccessfulMessage() {
        return await this.getText(this.paymentSuccessfulMessage);
    }

}

export default new CheckoutPage();