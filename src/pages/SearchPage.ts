import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SearchCriteria } from "../types/SearchCriteria";

export class SearchPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private searchPanel = this.page.getByRole("button", {
        name: "Search jobs here"
    });

    private searchBar = this.page.locator("#ni-gnb-searchbar");

    private jobTypeInput = this.searchBar.getByRole("textbox", {
        name: "Select job type"
    });

    private keywordInput = this.searchBar.getByPlaceholder(
    "Enter keyword / designation / companies"
    );

    private locationInput = this.searchBar.getByRole("textbox", {
        name: "Enter location"
    });

    private searchButton = this.searchBar.getByRole("button", {
        name: /Search/
    });

    async openSearchPanel(): Promise<void> {
        await this.click(this.searchPanel);
    }

    async selectJobType(): Promise<void> {
        await this.click(this.jobTypeInput);

        const jobOption = this.searchBar.getByText("Job", {
            exact: true
        });

        await this.click(jobOption);

        await this.waitForVisible(this.keywordInput);
    }

    async enterKeyword(keyword: string): Promise<void> {
        await this.fill(this.keywordInput, keyword);
    }

    async enterLocation(location: string): Promise<void> {
        await this.fill(this.locationInput, location);
    }

   async clickSearchButton(): Promise<void> {
    await this.click(this.searchButton);

    await this.page.waitForURL(
        /naukri\.com\/.*-jobs-in-/,
        {
            timeout: 30000
        }
    );

    await this.page.locator(
        "div.cust-job-tuple"
    ).first().waitFor({
        state: "visible",
        timeout: 30000
    });
    }

    async performSearch(criteria: SearchCriteria): Promise<void> {
        await this.openSearchPanel();
        await this.selectJobType();
        await this.enterKeyword(criteria.keyword);
        await this.enterLocation(criteria.location);
        await this.clickSearchButton();
    }
}