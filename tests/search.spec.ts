import { test, expect } from "@playwright/test";
import { ENV } from "../src/config/env";
import { SearchPage } from "../src/pages/SearchPage";
import { JobPage } from "../src/pages/JobPage";
import { SearchService } from "../src/services/SearchService";
import { JobStorageService } from "../src/services/JobStorageService";
import { SearchCriteria } from "../src/types/SearchCriteria";

test.use({
    storageState: "auth/auth.json"
});

test("Search, Extract and Save Jobs", async ({ page }) => {

    await page.goto(ENV.BASE_URL);

    const searchPage = new SearchPage(page);

    const jobPage = new JobPage(page);

    const jobStorageService =
        new JobStorageService();

    const searchService =
        new SearchService(
            searchPage,
            jobPage,
            jobStorageService
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

    expect(jobs.length).toBeGreaterThan(0);

    await searchService.saveJobs(jobs);

});