import BrowserHelper from '../helpers/browser.helper';
import WaitHelper from '../helpers/wait.helper';
import type { ChainablePromiseElement } from 'webdriverio';

export default class BasePage {
    constructor() { }

    /**
     * 
     * @param path {string}, , returns nothing (void)
     */
    async open(path: string): Promise<void> {
        await BrowserHelper.navigateTo(path);
    }

    // element uses the WDIO type, keyword is a string
    async waitForPageLoad(
        element: ChainablePromiseElement,
        keyword: string,
        timeout: number = 30000
    ): Promise<void> {
        await WaitHelper.waitForPageLoad(element, keyword, timeout);
    }

    async waitFieldsNotEmpty(element: ChainablePromiseElement): Promise<void> {
        await WaitHelper.waitFieldsNotEmpty(element);
    }

    async click(element: ChainablePromiseElement): Promise<void> {
        await BrowserHelper.click(element);
    }

    async setInputValue(element: ChainablePromiseElement, text: string | number): Promise<void> {
        await BrowserHelper.setInputValue(element, text);
    }

    async waitForVisible(element: ChainablePromiseElement, customTimeout = 60000):Promise<void> {     
        await BrowserHelper.waitForVisible(element, customTimeout);
    }

    async getText(element: ChainablePromiseElement): Promise<string> {
        return await BrowserHelper.getText(element);
    }

    async waitUntilHomeProductsAppears(): Promise<void> {
        await WaitHelper.waitUntilHomeProductsAppears();
    }
}