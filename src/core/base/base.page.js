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

    async click(element) {
        return BrowserHelper.click(element);
    }

    async setInputValue(element, text) {
        return BrowserHelper.setInputValue(element, text);
    }

    async waitForVisible(element) {
        return BrowserHelper.waitForVisible(element);
    }

    async getText(element) {
        return BrowserHelper.getText(element);
    }
}
