import { test, expect } from "@playwright/test";
import { JobPage } from "../src/pages/JobPage";
import { ApplyService } from "../src/services/ApplyService";
import { ApplicationPage } from "../src/pages/ApplicationPage";
import { AnswerService } from "../src/services/AnswerService";

test.use({
    storageState: "auth/auth.json"
});

test("Verify recruiter questions", async ({ page }) => {

    await page.goto(
        "https://www.naukri.com/job-listings-machine-learning-engineer-0-5-tech-mahindra-noida-pune-bengaluru-0-to-5-years-300926017847?src=jobsearchDesk&sid=17921733154462969&xp=1&px=1",
        {
            waitUntil: "domcontentloaded",
            timeout: 30000
        }
    );

    const jobPage =
        new JobPage(page);

    const applyService =
        new ApplyService(jobPage);

    const applicationPage =
        new ApplicationPage(page);

    const answerService =
        new AnswerService();

    // ==========================================
    // APPLY
    // ==========================================

    await applyService.applyToJob();

    console.log(
        "Application flow started"
    );

    // ==========================================
    // GET FIRST QUESTION
    // ==========================================

    let questionNumber = 1;

    await expect.poll(
        async () => {
            return await applicationPage.getQuestion();
        },
        {
            timeout: 10000
        }
    ).not.toBe("");

    let question =
        await applicationPage.getQuestion();

    // ==========================================
    // QUESTION LOOP
    // ==========================================

    while (true) {

        console.log(
            `\n========== Question ${questionNumber} ==========`
        );

        console.log(
            "Recruiter Question:",
            question
        );

        expect(question).not.toBe("");

        // ======================================
        // CHECK COMPLETION MESSAGE
        // ======================================

        const isCompleted =
            await applicationPage
                .isApplicationCompleted();

        if (isCompleted) {

            console.log(
                "Thank you for your responses."
            );

            console.log(
                "Questionnaire completed."
            );

            console.log(
                "Application submitted successfully."
            );

            break;
        }

        // ======================================
        // GENERATE ANSWER
        // ======================================

        const answer =
            answerService.getAnswer(question);

        console.log(
            "Generated Answer:",
            answer
        );

        // ======================================
        // ANSWER VALIDATION
        // ======================================

        if (!answer) {

            throw new Error(
                `No answer found for recruiter question: ${question}`
            );
        }

        // ======================================
        // ANSWER QUESTION
        // ======================================

        await applicationPage
            .answerCurrentQuestion(answer);

        console.log(
            "Answer entered successfully"
        );

        // ======================================
        // CHECK SAVE BUTTON
        // ======================================

        const hasSaveButton =
            await applicationPage
                .hasSaveButton();

        console.log(
            "Save button available:",
            hasSaveButton
        );

        if (!hasSaveButton) {

            console.log(
                "Save button not available."
            );

            break;
        }

        // ======================================
        // SAVE CURRENT ANSWER
        // ======================================

        await applicationPage.clickSave();

        console.log(
            "Save button clicked"
        );

        // ======================================
        // WAIT FOR NEXT QUESTION
        // ======================================

        try {

            const nextQuestion =
                await applicationPage
                    .waitForNextQuestion(
                        question
                    );

            console.log(
                "Next Recruiter Question:",
                nextQuestion
            );

            // ======================================
            // CHECK APPLICATION COMPLETION
            // ======================================

            const normalizedNextQuestion =
                nextQuestion
                    .trim()
                    .toLowerCase();

            if (
                normalizedNextQuestion.includes(
                    "thank you for your responses"
                ) ||
                normalizedNextQuestion.includes(
                    "thank you for the response"
                )
            ) {

                console.log(
                    "Thank you for your responses."
                );

                console.log(
                    "Questionnaire completed."
                );

                console.log(
                    "Application submitted successfully."
                );

                break;
            }

            // ======================================
            // MOVE TO NEXT QUESTION
            // ======================================

            question = nextQuestion;

            questionNumber++;

        } catch {

            // ======================================
            // CHECK IF APPLICATION WAS COMPLETED
            // ======================================

            const completed =
                await applicationPage
                    .isApplicationCompleted();

            if (completed) {

                console.log(
                    "Thank you for your responses."
                );

                console.log(
                    "Questionnaire completed."
                );

                console.log(
                    "Application submitted successfully."
                );

                break;
            }

            throw new Error(
                "Unable to find the next recruiter question."
            );
        }
    }

    console.log(
        "\nApplication question flow completed successfully."
    );
});