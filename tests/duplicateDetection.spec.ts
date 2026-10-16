import { test, expect } from "@playwright/test";
import { DuplicateDetectionService } from "../src/services/DuplicateDetectionService";
import { Job } from "../src/types/Job";

test("Duplicate Detection should remove duplicate jobs", async () => {

    const duplicateDetectionService =
        new DuplicateDetectionService();

    const existingJobs: Job[] = [
        {
            id: "123",
            title: "QA Engineer",
            company: "ABC",
            location: "Bengaluru",
            experience: "0-2 Yrs",
            salary: "",
            postedDate: "2 days ago",
            jobUrl: "https://example.com/123"
        },
        {
            id: "123",
            title: "QA Engineer",
            company: "ABC",
            location: "Bengaluru",
            experience: "0-2 Yrs",
            salary: "",
            postedDate: "2 days ago",
            jobUrl: "https://example.com/123"
        }
    ];

    const uniqueJobs =
        duplicateDetectionService.removeDuplicates(
            existingJobs
        );

    expect(uniqueJobs.length).toBe(1);
});