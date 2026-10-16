import { SearchPage } from "../pages/SearchPage";
import { JobPage } from "../pages/JobPage";
import { SearchCriteria } from "../types/SearchCriteria";
import { Job } from "../types/Job";
import { Logger } from "../utils/Logger";
import { JobStorageService } from "./JobStorageService";

export class SearchService {

    constructor(
        private readonly searchPage: SearchPage,
        private readonly jobPage: JobPage,
        private readonly jobStorageService: JobStorageService
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

    async saveJobs(
        jobs: Job[]
    ): Promise<void> {

        Logger.info(
            "Saving jobs to jobs.json..."
        );

        await this.jobStorageService.saveJobs(
            jobs
        );

        Logger.success(
            `Saved ${jobs.length} jobs to jobs.json`
        );
    }
}