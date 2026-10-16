import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Job } from "../types/Job";

export class JobPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Actual Naukri job cards.
     */
    private get jobCards(): Locator {
        return this.page.locator(
            "div.cust-job-tuple"
        );
    }

    /**
     * Get total number of jobs displayed.
     */
    async getTotalJobs(): Promise<number> {
        return await this.jobCards.count();
    }

    /**
     * Extract all jobs from current search results.
     */
    async extractJobs(): Promise<Job[]> {

        const jobs: Job[] = [];

        const totalJobs = await this.getTotalJobs();

        for (let index = 0; index < totalJobs; index++) {

            const card = this.jobCards.nth(index);

            const titleLink = card.locator(
                "a.title"
            ).first();

            const jobUrl =
                await titleLink.getAttribute("href") ?? "";

            const job: Job = {
                id: this.extractJobId(jobUrl),

                title:
                    await this.getText(
                        card.locator("a.title").first()
                    ),

                company:
                    await this.getText(
                        card.locator("a.comp-name").first()
                    ),

                location:
                    await this.getText(
                        card.locator(".locWdth").first()
                    ),

                experience:
                    await this.getText(
                        card.locator(".expwdth").first()
                    ),

                salary:
                    await this.getText(
                        card.locator(".sal").first()
                    ),

                postedDate:
                    await this.getText(
                        card.locator(".job-post-day").first()
                    ),

                jobUrl
            };

            jobs.push(job);
        }

        return jobs;
    }

    /**
     * Extract text safely from a locator.
     */
    private async getText(
        locator: Locator
    ): Promise<string> {

        if (await locator.count() === 0) {
            return "";
        }

        return (
            await locator.textContent()
        )?.trim() ?? "";
    }

    /**
     * Extract job ID from Naukri job URL.
     */
    private extractJobId(
        jobUrl: string
    ): string {

        const match = jobUrl.match(
            /-(\d+)(?:\?|$)/
        );

        return match?.[1] ?? "";
    }
}