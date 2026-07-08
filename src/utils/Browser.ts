import { chromium, Browser, Page } from "@playwright/test";
import { ENV } from "../config/env";

export class BrowserManager {

    browser!: Browser;
    page!: Page;

    async start() {

        this.browser = await chromium.launch({
            headless: ENV.HEADLESS
        });

        const context = await this.browser.newContext();

        this.page = await context.newPage();

        return this.page;
    }

    async close() {
        await this.browser.close();
    }

}