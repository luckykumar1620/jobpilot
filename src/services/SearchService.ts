import { SearchPage } from "../pages/SearchPage";
import { JobPage } from "../pages/JobPage";
import { SearchCriteria } from "../types/SearchCriteria";
import { Job } from "../types/Job";
import { Logger } from "../utils/Logger";

export class SearchService {

    constructor(
        private readonly searchPage: SearchPage,
        private readonly jobPage: JobPage
    ) {}

    async performSearch(
        criteria: SearchCriteria
    ): Promise<void> {

        Logger.info(
            `Searching for: ${criteria.keyword}`
        );

        await this.searchPage.performSearch(
            criteria
        );

        Logger.success(
            "Search completed successfully"
        );
    }

    async extractJobs(): Promise<Job[]> {

        Logger.info(
            "Extracting jobs from search results..."
        );

        const jobs =
            await this.jobPage.extractJobs();

        Logger.success(
            `Extracted ${jobs.length} jobs`
        );

        return jobs;
    }
}