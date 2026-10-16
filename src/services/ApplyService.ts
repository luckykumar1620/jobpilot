import { JobPage } from "../pages/JobPage";
import { Logger } from "../utils/Logger";

export class ApplyService {

    constructor(
        private readonly jobPage: JobPage
    ) {}

    async applyToJob(): Promise<void> {

        Logger.info("Attempting to apply to job...");

        await this.jobPage.clickApply();

        Logger.success(
            "Apply button clicked successfully"
        );
    }
}