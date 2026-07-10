import { SearchPage } from "../pages/SearchPage";
import { Logger } from "../utils/Logger";

export class SearchService {

    constructor(
        private searchPage: SearchPage
    ) {}

    async searchJob(keyword: string, location: string) {

        Logger.info("Opening Search Panel");

        await this.searchPage.openSearchPanel();

        Logger.info("Selecting Job Type");

        await this.searchPage.selectJobType();

        Logger.info("Entering Keyword");

        await this.searchPage.enterKeyword(keyword);

        Logger.info("Entering Location");

        await this.searchPage.enterLocation(location);

        Logger.info("Click Search");

        await this.searchPage.clickSearch();

    }

}