import BrowserHelper from '../helpers/browser.helper.js';
import WaitHelper from '../helpers/wait.helper.js'

export default class BasePage {
    constructor() { }

    async open(path) {
        await BrowserHelper.navigateTo(path);
    }

    async waitForPageLoad(element, keyword) {
        await WaitHelper.waitForPageLoad(element, keyword);
    }

    async waitFieldsNotEmpty(element) {
        await WaitHelper.waitFieldsNotEmpty(element);
    }

    async click(element) {
        return BrowserHelper.click(element);
    }

    async setInputValue(element, text) {
        return BrowserHelper.setInputValue(element, text);
    }

    async waitForVisible(element, customTimeout = 50000) {
        return BrowserHelper.waitForVisible(element, customTimeout = 50000);
    }

    async getText(element) {
        return BrowserHelper.getText(element);
    }

}
