import { browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

const DEFAULT_TIMEOUT = process.env.CI ? 60000 : 10000;
const INPUT_TIMEOUT   = process.env.CI ? 60000 : 30000;
const TEXT_TIMEOUT    = process.env.CI ? 60000 : 20000;
const CLICK_TIMEOUT   = process.env.CI ? 60000 : 10000;

export default class BrowserHelper {

    static async waitForVisible(element: ChainablePromiseElement, customTimeout = DEFAULT_TIMEOUT): Promise<void> {
        await element.waitForDisplayed({timeout: customTimeout})  
    }

    static async click(element: ChainablePromiseElement): Promise<void> {
        await this.waitForVisible(element);
        await element.waitForClickable({ timeout: CLICK_TIMEOUT });
        await element.click();
    }

    static async setInputValue(
        element: ChainablePromiseElement,
        text: string | number
    ): Promise<void> {
        await element.waitForDisplayed({ timeout: INPUT_TIMEOUT });
        await element.clearValue();
        await element.setValue(text);
    }

    static async getText(element: ChainablePromiseElement): Promise<string> {
        await element.waitForDisplayed({ timeout: TEXT_TIMEOUT });
        return element.getText();
    }

    static async navigateTo(url: string): Promise<void> {
        await browser.url(url);
    }
}