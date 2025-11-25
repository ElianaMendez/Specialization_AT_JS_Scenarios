export default class BrowserHelper {
    static async waitForVisible(element) {
        return await element.waitForDisplayed({ timeout: 10000 });
    }

    static async click(element) {
        await this.waitForVisible(element);
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    static async setInputValue(element, text) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.setValue(text);
    }

    static async getText(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        return element.getText();
    }

    static async navigateTo(url) {
        await browser.url(url);
    }
    //async waitForMessageToProceedToCheckout() {  apply the first method waitForVisible
    //await this.messagetoProceedToCheckout.waitForDisplayed({ timeout: 10000 });
    //}

}






