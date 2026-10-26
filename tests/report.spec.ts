import { test, expect } from "@playwright/test";
import {
    ReportService,
    ApplicationReport
} from "../src/services/ReportService";

test("Verify application report service", async () => {

    const reportService =
        new ReportService();

    const report: ApplicationReport = {

        jobId: "TEST-001",

        title: "QA Automation Engineer",

        company: "Test Company",

        jobUrl:
            "https://www.naukri.com/test-job",

        status: "APPLIED",

        timestamp:
            new Date().toISOString(),

        message:
            "Application submitted successfully"
    };

    await reportService.addReport(report);

    const reports =
        await reportService.getReports();

    expect(reports.length)
        .toBeGreaterThan(0);

    const latestReport =
        reports[reports.length - 1];

    expect(latestReport.jobId)
        .toBe("TEST-001");

    expect(latestReport.status)
        .toBe("APPLIED");

    console.log(
        "Latest Report:",
        latestReport
    );
});