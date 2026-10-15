import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Job } from "../types/Job";

export class JobPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Placeholder locator - we'll replace it with the actual locator
    private get jobCards(): Locator {
        return this.page.locator("article");
    }

    async getTotalJobs(): Promise<number> {

        return await this.jobCards.count();

    }

    async extractJobs(): Promise<Job[]> {

        const jobs: Job[] = [];

        const totalJobs = await this.getTotalJobs();

        for (let index = 0; index < totalJobs; index++) {

            const card = this.jobCards.nth(index);

            const job: Job = {

                title: "",
                company: "",
                location: "",
                experience: "",
                salary: "",
                postedDate: "",
                jobUrl: ""

            };

            jobs.push(job);

        }

        return jobs;

    }

}