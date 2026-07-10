import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // ---------- Locators ----------

    private searchJobsHere =
        this.page.getByText("Search jobs here");

    private jobTypeTextbox =
        this.page.getByRole("textbox", {
            name: "Select job type"
        });

    private jobOption =
        this.page.getByText("Job", { exact: true });

    private keywordTextbox =
        this.page.getByRole("textbox", {
            name: "Enter keyword / designation"
        });

    private locationTextbox =
        this.page.getByRole("textbox", {
            name: "Enter location"
        });

    private searchButton =
        this.page.getByRole("button", {
            name: /Search/
        });

    // ---------- Actions ----------

    async openSearchPanel() {

        await this.click(this.searchJobsHere);

    }

    async selectJobType() {

        await this.click(this.jobTypeTextbox);

        await this.click(this.jobOption);

    }

    async enterKeyword(keyword: string) {

        await this.fill(this.keywordTextbox, keyword);

    }

    async enterLocation(location: string) {

        await this.fill(this.locationTextbox, location);

    }

    async clickSearch() {

        await this.click(this.searchButton);

    }

}