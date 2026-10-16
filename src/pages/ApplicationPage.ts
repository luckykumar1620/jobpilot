import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ApplicationPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private questionMessages: Locator = this.page.locator(
        "li.botItem .botMsg"
    );

    private answerInput: Locator = this.page.locator(
        'div.textArea[contenteditable="true"]'
    ).last();

    async getQuestion(): Promise<string> {

    const count =
        await this.questionMessages.count();

    for (
        let index = count - 1;
        index >= 0;
        index--
    ) {

        const message =
            (
                await this.questionMessages
                    .nth(index)
                    .textContent()
            )?.trim() ?? "";

        if (!message) {
            continue;
        }

        const normalizedMessage =
            message.toLowerCase();

        // Ignore Naukri's introductory message
        if (
            normalizedMessage.includes(
                "thank you for showing interest"
            ) &&
            normalizedMessage.includes(
                "recruiter's questions"
            )
        ) {
            continue;
        }

        return message;
    }

    return "";
}

    async enterAnswer(answer: string): Promise<void> {

        await this.answerInput.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.answerInput.fill(answer);
    }

    async selectRadioOption(option: string): Promise<void> {

        const radioOption = this.page.locator(
            `input[type="radio"][value="${option}"]`
        );

        const radioLabel = this.page.locator(
            `label.ssrc__label[for="${option}"]`
        );

        await radioLabel.waitFor({
            state: "visible",
            timeout: 10000
        });

        await radioLabel.click();

        await expect(radioOption).toBeChecked({
            timeout: 10000
        });
    }

    async hasRadioOptions(): Promise<boolean> {

        const radioOptions =
            this.page.locator(
                'input[type="radio"]:visible'
            );

        return await radioOptions.count() > 0;
    }

    async getRadioOptions(): Promise<string[]> {

        const radioLabels = this.page.locator(
            "label.ssrc__label:visible"
        );

        const count =
            await radioLabels.count();

        const options: string[] = [];

        for (
            let index = 0;
            index < count;
            index++
        ) {

            const option =
                (
                    await radioLabels
                        .nth(index)
                        .textContent()
                )?.trim() ?? "";

            if (option) {
                options.push(option);
            }
        }

        return options;
    }

    async answerCurrentQuestion(
        answer: string
    ): Promise<void> {

        const hasRadio =
            await this.hasRadioOptions();

        if (hasRadio) {

            const radioOptions =
                await this.getRadioOptions();

            console.log(
                "Available radio options:",
                radioOptions
            );

            const matchingOption =
                radioOptions.find(
                    option =>
                        option.toLowerCase() ===
                        answer.toLowerCase()
                );

            if (matchingOption) {

                await this.selectRadioOption(
                    matchingOption
                );

                return;
            }

            if (
                answer.toLowerCase() === "yes"
            ) {

                const yesOption =
                    radioOptions.find(
                        option =>
                            option.toLowerCase()
                                .includes("yes")
                    );

                if (yesOption) {

                    await this.selectRadioOption(
                        yesOption
                    );

                    return;
                }
            }

            if (
                answer.toLowerCase() === "no"
            ) {

                const noOption =
                    radioOptions.find(
                        option =>
                            option.toLowerCase()
                                .includes("no")
                    );

                if (noOption) {

                    await this.selectRadioOption(
                        noOption
                    );

                    return;
                }
            }

            throw new Error(
                `Answer "${answer}" not available in radio options: ${radioOptions.join(", ")}`
            );
        }

        await this.enterAnswer(answer);
    }

    async hasSaveButton(): Promise<boolean> {

        const saveButton =
            this.page.locator(
                ".sendMsg"
            ).filter({
                hasText: "Save"
            });

        return (
            await saveButton.count() > 0 &&
            await saveButton.isVisible()
        );
    }

    async clickSave(): Promise<void> {

        const saveButton =
            this.page.locator(
                ".sendMsg"
            ).filter({
                hasText: "Save"
            });

        await saveButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await saveButton.click();
    }

    async isApplicationCompleted(): Promise<boolean> {

        const messages =
            this.page.locator(
                "li.botItem .botMsg"
            );

        const count =
            await messages.count();

        for (
            let index = 0;
            index < count;
            index++
        ) {

            const message =
                (
                    await messages
                        .nth(index)
                        .textContent()
                )?.trim().toLowerCase() ?? "";

            if (
                message.includes(
                    "thank you for your responses"
                ) ||
                message.includes(
                    "thank you for the response"
                )
            ) {
                return true;
            }
        }

        return false;
    }

    async waitForNextQuestion(
        previousQuestion: string
    ): Promise<string> {

        await expect
            .poll(
                async () => {

                    const currentQuestion =
                        await this.getQuestion();

                    return currentQuestion;
                },
                {
                    timeout: 10000
                }
            )
            .not.toBe(previousQuestion);

        return await this.getQuestion();
    }

    async clickFinalSave(): Promise<void> {

        const saveButton =
            this.page.locator(
                ".sendMsg"
            ).filter({
                hasText: "Save"
            });

        await saveButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await saveButton.click();
    }

    async waitForApplicationCompletion(): Promise<void> {

        await expect(
            this.questionMessages
        ).toBeHidden({
            timeout: 10000
        });
    }
}