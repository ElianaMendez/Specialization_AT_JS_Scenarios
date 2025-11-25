export default class WaitHelper {
    /**
     * Waits for the URL to change, the DOM to be complete, and a key element to be visible.
     * @param {WebdriverIO.Element} element - The key element to confirm the page is ready.
     * @param {string} keyword - The partial string expected in the browser's URL.
     * @param {number} timeout - The maximum time to wait for all conditions (in ms).
     */
    static async waitForPageLoad(element, keyword, timeout = 50000) {

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
            timeoutMsg: `The key element was not displayed on the page within ${timeout / 1000} seconds.`
        });
    }
}