import * as fs from "fs";
import * as path from "path";

export interface ApplicationReport {
    jobId: string;
    title: string;
    company: string;
    jobUrl: string;
    status:
        | "APPLIED"
        | "ALREADY_APPLIED"
        | "FAILED"
        | "SKIPPED";
    timestamp: string;
    message?: string;
}

export class ReportService {

    private readonly filePath = path.resolve(
        __dirname,
        "../data/applicationReport.json"
    );

    async addReport(
        report: ApplicationReport
    ): Promise<void> {

        const directory =
            path.dirname(this.filePath);

        if (!fs.existsSync(directory)) {

            fs.mkdirSync(directory, {
                recursive: true
            });
        }

        let reports:
            ApplicationReport[] = [];

        if (fs.existsSync(this.filePath)) {

            const data =
                await fs.promises.readFile(
                    this.filePath,
                    "utf-8"
                );

            if (data.trim()) {

                reports =
                    JSON.parse(data);
            }
        }

        reports.push(report);

        await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(
                reports,
                null,
                2
            ),
            "utf-8"
        );
    }

    async getReports():
        Promise<ApplicationReport[]> {

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

        return JSON.parse(data);
    }
}