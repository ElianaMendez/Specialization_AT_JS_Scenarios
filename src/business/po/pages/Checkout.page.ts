import type { ChainablePromiseElement } from 'webdriverio';
import BasePage from "../../../core/base/base.page.js"

type PaymentMethod = 'Transferencia bancaria' | 'Contra reembolso' | 'Tarjeta de crédito' | 'Compra ahora, paga después' | 'Tarjeta de regalo';

interface AddressData {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    houseNumber?: string | number;
}

interface PaymentData {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
    cardHolder?: string;
    installments?: string;
    giftCardNumber?: string;
    validationCode?: string;
}

const PAYMENT_METHOD_VALUES: Record<string, string> = {
    'Transferencia bancaria': 'bank-transfer',
    'Contra reembolso': 'cash-on-delivery',
    'Tarjeta de crédito': 'credit-card',
    'Compra ahora, paga después': 'buy-now-pay-later',
    'Tarjeta de regalo': 'gift-card'
};

class CheckoutPage extends BasePage {
    static PATH = '/checkout';

    // Selectors grouped by section
    get proceedToCheckoutButton(): ChainablePromiseElement { return $('button[class="btn btn-success"]'); }
    get proceedStepTwoButton(): ChainablePromiseElement { return $('button[data-test="proceed-2"]'); }
    get proceedStepThreeButton(): ChainablePromiseElement { return $('button[data-test="proceed-3"]'); }
    get finishPurchaseButton(): ChainablePromiseElement { return $('button[data-test="finish"]'); }
    get messageToProceedToCheckout(): ChainablePromiseElement { return $('p.ng-star-inserted'); }
    get paymentSuccessfulMessage(): ChainablePromiseElement { return $('div[data-test="payment-success-message"]'); }
    // Billing Address Fields
    get inputStreet(): ChainablePromiseElement { return $('#street'); }
    get inputCity(): ChainablePromiseElement { return $('#city'); }
    get inputState(): ChainablePromiseElement { return $('#state'); }
    get inputCountry(): ChainablePromiseElement { return $('#country'); }
    get inputPostalCode(): ChainablePromiseElement { return $('#postal_code'); }
    get inputHouseNumber(): ChainablePromiseElement { return $('#house_number'); }
    // Payment Fields
    get paymentMethodField(): ChainablePromiseElement { return $('#payment-method'); }
    // Bank Transfer Fields
    get inputBankName(): ChainablePromiseElement { return $('#bank_name'); }
    get inputAccountName(): ChainablePromiseElement { return $('#account_name'); }
    get inputAccountNumber(): ChainablePromiseElement { return $('#account_number'); }
    // Credit Card Fields
    get inputCreditCardNumber(): ChainablePromiseElement { return $('#credit_card_number'); }
    get inputExpirationDate(): ChainablePromiseElement { return $('#expiration_date'); }
    get inputCvv(): ChainablePromiseElement { return $('#cvv'); }
    get inputCardHolderName(): ChainablePromiseElement { return $('#card_holder_name'); }
    // Buy Now Pay Later Fields
    get selectMonthlyInstallments(): ChainablePromiseElement { return $('#monthly_installments'); }
    // Gift Card Fields
    get inputGiftCardNumber(): ChainablePromiseElement { return $('#gift_card_number'); }
    get inputValidationCode(): ChainablePromiseElement { return $('#validation_code'); }

    async open(): Promise<void> {
        await super.open(CheckoutPage.PATH);
    }

    async fillBillingAddress(addressData: AddressData | null = null): Promise<void> {
        const address = addressData || {
            street: '123 Main Street',
            city: 'Cartagena',
            state: 'BOL',
            country: 'Colombia',
            postalCode: '10001',
            houseNumber: '42'
        };

        await this.inputStreet.waitForDisplayed({timeout:1000});

        await this.setInputValue(this.inputStreet, String(address.street));
        await this.setInputValue(this.inputCity, String(address.city));
        
        // If these are selects, do not use setInputValue
        const countryTag = await this.inputCountry.getTagName();

        if (countryTag.toLowerCase() === 'select') {
            await this.inputCountry.selectByVisibleText(String(address.country));
        }else{
            await this.setInputValue(this.inputCountry, String(address.country));
        }

        await this.setInputValue(this.inputState, String(address.state));
        await this.setInputValue(this.inputPostalCode, String(address.postalCode));
        await this.setInputValue(this.inputHouseNumber, String(address.houseNumber));        
    }

    async selectPaymentMethod(paymentMethod: PaymentMethod): Promise<void> {
        const valueToSelect = PAYMENT_METHOD_VALUES[paymentMethod];

        if (!valueToSelect) {
            throw new Error(`The payment method "${paymentMethod}" is not defined in the mapping.`);
        }

        await this.paymentMethodField.waitForClickable({ timeout: 5000 });
        await this.click(this.paymentMethodField);
        await this.paymentMethodField.selectByAttribute('value', valueToSelect);
    }

    async providePaymentInformation(paymentMethod: PaymentMethod, paymentData: PaymentData | null = null): Promise<void> {
        const data = paymentData || {};

        const paymentHandlers: Record<string, () => Promise<void>> = {
            'Transferencia bancaria': async () => {
                await this.setInputValue(this.inputBankName, data.bankName || 'Banco XYZ');
                await this.setInputValue(this.inputAccountName, data.accountName || 'Mi cuenta');
                await this.setInputValue(this.inputAccountNumber, data.accountNumber || '125478963566961');
            },
            'Tarjeta de crédito': async () => {
                await this.setInputValue(this.inputCreditCardNumber, data.cardNumber || '4690-8765-2345-8976');
                await this.setInputValue(this.inputExpirationDate, data.expirationDate || '07/2032');
                await this.setInputValue(this.inputCvv, data.cvv || '254');
                await this.setInputValue(this.inputCardHolderName, data.cardHolder || 'ElianaM');
            },
            'Compra ahora, paga después': async () => {
                await this.selectMonthlyInstallments.waitForDisplayed();
                await this.selectMonthlyInstallments.selectByAttribute('value', '3');
            },
            'Tarjeta de regalo': async () => {
                await this.setInputValue(this.inputGiftCardNumber, data.giftCardNumber || '32145448633245');
                await this.setInputValue(this.inputValidationCode, data.validationCode || '1232');
            },
            'Contra reembolso': async () => { /* No input required */ }
        };

        const handler = paymentHandlers[paymentMethod];
        if (!handler) throw new Error(`Unsupported payment method: ${paymentMethod}`);
        await handler();
    }

    async waitForCheckoutPageLoad(): Promise<void> {
        await this.waitForPageLoad(this.proceedToCheckoutButton, 'checkout');
    }

    async clickProceedToCheckout(): Promise<void> {
        await this.click(this.proceedToCheckoutButton);
    }

    async clickSecondProceedToCheckout(): Promise<void> {
        await this.click(this.proceedStepTwoButton);
    }

    async clickThirdProceedToCheckout(): Promise<void> {
        await this.click(this.proceedStepThreeButton);
    }

    async waitForMessageToProceedToCheckout(): Promise<void> {
        await this.waitForVisible(this.messageToProceedToCheckout);
    }

    async getTextMessageToProceedToCheckout(): Promise<string> {
        return await this.getText(this.messageToProceedToCheckout);
    }

    async clickToConfirmThePurchase(): Promise<void> {
        const confirmButton = this.finishPurchaseButton
        await confirmButton.waitForExist({ timeout: 10000 });
        await confirmButton.scrollIntoView();
        await confirmButton.waitForClickable({ timeout: 30000 });
        await this.click(this.finishPurchaseButton);
    }

    async waitForPaymentSuccessfulMessage(): Promise<void> {
        await this.waitForVisible(this.paymentSuccessfulMessage);
    }

    async getTextPaymentSuccessfulMessage(): Promise<string> {
        return await this.getText(this.paymentSuccessfulMessage);
    }
}

export default new CheckoutPage();
