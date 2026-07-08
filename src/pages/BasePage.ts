import { Page } from "@playwright/test";

export class BasePage {

    constructor(public page: Page){}

    async navigate(url:string){
        await this.page.goto(url);
    }

    async click(locator:string){
        await this.page.locator(locator).click();
    }

    async fill(locator:string,value:string){
        await this.page.locator(locator).fill(value);
    }

    async getText(locator:string){
        return await this.page.locator(locator).textContent();
    }

}