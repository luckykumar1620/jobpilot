import { test } from "@playwright/test";
import { JobPage } from "../src/pages/JobPage";
import { ApplyService } from "../src/services/ApplyService";

test.use({
    storageState: "auth/auth.json"
});

test("Apply to job", async ({ page }) => {

    await page.goto(
        "https://www.naukri.com/job-listings-quality-assurance-manager-topgear-consultants-bengaluru-0-to-1-years-031026009421?src=jobsearchDesk&sid=17920671039223174&xp=8&px=1&nignbevent_src=jobsearchDeskGNB",
        {
            waitUntil: "domcontentloaded",
            timeout: 30000
        }
    );

    const jobPage = new JobPage(page);

    const applyService =
        new ApplyService(jobPage);

    await applyService.applyToJob();

    await page.waitForTimeout(2000);

    console.log(
        "Current URL after Apply:",
        page.url()
    );

    console.log(
        "Buttons after Apply:",
        await page.locator("button").allTextContents()
    );

    console.log(
        "Text containing Apply:",
        await page
            .getByText(/Apply/i)
            .allTextContents()
    );

    console.log(
        "Dialogs:",
        await page.locator('[role="dialog"]').count()
    );

    await page.screenshot({
        path: "screenshots/after-apply.png",
        fullPage: true
    });
});