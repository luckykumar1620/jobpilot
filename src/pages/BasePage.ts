import { Page, Locator, expect } from "@playwright/test";

export class BasePage {

    constructor(protected page: Page) {}

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.waitFor({ state: "visible" });
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.waitFor({ state: "visible" });
        await locator.fill(value);
    }

    async type(locator: Locator, value: string) {
        await locator.waitFor({ state: "visible" });
        await locator.pressSequentially(value);
    }

    async getText(locator: Locator) {
        return await locator.textContent();
    }

    async isVisible(locator: Locator) {
        return await locator.isVisible();
    }

    async wait(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    async verifyUrlContains(text: string) {
        await expect(this.page).toHaveURL(new RegExp(text));
    }
}