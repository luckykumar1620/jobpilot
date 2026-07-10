import { SearchCriteria } from "../types/SearchCriteria";
import { SearchPage } from "../pages/SearchPage";
import { Logger } from "../utils/Logger";

export class SearchService {

    constructor(private searchPage: SearchPage) {}

    async searchJob(criteria: SearchCriteria) {

        Logger.info("Opening Search Panel");

        await this.searchPage.openSearchPanel();

        Logger.info("Selecting Job Type");

        await this.searchPage.selectJobType();

        Logger.info(`Searching Keyword : ${criteria.keyword}`);

        await this.searchPage.enterKeyword(criteria.keyword);

        Logger.info(`Searching Location : ${criteria.location}`);

        await this.searchPage.enterLocation(criteria.location);

        Logger.info("Click Search");

        await this.searchPage.clickSearch();

    }

}