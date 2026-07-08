import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { ENV } from "../src/config/env";

test("Login to Naukri", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        ENV.EMAIL,
        ENV.PASSWORD
    );

   await expect(page.locator('.nI-gNb-drawer')).toBeVisible({
    timeout: 30000
});

    // Verify login
    await expect(page).toHaveURL(/naukri/);

    // Save authenticated session
    await page.context().storageState({
        path: "auth/auth.json"
    });

});