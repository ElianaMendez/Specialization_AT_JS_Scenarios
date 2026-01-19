import { browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

export default class BrowserHelper {
    static async waitForVisible(element: ChainablePromiseElement, customTimeout = 50000): Promise<void> {
        await element.waitForDisplayed({ timeout: customTimeout });
    }

    static async click(element: ChainablePromiseElement): Promise<void> {
        await this.waitForVisible(element);
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    static async setInputValue(element: ChainablePromiseElement, text: string | number ): Promise<void> {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.clearValue(); //optional
        await element.setValue(text);
    }

    static async getText(element: ChainablePromiseElement): Promise<string> {
        await element.waitForDisplayed({ timeout: 20000 });
        return element.getText();
    }

    static async navigateTo(url: string): Promise<void> {
        await browser.url(url);
    }
}