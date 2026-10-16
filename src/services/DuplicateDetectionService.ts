import { Job } from "../types/Job";

export class DuplicateDetectionService {

    filterNewJobs(
        existingJobs: Job[],
        newJobs: Job[]
    ): Job[] {

        const existingJobKeys = new Set(
            existingJobs.map(job => this.createJobKey(job))
        );

        const uniqueNewJobs: Job[] = [];

        for (const job of newJobs) {

            const jobKey = this.createJobKey(job);

            if (!existingJobKeys.has(jobKey)) {

                existingJobKeys.add(jobKey);

                uniqueNewJobs.push(job);
            }
        }

        return uniqueNewJobs;
    }

    removeDuplicates(
        jobs: Job[]
    ): Job[] {

        const uniqueJobs: Job[] = [];
        const jobKeys = new Set<string>();

        for (const job of jobs) {

            const jobKey = this.createJobKey(job);

            if (!jobKeys.has(jobKey)) {

                jobKeys.add(jobKey);
                uniqueJobs.push(job);
            }
        }

        return uniqueJobs;
    }

    private createJobKey(job: Job): string {

        if (job.id) {
            return `id:${job.id}`;
        }

        return [
            job.title,
            job.company,
            job.location
        ]
            .map(value => value.trim().toLowerCase())
            .join("|");
    }
}