import { Job } from "../types/Job";
import { JobPage } from "../pages/JobPage";
import { ApplicationPage } from "../pages/ApplicationPage";
import { Logger } from "../utils/Logger";
import { ReportService } from "./ReportService";

export class ApplyService {

    private readonly reportService =
        new ReportService();

    constructor(
        private readonly jobPage: JobPage
    ) {}

    async applyToJob(
        job: Job
    ): Promise<"DIRECT_APPLY" | "QUESTIONNAIRE"> {

        Logger.info(
            `Attempting to apply to job: ${job.title}`
        );

        try {

            await this.jobPage.clickApply();

            Logger.success(
                "Apply button clicked successfully"
            );

            const applicationPage =
                new ApplicationPage(this.jobPage["page"]);

            const directApply =
                await applicationPage
                    .isDirectApplicationSuccessful();

            if (directApply) {

                Logger.success(
                    "Direct application successful"
                );

                await this.reportApplicationSuccess(
                    job,
                    "Application submitted successfully with one-click apply"
                );

                return "DIRECT_APPLY";
            }

            Logger.info(
                "Recruiter questionnaire detected"
            );

            return "QUESTIONNAIRE";

        } catch (error) {

            await this.reportService.addReport({
                jobId: job.id,
                title: job.title,
                company: job.company,
                jobUrl: job.jobUrl,
                status: "FAILED",
                timestamp: new Date().toISOString(),
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown application error"
            });

            throw error;
        }
    }

    async reportApplicationSuccess(
        job: Job,
        message: string = "Application submitted successfully"
    ): Promise<void> {

        await this.reportService.addReport({
            jobId: job.id,
            title: job.title,
            company: job.company,
            jobUrl: job.jobUrl,
            status: "APPLIED",
            timestamp: new Date().toISOString(),
            message
        });

        Logger.success(
            "Application report saved successfully"
        );
    }
}