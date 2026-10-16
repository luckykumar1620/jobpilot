import { Logger } from "../utils/Logger";

export class AnswerService {

    getAnswer(question: string): string {

        const normalizedQuestion =
            question.trim().toLowerCase();

        Logger.info(
            `Finding answer for question: ${question}`
        );

        // NOTICE PERIOD
        if (
            normalizedQuestion.includes("notice period") ||
            normalizedQuestion.includes("lwd")
        ) {
            return "Immediate";
        }

        // =========================================================
        // EXPERIENCE - ANY ROLE / TECHNOLOGY
        // =========================================================
        //
        // Examples:
        // "How many years of experience do you have in Data Analytics?"
        // "How many years of experience do you have in Manual Testing?"
        // "How many years of experience do you have in Selenium?"
        // "How many years of experience do you have in Java?"
        //
        // For all such questions, return 1.
        //
        if (
            normalizedQuestion.includes("how many years") &&
            (
                normalizedQuestion.includes("experience") ||
                normalizedQuestion.includes("exp")
            )
        ) {
            return "1";
        }

        // Experience question using different wording
        if (
            normalizedQuestion.includes("years of experience")
        ) {
            return "1";
        }

        // =========================================================
        // CTC
        // =========================================================

        if (
            normalizedQuestion.includes("current ctc") ||
            normalizedQuestion.includes("ctc in lacs") ||
            normalizedQuestion.includes("current salary")
        ) {
            return "3 LPA";
        }

        // =========================================================
        // YES / NO - AUTOMATION
        // =========================================================

        if (
            normalizedQuestion.includes("automation testing") ||
            normalizedQuestion.includes("automation test") ||
            normalizedQuestion.includes("automation")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - SELENIUM
        // =========================================================

        if (
            normalizedQuestion.includes("selenium")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - PLAYWRIGHT
        // =========================================================

        if (
            normalizedQuestion.includes("playwright")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - API TESTING
        // =========================================================

        if (
            normalizedQuestion.includes("api testing") ||
            normalizedQuestion.includes("api test")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - CI/CD
        // =========================================================

        if (
            normalizedQuestion.includes("ci/cd") ||
            normalizedQuestion.includes("cicd") ||
            normalizedQuestion.includes("continuous integration")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - JIRA
        // =========================================================

        if (
            normalizedQuestion.includes("jira") ||
            normalizedQuestion.includes("atlassian")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - WEB APPLICATION
        // =========================================================

        if (
            normalizedQuestion.includes("web application") ||
            normalizedQuestion.includes("web applications")
        ) {
            return "Yes";
        }

        // =========================================================
        // YES / NO - RELOCATION
        // =========================================================

        if (
            normalizedQuestion.includes("relocate") ||
            normalizedQuestion.includes("relocation") ||
            normalizedQuestion.includes("bengaluru")
        ) {
            return "Yes";
        }

        // =========================================================
        // NO ANSWER FOUND
        // =========================================================

        Logger.info(
            `No predefined answer found for: ${question}`
        );

        return "";
    }
}