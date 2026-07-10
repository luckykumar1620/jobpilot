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

    const criteria = {

    keyword: "QA Automation Engineer",

    location: "Bengaluru"

};

    await service.searchJob(criteria);

    await page.waitForTimeout(5000);

    await page.screenshot({
        path: "search-result.png",
        fullPage: true
    });

});