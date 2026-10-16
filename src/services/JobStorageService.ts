import * as fs from "fs";
import * as path from "path";
import { Job } from "../types/Job";
import { DuplicateDetectionService } from "./DuplicateDetectionService";

export class JobStorageService {

    private readonly filePath = path.resolve(
        __dirname,
        "../data/jobs.json"
    );

    private readonly duplicateDetectionService =
        new DuplicateDetectionService();

    async saveJobs(jobs: Job[]): Promise<void> {

        const directory = path.dirname(
            this.filePath
        );

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {
                recursive: true
            });
        }

        // Read existing jobs
        const existingJobs = await this.getJobs();

        // Remove duplicates already present in jobs.json
        const uniqueExistingJobs =
            this.duplicateDetectionService.removeDuplicates(
                existingJobs
            );

        // Find only genuinely new jobs
        const newJobs =
            this.duplicateDetectionService.filterNewJobs(
                uniqueExistingJobs,
                jobs
            );

        // Combine old unique jobs + new jobs
        const allJobs = [
            ...uniqueExistingJobs,
            ...newJobs
        ];

        // Save final unique list
        await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(allJobs, null, 2),
            "utf-8"
        );
    }

    async getJobs(): Promise<Job[]> {

        if (!fs.existsSync(this.filePath)) {
            return [];
        }

        const data =
            await fs.promises.readFile(
                this.filePath,
                "utf-8"
            );

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data) as Job[];
    }
}