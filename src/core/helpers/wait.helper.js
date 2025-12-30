export default class WaitHelper {
    /**
     * Waits for the URL to change, the DOM to be complete, and a key element to be visible.
     * @param {WebdriverIO.Element} element - The key element to confirm the page is ready.
     * @param {string} keyword - The partial string expected in the browser's URL.
     * @param {number} timeout - The maximum time to wait for all conditions (in ms).
     */
    static async waitForPageLoad(element, keyword, timeout = 60000) {
        if (keyword == 'account') {
            let url = await browser.getUrl();
            while (!url.includes('account')) {
                url = await browser.getUrl();
            }
        }

        await browser.waitUntil(
            async () => {
                return (await browser.getUrl()).includes(keyword);
            },
            {
                timeout: timeout,
                timeoutMsg: `URL did not contain "${keyword}" within ${timeout / 1000} seconds.`
            }
        );

        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: timeout,
                timeoutMsg: 'The DOM did not reach "complete" state on time.'
            }
        );

        await element.waitForDisplayed({
            timeout: timeout,
            timeoutMsg: `The key element was not displayed on the page within ${timeout / 2000} seconds.`
        });
    }

    static async waitFieldsNotEmpty(element) {
        try {
            await element.waitForDisplayed({
                timeout: 8000
            });
            await browser.waitUntil(
                async () => {
                    const value = await element.getValue();
                    return value !== '';
                },
                {
                    timeout: 10000
                }
            );
        } catch { }
    }

    static async waitUntilHomeProdutsAppears() {
        await browser.waitUntil(async () => {
            const products = await $$('img.card-img-top');
            return products.length > 0;
        }, {
            timeout: 10000,
            timeoutMsg: 'Home page: No products found'
        });

        const products = await $$('img.card-img-top');
        await products[0].waitForDisplayed({ timeout: 10000 });
    }
}