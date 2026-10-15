import { expect, Locator, Page } from "@playwright/test";

export abstract class BasePage {

    constructor(protected readonly page: Page) {}

    protected async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.click();
    }

    protected async fill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.fill(value);
    }

    protected async type(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: "visible" });
        await locator.pressSequentially(value);
    }

    protected async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? "";
    }

    protected async getTexts(locator: Locator): Promise<string[]> {
        return await locator.allTextContents();
    }

    protected async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    protected async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
    }

    protected async wait(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    protected async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    protected async verifyUrlContains(value: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(value));
    }
}