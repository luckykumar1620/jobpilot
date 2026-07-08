import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private loginLink = this.page.getByRole("link", {
        name: "Login",
        exact: true
    });

    private emailTextbox = this.page.getByRole("textbox", {
        name: "Enter your active Email ID /"
    });

    private passwordTextbox = this.page.getByRole("textbox", {
        name: "Enter your password"
    });

    private loginButton = this.page.getByRole("button", {
        name: "Login",
        exact: true
    });

    async openWebsite() {
        await this.page.goto("https://www.naukri.com/");
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async enterEmail(email: string) {
        await this.emailTextbox.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {

        await this.openWebsite();

        await this.clickLogin();

        await this.enterEmail(email);

        await this.enterPassword(password);

        await this.clickLoginButton();

    }

}