import { BrowserManager } from "./utils/Browser";
import { LoginPage } from "./pages/LoginPage";
import { LoginService } from "./services/LoginService";
import { Logger } from "./utils/Logger";
import { ENV } from "./config/env";

async function main(){

    const browser = new BrowserManager();

    const page = await browser.start();

    Logger.info("Opening Website");

    await page.goto(ENV.BASE_URL);

    const loginPage = new LoginPage(page);

    const loginService = new LoginService(loginPage);

    await loginService.login();

    Logger.info("Login Completed");

}

main();