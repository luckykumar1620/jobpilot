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

    private emailTextbox = this.page.getByPlaceholder(
        "Enter your active Email ID / Username"
    );

    private passwordTextbox = this.page.getByPlaceholder(
        "Enter your password"
    );

    private loginButton = this.page.getByRole("button", {
        name: "Login",
        exact: true
    });

    async openWebsite(): Promise<void> {
        await this.page.goto("https://www.naukri.com/");
    }

    async clickLogin(): Promise<void> {
        await this.click(this.loginLink);
    }

    async enterEmail(email: string): Promise<void> {
        await this.fill(this.emailTextbox, email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordTextbox, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.click(this.loginButton);
    }

    async login(email: string, password: string): Promise<void> {
        await this.openWebsite();
        await this.clickLogin();
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}