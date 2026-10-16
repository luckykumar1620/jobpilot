import { test, expect } from "@playwright/test";
import { ENV } from "../src/config/env";
import { SearchPage } from "../src/pages/SearchPage";
import { JobPage } from "../src/pages/JobPage";
import { SearchService } from "../src/services/SearchService";
import { SearchCriteria } from "../src/types/SearchCriteria";

test.use({
    storageState: "auth/auth.json"
});

test("Search and Extract Jobs", async ({ page }) => {

    await page.goto(ENV.BASE_URL);

    const searchPage = new SearchPage(page);

    const jobPage = new JobPage(page);

    const searchService = new SearchService(
        searchPage,
        jobPage
    );

    const criteria: SearchCriteria = {
        keyword: "QA Automation Engineer",
        location: "Bengaluru"
    };

    await searchService.performSearch(
        criteria
    );

    const jobs =
        await searchService.extractJobs();

    console.log(
        JSON.stringify(jobs, null, 2)
    );

    expect(jobs.length).toBeGreaterThan(0);

});