import { ChainablePromiseElement } from 'webdriverio';

export default class WaitHelper {
    // Adding constants for better maintenance
    public static readonly PRODUCTS_TIMEOUT = 10000;
    public static readonly DEFAULT_TIMEOUT = 60000;

    /**
     * Waits for the URL to change, the DOM to be complete, and a key element to be visible.
     */
    static async waitForPageLoad(
        element: ChainablePromiseElement,
        keyword: string,
        timeout: number = WaitHelper.DEFAULT_TIMEOUT
    ): Promise<void> {

        // 1. Wait for URL to contain the keyword
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(keyword),
            {
                timeout: timeout,
                timeoutMsg: `URL did not contain "${keyword}" within ${timeout / 1000} seconds.`
            }
        );

        // 2. Wait for DOM to reach 'complete' state (Fixed document error)
        await browser.waitUntil(
            async () => await browser.execute(() => globalThis.document.readyState === 'complete'),
            {
                timeout: timeout,
                timeoutMsg: 'The DOM did not reach "complete" state on time.'
            }
        );

        // 3. Wait for the specific element to be visible
        await element.waitForDisplayed({
            timeout: timeout,
            timeoutMsg: `The key element was not displayed on the page within ${timeout / 1000} seconds.`
        });
    }

    /**
     * Waits until a field's value is no longer empty.
     */
    static async waitFieldsNotEmpty(element: ChainablePromiseElement): Promise<void> {
        try {
            await element.waitForDisplayed({ timeout: 8000 });
            await browser.waitUntil(
                async () => {
                    const value = await element.getValue();
                    return value !== '';
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Field remained empty after 10 seconds'
                }
            );
        } catch (error) {
            // Silently failing as per original logic, though logging is recommended
            console.warn('Field was still empty or not found');
        }
    }

    /**
     * Waits for product images to appear on the Home Page.
     */
    static async waitUntilHomeProductsAppears(): Promise<void> {
        const selector = 'img.card-img-top';

        // Wait for at least one element to exist in the DOM
        await $(selector).waitForExist({
            timeout: WaitHelper.PRODUCTS_TIMEOUT,
            timeoutMsg: 'Home page: No products found'
        });

        // Ensure the first product found is actually visible
        await $(selector).waitForDisplayed({
            timeout: WaitHelper.PRODUCTS_TIMEOUT
        });
    }
}