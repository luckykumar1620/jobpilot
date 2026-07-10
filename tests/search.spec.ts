import { test } from "@playwright/test";
import { SearchPage } from "../src/pages/SearchPage";
import { SearchService } from "../src/services/SearchService";
import { ENV } from "../src/config/env";

test.use({
    storageState: "auth/auth.json"
});

test("Search QA Automation Jobs", async ({ page }) => {

    await page.goto(ENV.BASE_URL);

    const searchPage = new SearchPage(page);

    const service = new SearchService(searchPage);

    await service.searchJob(
        "QA Automation Engineer",
        "Bengaluru"
    );

    await page.waitForTimeout(5000);

    await page.screenshot({
        path: "search-result.png",
        fullPage: true
    });

});